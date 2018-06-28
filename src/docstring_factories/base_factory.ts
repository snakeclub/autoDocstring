import { DocstringParts, Decorator, Raises, Returns, removeTypes, addTypePlaceholders } from '../docstring_parts'
import * as vscode from 'vscode';
import { print } from 'util';

export abstract class BaseFactory {
    protected _editor: vscode.TextEditor;

    protected _snippet: vscode.SnippetString;
    protected _newlineBeforeSummary: boolean;
    protected _includeDescription: boolean;
    protected _includeName: boolean;
    protected _guessTypes: boolean;
    protected _docstringFormat: string;
    protected _includeSummary: boolean;

    constructor() {
        this._snippet = new vscode.SnippetString();
        this._editor = vscode.window.activeTextEditor;
        let config = vscode.workspace.getConfiguration("autoDocstring");
        this._newlineBeforeSummary = config.get("newlineBeforeSummary") === true;
        this._includeDescription = config.get("includeDescription") === true;
        this._includeName = config.get("includeName") === true;
        this._guessTypes = config.get("guessTypes") === true;
        this._docstringFormat = config.get("docstringFormat");
        this._includeSummary = config.get("includeSummary") === true;
    }

    createDocstring(docstring: DocstringParts, openingQuotes: boolean): vscode.SnippetString {
        this._snippet.value = "";

        if (this._docstringFormat == "snakerpy") {
            // snakerpy单独的处理流程
            this.generateDescription();  // 一定要有描述

            if (!this._guessTypes) {
                removeTypes(docstring);
            }

            addTypePlaceholders(docstring, '[type]')

            if (docstring != undefined) {
                this.generateSummary(docstring);  // Summary及放置在前面的属性

                if (docstring.defType == "def") {
                    if (docstring.decorators.length > 0) {
                        this.formatDecorators(docstring.decorators);
                    }
                    if (docstring.args.length > 0) {
                        this.formatArguments(docstring);
                    }
                    if (docstring.kwargs.length > 0) {
                        this.formatKeywordArguments(docstring);
                    }

                    if (docstring.returns != undefined) {
                        this.formatReturns(docstring.returns);
                    }

                    if (docstring.raises.length > 0) {
                        this.formatRaises(docstring.raises);
                    }
                }
            }
        }
        else {
            if (this._newlineBeforeSummary) {
                this._snippet.appendText("\n");
            }

            this.generateSummary(docstring);

            if (this._includeDescription) {
                this.generateDescription();
            }

            if (!this._guessTypes) {
                removeTypes(docstring);
            }

            addTypePlaceholders(docstring, '[type]')

            if (docstring != undefined) {
                if (docstring.decorators.length > 0) {
                    this.formatDecorators(docstring.decorators);
                }
                if (docstring.args.length > 0) {
                    this.formatArguments(docstring);
                }
                if (docstring.kwargs.length > 0) {
                    this.formatKeywordArguments(docstring);
                }
                if (docstring.raises.length > 0) {
                    this.formatRaises(docstring.raises);
                }
                if (docstring.returns != undefined) {
                    this.formatReturns(docstring.returns);
                }
            }
        }

        this.commentText(openingQuotes);
        return this._snippet;
    }

    commentText(openingQuotes: boolean): void {
        if (openingQuotes) {
            this._snippet.value = '"""' + this._snippet.value + '"""';
        } else {
            this._snippet.value = this._snippet.value + '"""';
        }
    }

    appendText(text: string): void {
        this._snippet.appendText(text);
    }

    appendPlaceholder(text: string): void {
        this._snippet.appendPlaceholder(text);
    }

    appendNewLine(): void {
        this._snippet.appendText("\n");
    }

    public replacePreDefinedVar() {
        // 替换预定义代码
        let replaceConfig = vscode.workspace.getConfiguration("autoDocstring").get("replacePreDefinedConfig");
        // 预处理替换字符串
        let dateStr: string = this.getDateStr();
        let timeStr: string = this.getTimeStr();
        let fileName = this.getFileName();
        let moduleName = this.getModuleName();
        let hasConfig = false;
        for (var key in replaceConfig) {
            replaceConfig[key] = replaceConfig[key].replace(/\{\$DATE\$\}/g, dateStr).replace(/\{\$TIME\$\}/g, timeStr).replace(/\{\$FILENAME\$\}/g, fileName).replace(/\{\$MODULENAME\$\}/g, moduleName);
            hasConfig = true;
        }
        if (!hasConfig) {
            // 没有参数不要处理
            return;
        }
        let doc = this._editor.document;
        let lineCount = doc.lineCount;
        // 替换完成，修改原文档
        this._editor.edit((eb) => {
            for (let i = 0; i < lineCount; i++) {
                // 逐行进行寻找和替换处理
                let tempStr: string = doc.lineAt(i).text;
                tempStr = this.replaceLine(tempStr, replaceConfig, i);
                eb.replace(doc.lineAt(i).range, tempStr);
            }
        });
    }

    public replaceLine(lineStr: string, config: object, lineNum: number) {
        let tempStr: string = lineStr;
        for (var key in config) {
            let repStr = config[key].replace(/\{\$LINE\$\}/g, lineNum.toString());
            eval("tempStr = tempStr.replace(" + key + ", repStr);")
        }
        return tempStr;
    }

    public getDateStr() {
        let date: Date = new Date();
        return this.DateFormat(date, "yyyy-MM-dd");
    }

    public getTimeStr() {
        let date: Date = new Date();
        return this.DateFormat(date, "hh:mm:ss.S");
    }

    public getFileName() {
        let filename: string = this._editor.document.fileName;
        filename = filename.substr(filename.lastIndexOf('\\') + 1);
        filename = filename.substr(filename.lastIndexOf('/') + 1);
        return filename;
    }

    public getModuleName() {
        let moduleName: string = this.getFileName();
        let index = moduleName.lastIndexOf('.');
        if (index > 0) {
            moduleName = moduleName.substring(0, index);
        }
        return moduleName;
    }

    // 对Date的扩展，将 Date 转化为指定格式的String
    // 月(M)、日(d)、小时(h)、分(m)、秒(s)、季度(q) 可以用 1-2 个占位符，
    // 年(y)可以用 1-4 个占位符，毫秒(S)只能用 1 个占位符(是 1-3 位的数字)
    // 例子：
    // (new Date()).Format("yyyy-MM-dd hh:mm:ss.S") ==> 2006-07-02 08:09:04.423
    // (new Date()).Format("yyyy-M-d h:m:s.S")      ==> 2006-7-2 8:9:4.18
    public DateFormat(date: Date, fmt: string) { //author: meizz

        var o = {
            "M+": date.getMonth() + 1, //月份
            "d+": date.getDate(), //日
            "h+": date.getHours(), //小时
            "m+": date.getMinutes(), //分
            "s+": date.getSeconds(), //秒
            "q+": Math.floor((date.getMonth() + 3) / 3), //季度
            "S": date.getMilliseconds() //毫秒
        };
        if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
        for (var k in o)
            if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
        return fmt;
    }

    abstract generateSummary(docstring: DocstringParts): void;
    abstract generateDescription(): void;
    abstract formatDecorators(decorators: Decorator[]): void;
    abstract formatArguments(args: DocstringParts): void;
    abstract formatKeywordArguments(kwargs: DocstringParts): void;
    abstract formatRaises(raises: Raises[]): void;
    abstract formatReturns(returns: Returns): void;

}

