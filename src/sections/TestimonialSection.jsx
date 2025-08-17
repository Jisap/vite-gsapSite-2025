
import { useRef } from "react";
import { cards } from "../constants";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

const TestimonialSection = () => {

  const vdRef = useRef([]);

  const handlePlay = (index) => {
    const video = vdRef.current[index];
    video.play();
  };

  const handlePause = (index) => {
    const video = vdRef.current[index];
    video.pause();
  };

  useGSAP(() => {
    gsap.set(".testimonials-section", {         // Se posiciona toda la sección por encima de la sección anterior con un marginTop negativo (marginTop: "-140vh").
      marginTop: "-140vh",                      // Esto crea un efecto de solapamiento, donde esta sección de testimonios parece deslizarse por encima de la anterior a medida que el usuario hace scroll.  
    });                                         // En tamaño movíl esta sección se sube tanto que tapa por completo los cuatro títulos de la sección anterior y solo queda visible su <p> inicial</p>

    const tl = gsap.timeline({                  // 1º Se crea un timeline para el scrollTrigger. Objetivo crear un efecto parallax con los títulos mientras la sección se desplaza hacia arriba.
      scrollTrigger: {
        trigger: ".testimonials-section",       // Se vincula el scrollTrigger a la sección de testimonios.
        start: "top bottom",                    // La animación comienza en el instante en que la parte superior del trigger (top) toca la parte inferior del viewport (bottom). Es decir, justo cuando la sección empieza a aparecer en pantalla.
        end: "200% top",                        // La animación termina cuando la parte superior del trigger ha viajado una distancia equivalente al 200% de la altura del viewport por encima de la parte superior de la pantalla.
        scrub: true,                            // Se vincula el progreso de la animación directamente a la posición del scroll
      },
    });

    tl.to(".testimonials-section .first-title", { xPercent: 70 })           // Anima el título "What's" para que se desplace hacia la derecha un 70% de su propio ancho.
      .to(".testimonials-section .sec-title", { xPercent: 25 }, "<")        // Anima el título "What's" para que se desplace hacia la derecha un 70% de su propio ancho. 
      .to(".testimonials-section .third-title", { xPercent: -50 }, "<");    // Anima el título "Talking" para que se desplace un 50% a la izquierda.
                                                                            // "<" indica que se inicia esta animación al mismo tiempo que la animación anterior en la línea de tiempo
    
    const pinTl = gsap.timeline({               // 2º Se crea un Timeline de Fijación y Aparición de Tarjetas (pinTl)
      scrollTrigger: {
        trigger: ".testimonials-section",       // Mismo trigger que antes
        start: "10% top",                       // La animación (y la fijación) comienza cuando la sección está a un 10% de la parte superior del viewport.
        end: "200% top",                        // La animación se completará y la sección se "desfijará" una vez que el usuario haya hecho scroll por una distancia equivalente al 200% de la altura del viewport.
        scrub: 1.5,                             // Similar a scrub: true, pero con un suavizado. La animación tardará 1.5 segundos en "alcanzar" la posición del scroll, lo que le da un tacto más suave y menos mecánico.
        pin: true,                              // "Fija" el elemento trigger en su posición (start) mientras el usuario sigue haciendo scroll. El resto de la página se desplaza por debajo.
      },
    });

    pinTl.from(".vd-card", {                    // pinTl anima todos los elementos de clase .vd-card desde los valores aqui expecificados hasta su estado final definido en el css
      yPercent: 150,                            // Las tarjetas comienzan en una posición un 150% de su propia altura por debajo de su destino final (es decir, fuera de la pantalla por abajo).
      stagger: 0.2,                             // Esta es la propiedad que crea el efecto de cascada. Cada tarjeta .vd-card comenzará su animación 0.2 segundos después de la anterior. Esto hace que aparezcan una tras otra de forma fluida y no todas a la vez.
      ease: "power1.inOut",
    });
  });



  return (
    <section className="testimonials-section relative z-10">
      <div className="absolute size-full flex flex-col items-center pt-[5vw]">
        <h1 className="text-black first-title">What's</h1>
        <h1 className="text-light-brown sec-title">Everyone</h1>
        <h1 className="text-black third-title">Talking</h1>
      </div>

      <div className="pin-box">
        {cards.map((card, index) => (
          <div
            key={index}
            className={`vd-card ${card.translation} ${card.rotation}`}
            onMouseEnter={() => handlePlay(index)}
            onMouseLeave={() => handlePause(index)}
          >
            <video 
              ref={(el) => (vdRef.current[index] = el)}
              src={card.src}
              playsInline
              muted
              loop
              className="size-full object-cover"
            />
          </div>
        ))}
      </div>
    </section>
  )
}

export default TestimonialSection