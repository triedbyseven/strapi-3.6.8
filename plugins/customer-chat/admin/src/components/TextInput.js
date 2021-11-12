import React, { useState } from 'react';
import MediaUpload from './MediaUpload';

const TextInput = (props) => {
  const [state, setState] = useState("");
  const [media, setMedia] = useState({
    size: null,
    type: '',
    name: '',
    lastModified: null,
    lastModifiedDate: null,
    webkitRelativePath: ''
  });
  const [isSendingMessage, setIsMessageSending] = useState(false);

  const handleOnCancel = () => setMedia({
    size: null,
    type: '',
    name: '',
    lastModified: null,
    lastModifiedDate: null,
    webkitRelativePath: ''
  });

  const handleOnChange = (event) => setState(event.target.value);

  const handleOnKeyDown = async (event) => {
    if (event.key === 'Enter') {
      try {
        if (!state) return;

        setIsMessageSending(true);

        if (media.name) await props.sendMessage({ contentType: media.type, media: media });
        await props.sendMessage(state);

        setState("");
        setMedia({
          size: null,
          type: '',
          name: '',
          lastModified: null,
          lastModifiedDate: null,
          webkitRelativePath: ''
        });
        setIsMessageSending(false);
      } catch (error) {
        console.error(error);
        setIsMessageSending(false);
      }
    }
  };

  const handleOnClick = async () => {
    try {
      if ( !state ) return;

      setIsMessageSending(true);

      if ( media.name ) await props.sendMessage({ contentType: media.type, media: media });
      await props.sendMessage(state);

      setState("");
      setMedia({
        size: null,
        type: '',
        name: '',
        lastModified: null,
        lastModifiedDate: null,
        webkitRelativePath: ''
      });
      setIsMessageSending(false);
    } catch (error) {
      console.error(error);
      setIsMessageSending(false);
    }
  };

  return (
    <div className="relative flex items-center py-3" style={{ backgroundColor: '#FFF', paddingLeft: 50, paddingRight: 50 }}>
      <MediaUpload media={media} setMedia={setMedia}/>
      <div style={{ width: '100%'}}>
        {media.name ? (
          <div className="shadow-lg" style={{ position: 'absolute', top: -25, left: 6, backgroundColor: '#FFF', paddingTop: '0.25rem', paddingBottom: '0.25rem', paddingLeft: '0.25rem', paddingRight: '0.25rem', borderRadius: 12 }}>
            <div style={{ overflow: 'hidden', width: 50, height: 50, borderRadius: 12, marginTop: -1 }}>
              <img style={{ borderRadius: 12, overflow: 'hidden', width: '100%', height: '100%', objectFit: 'cover'  }} src={URL.createObjectURL(media)} alt='upload-preview' />
            </div>
            <button onClick={handleOnCancel} style={{ position: 'absolute', top: -10, left: -10 }}>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" viewBox="0 0 20 20" fill="#BBBBBB">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" fill="#BBBBBB" stroke="#BBBBBB" />
              </svg>
            </button>
          </div>
        ) : null }
        <input
          className="w-full bg-white py-5 px-3 mb-2 rounded-xl outline-none text-2xl placeholder-gray-500::placeholder"
          style={{ color: '#111827', flex: 0.25, height: '20%' }}
          type="text"
          placeholder="Write a message..."
          onKeyDown={handleOnKeyDown}
          onChange={handleOnChange}
          value={state}
        />
      </div>
      <div style={{ marginLeft: 16 }}>
        <button 
          onClick={handleOnClick} 
          style={{ width: 48, height: 48, borderRadius: 300 }} 
          type="button" 
          className="flex justify-center items-center bg-purple-600 bg-opacity-75 text-white font-semibold shadow-md focus:outline-none transform rotate-90" 
          disabled={!state ? true : false}
          tabIndex="-1"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" viewBox="0 0 20 20" fill="currentColor">
            <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
          </svg>
        </button>
      </div>
      {isSendingMessage ? (
        <div className="flex items-center justify-center" style={{ position: 'absolute', top: 0, left: 0, width:'100%', height: '100%', backgroundColor: '#F1F3F9', opacity: 0.75 }}>
          <div className="flex items-center justify-center shadow-lg px-4 py-2" style={{ color: '#3F3697', backgroundColor: '#FFF', borderRadius: 12 }}>
            Sending message... <span>
              <svg className="animate-spin ml-3 h-8 w- text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="#9333EA" strokeWidth="4"></circle>
                <path className="opacity-75" fill="#9333EA" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
            </span>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default TextInput;