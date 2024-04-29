import { Months } from "$lib/client/helper.funcs";
import { prisma } from "$lib/server/prisma";

export async function pushToDB(data: any, user: string, userid: string, creator: string, time: string, tags: string) {
    //console.log(data);
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
    let volume_title = data["container-title"] ?? data["journal"];
    let issue = data.issue;
    let edition = data.edition;
    let locator = data.locator;
    //console.log(`tags: ${tags} keywords: ${data.keyword}`);
    if (data.keyword != undefined && data.keyword != null) {
        if (tags != null && tags != undefined) tags += `,${data.keyword}`;
        else tags = data.keyword;
    }
    //Import only fields below
    let categories = data.categories;
    let chair = data.chair;
    let collection_editor = data["collection-editor"];
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
    let id = "default";
    try {
        const source = await prisma.source.create({
            data: {
                title,
                URL,
                userid,
                user,
                creator,
                last_updated: time,
                tags,
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
        id = source.id
    } catch (err) {
        console.error(err)
        return "Failed to send data!"
    }
    //console.log(`Push source id: ${id}`);
    return id;
}