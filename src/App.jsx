import { GoogleGenerativeAI } from "@google/generative-ai";
import { useState } from "react";
function App() {
  const [input, setInput]=useState('');
  const [chat, setChat]=useState([]);
  const API_KEY = 'AIzaSyC63OloiiJLNP0Y7Q_poKBKDJUY67n945c';
  console.log("API Key:", import.meta.env.VITE_GEMINI_API_KEY);
  console.log("API Key:", API_KEY);
  const handleInput= async()=>{

    try{
      const genAI = new GoogleGenerativeAI(API_KEY);
      const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });
  
      const prompt = input;
  
      const result = await model.generateContent(prompt);
      console.log(result.response.text());
      setChat([...chat,{
        userText:input,
        aiText:result.response.text(),

      },
    ])
    }
    catch(error){
      console.log(error);
    }
    setInput('');
   

  }

  return (
    <>
      <div className='max-h-screens flex flex-col justify-center items-center'>
        <div className="chat h-3/4">
          {
            chat.map((val, id)=>(
              <div key={id}>
                <h2 className="text-2xl text-gray-500">{val.userText}</h2>
                <p className="text-2xl text-blue-700 text-justify">{val.aiText}</p>
              </div>
            ))
          }
        </div>
        <div className="input my-5 fixed bottom-0">
        <input type="text" placeholder='Ask me Something' className="text-3xl rounded-2xl py-5" value={input} onChange={(e)=>setInput(e.target.value)}/>
        <button className="bg-black text-white p-5 text-center text-2xl rounded-4xl" onClick={handleInput}>Send</button>
        <button className="bg-black text-white p-5 text-center text-2xl rounded-4xl" onClick={()=>setChat([])}>Clear Chat</button>

        </div>
      </div>
    </>
  )
}

export default App
