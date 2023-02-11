import { Routes, Route } from "react-router-dom";
import Login from "@/routes/Login";
import Home from "@/routes/Home";
import Navbar from "@/components/Navbar";
import LayoutRequireAuth from "@/components/layouts/LayoutRequireAuth";
import Register from "@/routes/Register";
import { useContext } from "react";
import { UserContext } from "@/context/UserProvider";
import LayoutContainerForm from "@/components/layouts/LayoutContainerForm";
import Perfil from "@/routes/Perfil";
import NotFound from "./routes/NotFound";

function App() {
  const { user } = useContext(UserContext);

  if (user === false) {
    return <p>Loading...</p>;
  }

  return (
    <>
      <Navbar />

      <Routes>
        <Route path="/" element={<LayoutRequireAuth />}>
          <Route index element={<Home />} />
          <Route path="perfil" element={<Perfil />} />
        </Route>

        <Route path="/" element={<LayoutContainerForm />}>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/register" element={<Register />}></Route>
        </Route>

        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;
