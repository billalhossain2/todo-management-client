import React, { useState } from "react";

const Priority = ({title, current, setCurrent}) => {
  const handleActive = (e)=>{
    setCurrent(e.target.innerText)
}
  return (
      <p onClick={handleActive} className={`btn  hover:text-[#9500ff] hover:bg-white border-2 border-solid border-white ${title===current ? "bg-white text-[#9500ff]" : 'bg-transparent text-white'}`}>
        {title}
      </p>
  );
};

export default Priority;
