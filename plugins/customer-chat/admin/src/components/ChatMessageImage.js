import React, { useEffect, useState } from 'react';

const ChatMessageImage = (props) => {
  const [state, setState] = useState({
    url: null,
    isLoaded: false
  });

  const fetchUrl = async () => await props.message.media.getContentTemporaryUrl(props.message.state.media.state);

  const setUrl = async () => {
    const url = await fetchUrl();
    setState(prevState => ({ ...prevState,  url: url }))
  };

  const handleComponentOnMount = () => setUrl();

  const handleOnLoad = () => setState(prevState => ({ ...prevState, isLoaded: true }));

  useEffect(() => {
    handleComponentOnMount();
  }, []);

  return (
    <div className="overflow-hidden rounded-3xl mt-1" style={{ width: 150, height: 225 }}>
      <img
        style={{ opacity: state.isLoaded ? 1 : 0, width: '100%', height: '100%', objectFit: 'cover' }}
        src={state.url}
        alt='image-from-user'
        onLoad={handleOnLoad}
      />
    </div>
  );
};
 
export default ChatMessageImage;