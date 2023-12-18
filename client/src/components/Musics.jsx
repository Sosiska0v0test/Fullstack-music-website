//Musics.jsx:
import React, { useEffect, useState } from "react";
import { getAllSongs } from "../api";
import { actionType } from "../Context/reducer";
import { useStateValue } from "../Context/StateProvider";
import { SongCard } from "./DashboardSongs";
import Filter from "./Filter";
import Header from "./Header";
import SearchBar from "./SearchBar";
import { motion } from "framer-motion";
import { MdFileDownload } from "react-icons/md";

const Musics = () => {
  const [
    {
      searchTerm,
      isSongPlaying,
      song,
      allSongs,
      artistFilter,
      filterTerm,
      albumFilter,
      languageFilter,
    },
    dispatch,
  ] = useStateValue();

  const [filteredSongs, setFilteredSongs] = useState(null);
  const [activeSongId, setActiveSongId] = useState(null);

  useEffect(() => {
    if (!allSongs) {
      getAllSongs().then((data) => {
        dispatch({
          type: actionType.SET_ALL_SONGS,
          allSongs: data.data,
        });
      });
    }
  }, []);

  useEffect(() => {
    // Combine all filters in one condition
    const filtered = allSongs?.filter((data) =>
      (data.artist.toLowerCase().includes(searchTerm) ||
        data.language.toLowerCase().includes(searchTerm) ||
        data.category.toLowerCase().includes(searchTerm) ||
        data.name.toLowerCase().includes(searchTerm) ||
        data.artist.includes(artistFilter)) &&
      (albumFilter ? data.album === albumFilter : true) &&
      (languageFilter ? data.language === languageFilter : true) &&
      (filterTerm ? data.category === filterTerm : true)
    );

    const sortedFiltered = filtered?.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

    setFilteredSongs(sortedFiltered);

    if (isSongPlaying && song !== null) {
      setActiveSongId(allSongs[song]._id);
    }
  }, [searchTerm, artistFilter, albumFilter, languageFilter, filterTerm, allSongs, isSongPlaying, song]);

  useEffect(() => {
    const filtered = allSongs?.filter((data) => data.artist === artistFilter);
    if (filtered) {
      setFilteredSongs(filtered);
    } else {
      setFilteredSongs(null);
    }
  }, [artistFilter]);

  useEffect(() => {
    const filtered = allSongs?.filter((data) => data.album === albumFilter);
    if (filtered) {
      setFilteredSongs(filtered);
    } else {
      setFilteredSongs(null);
    }
  }, [albumFilter]);

  useEffect(() => {
    const filtered = allSongs?.filter((data) => data.language === languageFilter
    );
    if (filtered) {
      setFilteredSongs(filtered);
    } else {
      setFilteredSongs(null);
    }
  }, [languageFilter]);

  useEffect(() => {
    const filtered = allSongs?.filter((data) => data.category === filterTerm);
    if (filtered) {
      setFilteredSongs(filtered);
    } else {
      setFilteredSongs(null);
    }
  }, [filterTerm]);


  return (
    <div className="w-full h-auto flex flex-col items-center justify-center bg-bg_color">
      <Header />
      <SearchBar />

      { searchTerm.length > 0 && (
        <p className="my-4 text-base text-textColor">
          Searched for -------
          <span className="text-xl text-isActive font-semibold">
            { searchTerm }
          </span>
        </p>
      ) }

      <Filter setFilteredSongs={ setFilteredSongs } />

      <div className="w-full h-auto flex items-center justify-evenly gap-4 flex-wrap p-4 my-4 py-12 border border-gray-300 rounded-md bg-textColor ">
        <HomeSongContainer
          musics={ filteredSongs || allSongs }
          activeSongId={ activeSongId }
          setActiveSongId={ setActiveSongId }
        />
      </div>
    </div>
  );
};

const HomeSongContainer = ({ musics, activeSongId, setActiveSongId }) => {
  const [{ isSongPlaying, song, allSongs }, dispatch] = useStateValue();
  const [selectedSongId, setSelectedSongId] = useState(null);

  const addSongToContext = (index) => {
    setSelectedSongId(musics[index]._id);

    if (!isSongPlaying) {
      dispatch({
        type: actionType.SET_SONG_PLAYING,
        isSongPlaying: true,
      });
    }
    const originalIndex = allSongs.findIndex(song => song._id === musics[index]._id);

    if (song !== originalIndex) {
      dispatch({
        type: actionType.SET_SONG,
        song: originalIndex,
      });
    }
  };

  const downloadSong = (event, index) => {
    event.stopPropagation();
    const songToDownload = musics[index];
    const downloadLink = document.createElement('a');
    downloadLink.href = songToDownload.songUrl;
    downloadLink.download = `${songToDownload.name}-${songToDownload.artist}.mp3`;
    downloadLink.click();
  };

  return (
    <>
      { musics
        ?.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
        .map((data, index) => (
          <motion.div
            key={ data._id }
            whileTap={ { scale: 0.8 } }
            initial={ { opacity: 0, translateX: -50 } }
            animate={ { opacity: 1, translateX: 0 } }
            transition={ { duration: 0.3, delay: index * 0.1 } }
            className={ `relative w-44 min-w-210 px-4 py-2 cursor-pointer text-center hover:shadow-xl ${activeSongId === data._id ? 'bg-songActive text-white' : 'bg-gray-300'
              } shadow-md rounded-lg flex flex-col items-center` }
            onClick={ () => {
              addSongToContext(index);
              setActiveSongId(data._id);
            } }
          >
            <div className="w-40 min-w-[160px] h-40 min-h-[160px] rounded-lg drop-shadow-lg relative overflow-hidden">
              <motion.img
                whileHover={ { scale: 1.05 } }
                src={ data.imageURL }
                alt=""
                className=" w-full h-full rounded-lg object-cover"
              />
            </div>

            <p className="text-base text-headingColor font-semibold my-2">
              { data.name.length > 25 ? `${data.name.slice(0, 25)}` : data.name }
              <span className="block text-sm text-center textDashboardCard-400 my-1">
                { data.artist }
              </span>
            </p>

            <div className="absolute bottom-2 left-2">
              <div className="p-3 rounded-full bg-download text-l cursor-pointer outline-none hover:shadow-md duration-500 transition-all ease-in-out">
                <MdFileDownload className="text-white"
                  onClick={ (event) => downloadSong(event, index) }
                />
              </div>
            </div>

          </motion.div>
        )) }
    </>
  );
};

export default Musics;