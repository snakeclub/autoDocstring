import * as interfaces from '../docstring_parts';
import { BaseFactory } from './base_factory'
import * as vscode from 'vscode';

export class SnakerpyFactory extends BaseFactory {

    generateSummary(docstring: interfaces.DocstringParts) {
        // 打印docstring所有属性值，调试
        /*
        var v_desc = "";
        for (var i in docstring) {
            v_desc += i + " = " + docstring[i] + "\n";
        }
        this.appendText(v_desc);
        */
        if (this._newlineBeforeSummary) {
            this.appendNewLine();
        }

        if (this._includeSummary) {
            this.appendText(`@summary `)
            if (this._includeName) {
                this._snippet.appendText(`${docstring.name} - `);
            }
            this._snippet.appendPlaceholder(`<summary>`);
            this.appendNewLine();
        }

        // 根据不同类型处理
        switch (docstring.defType) {
            case "property":
                this._snippet.appendText(`@property {`);
                this._snippet.appendPlaceholder(`<type>`);
                this._snippet.appendText(`}\n`);
                break;
            case "enum":
                this._snippet.appendText(`@enum {`);
                this._snippet.appendPlaceholder(`<type>`);
                this._snippet.appendText(`}\n`);
                break;
            case "class":
                break;
            case "def":
                break;
            case "var":
                break;
            default:
                // moudle
                this._snippet.appendText(`@module `);
                this._snippet.appendPlaceholder(`<fullname>`);
                this.appendNewLine();
                this._snippet.appendText(`@file `);
                this._snippet.appendPlaceholder(`<filename>`);
                this.appendNewLine();
                break;
        }
    }

    generateDescription() {
        this.appendNewLine();
        this._snippet.appendPlaceholder(`<description>`);
        this.appendNewLine();
    }

    formatDecorators(decorators: interfaces.Decorator[]) {
        if (decorators.length > 0) {
            this.appendNewLine();
            for (let decorator of decorators) {
                this.appendText(`@decorators ${decorator.name} - `);
                this.appendPlaceholder(`[description]`);
                this.appendNewLine();
            }
        }
    }

    formatArguments(docstring: interfaces.DocstringParts) {
        if (docstring.args.length > 0) {
            this.appendNewLine();
            for (let arg of docstring.args) {
                this.appendText(`@param {`);
                this.appendPlaceholder(`${arg.type}`);
                this.appendText(`} ${arg.var} - `);
                this.appendPlaceholder(`<description>`);
                this.appendNewLine();
            }
        }
    }

    formatKeywordArguments(docstring: interfaces.DocstringParts) {
        if (docstring.kwargs.length > 0) {
            this.appendNewLine();
            for (let kwarg of docstring.kwargs) {
                this.appendText(`@param {`);
                this.appendPlaceholder(`${kwarg.type}`);
                this.appendText(`} ${kwarg.var}=${kwarg.default} - `);
                this.appendPlaceholder(`<description>`);
                this.appendNewLine();
            }
        }
    }

    formatRaises(raises: interfaces.Raises[]) {
        if (raises.length > 0) {
            this.appendNewLine();
            for (let raise of raises) {
                this.appendText(`@throws {${raise.exception}} - `);
                this.appendPlaceholder("<description>");
                this.appendNewLine()
            }
        }
    }

    formatReturns(returns: interfaces.Returns) {
        this.appendNewLine();
        this.appendText(`@returns {`);
        this.appendPlaceholder(`${returns.type}`);
        this.appendText("} - ");
        this.appendPlaceholder("<description>");
        this.appendNewLine()
    }

}

