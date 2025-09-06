import ProductCard from "./ProductCard";
import product1 from "@/assets/product-1.jpg";
import product2 from "@/assets/product-2.jpg";

// Mock data - replace with actual API data
const mockProducts = [
  {
    id: "1",
    title: "Vintage Denim Jacket",
    price: 45,
    image: product1,
    category: "Fashion",
    seller: "EcoStyler",
    isLiked: false,
    carbonSaved: 8.5,
    condition: "Excellent"
  },
  {
    id: "2",
    title: "Handmade Pottery Set",
    price: 32,
    image: product2,
    category: "Home & Garden",
    seller: "CraftedGreen",
    isLiked: true,
    carbonSaved: 4.2,
    condition: "Like New"
  },
  {
    id: "3",
    title: "Eco-Friendly Sneakers",
    price: 68,
    image: product1,
    category: "Fashion",
    seller: "SustainableSteps",
    isLiked: false,
    carbonSaved: 12.3,
    condition: "Good"
  },
  {
    id: "4",
    title: "Bamboo Picture Frames",
    price: 24,
    image: product2,
    category: "Home & Garden",
    seller: "NaturalFrames",
    isLiked: false,
    carbonSaved: 3.1,
    condition: "Excellent"
  },
  {
    id: "5",
    title: "Vintage Leather Bag",
    price: 89,
    image: product1,
    category: "Accessories",
    seller: "RetroFinds",
    isLiked: true,
    carbonSaved: 15.7,
    condition: "Very Good"
  },
  {
    id: "6",
    title: "Succulent Garden Kit",
    price: 38,
    image: product2,
    category: "Home & Garden",
    seller: "GreenThumb",
    isLiked: false,
    carbonSaved: 6.4,
    condition: "New"
  }
];

const ProductGrid = () => {
  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-foreground mb-4">
            Featured <span className="text-eco-primary">Eco-Finds</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Discover amazing pre-loved items from our community of eco-conscious sellers
          </p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 animate-fade-in">
          {mockProducts.map((product) => (
            <ProductCard
              key={product.id}
              {...product}
            />
          ))}
        </div>
        
        <div className="text-center mt-12">
          <a 
            href="#" 
            className="inline-flex items-center gap-2 text-eco-primary font-semibold hover:text-eco-secondary transition-colors"
          >
            View All Products
            <span className="ml-1">→</span>
          </a>
        </div>
      </div>
    </section>
  );
};

export default ProductGrid;