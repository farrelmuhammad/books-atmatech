import { useState } from 'react';
import { useSelector } from 'react-redux';
import './App.css';
import Login from './pages/Login';
import RouteApp from './routes';

function App() {
  const [open, setOpen] = useState(true);

  const isLoggedIn = useSelector(state => state.auth.token);

  function logout() {
    localStorage.removeItem("token");
  }

  const Menus = [
    {
      title: "Dashboard",
      src: "https://raw.githubusercontent.com/Sridhar-C-25/sidebar_reactTailwind/main/src/assets/Chart_fill.png",
    },
    {
      title: "Books",
      src: "https://raw.githubusercontent.com/Sridhar-C-25/sidebar_reactTailwind/main/src/assets/Folder.png",
    },
    {
      title: "Users",
      src: "https://raw.githubusercontent.com/Sridhar-C-25/sidebar_reactTailwind/main/src/assets/User.png",
    },
    {
      title: "Logout",
      src: "https://raw.githubusercontent.com/Sridhar-C-25/sidebar_reactTailwind/main/src/assets/Setting.png",
    },
  ];

  return (
    <>
      {isLoggedIn ? (
        <div className="flex">
          <div
            className={`${open ? "w-72" : "w-20"
              } duration-300 h-screen p-5 pt-8 bg-dark-purple relative`}
          >
            <img
              src="https://raw.githubusercontent.com/Sridhar-C-25/sidebar_reactTailwind/main/src/assets/control.png"
              className={`absolute cursor-pointer rounded-full -right-3 top-9 w-7 border-2 border-dark-purple ${!open && "rotate-180"
                }`}
              onClick={() => setOpen(!open)}
              alt=""
            />
            <div className="flex gap-x-4 items-center">
              <img
                src="https://raw.githubusercontent.com/Sridhar-C-25/sidebar_reactTailwind/main/src/assets/logo.png"
                className={`cursor-pointer duration-500 ${open && "rotate-[360deg]"}`}
                alt=""
              />
              <h1
                className={`text-white origin-left font-medium text-xl duration-300 ${!open && "scale-0"
                  }`}
              >
                Book Store
              </h1>
            </div>
            <ul className="pt-6">
              {Menus.map((menu, index) => (
                <li
                  key={index}
                  className={`text-gray-300 text-sm flex items-center gap-x-4 cursor-pointer p-2 hover:bg-light-white rounded-md mt-2 ${index === 0 && "bg-ligth-white"}`}

                >
                  <img src={menu.src} alt="" />
                  <span className={`${!open && "hidden"} origin-left duration-200`}>{menu.title}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="p-7 text-2xl font-semibold flex-1 h-screen">
            <RouteApp />
          </div>
        </div>
      ) : (
        <Login />
      )}
    </>
  );
}

export default App;
