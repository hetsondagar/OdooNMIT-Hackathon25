import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Filter, X } from "lucide-react";

const categories = [
  "All",
  "Fashion",
  "Home & Garden",
  "Electronics",
  "Books",
  "Sports & Outdoors",
  "Accessories",
  "Kids & Baby",
  "Art & Crafts"
];

const priceRanges = [
  { label: "Under €25", value: "0-25" },
  { label: "€25 - €50", value: "25-50" },
  { label: "€50 - €100", value: "50-100" },
  { label: "Over €100", value: "100+" }
];

const CategoryFilter = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedPriceRange, setSelectedPriceRange] = useState("");
  const [showFilters, setShowFilters] = useState(false);

  const clearFilters = () => {
    setSelectedCategory("All");
    setSelectedPriceRange("");
  };

  const hasActiveFilters = selectedCategory !== "All" || selectedPriceRange !== "";

  return (
    <div className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-16 z-40">
      <div className="container mx-auto px-4 py-4">
        {/* Category Tabs */}
        <div className="flex items-center gap-2 mb-4 overflow-x-auto scrollbar-hide">
          {categories.map((category) => (
            <Button
              key={category}
              variant={selectedCategory === category ? "eco" : "ghost"}
              size="sm"
              onClick={() => setSelectedCategory(category)}
              className="whitespace-nowrap rounded-full"
            >
              {category}
            </Button>
          ))}
        </div>

        {/* Filter Toggle & Active Filters */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowFilters(!showFilters)}
              className="rounded-full"
            >
              <Filter className="h-4 w-4 mr-1" />
              Filters
            </Button>
            
            {hasActiveFilters && (
              <Button
                variant="ghost"
                size="sm"
                onClick={clearFilters}
                className="rounded-full text-muted-foreground"
              >
                <X className="h-4 w-4 mr-1" />
                Clear All
              </Button>
            )}
          </div>
          
          {/* Active Filter Pills */}
          <div className="flex items-center gap-2">
            {selectedPriceRange && (
              <Badge variant="secondary" className="rounded-full">
                {priceRanges.find(range => range.value === selectedPriceRange)?.label}
                <button
                  onClick={() => setSelectedPriceRange("")}
                  className="ml-1 hover:text-destructive transition-colors"
                >
                  <X className="h-3 w-3" />
                </button>
              </Badge>
            )}
          </div>
        </div>

        {/* Expanded Filters */}
        {showFilters && (
          <div className="mt-4 p-4 bg-muted rounded-xl animate-slide-up">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Price Range */}
              <div>
                <h3 className="font-semibold mb-3 text-foreground">Price Range</h3>
                <div className="grid grid-cols-2 gap-2">
                  {priceRanges.map((range) => (
                    <Button
                      key={range.value}
                      variant={selectedPriceRange === range.value ? "eco" : "outline"}
                      size="sm"
                      onClick={() => setSelectedPriceRange(
                        selectedPriceRange === range.value ? "" : range.value
                      )}
                      className="rounded-full text-sm"
                    >
                      {range.label}
                    </Button>
                  ))}
                </div>
              </div>

              {/* Condition */}
              <div>
                <h3 className="font-semibold mb-3 text-foreground">Condition</h3>
                <div className="grid grid-cols-2 gap-2">
                  {["Like New", "Excellent", "Very Good", "Good"].map((condition) => (
                    <Button
                      key={condition}
                      variant="outline"
                      size="sm"
                      className="rounded-full text-sm"
                    >
                      {condition}
                    </Button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CategoryFilter;