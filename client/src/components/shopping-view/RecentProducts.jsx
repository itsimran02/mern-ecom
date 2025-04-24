import ProductsGrid from "./Example";

const RecentProducts = () => {
  return (
    <>
      <div className="max-w-[1620px] mx-auto lg:py-[55px] py-[35px] ">
        <div>
          <h2 className="heading-secondary font-main">
            NEW ARRIVALS
          </h2>
        </div>
      </div>
      <ProductsGrid />
    </>
  );
};

export default RecentProducts;
