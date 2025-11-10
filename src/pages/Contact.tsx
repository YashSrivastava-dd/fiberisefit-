import { Mail, Phone, MapPin, Clock } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

const Contact = () => {
  const contactInfo = [
    {
      icon: Mail,
      title: "Email Us",
      details: "support@fiberisefit.com",
      link: "mailto:support@fiberisefit.com",
    },
    {
      icon: Phone,
      title: "Call Us",
      details: "+91 1800-123-4567",
      link: "tel:+911800123456 7",
    },
    {
      icon: MapPin,
      title: "Visit Us",
      details: "Mumbai, Maharashtra, India",
      link: null,
    },
    {
      icon: Clock,
      title: "Support Hours",
      details: "Mon-Sat, 9 AM - 6 PM IST",
      link: null,
    },
  ];

  return (
    <div className="min-h-screen bg-background pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero */}
        <div className="text-center mb-16 space-y-4">
          <h1 className="text-5xl lg:text-6xl font-bold text-foreground">
            Get in Touch
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Have questions about Fyber or need support? We're here to help you on your transformation journey.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 mb-20">
          {/* Contact Form */}
          <Card className="p-8">
            <h2 className="text-2xl font-bold text-foreground mb-6">
              Send Us a Message
            </h2>
            <form className="space-y-6">
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">
                    First Name
                  </label>
                  <Input placeholder="John" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">
                    Last Name
                  </label>
                  <Input placeholder="Doe" />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">
                  Email
                </label>
                <Input type="email" placeholder="john@example.com" />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">
                  Phone (Optional)
                </label>
                <Input type="tel" placeholder="+91 98765 43210" />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">
                  Subject
                </label>
                <Input placeholder="How can we help?" />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">
                  Message
                </label>
                <Textarea 
                  placeholder="Tell us more about your inquiry..."
                  rows={6}
                />
              </div>

              <Button size="lg" variant="premium" className="w-full">
                Send Message
              </Button>
            </form>
          </Card>

          {/* Contact Info */}
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold text-foreground mb-6">
                Contact Information
              </h2>
              <div className="space-y-4">
                {contactInfo.map((info, index) => (
                  <Card key={index} className="p-6 hover:border-primary transition-all">
                    <div className="flex items-start gap-4">
                      <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                        <info.icon className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-foreground mb-1">
                          {info.title}
                        </h3>
                        {info.link ? (
                          <a 
                            href={info.link}
                            className="text-muted-foreground hover:text-primary transition-colors"
                          >
                            {info.details}
                          </a>
                        ) : (
                          <p className="text-muted-foreground">{info.details}</p>
                        )}
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </div>

            {/* FAQ Quick Links */}
            <Card className="p-8 bg-gradient-hero">
              <h3 className="text-xl font-semibold text-foreground mb-4">
                Quick Answers
              </h3>
              <p className="text-muted-foreground mb-4">
                Looking for immediate help? Check out our FAQ section for answers to common questions.
              </p>
              <Button variant="outline" className="w-full">
                View FAQs
              </Button>
            </Card>
          </div>
        </div>

        {/* Trust Section */}
        <div className="text-center">
          <Card className="p-12 bg-gradient-premium">
            <h2 className="text-3xl font-bold text-foreground mb-4">
              Committed to Your Success
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Our customer support team is dedicated to helping you achieve your wellness goals. 
              We typically respond within 24 hours and are here to support you every step of the way.
            </p>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Contact;
