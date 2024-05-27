// components/AnimatedText.js
import { useState, useEffect } from "react";
import styles from "./AnimatedText.module.css";

interface AnimatedTextProps {
  text: string;
  delay: number
}

const AnimatedText: React.FC<AnimatedTextProps> = ({ text, delay = 100 }) => {
  const [displayedText, setDisplayedText] = useState("");
  const words = text.split(" ");

  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      setDisplayedText((prev) => prev + (prev ? " " : "") + words[index]);
      index++;
      if (index === words.length) {
        clearInterval(interval);
      }
    }, delay);

    return () => clearInterval(interval);
  }, [text, delay]);

  return <span className={styles.animatedText}>{displayedText}</span>;
};

export default AnimatedText;
