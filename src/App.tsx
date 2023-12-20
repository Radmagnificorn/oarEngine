import { useEffect, useState } from 'react'
import './App.css'
import { Comic } from './ComicOutline';
import TableOfContents from './table_of_contents/TableOfContents';
import Modal from 'react-modal';

function App() {
  const [outline, setOutline] = useState<Comic>(new Comic());
  const [chapterIndex, setChapterIndex] = useState<number>(0);
  const [pageIndex, setPageIndex] = useState<number>(0);
  const [showTOC, setShowTOC] = useState<boolean>(false);

  useEffect(() => {
    const fetchManifest = async () => {
      try {
        const response = await fetch('comic/outline.json');
        const data = await response.json();
        setOutline(data);
        setChapterIndex(0); // need to use it somewhere to make the compiler happy for now
        console.log(JSON.stringify(outline));
      } catch (error) {
        console.error('Error fetching images:', error);
      }
    }

    fetchManifest();

  }, []);

  Modal.setAppElement('#root')

  const handleNext = () => {
    const pages = outline.chapters[chapterIndex]?.pages.length;
    if (pageIndex < pages - 1) {
      setPageIndex(pageIndex + 1);
    } else {
      if (chapterIndex < outline.chapters.length - 1) {
        setChapterIndex(chapterIndex + 1);
        setPageIndex(0);
      }
    }
  };

  const handlePrevious = () => {
    if (pageIndex > 0) {
      setPageIndex(pageIndex - 1);
    } else {
      if (chapterIndex > 0) {
        setPageIndex(outline.chapters[chapterIndex - 1].pages.length - 1);
        setChapterIndex(chapterIndex - 1);
      }
    }
  };

  const setChapterAndPage = (chapter: number, page: number) => {
    setChapterIndex(chapter);
    setPageIndex(page);
  }

  return (
    <div className="image-container">
      
      <img
        src={`comic/${outline.chapters[chapterIndex]?.directory}/${outline.chapters[chapterIndex]?.pages[pageIndex]}`}
        alt=""
        onClick={handleNext}
      />
      
      <div className="button-container">
        <button onClick={handlePrevious}>Previous</button>
        <button onClick={handleNext}>Next</button>
      </div>
      <div onClick={() => setShowTOC(!showTOC)}>Chapter: {chapterIndex} - Page: {pageIndex}</div>
      <Modal
        className="modal"
        isOpen={showTOC}
        onRequestClose={() => setShowTOC(false)}
      >
        <button onClick={() => setShowTOC(false)}>close</button>
        <TableOfContents toc={outline} setCAP={setChapterAndPage}/>
      </Modal>
    </div>
  );
}

export default App
