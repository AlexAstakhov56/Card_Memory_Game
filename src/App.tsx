import { FC } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Game from "./components/Game";
import MainMenu from "./components/MainMenu";

const App: FC = () => {
  return (
    <BrowserRouter>
      <div className="h-screen container">
        <Routes>
          <Route path="/" element={<MainMenu />} />
          <Route path="/game" element={<Game />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
};

export default App;
