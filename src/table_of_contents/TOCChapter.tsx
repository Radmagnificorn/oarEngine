import { Chapter } from "../ComicOutline";
import { useState } from 'react';

interface TOCChapterArgs {
    chapter: Chapter,
    chapterIndex: number,
    setCAP: (chapter: number, page: number) => void;
}

function TOCChapter({ chapter, chapterIndex, setCAP }: TOCChapterArgs) {

    const [ showPages, setShowPages ] = useState<boolean>(false);

    const renderPage = (page: string) => {
        const pageIndex = chapter.pages.indexOf(page);
        
        return (
            <li onClick={() => setCAP(chapterIndex, pageIndex)}>Page: {pageIndex}</li>
        );
    }

    return (
        <li>
            <p onClick={() => setShowPages(!showPages)}>{chapter.title}</p>
            { showPages ? <ul>{chapter.pages.map((page) => renderPage(page))}</ul> : null }
        </li>
    );
}

export default TOCChapter;