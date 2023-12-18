// Filter.jsx
import React, { useEffect, useRef } from "react";
import { actionType } from "../Context/reducer";
import { useStateValue } from "../Context/StateProvider";
import { getAllAlbums, getAllArtist } from "../api";
import { filterByLanguage, filters } from "../utils/supportfunctions";
import FilterButtons from "./FilterButtons";
import { TiThSmall } from "react-icons/ti";
import { motion } from "framer-motion";

const Filter = ({ setFilteredSongs }) => {
  const [{ artists, allAlbums }, dispatch] = useStateValue();
  const [openMenu, setOpenMenu] = React.useState(null);
  const filterRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (filterRef.current && !filterRef.current.contains(event.target)) {
        setOpenMenu(null);
      }
    };

    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [filterRef]);

  useEffect(() => {
    if (!artists) {
      getAllArtist().then((data) => {
        dispatch({ type: actionType.SET_ARTISTS, artists: data.data });
      });
    }

    if (!allAlbums) {
      getAllAlbums().then((data) => {
        dispatch({ type: actionType.SET_ALL_ALBUMNS, allAlbums: data.data });
      });
    }
  }, []);

  const updateFilter = (value) => {
    dispatch({
      type: actionType.SET_FILTER_TERM,
      filterTerm: value,
    });
  };

  const clearAllFilter = () => {
    setFilteredSongs(null);
    dispatch({ type: actionType.SET_ARTIST_FILTER, artistFilter: null });
    dispatch({ type: actionType.SET_LANGUAGE_FILTER, languageFilter: null });
    dispatch({ type: actionType.SET_ALBUM_FILTER, albumFilter: null });
    dispatch({ type: actionType.SET_FILTER_TERM, filterTerm: null });
  };

  return (
    <div className="w-full my-4 px-6 py-4 flex items-center justify-start md:justify-center gap-10">
      <FilterButtons
        filterData={ artists }
        flag="Artist"
        updateFilter={ updateFilter }
        openMenu={ openMenu }
        setOpenMenu={ setOpenMenu }
      />

      <FilterButtons
        filterData={ allAlbums }
        flag="Albums"
        updateFilter={ updateFilter }
        openMenu={ openMenu }
        setOpenMenu={ setOpenMenu }
      />

      <FilterButtons
        filterData={ filterByLanguage }
        flag="Language"
        updateFilter={ updateFilter }
        openMenu={ openMenu }
        setOpenMenu={ setOpenMenu }
      />
      <FilterButtons
        filterData={ filters }
        flag="Category"
        updateFilter={ updateFilter }
        openMenu={ openMenu }
        setOpenMenu={ setOpenMenu }
      />

      <motion.i
        initial={ { opacity: 0 } }
        animate={ { opacity: 1 } }
        whileTap={ { scale: 0.75 } }
        onClick={ clearAllFilter }
      >
        <TiThSmall className="text-textColor text-xl cursor-pointer" />
      </motion.i>
    </div>
  );
};

export default Filter;