import { BrowserRouter, Route, Routes } from "react-router-dom";
import Main from "./pages/main/Main";
import Room from "./pages/room/Room";
import NotFound from "./pages/not-found/NotFound";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/room/:id" element={<Room />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
