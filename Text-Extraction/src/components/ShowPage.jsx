// ShowPage.jsx

import React from 'react';
import './ShowPage.css'; // Importing the CSS file for styling

const ShowPage = ({ data }) => {
    data =  data.substring(1 , data.length-1) ;   
    let arr = data.split("\\n") ; 
    console.log(arr) ;
    let val = arr.map((data)=> <p className="formatted-data">{data}</p>
    );
  return (
    <div className="show-page-container">
        <p className='gen-head'>Generated Result</p>
        <hr />
      <div className="data-container">
        {val}
      </div>
    </div>
  );
};

export default ShowPage;
