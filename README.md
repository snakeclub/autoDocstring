# VSCode autoDocstring - for SnakerPy

注：本分支版本是基于autoDocstring进行改造，由于对底层修改了几个方法，本分支不打算与原作者的[autoDocstring主分支](https://github.com/NilsJPWerner/autoDocstring.git)合并，如果原作者有更新优化，再考虑同步修正补充。

## 新增功能说明

- 支持对SnakerPy规范的支持（具体见snakeclub的《[Python代码规范](DevStandards/docs/python/Python代码规范.md )》）
- 增加部分部分变量在生成docstring时自动填入，包括模块名、文件
- 新增变量替换功能，通过autoDocstring.replacePreDefinedConfig 参数支持对自定义变量进行替换
- 对原功能增加了区分定义类型（defType）的处理，可以通过该值对不同类型定义生成不同注释
- 修复原功能不能生成修饰符定义的问题
- 修复原功能快捷键命令没有限定python类型的问题



## 使用说明

### docstring注释生成

与原功能定义一样，可以通过`ctrl+shift+2` or `cmd+shift+2` for mac发起命令，也可以通过右键菜单发起命令，注意发起命令时光标应在定义语句的下一行

注：目前支持对函数（def）、类（class）、属性（property）、枚举（enum）、变量（var）、模块（module - 放置在实际代码的前面）生成注释

### 变量替换功能（支持所有语言文件）

可以通过`ctrl+shift+1` or `cmd+shift+1` for mac发起命令，也可以通过右键菜单发起命令，变量替换的范围是全文档

自定义变量的替换参数为autoDocstring.replacePreDefinedConfig，这是一个key-value方式设置的参数{ "key": "value", "key": "value"}：

- key：自定义的搜索正则表达式字符串，注意要加上//g的完整内容，例如“/replaceText/g”（注意如果有"\\"字符要进行转义"\\\\"）
- value：要替换的字符串值，里面可以用常用变量进行字符的替换，例如"开始日期：{$DATE$}"，实际的替换的效果是替换为“开始日期：2018-01-22”

支持的内部变量如下：

- {$DATE$} ：日期

- {$TIME$} ：时间

- {$FILENAME$} ：文件名

- {$MODULENAME$} ：模块名

- {$LINE$} ：当前替换对象所在行




## 原作者文档

Visual Studio Code extension to quickly generate docstrings for python functions.

![Auto Generate Docstrings](images/demo.gif)

## Features

* Quickly generate a docstring snippet that can be tabbed through.
* Choose between several different types of docstring formats.
* Infers parameter types through pep484 type hints, default values, and var names.
* Support for args, kwargs, decorators, errors, and parameter types

## Docstring Formats

* Default (docBlockr)
* Google
* Numpy
* Sphinx
* PEP0257 (coming soon)

## Usage
Cursor must be on the line directly below the definition to generate full auto-populated docstring

* Press enter after opening docstring with triple quotes (""")
* Keyboard shortcut: `ctrl+shift+2` or `cmd+shift+2` for mac
    - Can be changed in Preferences -> Keyboard Shortcuts -> extension.generateDocstring
* Command: `Generate Docstring`
* Right click menu: `Generate Docstring`

## Extension Settings

This extension contributes the following settings:

* `autoDocstring.docstringFormat`: Switch between different docstring formats
* `autoDocstring.generateDocstringOnEnter`: Generate the docstring on pressing enter after opening docstring
* `autoDocstring.includeDescription`: Include description section in docstring
* `autoDocstring.includeName`: Include function name at the start of docstring
* `autoDocstring.newlineBeforeSummary`: New line before summary placeholder
* `autoDocstring.guessTypes`: Infer types from type hints, default values and variable names

## Known Issues

* \*args & \*\*kwargs not dealt with properly
* Extra new line at the end of inserted docstring
* Inserted docstrings have trailing spaces (problem with how vscode deals with snippets)

## Roadmap

* Add support for classes and modules
* Add more unit tests
* Add Epytext format

## Changelog

Check the [CHANGELOG.md](CHANGELOG.md) for any version changes.

## Contributing

The source code for this extension is hosted on [GitHub](https://github.com/NilsJPWerner/autoDocstring). Contributions, pull requests, suggestions, and bug reports are greatly appreciated.

* Post any issues and suggestions to the github [issues page](https://github.com/NilsJPWerner/autoDocstring/issues). Add the `feature request` tag to any feature requests or suggestions.
* To contribute, fork the project and then create a pull request back to master. Please update the README if you make any noticeable feature changes.
* There is no official contribution guide or code of conduct yet, but please follow the standard open source norms and be respectful in any comments you make.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details
