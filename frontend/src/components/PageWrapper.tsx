import { motion } from "framer-motion";
import React from "react";

const transitionVariants = {
  initial: { opacity: 0, scale: 0.9, rotateY: -90 },
  animate: { opacity: 1, scale: 1, rotateY: 0 },
  exit: { opacity: 0, scale: 1.1, rotateY: 90 },
};

const PageWrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <motion.div
      variants={transitionVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      transition={{ duration: 0.8, ease: "easeInOut" }}
      style={{
        minHeight: "100vh",
        width: "100vw",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: `radial-gradient(circle at center, rgba(255, 215, 0, 0.3) 0%, rgba(255, 99, 71, 0.3) 70%),
                     linear-gradient(135deg,rgb(74, 20, 140) 0%, #880e4f 100%)`,
        color: "#f0e6ff",
        textAlign: "center",
        padding: "2rem",
      }}
    >
      {children}
    </motion.div>
  );
};

export default PageWrapper;
