"use client";
import React from "react";
import { motion } from "framer-motion";

interface ProgressBarProps {
  progress: number; // Progress percentage (0 to 100)
}

const ProgressBar: React.FC<ProgressBarProps> = ({ progress }) => {
  const progressValue = Math.min(Math.max(progress, 0), 100);

  return (
    <div className="w-full">
      <div className="w-full h-4 bg-gray-200/50 rounded-full">
        <motion.div
          className="h-full bg-gray-100 rounded-full"
          initial={{ width: "0%" }}
          animate={{ width: `${progressValue}%` }}
          transition={{
            duration: 0.5,
            ease: "easeOut",
          }}
        ></motion.div>
      </div>
    </div>
  );
};

export default ProgressBar;
