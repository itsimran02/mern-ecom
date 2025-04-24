import ProductsGrid from "./Example";

const TopSelling = () => {
  return (
    <>
      <div className="max-w-[1620px] mx-auto lg:py-[55px] py-[35px] ">
        <div>
          <h2 className="heading-secondary font-main">
            TOP SELLING
          </h2>
        </div>
      </div>
      <ProductsGrid />
    </>
  );
};

export default TopSelling;
