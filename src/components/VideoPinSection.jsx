import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useMediaQuery } from "react-responsive";

const VideoPinSection = () => {

  const isMobile = useMediaQuery({
    query: "(max-width: 768px)",
  });

  useGSAP(() => {
    if (!isMobile) {                         // La animación solo se aplica en desktop
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: ".vd-pin-section",        // El elemento que dispara todo es .vd-pin-section 
          start: "-15% top",                 // Empieza un 15% por encima del top de la sección
          end: "200% top",                   // Termina cuando el 200% de la sección llega al top
          scrub: 1.5,                        // Vincula la animación al scroll
          pin: true,                         // La sección se fija un poco antes de que aparezca por completo. Se sigue haciendo scroll pero la sección se queda fija. Se desfija cuando el 215% llega al top
        },
      });

      tl.to(".video-box", {
        clipPath: "circle(100% at 50% 50%)",  // Cuando entra animación se aplica un clipPath circular del 100% de altura y ancho
        ease: "power1.inOut",
      });
    }
  });

  return (
    <section className="vd-pin-section">
      <div
        style={{
          clipPath: isMobile
            ? "circle(100% at 50% 50%)"  // clipPath para moviles
            : "circle(6% at 50% 50%)",   // clipPath para desktop
        }}
        className="size-full video-box"
      >
        <video src="/videos/pin-video.mp4" playsInline muted loop autoPlay />

        <div className="abs-center md:scale-100 scale-200">
          <img src="/images/circle-text.svg" alt="" className="spin-circle" />
          <div className="play-btn">
            <img
              src="/images/play.svg"
              alt=""
              className="size-[3vw] ml-[.5vw]"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default VideoPinSection;