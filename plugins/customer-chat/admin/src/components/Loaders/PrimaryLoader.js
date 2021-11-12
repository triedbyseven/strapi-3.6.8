import React from 'react';

const PrimaryLoader = () => {
  return(
    <div className="flex w-full h-full justify-center items-center">
      <svg className="animate-spin -ml-1 mr-3 h-16 w-16 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="#9333EA" strokeWidth="4"></circle>
        <path className="opacity-75" fill="#9333EA" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
      </svg>
    </div>
  )
};

export default PrimaryLoader;