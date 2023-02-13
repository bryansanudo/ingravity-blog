import React, { useContext } from "react";
import { Link, NavLink } from "react-router-dom";
import { UserContext } from "@/context/UserProvider";
import ingravityLogo from "@/assets/ingravityLogo.png";
import rollerLogo from "@/assets/rollerLogo.png";

const Navbar = () => {
  const { user, signOutUser } = useContext(UserContext);

  const handleClickLogout = async () => {
    try {
      await signOutUser();
    } catch (error) {
      console.log(error.code);
    }
  };

  const classButton =
    "bg-gradient-to-r from-thOrange to-thBlue py-2 px-6 text-black rounded-lg duration-300 hover:scale-110";

  return (
    <nav className="w-full h-24 bg-black text-white">
      <div className="container flex  justify-center items-center mx-auto gap-4 p-5">
        <a href="">
          <img
            src={ingravityLogo}
            className="rounded-full object-cover w-16 h-16  shadow-thOrange hover:scale-110 duration-300 shadow-lg"
          />
        </a>
        <a href="">
          <img
            src={rollerLogo}
            className="rounded-full object-cover w-16 h-16 hover:scale-110 duration-300 shadow-lg shadow-thBlue"
          />
        </a>

        <div className="flex gap-2">
          {user ? (
            <>
              <NavLink to="/" className={classButton}>
                Inicio
              </NavLink>
              <button onClick={handleClickLogout} className={classButton}>
                Logout
              </button>
            </>
          ) : (
            <>
              <NavLink to="/login" className={classButton}>
                Entrar
              </NavLink>
              <NavLink to="/register" className={classButton}>
                Registrate
              </NavLink>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
