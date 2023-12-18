import React from "react";

import { BsEmojiSmile } from "react-icons/bs";
import { motion } from "framer-motion";

const AlertSuccess = ({ msg }) => {
  return (
    <motion.div
      initial={ { opacity: 0, y: -100, scale: 0.6 } }
      animate={ { opacity: 1, y: 50, scale: 1 } }
      exit={ { opacity: 0, y: -100, scale: 0.6 } }
      className="w-screen z-50 fixed top-0 left-0 flex items-center justify-center"
    >
      <div className="w-380 bg-green-400 rounded-md shadow-md backdrop-blur-md px-4 py-4 flex items-center gap-4">
        <BsEmojiSmile className="text-xl text-textDashboardCard" />
        <p className="text-base font-semibold text-textDashboardCard">
          { msg?.length > 50 ? `${msg?.slice(0, 50)}...` : msg }
        </p>
      </div>
    </motion.div>
  );
};

export default AlertSuccess;
