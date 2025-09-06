import React, { useState, useEffect } from 'react';
import Header from "@/components/Layout/Header";
import HeroSection from "@/components/Hero/HeroSection";
import CategoryFilter from "@/components/Categories/CategoryFilter";
import ProductGrid from "@/components/Products/ProductGrid";
import { GlassCard } from "@/components/ui/glass-card";
import { PremiumButton } from "@/components/ui/premium-button";
import { Button } from "@/components/ui/button";
import { 
  ArrowRight, 
  Users, 
  Leaf,
  Zap,
  Target
} from "lucide-react";
import { Link } from "react-router-dom";
import { productsAPI, purchasesAPI } from "@/services/api";
import { toast } from "sonner";

const Index = () => {
  const [stats, setStats] = useState({
    totalItems: 0,
    totalUsers: 0,
    totalCo2Saved: 0,
    userSatisfaction: 98
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadStats();
  }, []);

  const loadStats = async () => {
    try {
      setIsLoading(true);
      
      // Load products count
      const productsResponse = await productsAPI.getAll();
      let totalItems = 0;
      if (productsResponse.success && productsResponse.data?.products) {
        totalItems = productsResponse.data.products.length;
      }

      // Load purchases to calculate CO2 saved
      const purchasesResponse = await purchasesAPI.getAll();
      let totalCo2Saved = 0;
      if (purchasesResponse.success && purchasesResponse.data?.purchases) {
        totalCo2Saved = purchasesResponse.data.purchases.length * 2.5; // 2.5kg CO2 per item
      }

      setStats({
        totalItems,
        totalUsers: 15000, // Static for now, can be fetched from backend later
        totalCo2Saved,
        userSatisfaction: 98
      });
    } catch (error: any) {
      console.error('Error loading stats:', error);
      toast.error('Failed to load statistics');
      // Set fallback stats
      setStats({
        totalItems: 50000,
        totalUsers: 15000,
        totalCo2Saved: 2500,
        userSatisfaction: 98
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <HeroSection />
        
        {/* Stats Section */}
        <section className="py-16 bg-gradient-to-br from-gray-50 via-white to-green-50/30">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-foreground mb-4">
                Making a <span className="text-green-600">Real Impact</span>
              </h2>
              <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                Join thousands of eco-conscious individuals making a difference through sustainable consumption
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
              <GlassCard className="p-6 text-center hover-lift">
                <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Leaf className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-foreground mb-1">
                  {isLoading ? '...' : `${(stats.totalItems / 1000).toFixed(0)}K+`}
                </h3>
                <p className="text-sm text-muted-foreground">Items Given New Life</p>
              </GlassCard>

              <GlassCard className="p-6 text-center hover-lift">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Users className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-foreground mb-1">
                  {isLoading ? '...' : `${(stats.totalUsers / 1000).toFixed(0)}K+`}
                </h3>
                <p className="text-sm text-muted-foreground">Eco Warriors</p>
              </GlassCard>

              <GlassCard className="p-6 text-center hover-lift">
                <div className="w-12 h-12 bg-gradient-to-br from-yellow-500 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Zap className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-foreground mb-1">
                  {isLoading ? '...' : `${(stats.totalCo2Saved / 1000).toFixed(1)}T`}
                </h3>
                <p className="text-sm text-muted-foreground">CO₂ Saved (kg)</p>
              </GlassCard>

              <GlassCard className="p-6 text-center hover-lift">
                <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Target className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-foreground mb-1">
                  {isLoading ? '...' : `${stats.userSatisfaction}%`}
                </h3>
                <p className="text-sm text-muted-foreground">User Satisfaction</p>
              </GlassCard>
            </div>

            {/* Call to Action */}
            <div className="text-center">
              <Link to="/products">
                <PremiumButton variant="eco" size="lg" className="gap-2 group">
                  Start Shopping
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                </PremiumButton>
              </Link>
            </div>
          </div>
        </section>
        
        <CategoryFilter />
        <ProductGrid />
      </main>
    </div>
  );
};

export default Index;
