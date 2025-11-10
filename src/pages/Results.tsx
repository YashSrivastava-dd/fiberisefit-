import { useState } from "react";
import { Star, TrendingDown, Activity, Heart } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const Results = () => {
  const [activeFilter, setActiveFilter] = useState("all");

  const testimonials = [
    {
      name: "Priya M.",
      age: 34,
      location: "Mumbai",
      result: "Lost 18kg in 100 days",
      rating: 5,
      image: "👩",
      review: "Fyber changed my relationship with food. No cravings, steady energy, and the weight just melted off. My metabolic markers improved dramatically.",
      beforeWeight: 82,
      afterWeight: 64,
      category: "weight-loss",
    },
    {
      name: "Rajesh K.",
      age: 42,
      location: "Bangalore",
      result: "Reduced waist by 6 inches",
      rating: 5,
      image: "👨",
      review: "As someone with metabolic syndrome, this was a game-changer. My blood sugar stabilized, blood pressure improved, and I feel 10 years younger.",
      beforeWeight: 95,
      afterWeight: 80,
      category: "metabolic",
    },
    {
      name: "Ananya S.",
      age: 29,
      location: "Delhi",
      result: "Transformed gut health",
      rating: 5,
      image: "👩",
      review: "My chronic bloating disappeared within two weeks. The sustained energy throughout the day is incredible. Best investment in my health.",
      beforeWeight: 72,
      afterWeight: 62,
      category: "wellness",
    },
    {
      name: "Vikram P.",
      age: 38,
      location: "Pune",
      result: "Lost 14kg, gained confidence",
      rating: 5,
      image: "👨",
      review: "The science behind this is solid. I've tried everything, but Fyber is the only thing that gave me sustainable results without feeling deprived.",
      beforeWeight: 88,
      afterWeight: 74,
      category: "weight-loss",
    },
  ];

  const stats = [
    { value: "15kg", label: "Average Weight Loss", icon: TrendingDown },
    { value: "92%", label: "Success Rate", icon: Activity },
    { value: "4.8/5", label: "Customer Rating", icon: Star },
    { value: "1000+", label: "Lives Transformed", icon: Heart },
  ];

  const filteredTestimonials = activeFilter === "all" 
    ? testimonials 
    : testimonials.filter(t => t.category === activeFilter);

  return (
    <div className="min-h-screen bg-background pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero */}
        <div className="text-center mb-16 space-y-4">
          <h1 className="text-5xl lg:text-6xl font-bold text-foreground">
            Real Results, Real People
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Discover how Fyber has transformed the lives of thousands through 
            science-backed weight loss and metabolic optimization.
          </p>
        </div>

        {/* Stats */}
        <div className="grid md:grid-cols-4 gap-6 mb-20">
          {stats.map((stat, index) => (
            <Card key={index} className="p-6 text-center hover:border-primary transition-all">
              <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
                <stat.icon className="h-6 w-6 text-primary" />
              </div>
              <div className="text-3xl font-bold text-foreground mb-2">{stat.value}</div>
              <div className="text-sm text-muted-foreground">{stat.label}</div>
            </Card>
          ))}
        </div>

        {/* Filter Tabs */}
        <Tabs defaultValue="all" className="mb-12" onValueChange={setActiveFilter}>
          <TabsList className="grid w-full max-w-2xl mx-auto grid-cols-4">
            <TabsTrigger value="all">All Stories</TabsTrigger>
            <TabsTrigger value="weight-loss">Weight Loss</TabsTrigger>
            <TabsTrigger value="metabolic">Metabolic</TabsTrigger>
            <TabsTrigger value="wellness">Wellness</TabsTrigger>
          </TabsList>
        </Tabs>

        {/* Testimonials Grid */}
        <div className="grid md:grid-cols-2 gap-8 mb-20">
          {filteredTestimonials.map((testimonial, index) => (
            <Card key={index} className="p-8 hover:border-primary transition-all">
              {/* Header */}
              <div className="flex items-start justify-between mb-6">
                <div className="flex items-center gap-4">
                  <div className="text-5xl">{testimonial.image}</div>
                  <div>
                    <div className="font-semibold text-foreground text-lg">{testimonial.name}</div>
                    <div className="text-sm text-muted-foreground">
                      Age {testimonial.age} • {testimonial.location}
                    </div>
                  </div>
                </div>
                <Badge className="bg-primary text-primary-foreground">
                  {testimonial.result}
                </Badge>
              </div>

              {/* Rating */}
              <div className="flex items-center gap-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="h-5 w-5 fill-gold text-gold" />
                ))}
              </div>

              {/* Review */}
              <p className="text-foreground leading-relaxed mb-6">
                "{testimonial.review}"
              </p>

              {/* Weight Progress */}
              <div className="flex items-center justify-between p-4 rounded-lg bg-secondary/30">
                <div className="text-center">
                  <div className="text-sm text-muted-foreground mb-1">Before</div>
                  <div className="text-2xl font-bold text-foreground">{testimonial.beforeWeight}kg</div>
                </div>
                <div className="h-px flex-1 bg-border mx-4 relative">
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-primary text-primary-foreground px-2 py-1 rounded text-xs font-semibold">
                    -{testimonial.beforeWeight - testimonial.afterWeight}kg
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-sm text-muted-foreground mb-1">After</div>
                  <div className="text-2xl font-bold text-primary">{testimonial.afterWeight}kg</div>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Before/After Section */}
        <section className="mb-20">
          <Card className="p-12 bg-gradient-hero text-center">
            <h2 className="text-3xl font-bold text-foreground mb-4">
              Join the Transformation
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-6">
              These are just a few of the thousands who've achieved their health goals with Fyber. 
              Your transformation story could be next.
            </p>
            <div className="text-sm text-muted-foreground">
              *Individual results may vary. Results based on 100-day protocol adherence.
            </div>
          </Card>
        </section>

        {/* Social Proof */}
        <div className="grid md:grid-cols-3 gap-8 text-center">
          <div className="space-y-2">
            <div className="text-4xl font-bold text-primary">4.8/5</div>
            <div className="text-muted-foreground">Average Rating</div>
            <div className="flex items-center justify-center gap-1">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="h-4 w-4 fill-gold text-gold" />
              ))}
            </div>
          </div>
          <div className="space-y-2">
            <div className="text-4xl font-bold text-primary">1,247</div>
            <div className="text-muted-foreground">Verified Reviews</div>
          </div>
          <div className="space-y-2">
            <div className="text-4xl font-bold text-primary">92%</div>
            <div className="text-muted-foreground">Would Recommend</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Results;
