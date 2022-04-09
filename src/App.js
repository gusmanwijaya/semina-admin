import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Speaker from "./pages/Speaker";
import SignIn from "./pages/SignIn";
import Category from "./pages/Category";
import CategoryCreate from "./pages/Category/create";
import CategoryEdit from "./pages/Category/edit";
import { listen } from "./redux/listener";
import { useEffect } from "react";

function App() {
  useEffect(() => {
    listen();
  }, []);

  return (
    <BrowserRouter>
      <Navbar />
      <br />
      <Routes>
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/category" element={<Category />} />
        <Route path="/category/create" element={<CategoryCreate />} />
        <Route path="/category/edit/:categoryId" element={<CategoryEdit />} />
        <Route path="/speaker" element={<Speaker />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
