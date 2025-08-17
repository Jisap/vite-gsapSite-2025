import React from 'react'
import Navbar from './components/Navbar'
import HeroSection from './sections/HeroSEction'
import gsap from 'gsap';
import { ScrollSmoother, ScrollTrigger } from 'gsap/all';
import { useGSAP } from '@gsap/react';
import MessageSection from './sections/MessageSection';
import FlavorSection from './sections/FlavorSection';
import NutritionSection from './sections/NutritionSection';
import BenefitSection from './sections/BenefitSection';
import TestimonialSection from './sections/TestimonialSection';
import FooterSection from './sections/FooterSection';

gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

const App = () => {

  useGSAP(() => { // No es necesario especificar el scope, ya que el hook se ejecuta en el contexto del componente
    ScrollSmoother.create({
      smooth: 3,                  // Define en segundos cuánto tardará el contenido en alcanzar la posición del scroll 
      effects: true,              // Le dice a GSAP que busque atributos en el html para crear efectos de parallax
    });
  })

  return (
    <div>
      <Navbar />
      <div id="smooth-wrapper">
        <div id="smooth-content">
          <HeroSection />
          <MessageSection />
          <FlavorSection />
          <NutritionSection />

          <div>
            <BenefitSection />
            <TestimonialSection />
          </div>

          <FooterSection />
        </div>
      </div>
    </div>
  )
}

export default App