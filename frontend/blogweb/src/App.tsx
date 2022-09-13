import { Route, Routes } from "react-router-dom";
import NavBar from "./components/NavBar";
import BlogDetail from "./pages/BlogDetail";
import Home from "./pages/Home";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";

function App() {
  return (
    <>
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/blogdetail" element={<BlogDetail />} />
      </Routes>
    </>
  );
}

export default App;
