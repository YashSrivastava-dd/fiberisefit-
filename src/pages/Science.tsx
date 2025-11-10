import { Microscope, FlaskConical, Award, FileText } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import scienceBg from "@/assets/science-bg.jpg";

const Science = () => {
  const research = [
    {
      title: "Fiber Satiety & Weight Loss",
      journal: "Journal of Nutrition",
      year: "2023",
      finding: "Soluble fiber supplementation resulted in significant reduction in body weight and visceral fat",
    },
    {
      title: "Gut Microbiome & Metabolism",
      journal: "Nature Metabolism",
      year: "2023",
      finding: "Prebiotic fibers enhance beneficial bacteria, improving metabolic markers and insulin sensitivity",
    },
    {
      title: "Lipid Metabolism Enhancement",
      journal: "Clinical Nutrition",
      year: "2022",
      finding: "Plant-based fiber compounds demonstrate significant impact on cholesterol management",
    },
  ];

  const mechanisms = [
    {
      icon: Microscope,
      title: "Visceral Fat Targeting",
      description: "Premium soluble fibers specifically target deep abdominal fat through enhanced satiety and reduced caloric intake.",
    },
    {
      icon: FlaskConical,
      title: "Gut-Brain Axis",
      description: "Prebiotic fibers feed beneficial bacteria that produce metabolites signaling fullness and reducing appetite.",
    },
    {
      icon: Award,
      title: "Metabolic Optimization",
      description: "Bioactive compounds enhance insulin sensitivity and support healthy glucose metabolism.",
    },
    {
      icon: FileText,
      title: "Lipid Control",
      description: "Natural fiber complexes bind to dietary fats and support healthy cholesterol levels.",
    },
  ];

  const ingredients = [
    {
      name: "Premium Fiber Blend",
      scientificName: "Soluble & Insoluble Fibers",
      benefit: "Creates satiety, supports gut health, reduces calorie absorption",
      dosage: "8g per serving",
    },
    {
      name: "Prebiotic Complex",
      scientificName: "Resistant Starch & FOS",
      benefit: "Feeds beneficial gut bacteria, improves metabolic function",
      dosage: "3g per serving",
    },
    {
      name: "Metabolic Cofactors",
      scientificName: "Plant-Based Bioactives",
      benefit: "Enhances fat metabolism and insulin sensitivity",
      dosage: "2g per serving",
    },
    {
      name: "Bioactive Compounds",
      scientificName: "Standardized Extracts",
      benefit: "Supports lipid control and cardiovascular health",
      dosage: "500mg per serving",
    },
  ];

  return (
    <div className="min-h-screen bg-background pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero */}
        <div className="text-center mb-16 space-y-4">
          <Badge className="bg-primary text-primary-foreground mb-4">
            Patent-Pending Research
          </Badge>
          <h1 className="text-5xl lg:text-6xl font-bold text-foreground">
            The Science Behind <span className="text-primary">Fyber</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Our formula is built on decades of metabolic research, combining premium ingredients 
            with clinically-validated mechanisms for comprehensive weight management.
          </p>
        </div>

        {/* Hero Image Section */}
        <div className="mb-20 relative rounded-3xl overflow-hidden">
          <img 
            src={scienceBg} 
            alt="Scientific Research" 
            className="w-full h-96 object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-background/90 to-transparent flex items-center">
            <div className="p-12 max-w-2xl">
              <h2 className="text-3xl font-bold text-foreground mb-4">
                Evidence-Based Innovation
              </h2>
              <p className="text-lg text-foreground leading-relaxed">
                Every ingredient in Fyber is selected based on rigorous clinical research, 
                with dosages optimized for maximum efficacy and safety.
              </p>
            </div>
          </div>
        </div>

        {/* Mechanisms of Action */}
        <section className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-foreground mb-4">
              Four Mechanisms of Action
            </h2>
            <p className="text-xl text-muted-foreground">
              How Fyber delivers comprehensive metabolic transformation
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            {mechanisms.map((mechanism, index) => (
              <Card key={index} className="p-8 hover:border-primary transition-all">
                <div className="h-14 w-14 rounded-2xl bg-primary/10 flex items-center justify-center mb-4">
                  <mechanism.icon className="h-7 w-7 text-primary" />
                </div>
                <h3 className="text-2xl font-semibold text-foreground mb-3">
                  {mechanism.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {mechanism.description}
                </p>
              </Card>
            ))}
          </div>
        </section>

        {/* Clinical Ingredients */}
        <section className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-foreground mb-4">
              Clinical-Grade Ingredients
            </h2>
            <p className="text-xl text-muted-foreground">
              Pharmaceutical-quality compounds at therapeutic dosages
            </p>
          </div>
          <div className="space-y-4">
            {ingredients.map((ingredient, index) => (
              <Card key={index} className="p-6 hover:border-primary transition-all">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-xl font-semibold text-foreground">
                        {ingredient.name}
                      </h3>
                      <Badge variant="secondary" className="text-xs">
                        {ingredient.dosage}
                      </Badge>
                    </div>
                    <div className="text-sm text-muted-foreground mb-2">
                      {ingredient.scientificName}
                    </div>
                    <p className="text-foreground">
                      {ingredient.benefit}
                    </p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </section>

        {/* Supporting Research */}
        <section className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-foreground mb-4">
              Supporting Clinical Research
            </h2>
            <p className="text-xl text-muted-foreground">
              Published studies validating our formula's ingredients
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {research.map((study, index) => (
              <Card key={index} className="p-6 hover:border-primary transition-all">
                <div className="h-12 w-12 rounded-xl bg-gold/10 flex items-center justify-center mb-4">
                  <FileText className="h-6 w-6 text-gold" />
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">
                  {study.title}
                </h3>
                <div className="text-sm text-muted-foreground mb-3">
                  {study.journal} ({study.year})
                </div>
                <p className="text-sm text-foreground leading-relaxed">
                  {study.finding}
                </p>
              </Card>
            ))}
          </div>
        </section>

        {/* Quality & Safety */}
        <section>
          <Card className="p-12 bg-gradient-premium">
            <div className="text-center max-w-4xl mx-auto space-y-6">
              <h2 className="text-3xl font-bold text-foreground">
                Quality & Safety Standards
              </h2>
              <p className="text-lg text-foreground leading-relaxed">
                Fyber is manufactured in GMP-certified facilities with rigorous quality controls. 
                Every batch undergoes third-party testing for purity, potency, and safety. 
                Our patent-pending formula represents years of research and development, 
                protected by intellectual property that ensures you're getting a truly unique, 
                scientifically-optimized product.
              </p>
              <div className="flex flex-wrap justify-center gap-4 pt-6">
                <Badge className="bg-primary text-primary-foreground px-4 py-2">
                  GMP Certified
                </Badge>
                <Badge className="bg-primary text-primary-foreground px-4 py-2">
                  Third-Party Tested
                </Badge>
                <Badge className="bg-primary text-primary-foreground px-4 py-2">
                  Patent-Pending
                </Badge>
                <Badge className="bg-primary text-primary-foreground px-4 py-2">
                  Clinically Validated
                </Badge>
              </div>
            </div>
          </Card>
        </section>
      </div>
    </div>
  );
};

export default Science;
