import { useEffect, useState } from 'react';
import styles from './layout.module.css';

const defaultUrl = 'https://rickandmortyapi.com/api/character';
const headerText = 'Rick And Morty Characters';

export default function Home(){
  const [results, setResults] = useState([]);
  const [curUrl, setCurUrl] = useState(defaultUrl);
  const [curPage, setCurPage] = useState(1);
  const [info, setInfo] = useState({});
  useEffect(() => {
    (async function getData() {
      const res = await fetch(curUrl);
      const data = await res.json();
      setResults(data.results);
      setInfo(data.info);
    })()
  }, [curUrl]);

  const handleOnClick = (e: any) => {
    if(isNaN(e.target.name)){
      setCurUrl(e.target.value)
      setCurPage((prev) => e.target.name === 'Back' ? prev - 1 : Number(prev) + 1);
    } else {
      setCurUrl(`${defaultUrl}?page=${e.target.value}`)
      setCurPage(e.target.value);
    }
  };

  return (
    <>
      <h1 className={styles.headerText}>
        <strong>{headerText}</strong>
      </h1>
      <div className={styles.imageList}>
        <ul>
          {results.map((result: {id: string; name: string; image: string;}) => {
            const {id, name, image} = result;
            return (
              <li key={id}>
                <img src={image} />
                <h3>{name}</h3>
              </li>
            )
          })}
        </ul>
      </div>
      <div className={styles.buttonArea}>
        <button onClick={handleOnClick} name='Back' value={info.prev} disabled={curPage === 1}>Back</button>
        {curPage <= 5 ? 
        [1,2,3,4,5].map((ele) => 
            <button small key={ele} onClick={handleOnClick} name={String(ele)} value={ele} disabled={curPage === ele}>{ele}</button>
        ) : info.pages - curPage < 5 ? 
        [info.pages - 4, info.pages - 3, info.pages - 2, info.pages - 1, info.pages].map((ele) => 
          <button key={ele} onClick={handleOnClick} name={String(ele)} value={ele} disabled={curPage === ele}>{ele}</button>
        ) : <>...
            {[curPage - 2, curPage - 1, curPage, Number(curPage) + 1, Number(curPage) + 2].map((ele) => 
            <button key={ele} onClick={handleOnClick} name={String(ele)} value={ele} disabled={curPage === ele}>{ele}</button>
            )}
            ...</>
        }
        <button onClick={handleOnClick} name='Next' value={info.next} disabled={Number(curPage) === info?.pages}>Next</button>
      </div>
    </>
  )
}