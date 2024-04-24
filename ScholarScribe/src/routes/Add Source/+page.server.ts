import type { Actions } from "./$types";
import { prisma } from "$lib/server/prisma";
import { fail, redirect } from "@sveltejs/kit";
import type { Author } from "@prisma/client";
// @ts-ignore
import { Cite } from '@citation-js/core';
import '@citation-js/plugin-doi'
import '@citation-js/plugin-isbn'
import '@citation-js/plugin-csl'
import '@citation-js/plugin-bibtex'
import '@citation-js/plugin-software-formats';
import { Months } from "$lib/client/helper.funcs";

export const actions: Actions = {
    createSource: async ({ request }) => {
        const formData = await request.formData();
        const { title, URL, userid, user, creator, time, day, month, year, publisher, type, volume_title, volume, issue, page, edition, locator } = Object.fromEntries(formData) as {
            title: string
            URL: string
            userid: string
            user: string
            creator: string
            time: string
            day: string
            month: string
            year: string
            publisher: string
            type: string
            volume_title: string
            volume: string
            issue: string
            page: string
            edition: string
            locator: string
        }

        // Extracting numbAuthor as a number, assuming it's part of the form data
        const NUMB = Number(formData.get("numAuthors"));
        if (isNaN(NUMB)) {
            throw new Error("Invalid numbAuthor value");
        }
        if (NUMB < 1) {
            throw new Error("Invalid numbAuthor, must be at least 1");
        }

        let author = []

        for (let i = 0; i < NUMB; i++) {
            const given = formData.get(`given[${i}]`) as string;
            const family = formData.get(`family[${i}]`) as string;
            const suffix = formData.get(`suffix[${i}]`) as string;

            let authors = { given: given, family: family, suffix: suffix } as Author;
            author[i] = authors;
        }

        try {
            const source = await prisma.source.create({
                data: {
                    title,
                    URL,
                    userid,
                    user,
                    creator,
                    last_updated: time,
                    date: {
                        year,
                        month,
                        day,
                    },
                    publisher,
                    type,
                    author,
                    volume_title,
                    volume,
                    issue,
                    page,
                    edition,
                    locator,
                },
            })
        } catch (err) {
            console.error(err)
            return fail(500, { message: "Could not create the article." })
        }

        redirect(303, "/Sources");
    },
    importSource: async ({ request }) => {
        const formData = await request.formData();
        const { importType, importText, userid, user, creator, time } = Object.fromEntries(formData) as {
            importType: string
            importText: string
            userid: string
            user: string
            creator: string
            time: string
        }

        let output;
        if (importType == "doi") {
            try {
                let ref = await Cite.async(importText);
                output = ref.format('data');
            }
            catch (Error) {
                console.error(Error)
                return fail(500, { message: "Could not fetch DOI info." })
            }
        }
        else if (importType == "isbn") {
            try {
                let ref = await Cite.async(importText);
                output = ref.format('data');
            }
            catch (Error) {
                console.error(Error)
                return fail(500, { message: "Could not fetch ISBN info." })
            }
        }
        else if (importType == "bibtex") {
          try {
                let ref = await Cite.async(importText);
                output = ref.format('data');
            }
            catch (Error) {
                console.error(Error)
                return fail(500, { message: "Could not fetch BibTex info." })
            }
        }
        else if (importType == "npm") {
            try {
                let ref = await Cite.async(importText);
                output = ref.format('data');
            }
            catch (Error) {
                console.error(Error)
                return fail(500, { message: "Could not fetch NPM info." })
            }
        }
        else {
            return fail(500, { message: "No Import Type Selected!" })
        }

        const data = JSON.parse(output)[0];
        let date = data.issued['date-parts'][0];
        let title = data.title;
        let type = data.type;
        let URL = data.URL;
        let year;
        let month;
        let day;
        if (date[0] != null) { year = String(date[0]); } else year = "0000";
        if (date[1] != null) month = Object.keys(Months).at(date[1] - 1);
        if (date[2] != null) day = String(date[2]);
        let publisher = data.publisher;
        let author = data.author;
        let volume = data.volume;
        let page = data.page;
        let volume_title = data["container-title"];
        let issue = data.issue;
        let edition = data.edition;
        let locator = data.locator;
        let id;
        //let the hell of no loss begin
        let categories = data.categories;
        let chair = data.chair;
        let collection_editor =data["collection-editor"];
        let compiler = data.compiler;
        let composer = data.composer;
        let container_author = data["container-author"];
        let contributer = data.contributer;
        let curator = data.curator;
        let director = data.director;
        let editor = data.editor;
        let editorial_director = data["editorial-director"];
        let executive_director = data["executive-director"];
        let guest = data.guest;
        let host = data.host;
        let interviewer = data.interviewer;
        let illustrator = data.illustrator;
        let narrator = data.narrator;
        let organizer = data.organizer;
        let original_author = data["original-author"];
        let performer = data.performer;
        let producer = data.producer;
        let recipient = data.recipient;
        let reviewed_author = data["reviewed-author"];
        let script_writer = data["script-writer"];
        let series_creator = data["series-creator"];
        let translator = data.translator;
        let citation_key = data["citation-key"];
        let language = data.language;
        let journalAbbreviation = data.journalAbbreviation;
        let shortTitle = data.shortTitle;
        let abstract = data.abstract;
        let annote = data.annote;
        let archive = data.archive;
        let archive_collection = data["archive-collection"];
        let archive_location = data["archive-location"];
        let archive_place = data["archive-place"];
        let authority = data.authority;
        let call_number = data["call-number"];
        let chapter_number = data["chapter-number"];
        let citation_number = data["citation-number"];
        let citation_label = data["citation-label"];
        let collection_number = data["collection-number"];
        let collection_title = data["collection-title"];
        let container_title_short = data["container-title-short"];
        let dimensions = data.dimensions;
        let division = data.division;
        let DOI = data.DOI;
        let event = data.event;
        let event_title = data["event-title"];
        let event_place = data["event-place"];
        let first_reference_note_number = data["first-reference-note-number"];
        let genre = data.genre;
        let ISBN = data.ISBN;
        let ISSN = data.ISSN;
        let jurisdiction = data.jurisdiction;
        let keyword = data.keyword;
        let medium = data.medium;
        let note = data.note;
        let number = data.number;
        let number_of_pages = data["number-of-pages"];
        let number_of_volumes = data["number-of-volumes"];
        let original_publisher = data["original-publisher"];
        let original_publisher_place = data["original-publisher-place"];
        let original_title = data["original-title"];
        let page_first = data["page-first"];
        let part = data.part;
        let part_title = data["part-title"];
        let PMCID = data.PMCID;
        let PMID = data.PMID;
        let printing = data.printing;
        let publisher_place = data["publisher-place"];
        let references = data.references;
        let reviewed_genre = data["reviewed-genre"];
        let reviewed_title = data["reviewed-title"];
        let scale = data.scale;
        let section = data.section;
        let status = data.status;
        let supplement = data.supplement;
        let title_short = data["title-short"];
        let version = data.version;
        let volume_title_short = data["volume-title-short"];
        let year_suffix = data["year-suffix"];

        try {
            const source = await prisma.source.create({
                data: {
                    title,
                    URL,
                    userid,
                    user,
                    creator,
                    last_updated: time,
                    date: {
                        year,
                        month,
                        day,
                    },
                    publisher,
                    type,
                    author,
                    volume_title,
                    volume,
                    issue,
                    page,
                    edition,
                    locator, //no loss below
                    categories,
                    chair,
                    collection_editor,
                    compiler,
                    composer,
                    container_author,
                    contributer,
                    curator,
                    director,
                    editor,
                    editorial_director,
                    executive_director,
                    guest,
                    host,
                    interviewer,
                    illustrator,
                    narrator,
                    organizer,
                    original_author,
                    performer,
                    producer,
                    recipient,
                    reviewed_author,
                    script_writer,
                    series_creator,
                    translator,
                    citation_key,
                    language,
                    journalAbbreviation,
                    shortTitle,
                    abstract,
                    annote,
                    archive,
                    archive_collection,
                    archive_location,
                    archive_place,
                    authority,
                    call_number,
                    chapter_number,
                    citation_number,
                    citation_label,
                    collection_number,
                    collection_title,
                    container_title_short,
                    dimensions,
                    division,
                    DOI,
                    event,
                    event_title,
                    event_place,
                    first_reference_note_number,
                    genre,
                    ISBN,
                    ISSN,
                    jurisdiction,
                    keyword,
                    medium,
                    note,
                    number,
                    number_of_pages,
                    number_of_volumes,
                    original_publisher,
                    original_publisher_place,
                    original_title,
                    page_first,
                    part,
                    part_title,
                    PMCID,
                    PMID,
                    printing,
                    publisher_place,
                    references,
                    reviewed_genre,
                    reviewed_title,
                    scale,
                    section,
                    status,
                    supplement,
                    title_short,
                    version,
                    volume_title_short,
                    year_suffix,
                },
            })
            id = source.id;
        } catch (err) {
            console.error(err)
            return fail(500, { message: "Could not create the article." })
        }

        redirect(303, `/Validate/${id}`)
    },
}