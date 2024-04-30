import Image from "next/image";
import NavBar from "./components/NavBar";
import Button from "./ui/Button";
import HeroImage from "./ui/hero-image/hero-image.svg";
import Link from "next/link";

export default function Home() {
  return (
    <main className="md:bg-cotton-white">
      <div className="text-cotton-white md:text-black bg-azure-blue md:bg-cotton-white p-7 md:px-10 rounded-br-[2rem] h-svh">
        <NavBar />

        <section className="flex flex-col md:flex-row justify-between items-center gap-10 md:gap-0 py-24 md:py-32 text-center md:text-left">
          <article className="md:w-[60%]">
            <p className="kanit-semibold text-5xl md:text-7xl uppercase leading-tight">
              Tap into the <span className="md:text-azure-blue">strength</span>{" "}
              of your notes
            </p>
            <p className="text-xl my-7 md:my-5">
              Work intelligently rather than simply putting in more effort
            </p>
            <Button label="Try It Yourself" />
          </article>

          <article className="hidden md:block">
            <Image src={HeroImage} width={500} height={500} alt="" />
          </article>
        </section>
      </div>

      <div>
        sksksk
      </div>
    </main>
  );
}
