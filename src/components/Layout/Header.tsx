import { useState } from "react";
import { Search, ShoppingCart, User, Menu, Leaf } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-eco">
            <Leaf className="h-5 w-5 text-white" />
          </div>
          <span className="text-xl font-bold text-eco-primary">EcoFinds</span>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6">
          <a href="#" className="text-sm font-medium hover:text-eco-primary transition-colors">
            Browse
          </a>
          <a href="#" className="text-sm font-medium hover:text-eco-primary transition-colors">
            Categories
          </a>
          <a href="#" className="text-sm font-medium hover:text-eco-primary transition-colors">
            Community
          </a>
          <a href="#" className="text-sm font-medium hover:text-eco-primary transition-colors">
            About
          </a>
        </nav>

        {/* Search Bar - Desktop */}
        <div className="hidden lg:flex items-center gap-2 flex-1 max-w-md mx-8">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search sustainable finds..."
              className="pl-10 rounded-xl border-eco-light focus:border-eco-primary transition-colors"
            />
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" className="relative">
            <ShoppingCart className="h-5 w-5" />
            <span className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-eco-badge text-xs font-medium text-eco-primary flex items-center justify-center">
              2
            </span>
          </Button>
          
          <Button variant="ghost" size="icon">
            <User className="h-5 w-5" />
          </Button>

          <Button variant="eco" className="hidden sm:inline-flex">
            Sell Item
          </Button>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <Menu className="h-5 w-5" />
          </Button>
        </div>
      </div>

      {/* Mobile Search Bar */}
      <div className="lg:hidden px-4 pb-3">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search sustainable finds..."
            className="pl-10 rounded-xl border-eco-light focus:border-eco-primary transition-colors"
          />
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden border-t bg-background">
          <nav className="flex flex-col p-4 gap-2">
            <a href="#" className="py-2 text-sm font-medium hover:text-eco-primary transition-colors">
              Browse
            </a>
            <a href="#" className="py-2 text-sm font-medium hover:text-eco-primary transition-colors">
              Categories
            </a>
            <a href="#" className="py-2 text-sm font-medium hover:text-eco-primary transition-colors">
              Community
            </a>
            <a href="#" className="py-2 text-sm font-medium hover:text-eco-primary transition-colors">
              About
            </a>
            <Button variant="eco" className="mt-2">
              Sell Item
            </Button>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;