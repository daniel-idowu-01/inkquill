import NavBar from "./components/NavBar";
import Hero from "./components/Hero";
import Summarize from "./components/Summarize";

export default function Home() {
  return (
    <main className="md:bg-cotton-white">
      <section className="text-cotton-white md:text-black bg-azure-blue md:bg-cotton-white p-7 md:px-10 lg:px-14 rounded-br-[2rem] h-svh">
        <NavBar />
        <Hero />
      </section>

      <section className="text-center w-[80%] lg:w-[60%] mx-auto py-10 lg:py-20">
        <p className="text-black text-2xl md:text-4xl tracking-wide mb-3">
          What is Ink
          <span className="text-azure-blue font-semibold">Quill?</span>
        </p>
        <p className="opacity-70">
          Welcome to InkQuill, your virtual assistant for notes! Our goal is to
          help you manage and comprehend your notes more easily. We understand
          how demanding college life can be. InkQuill is more than simply an
          app; it's your study companion on the road to academic success.
        </p>
      </section>

      <section>
        <Summarize />
      </section>
    </main>
  );
}
