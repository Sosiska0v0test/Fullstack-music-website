// FilterButtons.jsx
import React from "react";
import { IoChevronDown } from "react-icons/io5";
import { motion } from "framer-motion";
import { useStateValue } from "../Context/StateProvider";
import { actionType } from "../Context/reducer";
import { filters } from "../utils/supportfunctions";

const FilterButtons = ({ filterData, flag, updateFilter, openMenu, setOpenMenu }) => {
  const [filterName, setFilterName] = React.useState(null);
  const [{ artistFilter, albumFilter, filterTerm }, dispatch] = useStateValue();

  const updateFilterButton = (name) => {
    setFilterName(name);

    if (openMenu === flag) {
      setOpenMenu(null);
    } else {
      setOpenMenu(flag);
    }

    if (flag === "Artist") {
      dispatch({ type: actionType.SET_ARTIST_FILTER, artistFilter: name });
    }
    if (flag === "Language") {
      dispatch({ type: actionType.SET_LANGUAGE_FILTER, languageFilter: name });
    }

    if (flag === "Albums") {
      dispatch({ type: actionType.SET_ALBUM_FILTER, albumFilter: name });
    }

    if (flag === "Category") {
      dispatch({ type: actionType.SET_FILTER_TERM, filterTerm: name });
    }
  };

  return (
    <div className="border border-gray-300 bg-primary rounded-md px-4 py-1 relative cursor-pointer hover:border-gray-400">
      <p
        className="text-base tracking-wide text-textDashboardCard flex items-center gap-2 "
        onClick={ () => updateFilterButton(filterName) }
      >
        { !filterName && flag }
        { filterName && (
          <>
            { filterName.length > 15 ? `${filterName.slice(0, 14)}...` : filterName }
          </>
        ) }
        <div style={ { color: 'black' } }>
          <IoChevronDown
            className={ `text-base duration-150 transition-all ease-in-out ${openMenu === flag ? "rotate-180" : "rotate-0"
              }` }
          />
        </div>
      </p>
      { filterData && openMenu === flag && (
        <motion.div
          initial={ { opacity: 0, y: 50 } }
          animate={ { opacity: 1, y: 0 } }
          exit={ { opacity: 0, y: 50 } }
          className="w-48 z-50 backdrop-blur-sm bg-primary texttextDashboardCard max-h-44 overflow-y-scroll scrollbar-thin scrollbar-track-gray-200 scrollbar-thumb-gray-400 py-2 flex flex-col rounded-md shadow-md absolute top-8 left-0"
        >
          { filterData
            ?.sort((a, b) => {
              if (flag === "Albums" || flag === "Artist") {
                // Display new Albums and Artists first
                return b.isNew - a.isNew;
              }
              return 0;
            })
            .map((data) => (
              <div
                key={ data.name }
                className="flex items-center gap-2 px-4 py-1 hover:bg-gray-200"
                onClick={ () => updateFilterButton(data.name) }
              >
                { (flag === "Artist" || flag === "Albums") && (
                  <img
                    src={ data.imageURL }
                    className="w-8 min-w-[32px] h-8 rounded-full object-cover"
                    alt=""
                  />
                ) }
                <p className="w-full">
                  { data.name.length > 15 ? `${data.name.slice(0, 14)}...` : data.name }
                </p>
              </div>
            )) }
        </motion.div>
      ) }
    </div>
  );
};

export default FilterButtons;
