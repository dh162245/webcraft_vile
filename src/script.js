import { setupMarqueeAnimation } from "./marquee.js";

import { gsap } from "gsap";
import Lenis from "@studio-freight/lenis";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText }     from "gsap/SplitText";
import { CustomEase } from "gsap/CustomEase"; 






gsap.registerPlugin(ScrollTrigger, SplitText);


gsap.registerPlugin(CustomEase);
CustomEase.create("hop", "0.9, 0, 0.1, 1");


document.addEventListener("DOMContentLoaded", () => {
  const tl = gsap.timeline({
    delay: 0.3,
    defaults: {
      ease: "hop",
    },
  });
  
  document.documentElement.style.overflow = 'hidden';
document.body.style.overflow = 'hidden';

  const counts = document.querySelectorAll(".count");

  counts.forEach((count, index) => {
    const digits = count.querySelectorAll(".digit h1");

    tl.to(
      digits,
      {
        y: "0%",
        duration: 1,
        stagger: 0.075,
      },
      index * 1
    );

    if (index < counts.length) {
      tl.to(
        digits,
        {
          y: "-100%",
          duration: 1,
          stagger: 0.075,
        },
        index * 1 + 1
      );
    }
  });

  tl.to(".spinner", {
    opacity: 0,
    duration: 0.3,
  });

  tl.to(
    ".word h1",
    {
      y: "0%",
      duration: 1,
    },
    "<"
  );

  tl.to(".divider", {
    scaleY: "100%",
    duration: 1,
    onComplete: () =>
      gsap.to(".divider", { opacity: 0, duration: 0.3, delay: 0.3 }),
  });

  tl.to("#word-1 h1", {
    y: "100%",
    duration: 1,
    delay: 0.3,
  });

  tl.to(
    "#word-2 h1",
    {
      y: "-100%",
      duration: 1,
    },
    "<"
  );

  tl.to(
    ".block",
    {
      clipPath: "polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)",
      duration: 1,
      stagger: 0.1,
      delay: 0.75,
      onStart: () =>
        gsap.to(".hero-img", { scale: 1, duration: 2, ease: "hop" }),
    },
    "<"
  );

  tl.to(
    [".nav", ".line h1", ".line p"],
    {
      y: "0%",
      duration: 1.5,
      stagger: 0.2,
    },
    "<"
  );

  tl.to(
    [".cta", ".cta-icon"],
    {
      scale: 1,
      duration: 1.5,
      stagger: 0.75,
      delay: 0.75,
    },
    "<"
  );

  tl.to(
    ".cta-label p",
    {
      y: "0%",
      duration: 1.5,
      delay: 0.5,
    },
    "<"
  )  .add(() => {
    document.documentElement.style.overflow = '';
    document.body.style.overflow = '';
  }, '+=0.2');



  gsap.registerPlugin( ScrollTrigger);

  const lenis = new Lenis({
    wrapper: document.querySelector('#site-content'),
    content: document.querySelector('#site-content')
  });
  lenis.on("scroll", ScrollTrigger.update);
  gsap.ticker.add((time) => lenis.raf(time * 1000));
  gsap.ticker.lagSmoothing(0);

 


//   document.querySelector(".scroll-to-header").addEventListener("click", (e) => {
//   e.preventDefault();
//   lenis.scrollTo("#header", {
//     duration: 10,
//     easing: t => 1 - Math.pow(1 - t, 4)
//   });
// });

// document.querySelector(".scroll-to-about").addEventListener("click", (e) => {
//   e.preventDefault();
//   lenis.scrollTo("#about", {
//     duration: 3,
//     easing: t => 1 - Math.pow(1 - t, 4)
//   });
// });

// document.querySelector(".scroll-to-contact").addEventListener("click", (e) => {
//   e.preventDefault();
//   lenis.scrollTo("#contact", {
//     duration: 12,
//     easing: t => 1 - Math.pow(1 - t, 4)
//   });
// });




  const cards = gsap.utils.toArray(".card");
  const introCard = cards[0];

  // const titles = gsap.utils.toArray(".card-title h1");
  // titles.forEach((title) => {
  //   const split = new SplitText(title, {
  //     type: "chars",
  //     charsClass: "char",
  //     tag: "div",
  //   });
  //   split.chars.forEach((char) => {
  //     char.innerHTML = `<span>${char.textContent}</span>`;
  //   });
  // });

  const cardImgWrapper = introCard.querySelector(".card-img");
  const cardImg = introCard.querySelector(".card-img img");
  gsap.set(cardImgWrapper, { scale: 0.3, borderRadius: "50%" });
  gsap.set(cardImg, { scale: 1.5 });

  function animateContentIn(titleChars, description) {
    gsap.to(titleChars, { x: "0%", duration: 0.75, ease: "power4.out" });
    gsap.to(description, {
      x: 0,
      opacity: 1,
      duration: 0.75,
      delay: 0.1,
      ease: "power4.out",
    });
  }

  function animateContentOut(titleChars, description) {
    gsap.to(titleChars, { x: "100%", duration: 0.5, ease: "power4.out" });
    gsap.to(description, {
      x: "40px",
      opacity: 0,
      duration: 0.5,
      ease: "power4.out",
    });
  }

  const marquee = introCard.querySelector(".card-marquee .marquee");
  const titleChars = introCard.querySelectorAll(".char span");
  const description = introCard.querySelector(".card-description");

  ScrollTrigger.create({
    trigger: introCard,
    start: "top top",
    end: "+=500vh",
    onUpdate: (self) => {
      const progress = self.progress;
      const imgScale = 0.3 + progress * 0.8;
      const borderRadius = 50 - progress * 50;
      const innerImgScale = 1.5 - progress * 0.5;
      const opacity = 0.2 + progress * 0.8;

      gsap.set(cardImgWrapper, {
        scale: imgScale,
        borderRadius: progress < 1 ? "50%" : "0%",
        opacity: opacity,
      });
      gsap.set(cardImg, { scale: innerImgScale });

      if (imgScale >= 0.5 && imgScale <= 0.75) {
        const fadeProgress = (imgScale - 0.5) / (0.75 - 0.5);
        gsap.set(marquee, { opacity: 1 - fadeProgress });
      } else if (imgScale < 0.5) {
        gsap.set(marquee, { opacity: 1 });
      } else if (imgScale > 0.75) {
        gsap.set(marquee, { opacity: 0 });
      }

      if (progress >= 1 && !introCard.contentRevealed) {
        introCard.contentRevealed = true;
        animateContentIn(titleChars, description);
      }
      if (progress < 1 && introCard.contentRevealed) {
        introCard.contentRevealed = false;
        animateContentOut(titleChars, description);
      }
    },
  });

  cards.forEach((card, index) => {
    const isLastCard = index === cards.length - 1;
    ScrollTrigger.create({
      trigger: card,
      start: "top top",
      end: isLastCard ? "+=100vh" : "top top",
      endTrigger: isLastCard ? null : cards[cards.length - 1],
      pin: true,
      pinSpacing: isLastCard,
    });
  });

  cards.forEach((card, index) => {
    if (index < cards.length - 1) {
      const cardWrapper = card.querySelector(".card-wrapper");
      ScrollTrigger.create({
        trigger: cards[index + 1],
        start: "top bottom",
        end: "top top",
        onUpdate: (self) => {
          const progress = self.progress;
          gsap.set(cardWrapper, {
            scale: 1 - progress * 0.25,
            opacity: 1 - progress,
          });
        },
      });
    }
  });

  cards.forEach((card, index) => {
    if (index > 0) {
      const cardImg = card.querySelector(".card-img img");
      const imgContainer = card.querySelector(".card-img");
      ScrollTrigger.create({
        trigger: card,
        start: "top bottom",
        end: "top top",
        onUpdate: (self) => {
          const progress = self.progress;
          gsap.set(cardImg, { scale: 2 - progress });
          gsap.set(imgContainer, { borderRadius: 50 - progress * 225 + "px" });
        },
      });
    }
  });

  cards.forEach((card, index) => {
    if (index === 0) return;

    const cardDescription = card.querySelector(".card-description");
    const cardTitleChars = card.querySelectorAll(".char span");

    ScrollTrigger.create({
      trigger: card,
      start: "top top",
      onEnter: () => animateContentIn(cardTitleChars, cardDescription),
      onLeaveBack: () => animateContentOut(cardTitleChars, cardDescription),
    });
  });

  setupMarqueeAnimation();
  function updateVh() {
    document.documentElement.style.setProperty(
      "--vh",
      `${window.innerHeight * 0.01}px`
    );
  }
  updateVh();
  window.addEventListener("resize", updateVh);
});


function formatTime(date) {
  const two = n => n.toString().padStart(2, '0');
  const h = two(date.getHours());
  const m = two(date.getMinutes());
  const s = two(date.getSeconds());
  return `${h}:${m}:${s}`;
}

// Updates the <span id="clock"> every second
function startClock() {
  const el = document.getElementById('clock');
  if (!el) return;

  // Set once immediately:
  el.textContent = formatTime(new Date());

  // Then update every second:
  setInterval(() => {
    el.textContent = formatTime(new Date());
  }, 1000);
}

// Kick things off after the DOM is ready
document.addEventListener('DOMContentLoaded', startClock);