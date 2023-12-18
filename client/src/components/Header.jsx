import React, { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { Logo } from "../assets/img";
import { useStateValue } from "../Context/StateProvider";
import { isActiveStyles, isNotActiveStyles } from "../utils/styles";
import { getAuth } from "firebase/auth";
import { app } from "../config/firebase.config";
import { motion } from "framer-motion";
import { GiChainedHeart } from "react-icons/gi";
import { TiStarFullOutline } from "react-icons/ti";
import { FaHome } from "react-icons/fa";
import { GiBearFace } from "react-icons/gi";
import { actionType } from "../Context/reducer";


const Header = () => {
  const navigate = useNavigate();
  const [{ user }, dispatch] = useStateValue();
  const [isMenu, setIsMenu] = useState(false);


  const logout = () => {
    const firebaseAuth = getAuth(app);
    firebaseAuth
      .signOut()
      .then(() => {
        window.localStorage.setItem("auth", "false");
        dispatch({
          type: actionType.SET_SONG_PLAYING,
          isSongPlaying: false,
        });
      })
      .catch((e) => console.log(e));
    navigate("/login", { replace: true });
  };


  const closeMenu = () => {
    setIsMenu(false);
  };

  const openMenu = () => {
    setIsMenu(true);
  };

  const handleClickOutside = (event) => {
    const menuContainer = document.getElementById("profile-menu-container");

    if (menuContainer && !menuContainer.contains(event.target)) {
      closeMenu();
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  return (
    <header className="flex items-center w-full p-4 md:py-2 md:px-6">
      <NavLink to="/">
        <img src={ Logo } className="w-16" alt="" />
      </NavLink>

      <ul className="flex items-center justify-center ml-7">
        {/* prettier-ignore */ }
        <li className="mx-5 text-lg">
          <NavLink to="/home" className={ ({ isActive }) => isActive ? isActiveStyles : isNotActiveStyles }>
            <FaHome style={ { fontSize: '24px' } } />
          </NavLink>
        </li>
        <li className="mx-5 text-lg"><NavLink to={ '/musics' } className={ ({ isActive }) => isActive ? isActiveStyles : isNotActiveStyles }>Пісні</NavLink></li>
        <li className="mx-5 text-lg"><NavLink to={ '/contact' } className={ ({ isActive }) => isActive ? isActiveStyles : isNotActiveStyles }>Контакти</NavLink></li>
      </ul>

      <div
        id="profile-menu-container"
        className="flex ml-auto cursor-pointer gap-2 relative"
        onMouseEnter={ openMenu }
        onMouseLeave={ closeMenu }
      >

        <div
          className="flex items-center ml-auto cursor-pointer gap-2 relative"
          onClick={ () => setIsMenu(!isMenu) }
          onMouseEnter={ () => setIsMenu(true) }
          onMouseLeave={ () => setIsMenu(true) }
        >
          <img
            className='w-12 h-12 min-w-[44px] object-cover rounded-full shadow-lg'
            src={ user?.user?.imageURL }
            alt=""
            referrerpolicy="no-referrer"
          />
          <div className="flex flex-col">
            <p className="text-textColor text-lg hover:text-textColor font-semibold">
              { user?.user.name }
            </p>

            <p className="flex items-center gap-2 text-l text-red-500 font-semibold">
              { user?.user.role === "owner" && (
                <>
                  Власник { " " }
                  <GiBearFace className="text-2xl -ml-1 text-red-500" />{ " " }
                </>
              ) }
            </p>
            <p className="flex items-center gap-2 text-l text-pink-400 font-semibold">
              { user?.user.role === "admin" && (
                <>
                  Адмін { " " }
                  <GiChainedHeart className="text-2xl -ml-1 text-pink-400" />{ " " }
                </>
              ) }
            </p>
            <p className="flex items-center gap-2 text-l text-blue-400 font-semibold">
              { user?.user.role === "member" && (
                <>
                  Зірочка { " " }
                  <TiStarFullOutline className="text-2xl -ml-1 text-blue-400" />{ " " }
                </>
              ) }
            </p>

          </div>
        </div>

        { isMenu && (
          <motion.div
            initial={ { opacity: 0, y: 50 } }
            animate={ { opacity: 1, y: 0 } }
            exit={ { opacity: 0, y: 50 } }
            className="absolute z-10 flex flex-col top-12 right-0 w-275 p-4 gap-4 bg-MenuBg shadow-lg rounded-lg backdrop-blur-sm"
          >
            <hr />
            { ["admin", "owner"].includes(user?.user.role) && (
              <>
                <NavLink to="/dashboard/home" onClick={ closeMenu }>
                  <p className="text-base text-textDashboardCard hover:font-semibold duration-150 transition-all ease-in-out">
                    Керування
                  </p>
                </NavLink>
                <hr />
              </>
            ) }
            <p
              className="text-base text-textDashboardCard hover:font-semibold duration-150 transition-all ease-in-out"
              onClick={ () => {
                logout();
                closeMenu();
              } }
            >
              Вийти
            </p>
          </motion.div>
        ) }
      </div>
    </header>
  );
};

export default Header;
