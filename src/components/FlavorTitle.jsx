import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { SplitText } from "gsap/all";

const FlavorTitle = () => {
  useGSAP(() => {
    const firstTextSplit = SplitText.create(".first-text-split h1", {     // Dividimos los textos en caracteres individuales
      type: "chars",
    });
    const secondTextSplit = SplitText.create(".second-text-split h1", {
      type: "chars",
    });

    gsap.from(firstTextSplit.chars, {    // Usamos "from" para animar los caracteres desde una pocición inicial
      yPercent: 200,                     // Cada letra empieza desplazada hacia abajo un 200% de su propia altura
      stagger: 0.02,                     // Cada letra aparece con un retraso de 0.02
      ease: "power1.inOut",
      scrollTrigger: {                   // La animación se dispara cuando el 30% superior de la sección .flavor-section entra en el viewport.
        trigger: ".flavor-section",
        start: "top 30%",
        toggleActions: "play reverse play reverse",
      },
    });

    gsap.to(".flavor-text-scroll", {      // Revelamos "freaking" desde un clipPath que oculta el texto
      duration: 1,
      clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",  // hacia este clipPath que muestra un rectángulo de 100% de altura y ancho
      scrollTrigger: {
        trigger: ".flavor-section",
        start: "top 10%",                                       // Se activa un poco después de la primera animación, cuando el 10% de la sección es visible.
        toggleActions: "play reverse play reverse",
      },
    });

    gsap.from(secondTextSplit.chars, {
      yPercent: 200,
      stagger: 0.02,
      ease: "power1.inOut",
      scrollTrigger: {
        trigger: ".flavor-section",
        start: "top 1%",
        toggleActions: "play reverse play reverse",
      },
    });
  });

  return (
    <div className="general-title col-center h-full 2xl:gap-32 xl:gap-24 gap-16">
      <div className="overflow-hidden 2xl:py-0 py-3 first-text-split">
        <h1>We have 6</h1>
      </div>

      <div
        style={{
          clipPath: "polygon(0% 0%, 0% 0%, 0% 100%, 0% 100%)",
        }}
        className="flavor-text-scroll"
      >
        <div className="bg-mid-brown pb-5 2xl:pt-0 pt-3 2xl:px-5 px-3">
          <h2 className="text-milk">freaking</h2>
        </div>
      </div>

      <div className="overflow-hidden 2xl:py-0 py-3 second-text-split">
        <h1>delicious flavors</h1>
      </div>
    </div>
  );
};

export default FlavorTitle;