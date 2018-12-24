# autoDocstring开发及编译方法

## 通过npm编译

- 在命令行转到项目目录，通过以下命令自动安装依赖包：`npm install`
- 依赖包安装完成后，通过以下命令进行编译：`npm run compile`
- 如果编译中发现有报依赖模块找不到的情况（但又实际上能在node_modules找到，例如找不到vscode），先执行 `npm cache clean` 清除缓存，再执行 `npm install` 重新安装依赖包（根据提示可能要执行“npm audit fix --force”修复部分已安装补丁）
- 如果还不行，尝试执行一下 `npm  init ` 重新初始化一次package.json文件（注意要先备份），然后重新再安装



## 安装VSCode编辑代码

安装VSCode

在VSCode中安装ESlint扩展插件

在VSCode中打开整个项目文件夹即可进行编辑修改



## 打包扩展插件及发布

安装打包工具 [vsce](https://code.visualstudio.com/docs/tools/vscecli) ：`npm install -g vsce`

cd到项目目录下，然后执行命令 `vsce package` 来打包一个

```
C:\Users\hi.li\Desktop\opensource\autoDocstring>vsce package
Executing prepublish script 'npm run vscode:prepublish'...

> autodocstring@0.3.0 vscode:prepublish C:\Users\hi.li\Desktop\opensource\autoDocstring
> tsc -p ./

The keyword list is limited to 5 keywords; only the following keywords will be in your extension: python, docstring, autodocstring, docblockr, docblockr_python.
Do you want to continue? [y/N] y
Created: C:\Users\hi.li\Desktop\opensource\autoDocstring\autodocstring-0.3.0.vsix
```

然后就可以拿autodocstring-0.3.0.vsix进行安装了：code --install-extension autodocstring-0.3.0.vsix

**注意：打包前记得要先编译**



