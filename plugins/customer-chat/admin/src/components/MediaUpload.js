import React, { useRef } from 'react';

const MediaUpload = (props) => {
  const ref = useRef(null);

  const triggerInputFile = () => ref.current.click();

  const onFilechange = (e) => {
    console.log(e.target.files);
    if (e.target.files.length === 0) return;
    props.setMedia(e.target.files[0]);
    ref.current.value = '';
  };

  return ( 
    <div onClick={triggerInputFile} style={{ marginTop: -4 }}>
      <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" viewBox="0 0 20 20" fill="#BBBBBB">
        <path d="M2 6a2 2 0 012-2h5l2 2h5a2 2 0 012 2v6a2 2 0 01-2 2H4a2 2 0 01-2-2V6z" fill="#BBBBBB" stroke="#BBBBBB" />
      </svg>
      <input
        ref={ref}
        style={{ display: 'none' }}
        type="file"
        onChange={onFilechange}
      />
    </div>
  );
}
 
export default MediaUpload;