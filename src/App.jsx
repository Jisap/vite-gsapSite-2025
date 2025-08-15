import React from 'react'
import Navbar from './components/Navbar'
import HeroSection from './sections/HeroSEction'
import gsap from 'gsap';
import { ScrollSmoother, ScrollTrigger } from 'gsap/all';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

const App = () => {

  useGSAP(() => {
    ScrollSmoother.create({
      smooth: 3,
      effects: true,
    });
  })

  return (
    <div>
      <Navbar />
      <HeroSection />
      <div className='h-dvh border border-red-500' />
    </div>
  )
}

export default App