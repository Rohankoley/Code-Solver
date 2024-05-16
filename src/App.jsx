import { useState, useEffect } from "react";
import fetchApi from "./Components/FetchData";
import "./App.css";

function App() {
  const [text, setText] = useState("");
  const [data, setData] = useState("");
  const [currentUrl, setCurrentUrl] = useState("");

  useEffect(() => {
    // Function to retrieve URL when component mounts or updates
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      const activeTab = tabs[0];
      const url = activeTab.url;
      const problemName = url.substring(
        url.indexOf("problems/") + 9,
        url.indexOf("/", url.indexOf("problems/") + 9)
      );
      // Complete code

      setCurrentUrl(problemName);
    });
  }, [currentUrl, setCurrentUrl]);

  const getCompletion = async () => {
    try {
      if (text === "") {
        const fetchData = `Give me an approach to solve this ${currentUrl}type of problem `;
        const result = await fetchApi(fetchData);
        setData(result);
      } else {
        const result = await fetchApi(text);
        setData(result);
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getCompletion();
  }, [text, setText]);

  return (
    <div>
      <div >
      <div >
        <h1 className="mb-4 text-3xl font-extrabold text-gray-900 dark:text-white md:text-5xl lg:text-6xl">
          <span className="text-transparent bg-clip-text bg-gradient-to-r to-emerald-600 from-sky-400">
            Code
          </span>{" "}
          Solver
        </h1>
        <div  className="relative w-[32rem]">
          <div className="relative w-full min-w-[200px] ">
            <textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              rows="8"
              
              className="peer h-full min-h-[100px] w-full !resize-none  rounded-[7px] border border-blue-gray-200 border-t-transparent bg-transparent px-3 py-2.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-gray-900 focus:border-t-transparent focus:outline-0 disabled:resize-none disabled:border-0 disabled:bg-blue-gray-50"
              placeholder=" "
            ></textarea>
            <label className="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px] font-normal leading-tight text-blue-gray-400 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[3.75] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-gray-900 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:!border-gray-900 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:!border-gray-900 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
              Enter Problem
            </label>
          </div>

          <div className="flex w-full justify-end  py-1.5">
            <div className="flex gap-2">
              <button
                onClick={getCompletion}
                className="select-none rounded-md bg-gray-900 py-2 px-4 text-center align-middle font-sans text-xs font-bold uppercase text-white shadow-md shadow-gray-900/10 transition-all hover:shadow-lg hover:shadow-gray-900/20 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                type="button"
              >
                Submit
              </button>
            </div>
          </div>
        </div>
       
      </div>
      </div>
      
      <div  >
          {data ? (
            <div className="answer-box bg-blue-800 text-white  border-2 border-solid border-blue-950 rounded-lg  ">
              {data}
            </div>
          ) : (
            <div className="loader"></div>
          )}
        </div>
    </div>
  );
}

export default App;
