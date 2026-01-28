import React from 'react'
import Nav from './components/ui/Nav'
import Hero from './components/ui/Hero'
import Footer from './components/ui/Footer'
import About from './components/ui/About'
import Features from './components/ui/Features'
import OurQuality from './components/ui/OurQuality'
import Working from './components/ui/Working'
import Experience from './components/experience/Experience'
// import AboutOurExp from './components/experience/AboutOurExp'
import HeroDemo from './components/ui/herosection/HeroDemo'

export default function page() {
  return (
    <div>
      {/* <Preloader/> */}
      <Nav/>
      <Hero/>
      <About/>
      <Features/>
      <OurQuality/>
      <Experience/>
      <Working/>
      <Footer/>
    </div>
  )
}
