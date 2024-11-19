import { AboutSection, HeroSection, NavBarHome, ContactFormSection, CaracterisitcasSection, PlanSection, FooterSection, FAQSection } from "../components";


export const HomePage = () => {
  return (
    <>
      <header>
        <NavBarHome />
      </header>

      <section>
        <HeroSection />
      </section>

      <section>
        <PlanSection/>
      </section>

      <section>
        <CaracterisitcasSection />
      </section>

      <section>
        <ContactFormSection />
      </section>

      <section>
        <FAQSection/>
      </section>

      <section>
        <AboutSection />
      </section >

      <section>
        <FooterSection/>
      </section>

    </>
  );
};

export default HomePage;
