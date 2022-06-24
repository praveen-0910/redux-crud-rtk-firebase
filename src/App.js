import "./App.css";
import { toast, ToastContainer } from "react-toastify";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import AddEditBlog from "./pages/AddEditBlog";
import BlogDetail from "./pages/BlogDetail";
import Navbar from "./components/Navbar";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <div className="App">
      <Navbar />
      <ToastContainer position="top-center" autoClose={5000} />
      <Routes>
        <Route index element={<Home />} />
        <Route path="/create" element={<AddEditBlog />} />
        <Route path="/update/:id" element={<AddEditBlog />} />
        <Route path="/detail/:id" element={<BlogDetail />} />
      </Routes>
    </div>
  );
}

export default App;
