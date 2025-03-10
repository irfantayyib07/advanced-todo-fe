import React from "react";

function Header({}) {
 // console.log("Header rendered");

 return (
  <>
   <div className="min-h-16 max-h-16 bg-stone-300 w-full flex items-center px-6 py-3 uppercase font-semibold">
    Task Manager
   </div>
  </>
 );
}

export default Header;
