import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { SplitText } from "gsap/all";

const MessageSection = () => {

  useGSAP(() => {
    const firstMsgSplit = SplitText.create(".first-message", {          // Dividimos los textos en palabras
      type: "words",
    });
    const secMsgSplit = SplitText.create(".second-message", {
      type: "words",
    });
    const paragraphSplit = SplitText.create(".message-content p", {     // Dividimos los párrafos en palabras y líneas. Permite animar la entrada de cada palabra de forma escalonada 
      type: "words, lines",
      linesClass: "paragraph-line",
    });


    // Animación para la 1ª frase
    gsap.to(firstMsgSplit.words, {          // Cambia el color de las palabras de gris a un color crema conforme se hace scroll
      color: "#faeade",                     // color objetivo crema
      ease: "power1.in",
      stagger: 1,                           // Las palabras se animan secuencialmente
      scrollTrigger: {
        trigger: ".message-content",        
        start: "top center",                // Empieza cuando el tope de la sección llega al centro de la pantalla
        end: "30% center",                  // Termina cuando el 30% de la sección ha pasado el centro 
        scrub: true,                        // Vincula la animación al scroll
      },
    });
    // Animación para la 2ª frase
    gsap.to(secMsgSplit.words, {
      color: "#faeade",
      ease: "power1.in",
      stagger: 1,
      scrollTrigger: {
        trigger: ".second-message",
        start: "top center",
        end: "bottom center",                // La animación dura mientras la frase pasa por el centro
        scrub: true,
      },
    });

    // Animación de revelado "Fuel Up"
    const revealTl = gsap.timeline({
      delay: 1,
      scrollTrigger: {
        trigger: ".msg-text-scroll",
        start: "top 60%",
        toggleActions: "play reverse play reverse",
      },
    });
    revealTl.to(".msg-text-scroll", {
      duration: 1,
      clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)", // Se expande desde una línea a un rectángulo
      ease: "circ.inOut",
      
    });
   

    // Animación del párrafo final
    const paragraphTl = gsap.timeline({
      scrollTrigger: {
        trigger: ".message-content p",
        start: "top center",                                    // Se activa cuando el párrafo llega al centro
        toggleActions: "play reverse play reverse",
      },
    });
    paragraphTl.from(paragraphSplit.words, {
      yPercent: 120,
      rotate: 3,
      ease: "power1.inOut",
      duration: 1,
      stagger: 0.01,
      
    });
  });

  return (
    <section className="message-content">
      <div className="container mx-auto flex-center py-28 relative">
        <div className="w-full h-full">
          <div className="msg-wrapper">
            <h1 className="first-message">Stir up your fearless past and</h1>

            <div
              style={{
                clipPath: "polygon(0% 0%, 0% 0%, 0% 100%, 0% 100%)",
              }}
              className="msg-text-scroll"
            >
              <div className="bg-light-brown md:pb-5 pb-3 px-5">
                <h2 className="text-red-brown">Fuel Up</h2>
              </div>
            </div>

            <h1 className="second-message">
              your future with every gulp of Perfect Protein
            </h1>
          </div>

          <div className="flex-center md:mt-20 mt-10">
            <div className="max-w-md px-10 flex-center overflow-hidden">
              <p className="final-paragraph">
                Rev up your rebel spirit and feed the adventure of life with
                SPYLT, where you’re one chug away from epic nostalgia and
                fearless fun.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default MessageSection