import React, { useState } from "react";

function Uploader() {
  const [image, setImage] = useState(null);
  const [fileNmae, setFileName] = useState("no selected file");
  const handleClick = () => {
    const inputField = document.querySelector(".input-field");
    if (inputField) {
      const clickEvent = new MouseEvent("click", {
        bubbles: true,
        cancelable: true,
        view: window,
      });
      inputField.dispatchEvent(clickEvent);
    }
  };

  return (
    <div className="flex justify-center items-center">
      <main>
        <form
          onClick={handleClick}
          className="flex flex-col justify-center items-center border-dashed border-2 border-[#1475cf]  min-h-[100px] min-w-[300px] h-auto w-auto cursor-pointer"
        >
          <input type="file" accept="image/*" className="input-field" hidden 
           onChange={({target: {files}}) =>{
            files[0] && setFileName(files?[0].name)

            if(files){
                setImage(URL.createObjectURL(files[0]))
            }
           }}
          />

          {image ? 
            <img src={image} className="min-h-[100px] " /> : <div>dsf</div> 
        }
        </form>
      </main>
    </div>
  );
}

export default Uploader;
