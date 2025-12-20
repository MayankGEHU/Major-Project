import React from 'react'
import Nav from './components/ui/Nav'
import Hero from './components/ui/Hero'
import Footer from './components/ui/Footer'
import About from './components/ui/About'
import Features from './components/ui/Features'
import OurQuality from './components/ui/OurQuality'
import Working from './components/ui/Working'

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
      <Footer/>
    </div>
  )
}
