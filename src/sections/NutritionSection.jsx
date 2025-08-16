import { useMediaQuery } from "react-responsive";
import { useEffect, useState } from "react";
import { useGSAP } from "@gsap/react";
import { SplitText } from "gsap/all";
import gsap from "gsap";
import { nutrientLists } from "../constants";

const NutritionSection = () => {

  const isMobile = useMediaQuery({
    query: "(max-width: 768px)",
  });

  const [lists, setLists] = useState(nutrientLists);

  useEffect(() => {
    if (isMobile) {
      setLists(nutrientLists.slice(0, 3));
    } else {
      setLists(nutrientLists);
    }
  }, [isMobile]);

  useGSAP(() => {
    const titleSplit = SplitText.create(".nutrition-title", {                // Dividimos los textos en caracteres individuales
      type: "chars",
    });
    const paragraphSplit = SplitText.create(".nutrition-section p", {       // Dividimos los textos en palabras individuales. Se aplican a todos los p de la sección
      type: "words, lines",
      linesClass: "paragraph-line",
    });

    const contentTl = gsap.timeline({
      scrollTrigger: {
        trigger: ".nutrition-section",                      // La animación comienza cuando la parte superior de la sección (.nutrition-section) llega al centro de la pantalla (start: "top center").
        start: "top center",
        toggleActions: "play reverse play reverse",
      },
    });
    contentTl
      .from(titleSplit.chars, {                             // Animación del nutrition-title "It still does" y a los p de la sección
        yPercent: 100,                                      // Cada letra entra deslizándose desde abajo (100% de su propia altura).
        stagger: 0.02,                                      // Se aplica un pequeño retraso de 0.02 segundos entre la animación de cada letra, 
        ease: "power2.out",
        
      })
      .from(paragraphSplit.words, {                         // Animacion del parrafo 
        yPercent: 300,                                      // Cada palabra entra desde mucho más abajo (300% de su altura). 
        rotate: 3,                                          // Entran con una ligera rotación de 3 grados.
        ease: "power1.inOut", 
        duration: 1,
        stagger: 0.01,                                      // Con un retraso aún más rápido entre cada palabra para un efecto fluido
      });

    const titleTl = gsap.timeline({
      scrollTrigger: {
        trigger: ".nutrition-section",
        start: "top 80%",
        toggleActions: "play reverse play reverse",
      },
    });

    titleTl.to(".nutrition-text-scroll", {                  //Animación del título "Body Good"
      duration: 1,
      opacity: 1,                                           // Se le aplica una opacidad de 1 para revelar el text  
      clipPath: "polygon(100% 0, 0 0, 0 100%, 100% 100%)",  // Se aplica un clipPath que tiene forma de un rectángulo de 100% de altura y ancho
      ease: "power1.inOut",
    });

  });

  return (
    <section className="nutrition-section">
      <img
        src="/images/slider-dip.png"
        alt=""
        className="w-full object-cover"
      />

      <img src="/images/big-img.png" alt="" className="big-img" />

      <div className="flex md:flex-row flex-col justify-between md:px-10 px-5 mt-14 md:mt-0">
        <div className="relative inline-block md:translate-y-20">
          <div className="general-title relative flex flex-col justify-center items-center gap-24">
            <div className="overflow-hidden place-self-start">
              <h1 className="nutrition-title">It still does</h1>
            </div>

            <div
              style={{
                clipPath: "polygon(0 0, 0 0, 0 100%, 0% 100%)",
              }}
              className="nutrition-text-scroll place-self-start"
            >
              <div className="bg-yellow-brown pb-5 md:pt-0 pt-3 md:px-5 px-3">
                <h2 className="text-milk-yellow">Body Good</h2>
              </div>
            </div>
          </div>
        </div>

        <div className="flex md:justify-center items-center translate-y-5">
          <div className="md:max-w-xs max-w-md">
            <p className="text-lg md:text-right text-balance font-paragraph">
              Milk contains a wide array of nutrients, including vitamins,
              minerals, and protein, and this is lactose free
            </p>
          </div>
        </div>

        <div className="nutrition-box">
          <div className="list-wrapper">
            {lists.map((nutrient, index) => (
              <div key={index} className="relative flex-1 col-center">
                <div>
                  <p className="md:text-lg font-paragraph">{nutrient.label}</p>
                  <p className="font-paragraph text-sm mt-2">up to</p>
                  <p className="text-2xl md:text-4xl tracking-tighter font-bold">
                    {nutrient.amount}
                  </p>
                </div>

                {index !== lists.length - 1 && (// Si no es el último elemento muestra el separador
                  <div className="spacer-border" />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default NutritionSection