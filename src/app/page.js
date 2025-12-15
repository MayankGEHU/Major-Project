import React from 'react'
import Nav from './components/ui/Nav'
import Hero from './components/ui/Hero'
import Footer from './components/ui/Footer'
import Preloader from './components/Preloader'
import About from './components/ui/About'
import Features from './components/ui/Features'
import OurQuality from './components/ui/OurQuality'

export default function page() {
  return (
    <div>
      <Preloader/>
      <Nav/>
      <Hero/>
      <About/>
       <Features/>
       <OurQuality/>
      <Footer/>
    </div>
  )
}
