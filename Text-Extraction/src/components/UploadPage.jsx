import React, { useState } from 'react';
import './UploadPage.css'
import ShowPage from './ShowPage';
import { OpenAI } from "@langchain/openai";

console.log(import.meta.env.VITE_OPENAI_API_KEY)

const model = new OpenAI({
  openAIApiKey: import.meta.env.VITE_OPENAI_API_KEY 
});

async function LangChain(question){
  let ans  = ""
  try{
    let PureExtractedQuestion = question.extractedText +" , Explain This is In Form Of bullet Points" ;
    console.log(PureExtractedQuestion)
    ans  =  await model.invoke(PureExtractedQuestion); 
    return ans  ;
  }catch(e){
      console.log(e) ; 
  }
}

function UploadPage() {    
    const [extractedText, setExtractedText] = useState('');
    const [ans , setAns] = useState(""); 
    const handleUpload = () => {
        const fileInput = document.getElementById('inpFile');
        const formData = new FormData();
        formData.append('pdfFile', fileInput.files[0]);

        fetch('http://localhost:3050/extract-text', { // Change the URL here
            method: 'post',
            body: formData
        })
        .then(response => response.text())
        .then(extractedText => {
            setExtractedText(extractedText);
        })
        .catch(error => {
            console.error('Error:', error);
        });
    };
    //for handling request  .
    async function reqs(question){
        const answer = await LangChain(question) ; 
        setAns(answer); 
    }
    return (
        <div>
            <div className="container">
                <input className='inp-btn' type="file" id="inpFile" />
                <button type="button" id="btnUpload" onClick={handleUpload}>Upload PDF 📑</button>
                <br />
                <br />
                <textarea 
                    style={{ width: '400px', height: '180px' }}
                    id="resultText"
                    placeholder="Your PDF text will appear here..."
                    value={extractedText}
                />
            </div>
            <button  className='btn-gen' onClick={()=>reqs({extractedText})} >Generate Enriched Data 😎</button>
            <ShowPage data={JSON.stringify(ans)}/>
        </div>
    );
}
export default UploadPage;

