//@ts-ignore
import { Cite, plugins } from '@citation-js/core';
import '@citation-js/plugin-bibtex'; import '@citation-js/plugin-csl'
import { Months } from './helper.funcs';


export function exportJSON(source: any) {
    var jsonse = formatToCSL(source);
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

    var jsonse = formatToCSL(source);
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

export function formatToCSL(source: any) {
    let date = { 'date-parts': [Number(source.date.year), Object.keys(Months).indexOf(source.date.month) + 1] }

    let data = {
        id: source.id,
        type: source.type,
        title: source.title,
        url: source.URL,
        author: source.author,
        issued: date,
        publisher: source.publisher,
        volume_title: source.volume_title,
        volume: source.volume,
        issue: source.issue,
        page: source.page,
        edition: source.edition,
        locator: source.locator
    }
    return JSON.stringify(data);
}

export function formatArrayToCSL(sources: any[]) {
    let data: { id: any; type: any; title: any; url: any; author: any; issued: { 'date-parts': number[]; }; publisher: any; volume_title: any; volume: any; issue: any; page: any; edition: any; locator: any; }[] = []
    sources.forEach(source => {
        let date = { 'date-parts': [Number(source.date.year), Object.keys(Months).indexOf(source.date.month) + 1] }

        let dataPart = {
            id: source.id,
            type: source.type,
            title: source.title,
            url: source.URL,
            author: source.author,
            issued: date,
            publisher: source.publisher,
            volume_title: source.volume_title,
            volume: source.volume,
            issue: source.issue,
            page: source.page,
            edition: source.edition,
            locator: source.locator
        }
        data.push(dataPart);
    });

    return JSON.stringify(data);
}


export function cite(data: string, stlye: string) {
    const citeObject = new Cite(data);
    let date = (new Date()).toLocaleDateString()
    let output = citeObject.format('bibliography', {
        asEntryArray: true,
        format: 'html',
        template: stlye,
    })
    return output;
}

export async function registerStyle(name: string, template: string) {
    let config = plugins.config.get('@csl');
    config.templates.add(name, template);
    console.log(`Registered ${name} style`);
}

export async function removeStyle(name: string) {
    let config = plugins.config.get('@csl');
    config.templates.remove(name);
    console.log(`Removed ${name} style`);
}

export function getTemplates() {
    let config = plugins.config.get('@csl');
    return config.templates;
}