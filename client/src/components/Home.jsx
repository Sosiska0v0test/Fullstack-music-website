import React from 'react';
import Header from "./Header";
import Image from "../assets/img/ea-unscreen.gif";

const Home = () => {
  return (
    <div className="w-full h-screen flex flex-col items-center text-primary bg-bg_color">
      <Header />

      <div className="flex flex-1 w-full">

        <div className="flex-1 bg-black p-4 flex flex-col items-center justify-center">
          <h1 className="text-4xl font-bold text-white mb-4">Ласкаво просимо у світ музики!</h1>
          <p className="text-gray-400">Налаштуйтеся на хвилювання звуків та відкрийте для себе нові музичні горизонти.</p>
        </div>


        <div className="w-full sm:w-1/2 p-4 flex">
          <img src={ Image } alt="Image" className="w-full h-auto object-cover" />
        </div>
      </div>
    </div>
  );
};

export default Home;
