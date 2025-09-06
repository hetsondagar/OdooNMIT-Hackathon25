import React, { useState, useEffect } from 'react';
import Header from '@/components/Layout/Header';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useAuth } from '@/contexts/AuthContext';
import { GlassCard } from '@/components/ui/glass-card';
import { PremiumButton } from '@/components/ui/premium-button';
import { cn } from '@/lib/utils';
import { Users, MessageCircle, Heart, Share2, TrendingUp, Leaf, Star, Award, Calendar, MapPin, Clock, Plus, Search, Filter, Sparkles, Zap, Target, Globe } from 'lucide-react';

interface CommunityPost {
  id: string;
  author: {
    name: string;
    avatar: string;
    level?: string;
    eco_points?: number;
    trust_score?: number;
  };
  content: string;
  image?: string;
  likes: number;
  comments: number;
  shares: number;
  timestamp?: string;
  created_at?: string;
  tags: string[];
}
