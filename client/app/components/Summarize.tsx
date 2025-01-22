import React from "react";
import Link from "next/link";
import Image from "next/image";
import Button from "../ui/Button";

const Summarize = () => {
  return (
    <section className="flex flex-col lg:flex-row gap-10 lg:gap-0 items-center bg-azure-blue p-10 lg:p-20 rounded-tr-3xl rounded-bl-3xl">
      <article className="lg:w-1/2">
        <Image
          src="/images/summarize.png"
          width={500}
          height={500}
          alt=""
          className="rounded-md"
        />
      </article>
      <article className="lg:w-1/2 text-cotton-white">
        <p className="text-4xl font-semibold">Summarize Notes</p>
        <p className="text-justify md:text-left my-5 text-lg">
          InkQuill utilizes advanced artificial intelligence to condense your
          lengthy notes into concise summaries. We appreciate that learning
          isn&apos;t just about amassing information, but also about
          understanding it deeply. With InkQuill&apos;s intelligent
          summarization feature, your notes are distilled into key points,
          ensuring that your study sessions are both targeted and productive.
        </p>
        <Link href="/summarizer">
          <Button whiteBg={true} label="Get Started" />
        </Link>
      </article>
    </section>
  );
};

export default Summarize;
