import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { MdDelete } from "react-icons/md";
import { useStateValue } from "../Context/StateProvider";
import { getAllAlbums, deleteAlbumById } from "../api";
import { actionType } from "../Context/reducer";
import { IoTrash } from "react-icons/io5";
import AlertSuccess from "./AlertSuccess";
import AlertError from "./AlertError";

const DashboardAlbum = () => {
  const [{ allAlbums }, dispatch] = useStateValue();
  const [deleteAlert, setDeleteAlert] = useState(null);
  const [deleteAlertMsg, setDeleteAlertMsg] = useState("");

  useEffect(() => {
    if (!allAlbums) {
      getAllAlbums().then((data) => {
        dispatch({ type: actionType.SET_ALL_ALBUMNS, allAlbums: data.data });
      });
    }
  }, []);


  return (
    <div className="w-full p-4 flex items-center justify-center flex-col">
      { deleteAlert && (
        <>
          { deleteAlert === "success" ? (
            <AlertSuccess msg={ deleteAlertMsg } />
          ) : (
            <AlertError msg={ deleteAlertMsg } />
          ) }
        </>
      ) }
      <div className="relative w-full gap-3 my-4 p-4 py-12 border border-gray-300 rounded-md flex flex-wrap justify-evenly bg-textColor">
        { allAlbums &&
          allAlbums.map((data, index) => (
            <AlbumCard
              key={ index }
              data={ data }
              index={ index }
            />
          )) }
      </div>
    </div>
  );
};

export const AlbumCard = ({ data, index, onDelete }) => {
  const [isDeleted, setIsDeleted] = useState(false);
  const [alert, setAlert] = useState(false);
  const [alertMsg, setAlertMsg] = useState(null);
  const [isVisible, setIsVisible] = useState(true);
  const [{ user }, dispatch] = useStateValue();

  const deleteObject = (id) => {
    deleteAlbumById(id).then((res) => {
      if (res.data.success) {
        setAlert("success");
        setAlertMsg(res.data.msg);
        setTimeout(() => {
          setAlert(false);
          setIsDeleted(true);
        }, 4000);
      } else {
        setAlert("error");
        setAlertMsg(res.data.msg);
        setTimeout(() => {
          setAlert(false);
        }, 4000);
      }
    });
  };


  return isDeleted ? null : (
    <motion.div
      whileTap={ { scale: 0.8 } }
      initial={ { opacity: 0, translateX: -50 } }
      animate={ { opacity: isVisible ? 1 : 0, translateX: 0 } }
      exit={ { opacity: 0, scale: 0.6 } }
      transition={ { duration: 0.3, delay: index * 0.1 } }
      className={ `relative overflow-hidden w-44 min-w-210 px-4 py-4 gap-3 cursor-pointer hover:shadow-xl hover:bg-cartBgHover bg-gray-300 shadow-md rounded-lg flex flex-col items-center` }
    >
      <img
        src={ data?.imageURL }
        className="w-full h-40 object-cover rounded-md"
        alt=""
      />

      <p className="text-base text-textDashboardCard">{ data.name }</p>

      <div className="w-full absolute bottom-2 right-2 flex items-center justify-between px-4">
        { user?.user.role === "owner" && (
          <motion.i
            whileTap={ { scale: 0.75 } }
            onClick={ () => deleteObject(data._id) }
          >
            <IoTrash
              className="bottom-3 right-3 p-3 rounded-full text-primary bg-red-500 text-xl cursor-pointer outline-none hover:shadow-md  duration-500 transition-all ease-in-out"
              style={ { fontSize: "40px" } }
            />
          </motion.i>
        ) }
      </div>

      { alert && (
        <>
          { alert === "success" ? (
            <AlertSuccess msg={ alertMsg } />
          ) : (
            <AlertError msg={ alertMsg } />
          ) }
        </>
      ) }
    </motion.div>
  );
};

export default DashboardAlbum;
