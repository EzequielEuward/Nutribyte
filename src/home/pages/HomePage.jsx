import { motion } from "framer-motion";
import {
  AboutSection, HeroSection, NavBarHome, ContactFormSection,
  CaracterisitcasSection, PlanSection, FooterSection,
  FAQSection, NutritionistaCards, ScrollToTopButton, SliderSection,
} from "../components";

import {
  fadeInTop,
  fadeInBottom,
  slideInLeft,
  slideInRight,
  fadeZoom,
  fadeDelayed
} from "../../constants/animations";

export const HomePage = () => {
  return (
    <>
      <header>
        <NavBarHome />
      </header>


      <HeroSection />


      <SliderSection />

      <motion.section id="features" variants={slideInLeft} initial="hidden" whileInView="visible" viewport={{ once: true }}>
        <CaracterisitcasSection />
      </motion.section>

      <motion.section id="plans" variants={fadeInBottom} initial="hidden" whileInView="visible" viewport={{ once: true }}>
        <PlanSection />
      </motion.section>

      <motion.section id="contact" variants={slideInRight}  whileInView="visible" viewport={{ once: true }}>
        <ContactFormSection />
      </motion.section>


      <motion.section id="faq" variants={fadeZoom} initial="hidden" whileInView="visible" viewport={{ once: true }}>
        <FAQSection />
      </motion.section>

      <motion.section id="about" variants={fadeInBottom} initial="hidden" whileInView="visible" viewport={{ once: true }}>
        <AboutSection />
      </motion.section>

      <motion.section id="nutritionists" variants={fadeDelayed} initial="hidden" whileInView="visible" viewport={{ once: true }}>
        <NutritionistaCards />
      </motion.section>

      <motion.section id="footer" variants={fadeInTop} initial="hidden" whileInView="visible" viewport={{ once: true }}>
        <FooterSection />
      </motion.section>

      <ScrollToTopButton />
    </>
  );
};

export default HomePage;
