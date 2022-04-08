import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Speaker from "./pages/Speaker";
import SignIn from "./pages/SignIn";
import Category from "./pages/Category";
import CategoryCreate from "./pages/Category/create";
import CategoryEdit from "./pages/Category/edit";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <br />
      <Routes>
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/categories" element={<Category />} />
        <Route path="/categories/create" element={<CategoryCreate />} />
        <Route path="/categories/edit/:categoryId" element={<CategoryEdit />} />
        <Route path="/speakers" element={<Speaker />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
