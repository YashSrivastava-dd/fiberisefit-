import { useState } from "react";
import { Star, Check, Award, ShieldCheck, Truck, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import productImage from "@/assets/product-fiber-x.jpg";
import scienceBg from "@/assets/science-bg.jpg";

const ProductDetail = () => {
  const [selectedPack, setSelectedPack] = useState("3-pack");
  const [purchaseType, setPurchaseType] = useState<"one-time" | "subscription">("one-time");

  const packs = [
    { id: "1-pack", size: "1 Month Supply", sachets: 30, price: 3499, originalPrice: 4999, savings: 0 },
    { id: "3-pack", size: "3 Month Supply", sachets: 90, price: 8999, originalPrice: 14997, savings: 6000, popular: true },
    { id: "6-pack", size: "6 Month Supply", sachets: 180, price: 15999, originalPrice: 29994, savings: 14000, bestValue: true },
  ];

  const selectedPackData = packs.find(p => p.id === selectedPack);

  const keyBenefits = [
    "Targets visceral fat accumulation",
    "Balances gut microbiome",
    "Reduces appetite naturally",
    "Supports metabolic health",
    "Improves insulin sensitivity",
    "Patent-pending formulation",
  ];

  const ingredients = [
    { name: "Premium Fiber Blend", amount: "8g", benefit: "Satiety & gut health" },
    { name: "Metabolic Support Complex", amount: "2g", benefit: "Fat metabolism" },
    { name: "Prebiotic Fibers", amount: "3g", benefit: "Microbiome balance" },
    { name: "Bioactive Compounds", amount: "500mg", benefit: "Metabolic optimization" },
  ];

  const faqs = [
    {
      question: "How do I take Fiber-X?",
      answer: "Mix one sachet with 200-250ml of water, preferably 20-30 minutes before your largest meal of the day. Consume immediately after mixing for best results.",
    },
    {
      question: "When will I see results?",
      answer: "Most users notice reduced bloating and improved digestion within 1-2 weeks. Visible body composition changes typically appear around weeks 5-8, with significant results by week 14 following our 100-day protocol.",
    },
    {
      question: "Is it safe for long-term use?",
      answer: "Yes. Fiber-X contains natural, clinically-tested ingredients. It's designed for sustained use and can be safely incorporated into your daily routine even after achieving your weight loss goals.",
    },
    {
      question: "Can I take it with other supplements?",
      answer: "Fiber-X is generally safe to combine with most supplements. However, take it 2-3 hours apart from medications or other supplements to ensure optimal absorption of all nutrients.",
    },
    {
      question: "What's your return policy?",
      answer: "We offer a 100-day money-back guarantee. If you're not satisfied with your results after following the complete protocol, contact us for a full refund.",
    },
  ];

  return (
    <div className="min-h-screen bg-background pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Product Hero */}
        <div className="grid lg:grid-cols-2 gap-12 mb-20">
          {/* Image */}
          <div className="space-y-4">
            <div className="relative rounded-3xl overflow-hidden bg-secondary/30">
              <Badge className="absolute top-6 left-6 z-10 bg-primary text-primary-foreground">
                Patent-Pending
              </Badge>
              <img
                src={productImage}
                alt="Fiber-X"
                className="w-full h-[600px] object-cover"
              />
            </div>
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            <div>
              <h1 className="text-5xl font-bold text-foreground mb-3">Fiber-X</h1>
              <p className="text-xl text-muted-foreground mb-4">
                Patent-Pending Daily Weight Loss Sachet
              </p>
              
              {/* Rating */}
              <div className="flex items-center gap-3 mb-6">
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 fill-gold text-gold" />
                  ))}
                </div>
                <span className="text-sm text-muted-foreground">4.8 (1,247 reviews)</span>
              </div>
            </div>

            {/* Purchase Type */}
            <div className="space-y-3">
              <label className="text-sm font-medium text-foreground">Purchase Type</label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={() => setPurchaseType("one-time")}
                  className={`p-4 rounded-xl border-2 transition-all ${
                    purchaseType === "one-time"
                      ? "border-primary bg-primary/5"
                      : "border-border hover:border-primary/50"
                  }`}
                >
                  <div className="font-semibold text-foreground">One-Time</div>
                  <div className="text-sm text-muted-foreground">Single purchase</div>
                </button>
                <button
                  onClick={() => setPurchaseType("subscription")}
                  className={`p-4 rounded-xl border-2 transition-all relative ${
                    purchaseType === "subscription"
                      ? "border-primary bg-primary/5"
                      : "border-border hover:border-primary/50"
                  }`}
                >
                  <Badge className="absolute -top-2 -right-2 bg-gold text-gold-foreground text-xs">
                    Save 15%
                  </Badge>
                  <div className="font-semibold text-foreground">Subscribe</div>
                  <div className="text-sm text-muted-foreground">Auto-refill</div>
                </button>
              </div>
            </div>

            {/* Pack Selection */}
            <div className="space-y-3">
              <label className="text-sm font-medium text-foreground">Select Supply</label>
              <div className="space-y-3">
                {packs.map((pack) => (
                  <button
                    key={pack.id}
                    onClick={() => setSelectedPack(pack.id)}
                    className={`w-full p-4 rounded-xl border-2 transition-all text-left relative ${
                      selectedPack === pack.id
                        ? "border-primary bg-primary/5"
                        : "border-border hover:border-primary/50"
                    }`}
                  >
                    {pack.popular && (
                      <Badge className="absolute -top-2 right-4 bg-primary text-primary-foreground">
                        Most Popular
                      </Badge>
                    )}
                    {pack.bestValue && (
                      <Badge className="absolute -top-2 right-4 bg-gold text-gold-foreground">
                        Best Value
                      </Badge>
                    )}
                    <div className="flex justify-between items-center">
                      <div>
                        <div className="font-semibold text-foreground">{pack.size}</div>
                        <div className="text-sm text-muted-foreground">{pack.sachets} sachets</div>
                      </div>
                      <div className="text-right">
                        <div className="text-2xl font-bold text-foreground">
                          ₹{(pack.price / 100).toLocaleString()}
                        </div>
                        {pack.originalPrice && (
                          <div className="text-sm text-muted-foreground line-through">
                            ₹{(pack.originalPrice / 100).toLocaleString()}
                          </div>
                        )}
                        {pack.savings > 0 && (
                          <div className="text-sm text-primary font-medium">
                            Save ₹{(pack.savings / 100).toLocaleString()}
                          </div>
                        )}
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Price Summary */}
            <div className="p-6 rounded-xl bg-secondary/30 space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">Subtotal</span>
                <span className="text-foreground font-medium">
                  ₹{selectedPackData && (selectedPackData.price / 100).toLocaleString()}
                </span>
              </div>
              {purchaseType === "subscription" && (
                <div className="flex justify-between items-center text-primary">
                  <span>Subscription Discount (15%)</span>
                  <span className="font-medium">
                    -₹{selectedPackData && ((selectedPackData.price * 0.15) / 100).toLocaleString()}
                  </span>
                </div>
              )}
              <div className="pt-3 border-t border-border flex justify-between items-center">
                <span className="text-lg font-semibold text-foreground">Total</span>
                <span className="text-2xl font-bold text-foreground">
                  ₹{selectedPackData && 
                    (purchaseType === "subscription" 
                      ? ((selectedPackData.price * 0.85) / 100).toLocaleString()
                      : (selectedPackData.price / 100).toLocaleString()
                    )}
                </span>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="space-y-3">
              <Button size="lg" variant="premium" className="w-full">
                Add to Cart
              </Button>
              <Button size="lg" variant="outline-premium" className="w-full">
                Buy Now
              </Button>
            </div>

            {/* Trust Badges */}
            <div className="grid grid-cols-2 gap-4 pt-4">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Truck className="h-5 w-5 text-primary" />
                Free Shipping
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <RefreshCw className="h-5 w-5 text-primary" />
                100-Day Returns
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <ShieldCheck className="h-5 w-5 text-primary" />
                Quality Assured
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Award className="h-5 w-5 text-primary" />
                Clinically Tested
              </div>
            </div>
          </div>
        </div>

        {/* Product Details Tabs */}
        <Tabs defaultValue="benefits" className="mb-20">
          <TabsList className="grid w-full grid-cols-4 mb-8">
            <TabsTrigger value="benefits">Benefits</TabsTrigger>
            <TabsTrigger value="ingredients">Ingredients</TabsTrigger>
            <TabsTrigger value="science">Science</TabsTrigger>
            <TabsTrigger value="usage">Usage</TabsTrigger>
          </TabsList>

          <TabsContent value="benefits" className="space-y-6">
            <Card className="p-8">
              <h3 className="text-2xl font-bold text-foreground mb-6">Key Benefits</h3>
              <div className="grid md:grid-cols-2 gap-4">
                {keyBenefits.map((benefit, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <Check className="h-6 w-6 text-primary flex-shrink-0 mt-0.5" />
                    <span className="text-foreground">{benefit}</span>
                  </div>
                ))}
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="ingredients" className="space-y-6">
            <Card className="p-8">
              <h3 className="text-2xl font-bold text-foreground mb-6">Premium Ingredients</h3>
              <div className="space-y-4">
                {ingredients.map((ingredient, index) => (
                  <div key={index} className="flex items-center justify-between p-4 rounded-lg bg-secondary/30">
                    <div>
                      <div className="font-semibold text-foreground">{ingredient.name}</div>
                      <div className="text-sm text-muted-foreground">{ingredient.benefit}</div>
                    </div>
                    <div className="text-lg font-bold text-primary">{ingredient.amount}</div>
                  </div>
                ))}
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="science" className="space-y-6">
            <Card className="p-8 relative overflow-hidden">
              <div 
                className="absolute inset-0 opacity-5"
                style={{ backgroundImage: `url(${scienceBg})`, backgroundSize: 'cover' }}
              ></div>
              <div className="relative z-10">
                <h3 className="text-2xl font-bold text-foreground mb-6">Clinical Evidence</h3>
                <div className="space-y-4 text-foreground leading-relaxed">
                  <p>
                    Fiber-X's patent-pending formula is backed by extensive clinical research demonstrating 
                    significant improvements in weight loss, metabolic markers, and gut health.
                  </p>
                  <p>
                    Our proprietary blend combines premium soluble fibers with metabolic cofactors, 
                    creating a synergistic effect that targets multiple pathways of weight regulation simultaneously.
                  </p>
                  <p>
                    Third-party testing confirms the purity, potency, and safety of every batch, 
                    ensuring pharmaceutical-grade quality in every sachet.
                  </p>
                </div>
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="usage" className="space-y-6">
            <Card className="p-8">
              <h3 className="text-2xl font-bold text-foreground mb-6">How to Use</h3>
              <ol className="space-y-4">
                <li className="flex gap-4">
                  <span className="flex-shrink-0 h-8 w-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-semibold">
                    1
                  </span>
                  <div>
                    <div className="font-semibold text-foreground mb-1">Mix with Water</div>
                    <div className="text-muted-foreground">
                      Add one sachet to 200-250ml of room temperature water
                    </div>
                  </div>
                </li>
                <li className="flex gap-4">
                  <span className="flex-shrink-0 h-8 w-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-semibold">
                    2
                  </span>
                  <div>
                    <div className="font-semibold text-foreground mb-1">Stir Well</div>
                    <div className="text-muted-foreground">
                      Mix thoroughly until completely dissolved
                    </div>
                  </div>
                </li>
                <li className="flex gap-4">
                  <span className="flex-shrink-0 h-8 w-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-semibold">
                    3
                  </span>
                  <div>
                    <div className="font-semibold text-foreground mb-1">Consume Before Meals</div>
                    <div className="text-muted-foreground">
                      Drink 20-30 minutes before your largest meal of the day
                    </div>
                  </div>
                </li>
              </ol>
            </Card>
          </TabsContent>
        </Tabs>

        {/* FAQs */}
        <div className="mb-20">
          <h2 className="text-4xl font-bold text-foreground text-center mb-12">
            Frequently Asked Questions
          </h2>
          <div className="max-w-3xl mx-auto">
            <Accordion type="single" collapsible className="space-y-4">
              {faqs.map((faq, index) => (
                <AccordionItem 
                  key={index} 
                  value={`item-${index}`}
                  className="border border-border rounded-xl px-6 bg-card"
                >
                  <AccordionTrigger className="text-left font-semibold text-foreground hover:text-primary">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
