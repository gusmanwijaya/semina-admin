/* eslint-disable react-hooks/exhaustive-deps */
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Speaker from "./pages/Speaker";
import SignIn from "./pages/SignIn";
import Category from "./pages/Category";
import CategoryCreate from "./pages/Category/create";
import CategoryEdit from "./pages/Category/edit";
import SpeakerCreate from "./pages/Speaker/create";
import SpeakerEdit from "./pages/Speaker/edit";
import { listen } from "./redux/listener";
import { useEffect } from "react";
import { useState } from "react";
import jwtDecode from "jwt-decode";
import { useSelector } from "react-redux";
import Event from "./pages/Event";

function App() {
  const [payload, setPayload] = useState({});
  const auth = useSelector((state) => state.auth);

  useEffect(() => {
    if (auth.token !== null) {
      const payloadDecode = jwtDecode(auth?.token);
      setPayload(payloadDecode);
    }

    listen();
  }, [auth.token]);

  return (
    <BrowserRouter>
      {auth.token !== null && <Navbar payload={payload} />}
      <br />
      <Routes>
        <Route index element={<SignIn />} />
        <Route path="/category" element={<Category />} />
        <Route path="/category/create" element={<CategoryCreate />} />
        <Route path="/category/edit/:categoryId" element={<CategoryEdit />} />

        <Route path="/speaker" element={<Speaker />} />
        <Route path="/speaker/create" element={<SpeakerCreate />} />
        <Route path="/speaker/edit/:speakerId" element={<SpeakerEdit />} />

        <Route path="/event" element={<Event />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
