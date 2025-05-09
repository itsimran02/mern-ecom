const getFiltersFromUrl = () => {
  const params = new URLSearchParams(
    window.location.search
  );

  return {
    minPrice: params.get("minPrice") || null,
    maxPrice: params.get("maxPrice") || null,
    category: params.get("category") || null,
    brand: params.get("brand") || null,
  };
};

export default getFiltersFromUrl;
