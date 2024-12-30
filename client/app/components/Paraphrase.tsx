import React from "react";
import Link from "next/link";
import Image from "next/image";
import Button from "../ui/Button";

const Paraphrase = () => {
  return (
    <section className="flex flex-col-reverse lg:flex-row gap-10 lg:gap-0 justify-between items-center p-10 lg:p-20 rounded-tr-3xl rounded-bl-3xl">
      <article className="lg:w-1/2">
        <p className="text-4xl font-semibold">
          Paraphrase <span className="text-azure-blue">Notes</span>{" "}
        </p>
        <p className="text-justify md:text-left my-5 text-lg opacity-70">
          Paraphrasing is the art of expressing an idea in your own words while
          maintaining its essence. It&apos;s like putting information into a new
          language to showcase your understanding. Instead of simply repeating
          what someone else has said, you reframe it. Paraphrasing is a helpful
          skill in writing because it lets you present information in your own
          way without copying directly from the source. It&apos;s a way to use your
          own voice to discuss someone else&apos;s ideas, which comes in handy,
          especially when working on projects to steer clear of plagiarism.
        </p>
        <div className="bg-azure-blue md:bg-transparent w-fit rounded-md">
          <Link href="/summarizer">
            <Button whiteBg={false} label="Get Started" />
          </Link>
        </div>
      </article>

      <article className="lg:w-1/2 flex justify-end">
        <Image src="/images/paraphrase.png" width={500} height={500} alt="" className="border border-azure-blue rounded-md p-2 pb-0" />
      </article>
    </section>
  );
};

export default Paraphrase;
