import { AboutSection, HeroSection, NavBarHome, ContactFormSection, CaracterisitcasSection, PlanSection, FooterSection, FAQSection } from "../components";
import {ScrollToTopButton} from "../components";


export const HomePage = () => {
  return (
    <>
      <header>
        <NavBarHome />
      </header>

      <section id="hero">
        <HeroSection />
      </section>

      <section id="plans">
        <PlanSection />
      </section>

      <section id="features">
        <CaracterisitcasSection />
      </section>

      <section id="contact">
        <ContactFormSection />
      </section>

      <section id="faq">
        <FAQSection />
      </section>

      <section id="about">
        <AboutSection />
      </section>

      <section id="about">
        <FooterSection />
      </section>

      <ScrollToTopButton /> {/* ⬅️ Botón flotante */}
    </>
  );
};

export default HomePage;
