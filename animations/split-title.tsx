"use client";

import { motion } from "framer-motion";

const premiumEase = [0.22, 1, 0.36, 1] as const;

export function SplitTitle({
  text,
  className,
}: {
  text: string;
  className?: string;
}) {
  const words = text.split(" ");

  return (
    <motion.span
      aria-label={text}
      className={className}
      initial="hidden"
      animate="show"
      variants={{ hidden: {}, show: { transition: { staggerChildren: 0.06 } } }}
    >
      {words.map((word, index) => (
        <motion.span
          key={`${word}-${index}`}
          variants={{
            hidden: { opacity: 0, y: 20, filter: "blur(10px)" },
            show: { opacity: 1, y: 0, filter: "blur(0px)" },
          }}
          transition={{ duration: 0.7, ease: premiumEase }}
          className="inline-block pr-4"
        >
          {word}
        </motion.span>
      ))}
    </motion.span>
  );
}
