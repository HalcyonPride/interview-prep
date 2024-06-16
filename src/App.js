import './App.css';

import { useRef, useState } from 'react';

function App() {
  const [ query, setQuery ] = useState('');
  const [ results, setResults ] = useState([]);
  const timeoutRef = useRef(undefined);

  async function getGifResponse(query) {
    const response = await fetch(`http://api.giphy.com/v1/gifs/search?api_key=AUuOT9zg9FLY3gIQDIH3IKRrktROVIyL&q=${query}&limit=10`);
    return await response.json();
  }

  async function handleInputChange(newQuery) {
    setQuery(newQuery);
    if (!newQuery) {
      setResults([]);
    }
    else if (newQuery !== query) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = window.setTimeout(async () => {
        const response = await getGifResponse(newQuery);
        setResults(response.data.map((gif) => gif.images.original.url));
      }, 300);
    }
  };

  return (
    <div className="App">
      <div className='InputField'>
        <input value={ query } onChange={ (event) => handleInputChange(event.target.value) }/>
      </div>
      <div className='GifResults'>
        <ul>
          { results.map((result) => (
            <li>
              <div className='GifDiv'>
                <img src={ result }/>
              </div>
            </li>
          )) }
        </ul>
      </div>
    </div>
  );
}

export default App;
