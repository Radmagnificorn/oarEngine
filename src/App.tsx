import { useEffect, useState } from 'react'
import './App.css'
import { Comic } from './ComicOutline';

function App() {
  const [outline, setOutline] = useState<Comic>(new Comic());
  const [chapterIndex, setChapterIndex] = useState<number>(0);
  const [pageIndex, setPageIndex] = useState<number>(0);

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

  const handleNext = () => {
    setPageIndex((pageIndex + 1) % outline.chapters[chapterIndex]?.pages.length);
  };

  const handlePrevious = () => {
    setPageIndex((pageIndex - 1 + outline.chapters[chapterIndex]?.pages.length) % outline.chapters[chapterIndex]?.pages.length);
  };

  return (
    <div className="image-container">
      
      <img
        src={`comic/${outline.chapters[chapterIndex]?.directory}/${outline.chapters[chapterIndex]?.pages[pageIndex]}`}
        alt=""
        onClick={handleNext}
        style={{ width: '100%', cursor: 'pointer' }}
      />
      
      <div className="button-container">
        <button onClick={handlePrevious}>Previous</button>
        <button onClick={handleNext}>Next</button>
      </div>
    </div>
  );
}

export default App
