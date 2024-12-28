"use client";
import {
  NavBar,
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
  
  return (
    <main className="md:bg-cotton-white">
      <section className="text-cotton-white md:text-black bg-azure-blue md:bg-cotton-white p-7 md:px-10 lg:px-14 rounded-br-[2rem] h-svh md:h-fit">
        <Hero />
      </section>

      <section
        id="about"
        className="text-center w-[90%] lg:w-[60%] mx-auto py-10 md:pt-0 lg:pb-20"
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
    </main>
  );
}
