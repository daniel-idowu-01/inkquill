import React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { faqs } from "../data/data";

const FAQs = () => {
  return (
    <div className="py-20 flex flex-col lg:flex-row gap-10 lg:gap-0 justify-center items-center bg-azure-blue p-10 lg:p-20 rounded-tr-3xl rounded-bl-3xl text-cotton-white">
      <section className="lg:w-[70%]">
        <p className="kanit-semibold text-center text-3xl md:text-4xl tracking-wide mb-3">
          Frequently Asked Questions
        </p>

        <main className="text-lg md:text-xl">
          {faqs.map((faq, index) => (
            <Accordion key={index} type="single" collapsible>
              <AccordionItem value={`item-${index + 1}`}>
                <AccordionTrigger>{faq.trigger}?</AccordionTrigger>
                <AccordionContent className="text-lg">
                  {faq.content}
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          ))}
        </main>
      </section>
    </div>
  );
};

export default FAQs;
