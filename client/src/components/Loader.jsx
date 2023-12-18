import React from "react";

const Loader = () => {
  return (
    <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-800 bg-opacity-75 z-50">
      <div className="loader ease-linear rounded-full border-t-8 border-pink-400 h-32 w-32 animate-spin"></div>
    </div>
  );
};

export default Loader;



//import React from "react";

//const Loader = () => {
//  return (
//    <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-800 bg-opacity-75 z-50">
//      <div className="loader ease-linear rounded-full border-8 border-t-8 border-gray-200 h-32 w-32"></div>
//    </div>
//  );
//};

//export default Loader;
