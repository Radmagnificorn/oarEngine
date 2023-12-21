import { Comic } from '../ComicOutline';
import TOCChapter from './TOCChapter';

interface TOCArgs {
    toc: Comic,
    setCAP: (chapter: number, page: number) => void;
};


function TableOfContents({ toc, setCAP }: TOCArgs) {

    let chapterIndex = 0;

    return (
        <div>
            {toc.chapters.map((chapter) => {
                const index = chapterIndex;
                chapterIndex++;
                return (<TOCChapter chapter={chapter} chapterIndex={index} setCAP={setCAP} />)
            })}
        </div>
    );
}

export default TableOfContents