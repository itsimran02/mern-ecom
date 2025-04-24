import { Link } from "react-router-dom";
import { pant1, pant2, pant3 } from "../../assets/asset";
import ProductCard from "../ui/ProductCard";

const ProductsGrid = () => {
  // Sample product data - in a real app, this would come from your API or state
  const products = [
    {
      id: 1,
      image: pant1, // Replace with your actual image path
      title: "Classic White T-Shirt",
      rating: 4.5,
      price: 24.99,
      discountPrice: 19.99,
    },
    {
      id: 2,
      image: pant2, // Replace with your actual image path
      title: "Black Denim Jeans",
      rating: 5.0,
      price: 59.99,
    },
    {
      id: 3,
      image: pant3, // Replace with your actual image path
      title: "Casual Sneakers",
      rating: 4.2,
      price: 89.99,
      discountPrice: 69.99,
    },
    {
      id: 4,
      image: pant1, // Replace with your actual image path
      title: "Classic White T-Shirt",
      rating: 4.5,
      price: 24.99,
      discountPrice: 19.99,
    },
    {
      id: 5,
      image: pant2, // Replace with your actual image path
      title: "Black Denim Jeans",
      rating: 5.0,
      price: 59.99,
    },
    {
      id: 6,
      image: pant3, // Replace with your actual image path
      title: "Casual Sneakers",
      rating: 4.2,
      price: 89.99,
      discountPrice: 69.99,
    },
  ];

  // Event handlers
  const handleAddToCart = (product) => {
    console.log("Added to cart:", product);
    // Add your cart logic here
  };

  const handleQuickView = (product) => {
    console.log("Quick view:", product);
    // Add your quick view modal logic here
  };

  return (
    <div className="max-w-[1620px] w-full mx-auto px-3 md:px-6 md:py-[55px] py-[35px] text-center border-b-2 border-black/10">
      <div className="md:grid flex  overflow-x-scroll scrollbar-hidden sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((product, i) => (
          <ProductCard
            key={product.id}
            image={product.image}
            title={product.title}
            rating={product.rating}
            price={product.price}
            discountPrice={product.discountPrice}
            onAddToCart={() => handleAddToCart(product)}
            onQuickView={() => handleQuickView(product)}
            id={i}
          />
        ))}
      </div>
      <Link className="inline-block mt-[26px] md:mt-[36px] font-secondary text-base py-[16px] px-[54px] border-2 border-black/10 rounded-[60px]">
        View All
      </Link>
    </div>
  );
};

export default ProductsGrid;
