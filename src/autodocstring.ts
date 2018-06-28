import * as vs from 'vscode';
import * as factories from './docstring_factories/factories'
import { parse } from './parse/parse'
import { docstringIsClosed } from './parse/closed_docstring'
import { isMultiLineString } from './parse/multi_line_string'
import { POINT_CONVERSION_COMPRESSED } from 'constants';


export class AutoDocstring {
    private docstringFactory: factories.BaseFactory;
    private editor: vs.TextEditor;

    constructor(editor: vs.TextEditor) {
        this.editor = editor;

        let docstringFormat = vs.workspace.getConfiguration("autoDocstring").get("docstringFormat");
        switch (docstringFormat) {
            case "google":
                this.docstringFactory = new factories.GoogleFactory();
                break;

            case "sphinx":
                this.docstringFactory = new factories.SphinxFactory();
                break;

            case "numpy":
                this.docstringFactory = new factories.NumpyFactory();
                break;

            // add by snakeclub: add snakerpy format
            case "snakerpy":
                this.docstringFactory = new factories.SnakerpyFactory();
                break;

            default:
                this.docstringFactory = new factories.DefaultFactory();
        }
    }

    public replacePreDefinedVar() {
        this.docstringFactory.replacePreDefinedVar();
    }

    public generateDocstring(onEnter: boolean) {
        let document = this.editor.document.getText();
        let position = this.editor.selection.active
        let linePosition = position.line;
        let charPosition = position.character;

        if (!onEnter) {

        }

        // Check whether the docstring is already closed for enter activation
        if (!onEnter || this.validEnterActivation(document, linePosition, charPosition)) {

            let docstringParts = parse(document, linePosition);
            let docstringSnippet = this.docstringFactory.createDocstring(docstringParts, !onEnter);

            this.editor.insertSnippet(docstringSnippet, position)
        }
    }

    validEnterActivation(document: string, linePosition: number, charPosition: number): boolean {
        console.log("multiline: ", isMultiLineString(document, linePosition, charPosition))
        console.log("closed: ", docstringIsClosed(document, linePosition, charPosition))

        return (
            !isMultiLineString(document, linePosition, charPosition) &&
            !docstringIsClosed(document, linePosition, charPosition)
        )
    }
}
