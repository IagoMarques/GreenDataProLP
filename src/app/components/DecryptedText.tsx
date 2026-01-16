import React, { useState, useEffect, useRef } from "react";
import { useInView } from "framer-motion";

interface DecryptedTextProps {
  text: string;
  speed?: number;
  maxIterations?: number;
  sequential?: boolean;
  revealDirection?: "start" | "end" | "center";
  useOriginalCharsOnly?: boolean;
  characters?: string;
  className?: string;
  parentClassName?: string;
  animateOn?: "view" | "hover";
  delay?: number;
}

/**
 * DecryptedText Component
 * Animates text reveal by cycling through random characters.
 * Perfect for high-tech, premium landing pages.
 *
 * @param delay - Delay in milliseconds before starting the animation (default: 0)
 */
export const DecryptedText: React.FC<DecryptedTextProps> = ({
  text,
  speed = 50,
  maxIterations = 10,
  sequential = true,
  revealDirection = "start",
  useOriginalCharsOnly = false,
  characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+",
  className = "",
  parentClassName = "",
  animateOn = "view",
  delay = 0,
}) => {
  const [displayText, setDisplayText] = useState(text);
  const [isAnimating, setIsAnimating] = useState(false);
  const containerRef = useRef<HTMLSpanElement>(null);
  const isInView = useInView(containerRef, { once: true, amount: 0.5 });

  useEffect(() => {
    if (animateOn === "view" && isInView) {
      triggerAnimation();
    }
  }, [isInView, animateOn]);

  const triggerAnimation = () => {
    if (isAnimating) return;
    setIsAnimating(true);

    // Apply delay before starting animation
    setTimeout(() => {
      let iteration = 0;
      const interval = setInterval(() => {
      setDisplayText(() =>
        text
          .split("")
          .map((char, index) => {
            if (char === " ") return " ";
            
            // Logic for when to reveal the actual character
            const revealThreshold = sequential ? index + maxIterations : maxIterations;
            
            if (iteration > revealThreshold) {
              return text[index];
            }
            
            if (useOriginalCharsOnly) {
              const availableChars = text.replace(/\s/g, "").split("");
              return availableChars[Math.floor(Math.random() * availableChars.length)];
            }
            
            return characters[Math.floor(Math.random() * characters.length)];
          })
          .join("")
      );

      if (iteration >= text.length + maxIterations) {
        clearInterval(interval);
        setIsAnimating(false);
        setDisplayText(text);
      }

      iteration += 1;
    }, speed);
    }, delay);
  };

  return (
    <span 
      ref={containerRef} 
      className={`inline-block whitespace-pre ${parentClassName}`}
      onMouseEnter={() => animateOn === "hover" && triggerAnimation()}
    >
      <span className={className}>{displayText}</span>
    </span>
  );
};
