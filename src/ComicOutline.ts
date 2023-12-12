export class Comic {
    title: string = "";
    chapters: Chapter[] = [];
};

export class Chapter {
    title: string = "";
    directory: string = "";
    pages: string[] = [];
};