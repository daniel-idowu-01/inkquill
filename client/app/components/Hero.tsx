import React from "react";
import Image from "next/image";
import Link from "next/link";
import Button from "../ui/Button";
import HeroImage from "../ui/hero-image/hero-image.svg";

const Hero = () => {
  return (
    <section className="flex flex-col md:flex-row justify-between items-center gap-10 md:gap-0 py-24 md:py-32 text-center md:text-left">
      <article className=" md:w-1/2 lg:w-[60%]">
        <p className="kanit-semibold text-5xl lg:text-7xl uppercase leading-snug">
          Tap into the <span className="md:text-azure-blue">strength</span> of
          your notes
        </p>
        <p className="text-xl my-7 md:my-5">
          Work intelligently rather than simply putting in more effort
        </p>
        <Link href="/summarizer">
          <Button whiteBg={false} label="Try It Yourself" />
        </Link>
      </article>

      <article className="hidden md:block">
        <Image src={HeroImage} width={500} height={500} alt="" />
      </article>
    </section>
  );
};

export default Hero;
