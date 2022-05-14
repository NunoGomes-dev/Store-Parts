import { BrowserRouter, Routes, Route } from "react-router-dom";
import { EditPart, Dashboard } from "./pages";

const RenderRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/parts/:name/:type/:price" element={<EditPart />} />
      </Routes>
    </BrowserRouter>
  );
};

export default RenderRoutes;
