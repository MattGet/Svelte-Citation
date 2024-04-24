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

export function formatArrayToBibTex(sources: any[]) {
    console.log("Export BibTexs");

    var jsonse = formatArrayToCSL(sources);
    const example = new Cite(jsonse);
    let output = example.format("bibtex");
    // console.log("Output: " + output);
    return output;
}

export function formatArrayToJson(sources: any[]) {
    console.log("Export Jsons");

    var jsonse = formatArrayToCSL(sources);
    const example = new Cite(jsonse);
    let output = example.format("data");
    // console.log("Output: " + output);
    return output;
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
        locator: source.locator, // no loss below
        categories: source.categories,
        chair: source.chair,
        collection_editor: source.collection_editor,
        compiler: source.compiler,
        composer: source.composer,
        container_author: source.container_author,
        contributer: source.contributer,
        curator: source.curator,
        director: source.director,
        editor: source.editor,
        editorial_director: source.editorial_director,
        executive_director: source.executive_director,
        guest: source.guest,
        host: source.host,
        interviewer: source.interviewer,
        illustrator: source.illustrator,
        narrator: source.narrator,
        organizer: source.organizer,
        original_author: source.original_author,
        performer: source.performer,
        producer: source.producer,
        recipient: source.recipient,
        reviewed_author: source.reviewed_author,
        script_writer: source.script_writer,
        series_creator: source.series_creator,
        translator: source.translator,
        citation_key: source.citation_key,
        language: source.language,
        journalAbbreviation: source.journalAbbreviation,
        shortTitle: source.shortTitle,
        abstract: source.abstract,
        annote: source.annote,
        archive: source.archive,
        archive_collection: source.archive_collection,
        archive_location: source.archive_location,
        archive_place: source.archive_place,
        authority: source.authority,
        call_number: source.call_number,
        chapter_number: source.chapter_number,
        citation_number: source.citation_number,
        citation_label: source.citation_label,
        collection_number: source.collection_number,
        collection_title: source.collection_title,
        container_title_short: source.container_title_short,
        dimensions: source.dimensions,
        division: source.division,
        DOI: source.DOI,
        event: source.event,
        event_title: source.event_title,
        event_place: source.event_place,
        first_reference_note_number: source.first_reference_note_number,
        genre: source.genre,
        ISBN: source.ISBN,
        ISSN: source.ISSN,
        jurisdiction: source.jurisdiction,
        keyword: source.keyword,
        medium: source.medium,
        note: source.note,
        number: source.number,
        number_of_pages: source.number_of_pages,
        number_of_volumes: source.number_of_volumes,
        original_publisher: source.original_publisher,
        original_publisher_place: source.original_publisher_place,
        original_title: source.original_title,
        page_first: source.page_first,
        part: source.part,
        part_title: source.part_title,
        PMCID: source.PMCID,
        PMID: source.PMID,
        printing: source.printing,
        publisher_place: source.publisher_place,
        references: source.references,
        reviewed_genre: source.reviewed_genre,
        reviewed_title: source.reviewed_title,
        scale: source.scale,
        section: source.section,
        status: source.status,
        supplement: source.supplement,
        title_short: source.title_short,
        version: source.version,
        volume_title_short: source.volume_title_short,
        year_suffix: source.year_suffix
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
            locator: source.locator, //no loss below
            categories: source.categories,
            chair: source.chair,
            collection_editor: source.collection_editor,
            compiler: source.compiler,
            composer: source.composer,
            container_author: source.container_author,
            contributer: source.contributer,
            curator: source.curator,
            director: source.director,
            editor: source.editor,
            editorial_director: source.editorial_director,
            executive_director: source.executive_director,
            guest: source.guest,
            host: source.host,
            interviewer: source.interviewer,
            illustrator: source.illustrator,
            narrator: source.narrator,
            organizer: source.organizer,
            original_author: source.original_author,
            performer: source.performer,
            producer: source.producer,
            recipient: source.recipient,
            reviewed_author: source.reviewed_author,
            script_writer: source.script_writer,
            series_creator: source.series_creator,
            translator: source.translator,
            citation_key: source.citation_key,
            language: source.language,
            journalAbbreviation: source.journalAbbreviation,
            shortTitle: source.shortTitle,
            abstract: source.abstract,
            annote: source.annote,
            archive: source.archive,
            archive_collection: source.archive_collection,
            archive_location: source.archive_location,
            archive_place: source.archive_place,
            authority: source.authority,
            call_number: source.call_number,
            chapter_number: source.chapter_number,
            citation_number: source.citation_number,
            citation_label: source.citation_label,
            collection_number: source.collection_number,
            collection_title: source.collection_title,
            container_title_short: source.container_title_short,
            dimensions: source.dimensions,
            division: source.division,
            DOI: source.DOI,
            event: source.event,
            event_title: source.event_title,
            event_place: source.event_place,
            first_reference_note_number: source.first_reference_note_number,
            genre: source.genre,
            ISBN: source.ISBN,
            ISSN: source.ISSN,
            jurisdiction: source.jurisdiction,
            keyword: source.keyword,
            medium: source.medium,
            note: source.note,
            number: source.number,
            number_of_pages: source.number_of_pages,
            number_of_volumes: source.number_of_volumes,
            original_publisher: source.original_publisher,
            original_publisher_place: source.original_publisher_place,
            original_title: source.original_title,
            page_first: source.page_first,
            part: source.part,
            part_title: source.part_title,
            PMCID: source.PMCID,
            PMID: source.PMID,
            printing: source.printing,
            publisher_place: source.publisher_place,
            references: source.references,
            reviewed_genre: source.reviewed_genre,
            reviewed_title: source.reviewed_title,
            scale: source.scale,
            section: source.section,
            status: source.status,
            supplement: source.supplement,
            title_short: source.title_short,
            version: source.version,
            volume_title_short: source.volume_title_short,
            year_suffix: source.year_suffix
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