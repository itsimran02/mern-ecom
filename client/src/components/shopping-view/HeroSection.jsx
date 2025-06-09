import { Link } from "react-router-dom";
import { heroImage } from "../../assets/asset";

const HeroSection = () => {
  return (
    <div className="bg-[#F2F0F1] px-3 py-[40px] lg:py-0 pb-0 md:px-6">
      <div className="max-w-[1620px] mx-auto">
        <div className="flex flex-col md:flex-row gap-8 md:gap-12 items-center">
          <div className="flex gap-[32px] flex-col items-start w-full md:w-1/2 lg:w-3/5">
            <h1 className="font-main text-[36px] md:text-[48px] lg:text-[64px] leading-[42px] md:leading-[56px] lg:leading-[72px] font-bold">
              FIND CLOTHES THAT MATCHES YOUR STYLE
            </h1>
            <p className="font-secondary text-sm md:text-base font-normal text-black/60 max-w-lg">
              Browse through our diverse range of
              meticulously crafted garments, designed to
              bring out your individuality and cater to your
              sense of style.
            </p>
            <Link
              to={"/shop/products"}
              className="px-[52px] py-4 bg-black text-white rounded-full hover:bg-gray-800 transition-colors cursor-pointer"
            >
              Shop Now
            </Link>

            <div className="flex gap-[32px] md:flex-row flex-wrap justify-center sm:justify-start w-full">
              <div className="flex flex-col">
                <p className="font-secondary text-[24px] md:text-[40px] font-extrabold ">
                  200+
                </p>
                <p className="font-secondary text-[12px] md:text-base font-normal text-black/60">
                  international brands
                </p>
              </div>
              <div className="flex flex-col">
                <p className="font-secondary text-[24px] md:text-[40px] font-extrabold ">
                  2000+
                </p>
                <p className="font-secondary text-[12px] md:text-base font-normal text-black/60">
                  high quality products
                </p>
              </div>
              <div className="flex flex-col">
                <p className="font-secondary text-[24px] md:text-[40px] font-extrabold ">
                  30000+
                </p>
                <p className="font-secondary text-[12px] md:text-base font-normal text-black/60">
                  happy customers
                </p>
              </div>
            </div>
          </div>

          <div className="w-full md:w-1/2 lg:w-2/5 relative">
            <div className="w-full h-full flex justify-center items-end">
              <img
                src={heroImage}
                alt="Hero showcasing fashion products"
                className="w-full h-auto object-contain object-bottom"
                loading="eager"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
