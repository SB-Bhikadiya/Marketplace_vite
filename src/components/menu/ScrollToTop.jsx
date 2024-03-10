import React, { useEffect, useState } from "react";

const ScrollToTop = () => {
  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = () => {
    if (window.pageYOffset > 600) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    document.addEventListener("scroll", toggleVisibility);
    return () => {
      document.removeEventListener("scroll", toggleVisibility);
    };
  }, []);

  return (
    <div id="scroll-to-top" className="init">
      {isVisible && (
        <div onClick={scrollToTop}>
          <i className=""></i>
        </div>
      )}
    </div>
  );
};

export default ScrollToTop;
