import React, { useState } from "react";

const Sidebar = () => {
  const [open, setOpen] = useState(true);
  return (
    <>
      <div className="flex">
        <div
          className={`${
            open ? "w-72" : "w-20"
          } duration-300 h-screen p-5 pt-8 bg-dark-purple relative`}
        >
          <img
            src="https://raw.githubusercontent.com/Sridhar-C-25/sidebar_reactTailwind/main/src/assets/control.png"
            className={`absolute cursor-pointer rounded-full -right-3 top-9 w-7 border-2 border-dark-purple ${!open && "rotate-180"}`}
            onClick={() => setOpen(!open)}
            alt=""
          />
          <div className="flex gap-x-4 items-center">
            <img
             src="https://raw.githubusercontent.com/Sridhar-C-25/sidebar_reactTailwind/main/src/assets/logo.png" 
             className={`cursor-pointer duration-500`}
             alt=""
              />
              <h1 className={`text-white origin-left font-medium text-cl duration-300 ${!open && "scale-0"}`}>Designer</h1>
          </div>
        </div>
        <div className="p-7 text-2xl font-semibold flex-1 h-screen">
          Home Page
        </div>
      </div>
    </>
  );
};

export default Sidebar;
