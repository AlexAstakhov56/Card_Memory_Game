import { FC } from "react";
import { NavLink } from "react-router-dom";

const MainMenu: FC = () => {
  return (
    <div className="text-center translate-y-[200px]">
      <h1 className="text-6xl font-bold my-5 text-yellow-400">
        Card Memory Game
      </h1>
      <p className="text-3xl my-3 font-semibold text-gray-900">
        By Alexey Astakhov
      </p>
      <NavLink
        to="/game"
        className="text-4xl text-white px-7 py-2 inline-block cursor-pointer hover:bg-red-500 transition-colors duration-200 my-3 rounded-xl border border-black bg-red-600"
      >
        Start
      </NavLink>
    </div>
  );
};

export default MainMenu;
