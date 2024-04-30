import Image from "next/image";
import NavBar from "./components/NavBar";
import Button from "./ui/Button";
import HeroImage from './ui/hero-image/hero-image.svg'
import Link from "next/link";

export default function Home() {
  return (
    <main className="md:bg-cotton-white h-screen">
      <div className="bg-azure-blue md:bg-cotton-white p-7 px-10">
        <NavBar />

        <section className="flex justify-between items-center py-20 md:py-32">
          <article className="w-[60%]">
            <p className="kanit-semibold text-7xl uppercase leading-tight">Tap into the strength of your notes</p>
            <p className="text-xl my-5">Work intelligently rather than simply putting in more effort</p>
            <Button label='Try It Yourself' />
          </article>

          <article>
            <Image src={HeroImage} width={500} height={500} alt="" />
          </article>
        </section>
      </div>
    </main>
  );
}
