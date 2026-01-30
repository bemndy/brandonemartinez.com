import gsap from "gsap";

// Looping circle animation
const animateMainShape = () => {
  const infiniteTl = gsap.timeline({ repeat: -1, timeScale: 2 });
  infiniteTl
    .to(".shapes .main-circle", {
      duration: 3,
      x: -30,
      y: -50,
      ease: "expo.easeOut",
    })
    .to(".shapes .main-circle", {
      duration: 3,
      x: -30,
      y: 50,
      ease: "expo.easeOut",
    })
    .to(".shapes .main-circle", {
      duration: 3,
      x: 0,
      y: 0,
      ease: "expo.easeOut",
    });
};

// Looping shape animation
const animateShapes = () => {
  const infiniteTl = gsap.timeline({ repeat: -1, timeScale: 2 });
  infiniteTl
    .to(".shapes .shape", {
      duration: 2,
      rotate: 360,
      delay: -0.5,
      ease: "power3.easeInOut",
      stagger: 1,
    })
    .to(".shapes .shape-3", {
      duration: 1,
      rotate: 360,
      delay: -1,
      ease: "power3.easeInOut",
    })
    .to(".shapes .shape", {
      duration: 2,
      rotate: 0,
      ease: "power3.easeInOut",
      stagger: 1,
    })
    .to(".shapes .shape", {
      duration: 1,
      opacity: 0,
      delay: -0.5,
      ease: "power3.easeInOut",
      stagger: 1,
    })
    .to(".shapes .shape", {
      duration: 1,
      opacity: 1,
      ease: "power3.easeInOut",
      stagger: 1,
    });
};

// Main preloader animation (~2 seconds total)
export const preLoaderAnim = () => {
  return new Promise((resolve) => {
    const tl = gsap.timeline({
      timeScale: 2.5, // Speeds up the whole sequence
      onComplete: resolve,
    });

    tl.to("body", {
      duration: 0.05,
      css: { overflowY: "hidden" },
      ease: "power3.inOut",
    })
      .to(".landing", {
        duration: 0.05,
        css: { overflowY: "hidden", height: "90vh" },
      })
      .to(".texts-container", {
        duration: 0,
        opacity: 1,
        ease: "Power3.easeOut",
      })
      .from(".texts-container span", {
        duration: 0.6,
        delay: 0.3,
        y: 50,
        skewY: 10,
        stagger: 0.3,
        ease: "Power3.easeOut",
      })
      .to(".texts-container span", {
        duration: 0.4,
        y: 40,
        skewY: -15,
        stagger: 0.15,
        ease: "Power3.easeOut",
      })
      .to(".landing", {
        duration: 0.05,
        css: { overflowY: "hidden", height: "unset" },
      })
      .to("body", {
        duration: 0.05,
        css: { overflowY: "scroll" },
        ease: "power3.inOut",
      })
      .from(".landing__top .sub", {
        duration: 0.4,
        opacity: 0,
        y: 40,
        ease: "expo.easeOut",
      })
      .to(".preloader", {
        duration: 1,
        height: "0vh",
        ease: "Power3.easeOut",
      }, "-=1.5")
      .from(".landing__main .text", {
        duration: 1,
        y: 10,
        opacity: 0,
        stagger: { amount: 1 },
        ease: "power3.easeInOut",
      })
      .from(".links .item", {
        duration: 0.4,
        opacity: 0,
        delay: window.innerWidth < 763 ? -1.5 : -0.4,
        stagger: { amount: 0.3 },
        ease: "expo.easeOut",
        onComplete: animateMainShape,
      })
      .from(".main-circle", {
        duration: 0.5,
        opacity: 0,
        ease: "power3.easeInOut",
        onComplete: animateShapes,
      })
      .from(".shapes .shape", {
        duration: 0.5,
        opacity: 0,
        delay: -0.5,
        ease: "power3.easeInOut",
        stagger: 0.5,
      })
      .to(".preloader", {
        duration: 0,
        css: { display: "none" },
      });
  });
};

export default preLoaderAnim;
