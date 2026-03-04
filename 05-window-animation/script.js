console.log("Script loaded");
console.log("Script loaded");

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

document.addEventListener("DOMContentLoaded", () => {
  const lenis = new Lenis();

  lenis.on("scroll", ScrollTrigger.update);

  gsap.ticker.add((time) => {
    lenis.raf(time * 1000);
  });

  gsap.ticker.lagSmoothing(0);

  const windowContainer = document.querySelector(".window-container");
  const skyContainer = document.querySelector(".sky-container");
  const heroHeader = document.querySelector(".hero-header");
  const heroCopy = document.querySelector(".hero-copy");
  const leftCol = document.querySelector(".hero-header .col:first-child");
  const rightCol = document.querySelector(".hero-header .col:nth-child(2)");
  const centerBtn = document.querySelector(".center-btn");

  const skyContainerHeight = skyContainer.offsetHeight;
  const viewportHeight = window.innerHeight;
  const skyMoveDistance = skyContainerHeight - viewportHeight;

  ScrollTrigger.create({
    trigger: ".hero",
    start: "top top",
    end: `+=${window.innerHeight * 3}px`,
    pin: true,
    pinSpacing: true,
    scrub: 1,
    onUpdate: (self) => {
      const progress = self.progress;

      // Window Scale Logic
      let windowScale;
      if (progress <= 0.5) {
        windowScale = 1 + (progress / 0.5) * 4;
      } else {
        windowScale = 5;
      }

      gsap.set(windowContainer, { scale: windowScale });

      // Sky Parallax
      gsap.set(skyContainer, {
        y: -progress * skyMoveDistance,
      });

      // Header Split Animation (Faster horizontal movement)
      const moveDistance = progress * 150; // Increased multiplier for more speed
      gsap.set(leftCol, { xPercent: -moveDistance });
      gsap.set(rightCol, { xPercent: moveDistance });

      // Center Button Logic (Fade/Scale out as we zoom)
      let centerBtnOpacity = 1;
      let centerBtnScale = 1;
      if (progress > 0.3) {
        centerBtnOpacity = 1 - (progress - 0.3) * 4;
        centerBtnScale = 1 - (progress - 0.3) * 2;
        if (centerBtnOpacity < 0) centerBtnOpacity = 0;
        if (centerBtnScale < 0.8) centerBtnScale = 0.8;
      }
      gsap.set(centerBtn, { opacity: centerBtnOpacity, scale: centerBtnScale });

      // Hero Copy (Jesko Jets) Visibility Logic
      let copyOpacity = 0;
      if (progress > 0.45) {
        copyOpacity = (progress - 0.45) / 0.15; 
        if (copyOpacity > 1) copyOpacity = 1;
      }
      gsap.set(heroCopy, { opacity: copyOpacity });

      // Header Opacity Logic
      let headerOpacity = 1;
      if (progress > 0.5) {
        headerOpacity = 1 - (progress - 0.5) * 3;
        if (headerOpacity < 0) headerOpacity = 0;
      }
      gsap.set(heroHeader, { opacity: headerOpacity });
    },
  });
});
