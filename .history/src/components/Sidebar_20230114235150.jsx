import React, { useState } from "react";

const Sidebar = () => {
  const [open, setOpen] = useState(true);
  return (
    <>
      <div className="flex">
        <div
          className={`${
            open ? "w-72" : "w-20"
          } duration-300 h-screen bg-dark-purple relative`}
        >
          <img
            src="https://raw.githubusercontent.com/Sridhar-C-25/sidebar_reactTailwind/main/src/assets/control.png"
            className={`absolute cursor-pointer rounded-full -right-3 top-9 w-7 border-2 border-dark-purple ${!open && "rotate-100"}`}
            onClick={() => setOpen(!open)}
            alt=""
          />
        </div>
        <div className="p-7 text-2xl font-semibold flex-1 h-screen">
          Home Page
        </div>
      </div>
    </>
  );
};

export default Sidebar;
