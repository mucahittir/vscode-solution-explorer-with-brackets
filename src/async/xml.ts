import * as convert from "xml-js";
import * as eol from "eol";
import * as config from "../SolutionExplorerConfiguration";
import { getLineEndings } from "../SolutionExplorerConfiguration";

const readOptions: convert.Options.XML2JSON = {
    compact: false
};

const writeOptions: convert.Options.JS2XML = {
    compact: false,
    spaces: 2
};

export function ParseToJson(content: string): Promise<any> {
    let result = <any>convert.xml2js(content, readOptions);
    if (result.declaration) {
        delete result.declaration
    }
    return Promise.resolve(result);
}

export function ParseToXml(content: any): Promise<string> {
    writeOptions.spaces = config.getXmlSpaces();
    let result = convert.js2xml(content, writeOptions);
    if (config.getXmlClosingTagSpace()) {
        const re = /([A-Za-z0-9_\"]+)\/\>/g;
        result = result.replace(re,"$1 />");
    }

    // By default the XML module will output files with LF.
    // We will convert that to CRLF if enabled.
    if(getLineEndings() == "crlf") {
        result = eol.crlf(result);
    }

    // #118 look inside quoted strings and replaze '&' by '&amp;'
    const m = result.match(/"([^"]*)"/g);
    if (m) {
        m.forEach(match => {
            if (match.indexOf('&') >= 0) {
                const rr = match.replace(/&/g, '&amp;');
                result = result.replace(match, rr);
            }
        });
    }

    return Promise.resolve(result);
}