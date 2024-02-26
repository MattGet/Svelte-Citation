//@ts-ignore
import { Cite } from '@citation-js/core';
import '@citation-js/plugin-bibtex';
import { Months } from './helper.funcs';


export function exportJSON(source: any) {
    console.log("Exporting JSON");
    let date = { 'date-parts': [Number(source.date.year), Object.keys(Months).indexOf(source.date.month) + 1] }

    let data = {
        id: source.id,
        type: source.type,
        title: source.title,
        url: source.URL,
        author: source.author,
        issued: date,
        publisher: source.publisher
    }
    var jsonse = JSON.stringify(data);
    console.log("Output: " + jsonse);
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
    let date = { 'date-parts': [Number(source.date.year), Object.keys(Months).indexOf(source.date.month) + 1] }

    let data = {
        id: source.id,
        type: source.type,
        title: source.title,
        url: source.URL,
        author: source.author,
        issued: date,
        publisher: source.publisher
    }

    var jsonse = JSON.stringify(data);
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