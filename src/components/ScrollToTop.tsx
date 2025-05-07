"use client";
import { useEffect, useState } from "react";
import styles from "./ScrollToTop.module.css";

function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    isVisible && (
      <div
        style={{
          position: "fixed",
          bottom: "40px",
          right: "40px",
          width: "140px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <button
          onClick={scrollToTop}
          className={styles.scrollToTopButton}
          aria-label="Scroll to top"
        >
          <svg
            className="svgIcon"
            viewBox="0 0 384 512"
            style={{ fill: "var(--glxp-white)" }}
          >
            <path d="M214.6 41.4c-12.5-12.5-32.8-12.5-45.3 0l-160 160c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L160 141.2V448c0 17.7 14.3 32 32 32s32-14.3 32-32V141.2L329.4 246.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3l-160-160z" />
          </svg>
        </button>
      </div>
    )
  );
}

export default ScrollToTop;
