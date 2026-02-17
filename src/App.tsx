import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import NotFound from "./pages/NotFound";
import { AppLayout } from "./components/AppLayout";
import Components from "./pages/Components";
import Forms from "./pages/Forms";
import FormArray from "./pages/FormArray";
import Templates from "./pages/Templates";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AppLayout />}>
          <Route path="/" element={<Navigate to="/components" replace />} />
          <Route path="/components" element={<Components />} />
          <Route path="/templates" element={<Templates />} />
          <Route path="/forms" element={<Forms />} />
          <Route path="/formarray" element={<FormArray />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
