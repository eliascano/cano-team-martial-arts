import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Disciplines from "./components/Disciplines";
import Schedule from "./components/Schedule";
import Events from "./components/Events";
import About from "./components/About";
import Gallery from "./components/Gallery";
import Testimonials from "./components/Testimonials";
import FAQ from "./components/FAQ";
import Footer from "./components/Footer";
import Contact from "./components/Contact";
import WhatsAppButton from "./components/WhatsAppButton";
import BackToTop from "./components/BackToTop";

function App() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <About />          
        <Disciplines />   
        <Schedule />       
        <Gallery />       
        <Events />       
        <Testimonials />  
        <FAQ />
        <Contact />     
      </main>
      <BackToTop />
      <WhatsAppButton />
      <Footer />
    </>
  );
}

export default App;
