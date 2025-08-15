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
  })

  return (
    <section className="bg-main-bg">
      <div className="hero-container">
        <img 
          src="/images/static-img.png" 
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