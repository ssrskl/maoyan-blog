// 进度条组件
import { motion } from "framer-motion";

const LinearProgress = ({ classes = "" }) => {
  const progressbarVariant = {
    start: { scaleY: 0 },
    end: {
      scaleY: 1,
      transition: {
        when: "beforeChildren",
        duration: 0.2,
        ease: "easeOut",
        delay: 0.5,
      },
    },
    exit: {
      scaleY: 0,
      transition: {
        duration: 0.1,
        ease: "easeOut",
      },
    },
  };
  const activeIndicatorVariant = {
    start: { translateX: "-100%" },
    end: { translateX: "100%" },
  };
  return (
    <motion.div
      role="progressbar"
      variants={progressbarVariant}
      initial="start"
      animate="end"
      exit="exit"
      className={`linear-progress ${classes}`}
    >
      <motion.div
        variants={activeIndicatorVariant}
        transition={{
          repeat: Infinity,
          duration: 1.5,
          ease: [0.2, 0, 0, 1],
        }}
        className="active-indicator"
      ></motion.div>
    </motion.div>
  );
};

export { LinearProgress };
