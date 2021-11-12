const containerClasses = `
  relative flex flex-row px-8 justify-center items-center
`;

const containerStyle = (isCurrentConversation) => ({
  height: 96,
  borderBottom: 1,
  borderBottomStyle: 'solid',
  borderBottomColor: '#F2F2F2',
  backgroundColor: isCurrentConversation ? '#F1F3F9' : '#FFF'
});

const chatHeadingClasses = `text-lg font-semibold`;

const chatHeadingStyle = {
  fontSize: 16,
  marginBottom: 5
};

const chatSubHeadingClasses = `text-gray-500`;

const chatSubHeadingStyle = {
  fontSize: 14
};

const chatMarkerContainerStyle = {
  position: 'absolute',
  display: 'flex',
  alignItems: 'center',
  top: 0,
  left: 0,
  width: 4,
  height: '100%'
};

const chatMarkerStyle = {
  width: '100%',
  height: 56,
  backgroundColor: '#3F3697',
  borderRadius: 33
};

export default { 
  containerClasses,
  chatHeadingClasses,
  chatSubHeadingClasses,
  containerStyle,
  chatHeadingStyle,
  chatSubHeadingStyle,
  chatMarkerContainerStyle,
  chatMarkerStyle
};