import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Search, ShoppingCart, User, Menu, Leaf, LogOut, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/contexts/AuthContext";
import { dataStore } from "@/lib/data";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { PremiumButton } from "@/components/ui/premium-button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  const cartItemCount = user ? dataStore.getCartItems(user.id).length : 0;

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <header className="sticky top-0 z-50 w-full glass border-b border-border/50 shadow-glass">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-3 group">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-green-500 to-emerald-600 shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-110">
            <Leaf className="h-6 w-6 text-white" />
          </div>
          <span className="text-xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
            EcoFinds
          </span>
        </Link>

               {/* Desktop Navigation */}
               <nav className="hidden md:flex items-center gap-6">
                 <Link to="/products" className="text-sm font-medium text-foreground/80 hover:text-green-600 transition-all duration-300 hover:scale-105">
                   Browse
                 </Link>
                 
                 <DropdownMenu>
                   <DropdownMenuTrigger asChild>
                     <Button variant="ghost" className="text-sm font-medium text-foreground/80 hover:text-green-600 transition-all duration-300 hover:scale-105 gap-1">
                       Features
                       <ChevronDown className="h-3 w-3" />
                     </Button>
                   </DropdownMenuTrigger>
                   <DropdownMenuContent align="start" className="w-56 glass-card">
                     <DropdownMenuItem asChild>
                       <Link to="/carbon-tracker" className="flex items-center gap-2">
                         <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                         Carbon Tracker
                       </Link>
                     </DropdownMenuItem>
                     <DropdownMenuItem asChild>
                       <Link to="/eco-badges" className="flex items-center gap-2">
                         <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                         Eco Badges
                       </Link>
                     </DropdownMenuItem>
                     <DropdownMenuItem asChild>
                       <Link to="/community" className="flex items-center gap-2">
                         <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                         Community
                       </Link>
                     </DropdownMenuItem>
                     <DropdownMenuItem asChild>
                       <Link to="/social-share" className="flex items-center gap-2">
                         <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                         Social Share
                       </Link>
                     </DropdownMenuItem>
                     <DropdownMenuSeparator />
                     <DropdownMenuItem asChild>
                       <Link to="/trending" className="flex items-center gap-2">
                         <div className="w-2 h-2 bg-indigo-500 rounded-full"></div>
                         Trending
                       </Link>
                     </DropdownMenuItem>
                     <DropdownMenuItem asChild>
                       <Link to="/wishlist" className="flex items-center gap-2">
                         <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                         Wishlist
                       </Link>
                     </DropdownMenuItem>
                   </DropdownMenuContent>
                 </DropdownMenu>
               </nav>

        {/* Search Bar - Desktop */}
        <div className="hidden lg:flex items-center gap-2 flex-1 max-w-md mx-8">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search sustainable finds..."
              className="pl-10 rounded-xl glass border-border/50 focus:border-green-500 transition-all duration-300 focus:shadow-lg"
            />
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-3">
          <ThemeToggle />
          
          {isAuthenticated ? (
            <>
              <Link to="/cart">
                <Button variant="ghost" size="icon" className="relative hover-lift">
            <ShoppingCart className="h-5 w-5" />
                  {cartItemCount > 0 && (
                    <span className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-gradient-to-r from-green-500 to-emerald-500 text-xs font-bold text-white flex items-center justify-center shadow-lg animate-pulse">
                      {cartItemCount}
            </span>
                  )}
          </Button>
              </Link>
          
              <Link to="/dashboard">
                <Button variant="ghost" size="icon" className="hover-lift">
            <User className="h-5 w-5" />
          </Button>
              </Link>

              <Link to="/products/new">
                <PremiumButton variant="eco" size="sm" className="hidden sm:inline-flex">
            Sell Item
                </PremiumButton>
              </Link>

              <Button variant="ghost" size="sm" onClick={handleLogout} className="hidden sm:inline-flex hover-lift">
                <LogOut className="h-4 w-4 mr-1" />
                Logout
              </Button>
            </>
          ) : (
            <>
              <Link to="/login">
                <Button variant="ghost" size="sm" className="hover-lift">
                  Sign In
          </Button>
              </Link>
              <Link to="/register">
                <PremiumButton variant="eco" size="sm">
                  Sign Up
                </PremiumButton>
              </Link>
            </>
          )}

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden hover-lift"
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
            className="pl-10 rounded-xl glass border-border/50 focus:border-green-500 transition-all duration-300 focus:shadow-lg"
          />
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden border-t glass-card">
          <nav className="flex flex-col p-4 gap-3">
            <Link to="/products" className="py-2 text-sm font-medium text-foreground/80 hover:text-green-600 transition-all duration-300 hover:scale-105">
              Browse
            </Link>
            
            <div className="py-2">
              <div className="text-sm font-medium text-foreground/60 mb-2">Features</div>
              <div className="pl-4 space-y-2">
                <Link to="/carbon-tracker" className="block py-1 text-sm text-foreground/80 hover:text-green-600 transition-all duration-300">
                  Carbon Tracker
                </Link>
                <Link to="/eco-badges" className="block py-1 text-sm text-foreground/80 hover:text-green-600 transition-all duration-300">
                  Eco Badges
                </Link>
                <Link to="/community" className="block py-1 text-sm text-foreground/80 hover:text-green-600 transition-all duration-300">
                  Community
                </Link>
                <Link to="/social-share" className="block py-1 text-sm text-foreground/80 hover:text-green-600 transition-all duration-300">
                  Social Share
                </Link>
                <Link to="/trending" className="block py-1 text-sm text-foreground/80 hover:text-green-600 transition-all duration-300">
                  Trending
                </Link>
                <Link to="/wishlist" className="block py-1 text-sm text-foreground/80 hover:text-green-600 transition-all duration-300">
                  Wishlist
                </Link>
              </div>
            </div>
            
            {isAuthenticated ? (
              <>
                <Link to="/products/new" className="mt-2">
                  <PremiumButton variant="eco" className="w-full">
              Sell Item
                  </PremiumButton>
                </Link>
                <Link to="/cart" className="mt-2">
                  <Button variant="outline" className="w-full hover-lift">
                    Cart ({cartItemCount})
                  </Button>
                </Link>
                <Link to="/dashboard" className="mt-2">
                  <Button variant="outline" className="w-full hover-lift">
                    Dashboard
                  </Button>
                </Link>
                <Button variant="ghost" onClick={handleLogout} className="mt-2 hover-lift">
                  Logout
                </Button>
              </>
            ) : (
              <>
                <Link to="/login" className="mt-2">
                  <Button variant="outline" className="w-full hover-lift">
                    Sign In
            </Button>
                </Link>
                <Link to="/register" className="mt-2">
                  <PremiumButton variant="eco" className="w-full">
                    Sign Up
                  </PremiumButton>
                </Link>
              </>
            )}
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;