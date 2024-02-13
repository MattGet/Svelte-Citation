//@ts-ignore
import { Cite } from '@citation-js/core';
import '@citation-js/plugin-bibtex';


export function exportJSON(source: any) {
    var jsonse = JSON.stringify(source);
    var blob = new Blob([jsonse], { type: 'application/json' });
    var url = URL.createObjectURL(blob);
    var a = document.createElement('a');
    document.body.append(a);
    a.download = source.title;
    a.href = url;
    a.click();
    a.remove();
}

export function exportBibTex(source: any) {
    console.log("Export BibTex");
    var jsonse = JSON.stringify(source);
    const example = new Cite(jsonse);
    let output = example.format("bibtex");
    console.log("Output: " + output);
    var blob = new Blob([output], { type: 'application/x-bibtex' });
    var url = URL.createObjectURL(blob);
    var a = document.createElement('a');
    document.body.append(a);
    a.download = source.title + ".bib";
    a.href = url;
    a.click();
    a.remove();
}