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
            <span onClick={() => setCAP(chapterIndex, pageIndex)}>Page: {pageIndex} | </span>
        );
    }

    return (
        <div>
            <h3 onClick={() => setShowPages(!showPages)}>{chapter.title}</h3>
            { showPages ? <div>{chapter.pages.map((page) => renderPage(page))}</div> : null }
        </div>
    );
}

export default TOCChapter;