import { Link } from "react-router-dom";
import { ArrowRight, CheckCircle, Award, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { AIAssistantDemo } from "@/components/AIAssistantDemo";
import heroImage from "@/assets/hero-fyber.jpg";
import productImage from "@/assets/product-fyber.jpg";
import scienceBg from "@/assets/science-bg.jpg";

const Home = () => {
  const benefits = [
    "Targets visceral fat naturally",
    "Clinically proven ingredients",
    "Supports gut health",
    "100-day transformation protocol",
  ];

  const pillars = [
    {
      title: "Fiber Satiety",
      description: "Premium soluble fibers that expand in your stomach, naturally reducing appetite and calorie intake.",
    },
    {
      title: "Gut Balance",
      description: "Prebiotic fibers feed beneficial gut bacteria, optimizing metabolism and reducing inflammation.",
    },
    {
      title: "Lipid Control",
      description: "Natural compounds that support healthy fat metabolism and cholesterol management.",
    },
    {
      title: "Metabolic Support",
      description: "Bioactive nutrients that enhance insulin sensitivity and optimize fat burning.",
    },
  ];

  const timeline = [
    { week: "Week 1-2", result: "Reduced bloating, improved digestion" },
    { week: "Week 3-4", result: "Decreased cravings, steady energy" },
    { week: "Week 5-8", result: "Visible body composition changes" },
    { week: "Week 9-14", result: "Significant weight loss, metabolic improvements" },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center bg-gradient-hero pt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8 animate-fade-up">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-sage-light/30 rounded-full border border-sage-light">
                <Award className="h-4 w-4 text-sage-dark" />
                <span className="text-sm font-medium text-sage-dark">Patent-Pending Formula</span>
              </div>
              
              <h1 className="text-5xl lg:text-7xl font-bold leading-tight text-foreground">
                Precision Weight Loss
                <span className="block text-primary mt-2">in 100 Days</span>
              </h1>
              
              <p className="text-xl text-muted-foreground leading-relaxed max-w-xl">
                A science-backed daily sachet that targets visceral fat, balances gut health, 
                and delivers sustainable weight loss through precision nutrition.
              </p>

              <div className="space-y-4">
                {benefits.map((benefit, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <CheckCircle className="h-5 w-5 text-primary flex-shrink-0" />
                    <span className="text-foreground">{benefit}</span>
                  </div>
                ))}
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/product/fyber">
                  <Button size="lg" variant="premium" className="w-full sm:w-auto">
                    Start Your Journey
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
                <Link to="/science">
                  <Button size="lg" variant="outline-premium" className="w-full sm:w-auto">
                    View Science
                  </Button>
                </Link>
              </div>
            </div>

            <div className="relative animate-scale-in">
              <div className="absolute inset-0 bg-gradient-accent opacity-20 blur-3xl rounded-full"></div>
              <img
                src={heroImage}
                alt="Fyber Premium Supplement"
                className="relative rounded-3xl shadow-premium"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Problem Insight */}
      <section className="py-24 bg-card">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center space-y-6">
            <h2 className="text-4xl lg:text-5xl font-bold text-foreground">
              Why Traditional Diets Fail
            </h2>
            <p className="text-xl text-muted-foreground leading-relaxed">
              Most weight loss approaches ignore the root cause: visceral fat accumulation 
              and gut microbiome imbalance. Fyber addresses both through targeted, 
              science-backed nutrition that works with your body's natural processes.
            </p>
          </div>
        </div>
      </section>

      {/* How Fyber Works */}
      <section className="py-24 bg-gradient-premium relative overflow-hidden">
        <div 
          className="absolute inset-0 opacity-5"
          style={{ backgroundImage: `url(${scienceBg})`, backgroundSize: 'cover' }}
        ></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full mb-6">
              <Sparkles className="h-4 w-4 text-primary" />
              <span className="text-sm font-medium text-primary">4 Pillars of Action</span>
            </div>
            <h2 className="text-4xl lg:text-5xl font-bold text-foreground mb-6">
              How Fyber Works
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Our patent-pending formula combines four synergistic mechanisms 
              to deliver comprehensive metabolic transformation.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {pillars.map((pillar, index) => (
              <Card 
                key={index} 
                className="p-6 border-border hover:border-primary transition-all duration-300 hover:shadow-lg bg-card/50 backdrop-blur"
              >
                <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                  <span className="text-2xl font-bold text-primary">{index + 1}</span>
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-3">{pillar.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{pillar.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-24 bg-card">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold text-foreground mb-6">
              What to Expect
            </h2>
            <p className="text-xl text-muted-foreground">
              Your transformation journey, week by week
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {timeline.map((phase, index) => (
              <div 
                key={index}
                className="relative p-6 rounded-xl border border-border bg-background hover:border-primary transition-all duration-300"
              >
                <div className="absolute -top-4 left-6 px-3 py-1 bg-primary text-primary-foreground rounded-full text-sm font-semibold">
                  {phase.week}
                </div>
                <p className="text-foreground leading-relaxed mt-4">{phase.result}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* AI Assistant Demo */}
      <AIAssistantDemo />

      {/* CTA Section */}
      <section className="py-24 bg-gradient-accent relative overflow-hidden">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <h2 className="text-4xl lg:text-5xl font-bold text-primary-foreground mb-6">
            Start Your Transformation Today
          </h2>
          <p className="text-xl text-primary-foreground/90 mb-8">
            Join thousands who've achieved lasting weight loss with our patent-pending formula.
          </p>
          <Link to="/product/fyber">
            <Button size="lg" variant="outline" className="bg-card hover:bg-card/90 text-foreground border-0 shadow-lg">
              Shop Fyber
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </div>
      </section>

      {/* Product Showcase */}
      <section className="py-24 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="order-2 lg:order-1">
              <img
                src={productImage}
                alt="Fyber Product"
                className="rounded-3xl shadow-premium"
              />
            </div>
            <div className="order-1 lg:order-2 space-y-6">
              <h2 className="text-4xl lg:text-5xl font-bold text-foreground">
                Premium Quality,
                <span className="block text-primary">Clinical Results</span>
              </h2>
              <p className="text-xl text-muted-foreground leading-relaxed">
                Every sachet contains pharmaceutical-grade ingredients, 
                manufactured in certified facilities with rigorous quality controls. 
                Our formula is backed by clinical research and protected by patent-pending technology.
              </p>
              <div className="flex items-center gap-3 pt-4">
                <Award className="h-8 w-8 text-gold" />
                <span className="text-foreground font-medium">Clinically Validated • GMP Certified • Patent-Pending</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
