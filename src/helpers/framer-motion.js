const pageTransition = {
    type: "tween",
    duration: 0.2,
  };
  
  const pageSlide = {
    initial: {
      opacity: 0,
      y: "-1rem",
    },
    in: {
      opacity: 1,
      y: 0,
    },
    out: {
      opacity: 0,
      y: "2rem",
    },
  };
  
  const pageZoom = {
    initial: {
      opacity: 0,
      scale: 0.95,
    },
    in: {
      opacity: 1,
      scale: 1,
    },
    out: {
      opacity: 0,
      scale: 0.95,
    },
  };
  
  const errorAnim = {
    initial: {
      opacity: 0,
      scale: 0.8,
    },
    in: {
      opacity: 1,
      scale: 1,
    },
    out: {
      opacity: 0,
      scale: 0.8,
    },
  };

  export {pageTransition, pageZoom, pageSlide, errorAnim}