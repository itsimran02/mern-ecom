import { ArrowLeft, ArrowRight } from "lucide-react";
import TestimonialCards from "../ui/TestimonialCards";
import { useRef } from "react";

const Testimonials = () => {
  const prevRe = useRef(null);
  const nextRef = useRef(null);

  return (
    <section className="">
      <div className="flex justify-between items-center max-w-[1620px] w-full mx-auto px-3 md:px-6 py-[50px] md:py-[70px]">
        <h2 className="heading-secondary font-main">
          OUR HAPPY CUSTOMERS
        </h2>
        <div className="flex gap-2">
          <button ref={prevRe} className="cursor-pointer">
            <ArrowLeft />
          </button>

          <button
            disabled={true}
            ref={nextRef}
            className="cursor-pointer"
          >
            <ArrowRight />
          </button>
        </div>
      </div>
      <TestimonialCards
        prevRef={prevRe}
        nextRef={nextRef}
      />
    </section>
  );
};

export default Testimonials;
