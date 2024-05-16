import {useState,useEffect } from 'react'
import fetchApi from './Components/FetchData'
import './App.css'

function App() {
  const [text, setText] = useState('')
  const [data,setData] = useState('')
  const [currentUrl, setCurrentUrl] = useState('');


  
  useEffect(() => {
    // Function to retrieve URL when component mounts or updates
    chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
      const activeTab = tabs[0];
      const url = activeTab.url;
      const problemName = url.substring(url.indexOf("problems/") + 9, url.indexOf("/", url.indexOf("problems/") + 9));
      // Complete code
   
      setCurrentUrl(problemName);
    });
   

  }, [currentUrl, setCurrentUrl]);

  const getCompletion = async ()=>{
    try {
      if(text===""){
        const fetchData = `Give me an approach code to ${currentUrl} solve type of problem `
        const result = await fetchApi(fetchData);
        setData(result)
      }else{
        const result = await fetchApi(text);
        setData(result)
        
      }

    } catch (error) {
      console.log(error)
    }
  
  }
useEffect(()=>{
  getCompletion()
},[text, setText])



  return (
    <div>
      <p >Leetcode Gpt</p>
      <textarea  value={text} onChange={(e)=>setText(e.target.value)}/>
    <button  onClick={getCompletion}>Submit</button>
    {data?<div className='answer-box' >
      {data}
    </div>:null}


    </div>
  )
}

export default App



