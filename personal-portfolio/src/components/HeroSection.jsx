import { useState, useEffect } from "react";
import image from "../images/image.png";
import { BsArrowRightCircle } from "react-icons/bs";
import "animate.css";
import { useInView } from "react-intersection-observer";

const HeroSection = () => {
  const [loopNum, setLoopNum] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [text, setText] = useState("");
  // faster base typing interval
  const [delta, setDelta] = useState(120 - Math.random() * 50);
  const [index, setIndex] = useState(1);

  const toRotate = ["Web Developer", "Web Designer", "UI/UX Designer"];
  // shorter pause before deleting
  const period = 1000;

  useEffect(() => {
    const ticker = setInterval(() => {
      tick();
    }, delta);

    return () => clearInterval(ticker);
  }, [text]);

  const tick = () => {
    const i = loopNum % toRotate.length;
    const fullText = toRotate[i];
    const updatedText = isDeleting
      ? fullText.substring(0, text.length - 1)
      : fullText.substring(0, text.length + 1);

    setText(updatedText);

    if (isDeleting) {
      // speed up deleting more aggressively
      setDelta((prev) => prev / 3);
    }

    if (!isDeleting && updatedText === fullText) {
      setIsDeleting(true);
      setIndex((prev) => prev - 1);
      setDelta(period);
    } else if (isDeleting && updatedText === "") {
      setIsDeleting(false);
      setLoopNum(loopNum + 1);
      setIndex(1);
      // set a faster base after finishing deletion
      setDelta(200);
    } else {
      setIndex((prev) => prev + 1);
    }
  };

  // Intersection Observers
  const { ref: leftRef, inView: leftVisible } = useInView({
    triggerOnce: true,
  });

  const { ref: rightRef, inView: rightVisible } = useInView({
    triggerOnce: true,
  });

  return (
    <section
      id="hero"
      className="w-full min-h-screen flex items-center py-20"
    >
      <div className="max-w-7xl mx-auto px-6 w-full">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">

          {/* LEFT CONTENT */}
          <div
            ref={leftRef}
            className={`${leftVisible ? "animate__animated animate__fadeIn" : ""}`}
          >
            <span className="text-sm uppercase tracking-wide text-primary font-semibold">
              Welcome to my Portfolio
            </span>

            <h1 className="text-4xl md:text-5xl font-bold mt-4">
              Hi! I'm Joshua Gayoba{" "}
              <span className="text-primary">{text}</span>
            </h1>

            {/* <p className="mt-6 text-gray-700 dark:text-gray-300 leading-relaxed max-w-xl">
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry’s standard dummy text
              ever since the 1500s.
            </p> */}

            {/* <button
              onClick={() => console.log("connect")}
              className="mt-8 flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-full transition-all"
            >
              Let’s Connect <BsArrowRightCircle size={25} />
            </button> */}
          </div>

          {/* RIGHT IMAGE */}
          <div ref={rightRef} className={`${rightVisible ? "animate__animated animate__zoomIn" : ""}`}>
            <div className="home-img flex items-center justify-center">
              <div className="img-box relative flex items-center justify-center">
                <div className="img-item relative w-full h-full rounded-full overflow-hidden flex items-center justify-center">
                  <img src={image} alt="Header" className="block w-[85%] rounded-full object-cover" />
                </div>
              </div>
            </div>

            {/* Scoped styles for the rotating conic border and animation */}
            <style>{`
              .home-img .img-box {
                position: relative;
                width: 32vw;
                height: 32vw;
                border-radius: 50%;
                padding: 5px;
                display: flex;
                justify-content: center;
                align-items: center;
                overflow: hidden;
              }

              .home-img .img-box::before,
              .home-img .img-box::after {
                content: '';
                position: absolute;
                width: 450px;
                height: 450px;
                /* Light mode (default) border color */
                background: conic-gradient(transparent, transparent, transparent, hsl(250 47% 60%));
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%) rotate(0deg);
                border-radius: 50%;
                animation: rotate-border 10s linear infinite;
                z-index: 0;
                opacity: 0.9;
              }

              .home-img .img-box::after { animation-delay: -5s; }

              /* Dark mode: override the rotating border color */
              .dark .home-img .img-box::before,
              .dark .home-img .img-box::after {
                background: conic-gradient(transparent, transparent, transparent, hsl(149 76% 40%));
              }

              @keyframes rotate-border { 100% { transform: translate(-50%, -50%) rotate(360deg); } }

              .home-img .img-box .img-item {
                position: relative;
                width: 100%;
                height: 100%;
                background: transparent;
                border-radius: 50%;
                border: 0.1px solid transparent;
                display: flex;
                justify-content: center;
                align-items: center;
                z-index: 1;
                overflow: hidden;
              }

              .home-img .img-box .img-item img {
                /* center the image inside the circular box */
                position: static;
                top: auto;
                display: block;
                width: 90%;
                height: 90%;
                object-fit: cover;
                margin: 0 auto;
                mix-blend-mode: normal;
              }

              /* Responsive caps to avoid huge sizes on small screens */
              @media (max-width: 640px) {
                .home-img .img-box { width: 220px; height: 220px; }
              }
            `}</style>
          </div>
          

        </div>
      </div>
    </section>
  );
};

export default HeroSection;
