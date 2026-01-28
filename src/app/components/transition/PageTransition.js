import { motion } from "motion/react";
import React from "react";

import tranbg from "../../assets/transitionbg.png"

function PageTransition({ children }) {
  const strips = 6;

  const containerVariants = {
    initial: {},
    animate: {
      transition: {
        staggerChildren: 0.05,
        staggerDirection: -1,
      },
    },
    exit: {
      transition: {
        staggerChildren: 0.05,
        staggerDirection: 1,
      },
    },
  };

  const stripsVariants = {
    initial: {
      scaleY: 1,
      originY: 0,
    },
    animate: {
      scaleY: 0,
      originY: 0,
      transition: {
        duration: 0.8,
        ease: [0.76, 0, 0.24, 1],
      },
    },
    exit: {
      scaleY: 1,
      originY: 1,
      transition: {
        duration: 0.8,
        ease: [0.76, 0, 0.24, 1],
      },
    },
  };

  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0, transition: { duration: 0.45, delay: 0.8 } }}
        className="childrenContainer"
      >
        {children}
      </motion.div>

      <div className="h-screen w-full pointer-events-none fixed top-0 left-0 z-[999]">
        <motion.div
          variants={containerVariants}
          initial="initial"
          animate="animate"
          exit="exit"
          className="h-full w-full flex"
        >
          {[...Array(strips)].map((_, i) => (
            <motion.div
            key={i}
            variants={stripsVariants}
              className="strip h-full grow bg-[#001219]"
            />
          ))}
        </motion.div>
      </div>
    </>
  );
}

export default PageTransition;
