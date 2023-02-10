import { Routes, Route } from "react-router-dom";
import Login from "@/routes/Login";
import Home from "@/routes/Home";
import Navbar from "@/components/Navbar";
import RequireAuth from "@/components/RequireAuth";
import Register from "@/routes/Register";
import { useContext } from "react";
import { UserContext } from "@/context/UserProvider";

function App() {
  const { user } = useContext(UserContext);

  if (user === false) {
    return <p>Loading...</p>;
  }

  return (
    <>
      <Navbar />
      <h1 className="text-center text-red-500">ingravity roller app</h1>
      <Routes>
        <Route
          path="/"
          element={
            <RequireAuth>
              <Home />
            </RequireAuth>
          }
        ></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/register" element={<Register />}></Route>
      </Routes>
    </>
  );
}

export default App;
