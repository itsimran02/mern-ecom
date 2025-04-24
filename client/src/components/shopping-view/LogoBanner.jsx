import {
  gucciLogo,
  logo1,
  logo2,
  pradaLogo,
  zaraLogo,
} from "../../assets/asset";

const LogoBanner = () => {
  return (
    <div className="bg-[#000000] w-full">
      <div className=" max-w-[1620px] mx-auto flex md:justify-between py-[42px] px-3 md:px-6 gap-6 flex-wrap  justify-center">
        <div className=" md:h-[50px] h-[25px]">
          <img className="-full h-full" src={logo1} />
        </div>
        <div className=" md:h-[50px] h-[25px]">
          <img className="-full h-full" src={logo2} />
        </div>
        <div className=" md:h-[50px] h-[25px]">
          <img className="-full h-full" src={pradaLogo} />
        </div>
        <div className=" md:h-[50px] h-[25px]">
          <img className="-full h-full" src={gucciLogo} />
        </div>
        <div className=" md:h-[50px] h-[25px]">
          <img className="-full h-full" src={zaraLogo} />
        </div>
      </div>
    </div>
  );
};

export default LogoBanner;
