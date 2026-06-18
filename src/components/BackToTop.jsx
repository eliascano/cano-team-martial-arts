import { useEffect, useState } from "react";
import { FaArrowUp } from "react-icons/fa";
import { AnimatePresence, motion } from "framer-motion";

function BackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      // Show once the user has scrolled past the Hero (roughly one viewport)
      setVisible(window.scrollY > window.innerHeight * 0.9);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();

    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          type="button"
          onClick={scrollToTop}
          aria-label="Volver al inicio"
          initial={{ opacity: 0, scale: 0.8, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: 10 }}
          transition={{ type: "spring", stiffness: 200, damping: 18 }}
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.95 }}
          className="fixed bottom-24 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-brand text-2xl text-foreground shadow-xl shadow-black/30 transition-colors hover:bg-brand-strong focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand"
        >
          <FaArrowUp />
        </motion.button>
      )}
    </AnimatePresence>
  );
}

export default BackToTop;
