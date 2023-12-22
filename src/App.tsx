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
    setShowTOC(false);
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
        style={{
          overlay: {
            backgroundColor: "rgba(0, 0, 0, 0.5)", // dark semitransparent overlay
          },
          content: {
            backgroundColor: "#333", // dark background for the content
            color: "#fff", // white text
            maxWidth: "80%", // limit the width of the content
            maxHeight: "80%", // limit the height of the content
            margin: "auto", // center the content
            overflow: "auto", // hide the overflow
            position: "relative", // position the content relative to the overlay
            borderRadius: "10px", // round the corners of the content
            boxShadow: "0 0 10px rgba(0, 0, 0, 0.5)", // add a shadow effect
            top: "10%",
            
          },
        }}
      >
        <button onClick={() => setShowTOC(false)}>Close</button>
        <div className='modalContent'>
          <h2 className="heading">Table of Contents</h2>
          <TableOfContents toc={outline} setCAP={setChapterAndPage}/>
        </div>
      </Modal>
    </div>
  );
}

export default App
