import axios from "axios";
import React from "react";
import { useState } from "react";

const Dashboard = () => {
  const [keyword, setKeyword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [response, setResponse] = useState("")
  const fetchQuote = () => {
    setLoading(true);
    axios
      .get(`https://quotes-api-ejd0.onrender.com/quote?keyword=${keyword}`)
      .then((res) => {
        console.log(res.data.quote);
        setResponse(res.data.quote)
        setLoading(false);
      })
      .catch((err) => {
          setLoading(false);
          setResponse(err.response.data.error.message)
        setError(true);
        console.log(err.response.data.error.message);
      });
  };

  console.log(response)
  return (
    <div className="h-screen gap-5 bg-gradient-to-r p-6 from-cyan-500 to-blue-500 flex flex-col items-center">
       
      
      <h1 className="text-[40px] text-white font-bold font-serif">
        Generate Quote
      </h1>
      <div className="flex space-x-3">
        <input
          type="text"
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          className="p-2 w-96 rounded-lg text-md"
          placeholder="Enter Keyword"
        />
        <button
          onClick={fetchQuote}
          className="bg-pink-400 text-md p-1 pl-3 pr-3 text-white font-bold rounded-lg"
        >
          Submit
        </button>
      </div>

      <div className=" border flex justify-end items-center p-6 h-[100vh] w-2/5 rounded-3xl relative bg-[url('https://i.pinimg.com/564x/fa/79/42/fa7942a46ef8a06f6aabbbd77d55f8f1.jpg')] bg-no-repeat bg-cover bg-blend-multiply">
        <div className="h-56 text-md font-medium italic font-cursive  w-[60%] flex justify-center items-right  ">
          <p className={error ? "text-red-600": "text-black" }>{loading ? "Loading...": error ? `Opps 😲 ! ${response}` : response}</p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
