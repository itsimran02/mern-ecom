import { useEffect, useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, FreeMode } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import renderStars from "../../utils/renderStars";

const testimonialData = [
  {
    name: "Sarah Adam",
    rating: 5,
    message:
      "Absolutely love the product! Super fast delivery and great quality.",
  },
  {
    name: "John Doe",
    rating: 4,
    message:
      "Great experience overall, will definitely shop again.",
  },
  {
    name: "Emily Smith",
    rating: 5,
    message:
      "Product exceeded my expectations. Highly recommend!",
  },
  {
    name: "Michael Brown",
    rating: 3,
    message:
      "Decent product, but delivery took longer than expected.",
  },
  {
    name: "Jessica Lee",
    rating: 4,
    message:
      "Good value for money. Satisfied with my purchase.",
  },
  {
    name: "Daniel Kim",
    rating: 5,
    message:
      "Fantastic customer service and high-quality product!",
  },
  {
    name: "Olivia Garcia",
    rating: 5,
    message:
      "Loved the packaging and the attention to detail!",
  },
  {
    name: "William Johnson",
    rating: 4,
    message:
      "Product works well. The website was easy to navigate.",
  },
  {
    name: "Sophia Martinez",
    rating: 5,
    message:
      "Quick delivery and the product is exactly as described.",
  },
  {
    name: "David Wilson",
    rating: 4,
    message:
      "Smooth experience, though prices could be more competitive.",
  },
  {
    name: "Ava Davis",
    rating: 5,
    message:
      "Top-notch quality and fast shipping. Highly recommended!",
  },
  {
    name: "Liam White",
    rating: 5,
    message:
      "Excellent! Everything from checkout to delivery was perfect.",
  },
  {
    name: "Isabella Thomas",
    rating: 4,
    message:
      "Really happy with the service. Product is good too!",
  },
  {
    name: "James Harris",
    rating: 3,
    message:
      "The product is okay, but packaging was a bit damaged.",
  },
  {
    name: "Mia Clark",
    rating: 5,
    message:
      "Perfect experience! Will definitely recommend to friends.",
  },
  {
    name: "Benjamin Lewis",
    rating: 4,
    message:
      "Good purchase. Delivery was a little slow though.",
  },
  {
    name: "Charlotte Hall",
    rating: 5,
    message:
      "The product quality is amazing! Will buy again.",
  },
  {
    name: "Noah Allen",
    rating: 4,
    message:
      "The checkout process was easy and product is worth the price.",
  },
  {
    name: "Amelia Young",
    rating: 5,
    message:
      "Impressed with how quickly I got my order. Very happy!",
  },
  {
    name: "Elijah King",
    rating: 4,
    message:
      "Nice product. Could improve on packaging but overall good.",
  },
];

const TestimonialCards = ({ prevRef, nextRef }) => {
  return (
    <div className="relative w-full px-6 max-w-[1620px] mx-auto">
      <Swiper
        modules={[Navigation, FreeMode]}
        spaceBetween={24}
        freeMode={true}
        slidesPerView={1}
        breakpoints={{
          640: { slidesPerView: 2, spaceBetween: 20 },
          1024: { slidesPerView: 3, spaceBetween: 24 },
        }}
        navigation={{
          prevEl: prevRef.current,
          nextEl: nextRef.current,
        }}
        onBeforeInit={(swiper) => {
          swiper.params.navigation.prevEl = prevRef.current;
          swiper.params.navigation.nextEl = nextRef.current;
        }}
        className="testimonial-swiper"
      >
        {testimonialData.map((testimonial, i) => (
          <SwiperSlide key={i} className="h-auto">
            <div className="group bg-white p-6 border border-gray-100 rounded-2xl shadow-sm hover:shadow-lg hover:border-gray-200 transition-all duration-300 ease-out h-full flex flex-col">
              <div className="flex items-center mb-4">
                {renderStars(testimonial?.rating, i)}
              </div>
              <h3 className="text-gray-900 text-lg font-semibold mb-3 group-hover:text-blue-600 transition-colors duration-200">
                {testimonial.name}
              </h3>
              <p className="text-gray-600 text-base leading-relaxed flex-1">
                "{testimonial.message}"
              </p>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default TestimonialCards;
