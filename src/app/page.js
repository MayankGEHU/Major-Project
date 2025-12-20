import React from 'react'
import Nav from './components/ui/Nav'
import Hero from './components/ui/Hero'
import Footer from './components/ui/Footer'
import Preloader from './components/Preloader'
import About from './components/ui/About'
import Features from './components/ui/Features'
import OurQuality from './components/ui/OurQuality'
import Working from './components/ui/Working'
import { TestimonialsMinimal } from './components/dashboard/TestimonialsMinimal'
import ComponentDemo from './components/testimonials/ComponentDemo'

export default function page() {
  return (
    <div>
      {/* <Preloader/> */}
      <Nav/>
      <Hero/>
      <About/>
      <Features/>
      <OurQuality/>
      <Working/>
      {/* <ComponentDemo/> */}
      <Footer/>
    </div>
  )
}
