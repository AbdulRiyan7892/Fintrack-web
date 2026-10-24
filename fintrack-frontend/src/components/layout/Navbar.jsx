import "./Navbar.css";
import { FaBell, FaUserCircle } from "react-icons/fa";

function Navbar() {


  const today = new Date().toLocaleDateString("en-IN", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <header className="flex h-20 items-center justify-between border-b bg-white px-8 shadow-sm">

      <div>


        <p className="text-sm text-slate-500">
          {today}
        </p>
      </div>

      <div className="flex items-center gap-6">

        <button className="relative rounded-full bg-slate-100 p-3 hover:bg-slate-200">
          <FaBell size={20} />

          <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-red-500"></span>
        </button>

        <div className="flex items-center gap-3">

          <FaUserCircle
            size={42}
            className="text-blue-600"
          />

          <div>
            <h2 className="font-semibold text-slate-700">
              {userName}
            </h2>

            <p className="text-sm text-slate-500">
              Personal Account
            </p>
          </div>

        </div>

      </div>

    </header>
  );
}

export default Navbar;
