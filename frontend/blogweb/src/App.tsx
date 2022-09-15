import { Route, Routes } from "react-router-dom";
import NavBar from "./components/NavBar";
import PostDetail from "./pages/PostDetail";
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
        <Route path="/postdetail/:postId" element={<PostDetail />} />
      </Routes>
    </>
  );
}

export default App;
