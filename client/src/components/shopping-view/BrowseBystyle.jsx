import {
  casualImg,
  formerImg,
  gymImg,
  partyimg,
} from "../../assets/asset";

const BrowseBystyle = () => {
  return (
    <section className="max-w-[1620px] md:px-6 mx-auto w-full">
      <div className=" bg-[#F0F0F0] md:py-[70px] py-[40px] pb-0 px-[30px] md:px-[60px] mx-auto w-full rounded-[40px]">
        <div>
          <h2 className="heading-secondary font-main">
            BROWSE BY dress STYLE
          </h2>
        </div>
        <div className="grid grid-cols-3 gap-3 md:gap-8 py-[40px] pb-0 md:py-[60px] md:pb-0">
          <div className="col-span-2 h-[300px]  relative ">
            <div className="absolute inset-0 hover:bg-black/40 rounded-[40px] bg-opacity-0 group-hover:bg-opacity-50 transition duration-300 ease-in-out"></div>

            <img
              alt=""
              src={casualImg}
              className="w-full h-full object-cover rounded-4xl  bg-white bg-center"
            />
          </div>
          <div className="col-span-1 h-[300px]  relative ">
            <div className="absolute inset-0 hover:bg-black/40 rounded-[40px] bg-opacity-0 group-hover:bg-opacity-50 transition duration-300 ease-in-out"></div>

            <img
              alt=""
              src={formerImg}
              className="w-full h-full object-cover rounded-4xl  bg-white bg-center"
            />
          </div>

          <div className="col-span-1 h-[300px]  relative ">
            <div className="absolute inset-0 hover:bg-black/40 rounded-[40px] bg-opacity-0 group-hover:bg-opacity-50 transition duration-300 ease-in-out"></div>

            <img
              alt=""
              src={partyimg}
              className="w-full h-full object-cover rounded-4xl  bg-white bg-center"
            />
          </div>
          <div className="col-span-2 h-[300px]  relative ">
            <div className="absolute inset-0 hover:bg-black/40 rounded-[40px] bg-opacity-0 group-hover:bg-opacity-50 transition duration-300 ease-in-out"></div>

            <img
              alt=""
              src={gymImg}
              className="w-full h-full object-cover rounded-4xl  bg-white bg-center"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default BrowseBystyle;
