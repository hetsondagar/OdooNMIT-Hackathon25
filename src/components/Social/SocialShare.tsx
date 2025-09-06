import { Share2, Instagram, Camera, Sparkles, Copy, Check } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";

const SocialShare = () => {
  const [copiedCaption, setCopiedCaption] = useState(false);
  
  const recentShares = [
    { 
      id: 1, 
      product: "Vintage Denim Jacket", 
      platform: "Instagram", 
      likes: 24, 
      time: "2 hours ago",
      caption: "Just scored this amazing vintage find! 🌱 #SustainableFashion #EcoFinds"
    },
    { 
      id: 2, 
      product: "Handmade Pottery", 
      platform: "TikTok", 
      views: 1200, 
      time: "1 day ago",
      caption: "Thrift haul success! Supporting local artisans 🏺✨ #ThriftHaul"
    }
  ];

  const handleCopyCaption = (caption: string) => {
    navigator.clipboard.writeText(caption);
    setCopiedCaption(true);
    setTimeout(() => setCopiedCaption(false), 2000);
  };

  const generateEcoCaption = () => {
    const ecoHashtags = [
      "#SustainableFashion", "#EcoFinds", "#ThriftHaul", "#SecondHandFirst",
      "#SustainableLiving", "#CircularFashion", "#VintageFinds", "#EcoWarrior"
    ];
    
    const ecoCaptions = [
      "Just found my new favorite piece! 🌱 Every second-hand purchase is a vote for our planet 🌍",
      "Thrift haul success! ♻️ Giving pre-loved items a second chance to shine ✨",
      "Sustainable style wins again! 🌿 Why buy new when you can buy beautifully used? 💚",
      "My latest eco-find! 🌱 Reducing waste one purchase at a time 🌍"
    ];

    const randomCaption = ecoCaptions[Math.floor(Math.random() * ecoCaptions.length)];
    const randomHashtags = ecoHashtags.sort(() => 0.5 - Math.random()).slice(0, 4).join(" ");
    
    return `${randomCaption} ${randomHashtags}`;
  };

  return (
    <Card className="bg-gradient-card shadow-eco border-eco-light/30">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-eco-primary">
          <Share2 className="h-5 w-5" />
          Social Media Integration
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Quick Share */}
        <div className="p-4 bg-gradient-eco rounded-xl">
          <h4 className="font-medium text-eco-primary mb-3">Share Your Find</h4>
          <div className="grid grid-cols-2 gap-3">
            <Button 
              variant="outline" 
              className="bg-white/20 border-white/30 text-eco-primary hover:bg-white/30 justify-start"
            >
              <Instagram className="h-4 w-4 mr-2" />
              Instagram
            </Button>
            <Button 
              variant="outline" 
              className="bg-white/20 border-white/30 text-eco-primary hover:bg-white/30 justify-start"
            >
              <Camera className="h-4 w-4 mr-2" />
              TikTok
            </Button>
          </div>
        </div>

        {/* AI Caption Generator */}
        <div className="space-y-3">
          <h4 className="font-medium text-sm text-foreground">AI Eco Caption Generator</h4>
          <div className="p-3 bg-accent/50 rounded-lg">
            <div className="flex items-start justify-between gap-2 mb-2">
              <p className="text-sm text-foreground flex-1">
                {generateEcoCaption()}
              </p>
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={() => handleCopyCaption(generateEcoCaption())}
                className="h-8 w-8 p-0"
              >
                {copiedCaption ? (
                  <Check className="h-3 w-3 text-success" />
                ) : (
                  <Copy className="h-3 w-3" />
                )}
              </Button>
            </div>
            <Button variant="ghost" size="sm" className="text-eco-primary hover:text-eco-secondary">
              <Sparkles className="h-3 w-3 mr-1" />
              Generate New
            </Button>
          </div>
        </div>

        {/* Recent Shares */}
        <div className="space-y-3">
          <h4 className="font-medium text-sm text-foreground">Recent Shares</h4>
          {recentShares.map((share) => (
            <div key={share.id} className="p-3 bg-muted/30 rounded-lg">
              <div className="flex items-start justify-between mb-2">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-sm font-medium text-foreground">{share.product}</span>
                    <Badge variant="secondary" className="text-xs">
                      {share.platform}
                    </Badge>
                  </div>
                  <p className="text-xs text-muted-foreground">{share.caption}</p>
                </div>
                <span className="text-xs text-muted-foreground">{share.time}</span>
              </div>
              
              <div className="flex items-center gap-4 text-xs text-muted-foreground">
                <span>
                  {share.platform === "Instagram" ? `${share.likes} likes` : `${share.views} views`}
                </span>
                <Button variant="ghost" size="sm" className="h-6 text-xs text-eco-primary hover:text-eco-secondary">
                  View Post
                </Button>
              </div>
            </div>
          ))}
        </div>

        {/* Connect Accounts */}
        <div className="p-3 bg-warning/10 border border-warning/20 rounded-lg">
          <p className="text-sm font-medium text-warning mb-2">Connect More Accounts</p>
          <p className="text-xs text-warning/80 mb-3">
            Connect your social accounts for one-click sharing
          </p>
          <Button variant="outline" size="sm" className="border-warning text-warning hover:bg-warning hover:text-white">
            Manage Connections
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default SocialShare;