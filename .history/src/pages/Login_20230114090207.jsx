import React from "react";

const Login = () => {
  return (
    <>
      <section className="bg-gray-50 min-h-screen flex items-center justify-center">
        <div className="bg-gray-100 flex rounded-2xl shadow-lg max-w-3xl p-5">
          <div className="sm:w-1/2 mt-16 px-16">
            <h2 className="font-bold text-2xl">Login</h2>
            <p className="text-sm mt-4">
              If you already a member, easily log in
            </p>

            <form action="" className="flex flex-col gap-4">
              <input className="p-2 mt-8 rounded-xl border" type="text" name="email" placeholder="email" />
              <input className="p-2 rounded-xl border" type="password" name="password" placeholder="password" />
              <button className="bg-[#998E90] rounded-xl py-2 text-white font-bold tracking-wide">Login</button>
            </form>
          </div>
          <div className="sm:block hidden w-1/2">
            <img
              className="rounded-2xl"
              src="https://images.unsplash.com/photo-1608099269227-82de5da1e4a8?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=385&q=80"
              alt=""
            />
          </div>
        </div>
      </section>
    </>
  );
};

export default Login;
