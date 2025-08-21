import { useGSAP } from "@gsap/react";
import { flavorlists } from "../constants/index";
import gsap from "gsap";
import { useRef } from "react";
import { useMediaQuery } from "react-responsive";

const FlavorSlider = () => {
  const sliderRef = useRef();

  const isTablet = useMediaQuery({                                             // 1. Lógica responsiva
    query: "(max-width: 1024px)",                                              // detecta si el ancho de la pantalla es de 1024 px o menos
  });                                                                          // Esto es importante porque en dispositivos móviles no hay scroll horizontal

  useGSAP(() => {
    const scrollAmount = sliderRef.current.scrollWidth - window.innerWidth;    // Se calcula la distancia total que se puede desplazar horizontalmente (scrollWidth) y se le resta el ancho de la ventana (innerWidth). Esto da la cantidad exacta de píxeles necesarios para mostrar todo el contenido horizontal

    if (!isTablet) {                                                           // 2. Animación de scroll horizontal (solo para escritorio)
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: ".flavor-section",                                                                                    
          start: "2% top",                                                     // La animación comienza cuando el 2% superior de la sección llega al top del viewport.
          end: `+=${scrollAmount + 1500}px`,                                   // La animación termina se llega al final del scrollAmount. Se le suma 1500 para alargar el scroll
          scrub: true,                                                         // Vincula el progreso de la animación directamente con la barra de scroll
          pin: true,                                                           // "Fija" la sección .flavor-section en la pantalla mientras la animación se ejecuta. El usuario sigue haciendo scroll vertical, pero la sección permanece visible.
        },
      });

      tl.to(".flavor-section", {
        x: `-${scrollAmount + 1500}px`,                                        // Esta es la animación en sí. Mueve toda la sección.flavor-section` hacia la izquierda.
        ease: "power1.inOut",
      });

      // 3. Animación de parallax para los elementos de frutas
      gsap.to(".elements", {
        x: 250, // Mueve los elementos hacia la derecha para crear el efecto parallax. Puedes ajustar este valor para cambiar la velocidad del efecto.
        ease: "none",
        scrollTrigger: {
          trigger: ".flavor-section",
          start: "2% top",
          end: `+=${scrollAmount + 1500}px`,
          scrub: true,
        },
      });
    }

    // 4. Animación de parallax para los títulos
    const titleTl = gsap.timeline({
      scrollTrigger: {
        trigger: ".flavor-section",
        start: "top top",
        end: "bottom 80%",
        scrub: true,
      },
    });

    titleTl
      .to(".first-text-split", {
        xPercent: -30, // efecto parallax para el texto "We have 6"
        ease: "power1.inOut",
      })
      .to(
        ".flavor-text-scroll",
        {
          xPercent: -22, // efecto parallax para el texto "Freaking"
          ease: "power1.inOut",
        },
        "<"
      )
      .to(
        ".second-text-split",
        {
          xPercent: -10, // efecto parallax para el texto "delicious flavors"
          ease: "power1.inOut",
        },
        "<"
      );
  });

  return (
    <div ref={sliderRef} className="slider-wrapper">
      <div className="flavors">
        {flavorlists.map((flavor) => (
          <div
            key={flavor.name}
            className={`relative z-30 lg:w-[50vw] w-96 lg:h-[70vh] md:w-[90vw] md:h-[50vh] h-80 flex-none ${flavor.rotation}`}
          >
            <img
              src={`/images/${flavor.color}-bg.svg`}
              alt=""
              className="absolute bottom-0"
            />

            <img
              src={`/images/${flavor.color}-drink.webp`}
              alt=""
              className="drinks"
            />

            <img
              src={`/images/${flavor.color}-elements.webp`}
              alt=""
              className="elements"
            />

            <h1>{flavor.name}</h1>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FlavorSlider;