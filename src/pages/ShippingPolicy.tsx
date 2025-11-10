import { Card } from "@/components/ui/card";
import { ExternalLink } from "lucide-react";

const ShippingPolicy = () => {
  return (
    <div className="min-h-screen bg-background pt-24 pb-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <Card className="p-8 md:p-12 bg-gradient-premium">
          <div className="space-y-8">
            <div>
              <h1 className="text-4xl lg:text-5xl font-bold text-foreground mb-4">
                Shipping & Delivery Policy
              </h1>
              <p className="text-muted-foreground">
                Last updated on Oct 30 2025
              </p>
            </div>

            <div className="space-y-6 text-foreground leading-relaxed">
              <p>
                For International buyers, orders are shipped and delivered through registered international courier companies and/or International speed post only. For domestic buyers, orders are shipped through registered domestic courier companies and /or speed post only.
              </p>

              <p>
                Orders are shipped within 0-7 days or as per the delivery date agreed at the time of order confirmation and delivering of the shipment subject to Courier Company / post office norms. FIBERISE FIT PRIVATE LIMITED is not liable for any delay in delivery by the courier company / postal authorities and only guarantees to hand over the consignment to the courier company or postal authorities within 0-7 days from the date of the order and payment or as per the delivery date agreed at the time of order confirmation.
              </p>

              <p>
                Delivery of all orders will be to the address provided by the buyer. Delivery of our services will be confirmed on your mail ID as specified during registration. For any issues in utilizing our services you may contact our helpdesk on 7011803119 or support@fiberisefit.com
              </p>
            </div>

            <div className="pt-6 border-t border-border">
              <a
                href="https://merchant.razorpay.com/policy/RZHNgccrVdS1Qa/shipping"
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

export default ShippingPolicy;

