"use client";
import { motion, useScroll } from "framer-motion";
import { useState, useEffect } from "react";
import {
  Hero,
  Summarize,
  Paraphrase,
  FAQs,
  Newsletter,
  Footer,
} from "./components";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  const { scrollY } = useScroll();
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    return scrollY.onChange((latest) => {
      setIsScrolled(latest > 100);
    });
  }, [scrollY]);

  return (
    <main className="relative min-h-screen md:bg-cotton-white">
      {/* Fixed Hero Section */}
      <motion.section
        className="fixed w-full"
        style={{
          zIndex: isScrolled ? 0 : 20,
          pointerEvents: isScrolled ? "none" : "auto"
        }}
        animate={{
          opacity: isScrolled ? 0.9 : 1
        }}
        transition={{ duration: 0.5 }}
      >
        <div className="text-cotton-white md:text-black bg-azure-blue md:bg-cotton-white p-7 md:px-10 lg:px-14 rounded-br-[2rem] h-svh md:h-fit">
          <Hero />
        </div>
      </motion.section>

      {/* Scrollable Content */}
      <motion.div
        className="relative"
        initial={{ opacity: 0 }}
        animate={{
          opacity: 1
        }}
        transition={{ duration: 0.5 }}
      >
        {/* Spacer to push content below hero */}
        <div className="h-screen" />

        {/* Content that overlaps */}
        <motion.div 
          className="relative bg-cotton-white rounded-t-[2rem]"
          style={{
            zIndex: isScrolled ? 20 : 10
          }}
          transition={{ duration: 0.3 }}
        >
          <section
            id="about"
            className="text-center w-[90%] lg:w-[60%] mx-auto py-10 md:pt-16 lg:pb-20"
          >
            <p className="text-black text-2xl md:text-4xl tracking-wide mb-3">
              What is Ink
              <span className="text-azure-blue font-semibold">Quill?</span>
            </p>
            <p className="opacity-70">
              Welcome to InkQuill, your virtual assistant for notes! Our goal is to
              help you manage and comprehend your notes more easily. We understand
              how demanding college life can be. InkQuill is more than simply an
              app; it&apos;s your study companion on the road to academic success.
            </p>
          </section>

          <section>
            <Summarize />
          </section>

          <section id="features">
            <Paraphrase />
          </section>

          <section id="faqs">
            <FAQs />
          </section>

          <section>
            <Newsletter />
          </section>

          <Footer />
        </motion.div>
      </motion.div>
    </main>
  );
}