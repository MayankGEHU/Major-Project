import React from 'react'
import Nav from './components/ui/Nav'
import Hero from './components/ui/Hero'
import ProfileHeader from './components/ui/ProfileHeader'
import MainFeature from './components/ui/MainFeature'
import Footer from './components/ui/Footer'
import HeroSection from './components/HeroSection'
import Preloader from './components/Preloader'
import About from './components/ui/About'

export default function page() {
  return (
    <div>
      <Preloader/>
      <Nav/>
      <Hero/>
      <About/>
       {/* <MainFeature/> */}
      <Footer/>
    </div>
  )
}
