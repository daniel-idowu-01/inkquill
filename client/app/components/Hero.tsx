import React from "react";
import Image from "next/image";
import Link from "next/link";
import Button from "../ui/Button";
import HeroImage from "../ui/hero-image/hero-image.svg";
import CurlyArrow from "../ui/icons/CurlyArrow";

const Hero = () => {
  return (
    <section className="flex flex-col gap-10 justify-between items-center py-10 text-center md:text-left">
      <article className="text-center md:w-[60%]">
        <p
          className="kanit-regular text-5xl lg:text-6xl uppercase"
          style={{ wordSpacing: ".5rem", letterSpacing: "2px" }}
        >
          Elevate Your Study Game with{" "}
          <span className="md:text-azure-blue">InkQuill</span>
        </p>
        <p className="text-xl my-7 md:my-5">
          Say goodbye to endless reading and hello to smarter learning. InkQuill
          transforms your notes into concise summaries and perfectly paraphrased
          text—all tailored for clarity and focus
        </p>
        <Link href="/summarizer">
          <Button whiteBg={false} label="Try It Yourself" />
        </Link>
      </article>

      <article className="relative hidden md:block">
        <div className="absolute top-10 -right-80 border border-azure-blue bg-white h-fit min-w-2 rounded-2xl p-2 px-3">
          From my note, explain Data Structures and Algorithms
        </div>
        <div className="absolute top-24 right-32 border border-azure-blue bg-white h-fit min-w-2 rounded-2xl p-2 px-3 italic">
          AI is typing...
        </div>
        <Image src={HeroImage} width={350} height={350} alt="" />
      </article>
    </section>
  );
};

export default Hero;
