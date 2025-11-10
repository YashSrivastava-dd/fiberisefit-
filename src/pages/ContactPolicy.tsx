import { Card } from "@/components/ui/card";
import { ExternalLink, Mail, Phone, MapPin } from "lucide-react";

const ContactPolicy = () => {
  return (
    <div className="min-h-screen bg-background pt-24 pb-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <Card className="p-8 md:p-12 bg-gradient-premium">
          <div className="space-y-8">
            <div>
              <h1 className="text-4xl lg:text-5xl font-bold text-foreground mb-4">
                Contact Us
              </h1>
              <p className="text-muted-foreground">
                Last updated on Oct 30 2025
              </p>
            </div>

            <div className="space-y-6 text-foreground leading-relaxed">
              <p>
                You may contact us using the information below:
              </p>

              <div className="space-y-4 pt-4">
                <div className="p-4 rounded-lg bg-secondary/30">
                  <p className="font-semibold mb-2">Merchant Legal entity name:</p>
                  <p>FIBERISE FIT PRIVATE LIMITED</p>
                </div>

                <div className="p-4 rounded-lg bg-secondary/30">
                  <div className="flex items-start gap-3">
                    <MapPin className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-semibold mb-2">Registered Address:</p>
                      <p>731/508 S/F, PLOT NO.7 BLOCK 56 DB GUPTA ROAD Karol Bagh Central Delhi New Delhi Delhi India 110005 Sat Nagar SO DELHI 110005</p>
                    </div>
                  </div>
                </div>

                <div className="p-4 rounded-lg bg-secondary/30">
                  <div className="flex items-start gap-3">
                    <MapPin className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-semibold mb-2">Operational Address:</p>
                      <p>731/508 S/F, PLOT NO.7 BLOCK 56 DB GUPTA ROAD Karol Bagh Central Delhi New Delhi Delhi India 110005 Sat Nagar SO DELHI 110005</p>
                    </div>
                  </div>
                </div>

                <div className="p-4 rounded-lg bg-secondary/30">
                  <div className="flex items-start gap-3">
                    <Phone className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-semibold mb-2">Telephone No:</p>
                      <a href="tel:7011803119" className="text-primary hover:text-primary/80 transition-colors">
                        7011803119
                      </a>
                    </div>
                  </div>
                </div>

                <div className="p-4 rounded-lg bg-secondary/30">
                  <div className="flex items-start gap-3">
                    <Mail className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-semibold mb-2">E-Mail ID:</p>
                      <a href="mailto:support@fiberisefit.com" className="text-primary hover:text-primary/80 transition-colors">
                        support@fiberisefit.com
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-6 border-t border-border">
              <a
                href="https://merchant.razorpay.com/policy/RZHNgccrVdS1Qa/contact_us"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-primary hover:text-primary/80 transition-colors"
              >
                View full policy on Razorpay
                <ExternalLink className="h-4 w-4" />
              </a>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default ContactPolicy;

