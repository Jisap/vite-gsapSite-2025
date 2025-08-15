import { useGSAP } from "@gsap/react"
import gsap from "gsap";
import { SplitText } from "gsap/all";


const HeroSection = () => {

  useGSAP(() => {
    const titleSplit = SplitText.create(".hero-title", {
      type: "chars",
    });

    const tl = gsap.timeline({
      delay: 1,
    });

    tl.to(".hero-content", {
      opacity: 1,                         // hero-content se vuelve visible
      y: 0,                               // se deplaza verticalmente a 0 desde su posición inicial translate-y-10
      ease: "power1.inOut",
    })
      .to(
        ".hero-text-scroll",
        {
          duration: 1,
          clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)", // Mostramos el subtitle cambiando la forma de la mascara
          ease: "circ.out",
        },
        "-=0.5" 
      )
      .from(
        titleSplit.chars,                // Mostramos el texto dividido en partes
        {
          yPercent: 200,                 // desde un 200% de y hasta su posición final
          stagger: 0.02,                 // con un retraso de 0.02 segundos entre cada letra
          ease: "power2.out",
        },
        "-=0.5"
      );

    const heroTl = gsap.timeline({
      scrollTrigger: {                       // Aplicamos un ScrollTrigger a la sección hero-container
        trigger: ".hero-container",          // El elemento que dispara la animación.
        start: "1% top",                     // La animación empieza cuando el 1% del trigger toca el top del viewport.
        end: "bottom top",                   // La animación termina cuando la parte inferior del trigger toca el top del viewport.
        scrub: true,                         // Vincula la animación al progreso del scroll.
      },
    });

    heroTl.to(".hero-container", {
      rotate: 7,                             // Conforme hacemos scroll, rotamos el hero-container desde su posicion incial hasta 0.7 grados
      scale: 0.9,                            // y aplicandole un efecto de escala de 0.9
      yPercent: 30,                          // asi como un desplazamiento vertical de 30%
      ease: "power1.inOut",
    });
  });
  

  return (
    <section className="bg-main-bg">
      <div className="hero-container">
        <img 
          src="/images/hero-img.png" 
          alt="hero-img"
          className="absolute bottom-0 left-1/2 -translate-x-1/2 object-auto scale-100 md:scale-150"
        />
        
        <div className="hero-content opacity-0">
          <div className="overflow-hidden">
            <h1 className="hero-title">Freaking Delicous</h1>
          </div>

          <div 
            style={{
              clipPath: "polygon(50% 0, 50% 0, 50% 100%, 50% 100%)", // esta mascara es una linea vertical en el centro del div. Como no tiene ancho se oculta el div
            }}
            className="hero-text-scroll"
          >
            <div className="hero-subtitle">
              <h1>Protein + Caffine </h1>
            </div>
          </div>

          <h2>
            Live life to the fullest  with SPYLT: Shatter boredom and embrace
            your inner kid with every deliciously smooth chug.
          </h2>

          <div className="hero-button">
            <p>Chug a SPYLT</p>
          </div>
        </div>
      </div>
    </section>
  )
}

export default HeroSection