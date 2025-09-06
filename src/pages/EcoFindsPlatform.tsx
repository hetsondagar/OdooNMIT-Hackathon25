import Header from "@/components/Layout/Header";
import CarbonTracker from "@/components/Dashboard/CarbonTracker";
import EcoBadges from "@/components/Dashboard/EcoBadges";
import WishlistAlert from "@/components/Wishlist/WishlistAlert";
import CommunityGroups from "@/components/Community/CommunityGroups";
import SocialShare from "@/components/Social/SocialShare";
import TrendingListings from "@/components/Products/TrendingListings";
import { Sparkles, Leaf, Users, TrendingUp } from "lucide-react";

const EcoFindsPlatform = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-hero py-16 lg:py-24">
        <div className="absolute inset-0 bg-black/10" />
        <div className="relative container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center text-white">
            <div className="animate-fade-in">
              <div className="mb-6 flex justify-center">
                <div className="flex items-center gap-2 rounded-full bg-white/20 px-6 py-3 backdrop-blur-sm">
                  <Sparkles className="h-5 w-5 text-eco-badge" />
                  <span className="font-medium">AI-Powered Sustainability Platform</span>
                </div>
              </div>
              
              <h1 className="mb-6 text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
                Your Complete <span className="text-eco-badge">Eco-Lifestyle</span> Hub
              </h1>
              
              <p className="mb-8 text-lg text-white/90 sm:text-xl lg:text-2xl max-w-3xl mx-auto">
                Track your impact, earn rewards, build community, and discover personalized sustainable finds 
                - all in one intelligent platform designed for the eco-conscious future.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Main Platform */}
      <main className="container mx-auto px-4 py-12">
        {/* Feature Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
          <div className="text-center p-6 bg-gradient-card rounded-xl border border-eco-light/30 shadow-card">
            <div className="w-12 h-12 bg-eco-primary/20 rounded-full flex items-center justify-center mx-auto mb-3">
              <Leaf className="h-6 w-6 text-eco-primary" />
            </div>
            <h3 className="font-semibold text-foreground mb-1">Carbon Tracking</h3>
            <p className="text-xs text-muted-foreground">Real-time CO₂ savings</p>
          </div>
          
          <div className="text-center p-6 bg-gradient-card rounded-xl border border-eco-light/30 shadow-card">
            <div className="w-12 h-12 bg-eco-secondary/20 rounded-full flex items-center justify-center mx-auto mb-3">
              <Sparkles className="h-6 w-6 text-eco-secondary" />
            </div>
            <h3 className="font-semibold text-foreground mb-1">Smart Rewards</h3>
            <p className="text-xs text-muted-foreground">AI-powered badges</p>
          </div>
          
          <div className="text-center p-6 bg-gradient-card rounded-xl border border-eco-light/30 shadow-card">
            <div className="w-12 h-12 bg-warning/20 rounded-full flex items-center justify-center mx-auto mb-3">
              <Users className="h-6 w-6 text-warning" />
            </div>
            <h3 className="font-semibold text-foreground mb-1">Communities</h3>
            <p className="text-xs text-muted-foreground">Local eco groups</p>
          </div>
          
          <div className="text-center p-6 bg-gradient-card rounded-xl border border-eco-light/30 shadow-card">
            <div className="w-12 h-12 bg-success/20 rounded-full flex items-center justify-center mx-auto mb-3">
              <TrendingUp className="h-6 w-6 text-success" />
            </div>
            <h3 className="font-semibold text-foreground mb-1">AI Insights</h3>
            <p className="text-xs text-muted-foreground">Personalized finds</p>
          </div>
        </div>

        {/* Main Dashboard Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column */}
          <div className="space-y-6">
            <CarbonTracker />
            <WishlistAlert />
          </div>
          
          {/* Center Column */}
          <div className="space-y-6">
            <TrendingListings />
            <SocialShare />
          </div>
          
          {/* Right Column */}
          <div className="space-y-6">
            <EcoBadges />
            <CommunityGroups />
          </div>
        </div>

        {/* Bottom Section - Quick Actions */}
        <div className="mt-12 p-8 bg-gradient-eco rounded-2xl text-center">
          <h2 className="text-2xl font-bold text-eco-primary mb-4">
            Ready to Make an Impact?
          </h2>
          <p className="text-eco-primary/80 mb-6 max-w-2xl mx-auto">
            Join thousands of eco-warriors making a difference through conscious consumption. 
            Every purchase, every swap, every share counts towards a sustainable future.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-eco-primary text-white px-8 py-3 rounded-xl font-medium hover:bg-eco-secondary transition-colors shadow-hover">
              Start Your Eco Journey
            </button>
            <button className="bg-white/20 text-eco-primary px-8 py-3 rounded-xl font-medium hover:bg-white/30 transition-colors border border-white/30">
              Explore Features
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default EcoFindsPlatform;