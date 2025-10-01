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
        background: `radial-gradient(circle, rgba(255, 215, 0, 0.3) 0%, rgba(71, 152, 255, 0.3) 70%), linear-gradient(135deg, rgb(20, 134, 140) 0%, rgba(58, 91, 190, 0.84) 100%)`,
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
