import { Award, Users, Target, Heart } from "lucide-react";
import { Card } from "@/components/ui/card";

const About = () => {
  const values = [
    {
      icon: Award,
      title: "Science-First",
      description: "Every formula backed by rigorous research and clinical validation",
    },
    {
      icon: Users,
      title: "Community-Driven",
      description: "Building a movement of empowered individuals achieving lasting transformation",
    },
    {
      icon: Target,
      title: "Results-Focused",
      description: "Precision nutrition designed for measurable, sustainable outcomes",
    },
    {
      icon: Heart,
      title: "Wellness-Centered",
      description: "Holistic approach addressing root causes, not just symptoms",
    },
  ];

  const milestones = [
    { year: "2022", title: "Foundation", description: "Research begins on precision fiber formulation" },
    { year: "2023", title: "Clinical Trials", description: "Patent-pending formula undergoes rigorous testing" },
    { year: "2024", title: "Launch", description: "Fiber-X debuts to market with transformative results" },
    { year: "2025", title: "Expansion", description: "Growing portfolio of science-backed wellness solutions" },
  ];

  return (
    <div className="min-h-screen bg-background pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero */}
        <div className="text-center mb-20 space-y-6 max-w-4xl mx-auto">
          <h1 className="text-5xl lg:text-6xl font-bold text-foreground">
            About <span className="text-primary">Fiberise Fit</span>
          </h1>
          <p className="text-xl text-muted-foreground leading-relaxed">
            We're on a mission to revolutionize weight management through precision nutrition, 
            combining cutting-edge science with natural, sustainable solutions.
          </p>
        </div>

        {/* Story */}
        <section className="mb-24">
          <Card className="p-12 bg-gradient-premium">
            <div className="max-w-3xl mx-auto space-y-6 text-center">
              <h2 className="text-3xl font-bold text-foreground mb-6">Our Story</h2>
              <p className="text-lg text-foreground leading-relaxed">
                Fiberise Fit was born from a simple observation: traditional weight loss approaches 
                ignore the fundamental role of gut health and fiber nutrition in metabolic regulation.
              </p>
              <p className="text-lg text-foreground leading-relaxed">
                After years of research and development, we created Fiber-X—a patent-pending formula 
                that addresses weight loss at its root cause, combining premium fibers with metabolic 
                cofactors for comprehensive, sustainable transformation.
              </p>
              <p className="text-lg text-foreground leading-relaxed">
                Today, we're proud to be at the forefront of science-backed wellness, helping thousands 
                achieve their health goals through precision nutrition and evidence-based formulations.
              </p>
            </div>
          </Card>
        </section>

        {/* Values */}
        <section className="mb-24">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-foreground mb-4">Our Values</h2>
            <p className="text-xl text-muted-foreground">
              The principles that guide everything we do
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => (
              <Card key={index} className="p-6 text-center hover:border-primary transition-all">
                <div className="h-16 w-16 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <value.icon className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-3">{value.title}</h3>
                <p className="text-muted-foreground">{value.description}</p>
              </Card>
            ))}
          </div>
        </section>

        {/* Timeline */}
        <section className="mb-24">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-foreground mb-4">Our Journey</h2>
            <p className="text-xl text-muted-foreground">
              From research to revolution
            </p>
          </div>
          <div className="max-w-4xl mx-auto space-y-6">
            {milestones.map((milestone, index) => (
              <div 
                key={index}
                className="flex gap-6 items-start p-6 rounded-xl border border-border hover:border-primary transition-all bg-card"
              >
                <div className="flex-shrink-0 h-16 w-16 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-xl">
                  {milestone.year}
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-foreground mb-2">{milestone.title}</h3>
                  <p className="text-muted-foreground">{milestone.description}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Team Section */}
        <section className="text-center">
          <Card className="p-12 bg-gradient-hero">
            <h2 className="text-3xl font-bold text-foreground mb-4">
              Built by Experts, Trusted by Thousands
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Our team combines nutritional science, metabolic research, and formulation expertise 
              to create products that deliver real, measurable results. Every decision is guided by 
              clinical evidence and validated through rigorous testing.
            </p>
          </Card>
        </section>
      </div>
    </div>
  );
};

export default About;
