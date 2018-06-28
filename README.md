[![Build Status](https://travis-ci.org/NilsJPWerner/autoDocstring.svg?branch=master)](https://travis-ci.org/NilsJPWerner/autoDocstring)
[![Installs](https://vsmarketplacebadge.apphb.com/installs-short/njpwerner.autodocstring.svg)](https://marketplace.visualstudio.com/items?itemName=njpwerner.autodocstring)

# VSCode autoDocstring - for SnakerPy

注：本分支版本是基于autoDocstring进行改造，支持对SnakerPy规范的支持（具体见snakeclub的《[Python代码规范](DevStandards/docs/python/Python代码规范.md )》），由于对底层修改了几个方法，本分支不打算与原作者的[autoDocstring主分支](https://github.com/NilsJPWerner/autoDocstring.git)合并，如果原作者有更新优化，再考虑同步修正补充。



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
