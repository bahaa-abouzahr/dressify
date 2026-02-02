"use client"

import { AnimatePresence, motion } from "framer-motion"
import { useState } from "react";
import { FaRegTrashAlt, FaTruck } from "react-icons/fa"

function AnimatedTrashButton({ handleDelete, id, sku}) {
  const [animating, setAnimating] = useState(false);

  function handleTrashClick(id, sku) {

    if(animating) return;
    setAnimating(true);

    // after the truck "takes it away", run delete
    setTimeout(() => {
      handleDelete(id, sku);
    }, 700);
  }

  return (
      <button 
        type="button" 
        disabled={animating} 
        className="cursor-pointer flex justify-center hover:scale-120 disabled:opacity-60" 
        onClick={() => handleTrashClick(id, sku)}
        aria-label="Remove from wishlist"
      >
        <div className="relative w-6 h-6">
          <AnimatePresence mode="wait">
            {!animating ? (
              <motion.span
                key="trash"
                initial={{ scale:1, opacity: 1}}
                exit={{ scale: 0.3, opacity: 0 }}
                transition={{ duration: 0.15 }}
                className="absolute inset-0 flex items-center justify-center"
              >
                <FaRegTrashAlt />
              </motion.span>

            ) : (
              <motion.span
                key="truck"
                initial={{ x: -2, opacity: 1 }}
                animate={{ x: 30, opacity: 0 }}
                transition={{ duration: 1, ease: "easeIn" }}
                className="absolute inset-0 flex items-center justify-center"
              >
                <FaTruck />
              </motion.span>
            )}
          </AnimatePresence>
        </div>
      </button>
  )
}

export default AnimatedTrashButton
