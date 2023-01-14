import React from "react";

const Sidebar = () => {
  return (
    <>
      <div className="flex">
        <div className={"w-72 h-screen bg-dark-purple"}>
          <img
            src="https://raw.githubusercontent.com/Sridhar-C-25/sidebar_reactTailwind/main/src/assets/control.png"
            className="absolute cursor-pointer -right-3 top-9 w-7 border-2 border-dark-purple"
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
