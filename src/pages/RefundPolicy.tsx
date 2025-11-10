import { Card } from "@/components/ui/card";
import { ExternalLink } from "lucide-react";

const RefundPolicy = () => {
  return (
    <div className="min-h-screen bg-background pt-24 pb-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <Card className="p-8 md:p-12 bg-gradient-premium">
          <div className="space-y-8">
            <div>
              <h1 className="text-4xl lg:text-5xl font-bold text-foreground mb-4">
                Cancellation & Refund Policy
              </h1>
              <p className="text-muted-foreground">
                Last updated on Oct 30 2025
              </p>
            </div>

            <div className="space-y-6 text-foreground leading-relaxed">
              <p>
                FIBERISE FIT PRIVATE LIMITED believes in helping its customers as far as possible, and has therefore a liberal cancellation policy. Under this policy:
              </p>

              <ul className="list-disc list-inside space-y-3 ml-4">
                <li>
                  Cancellations will be considered only if the request is made within Same day of placing the order. However, the cancellation request may not be entertained if the orders have been communicated to the vendors/merchants and they have initiated the process of shipping them.
                </li>
                <li>
                  FIBERISE FIT PRIVATE LIMITED does not accept cancellation requests for perishable items like flowers, eatables etc. However, refund/replacement can be made if the customer establishes that the quality of product delivered is not good.
                </li>
                <li>
                  In case of receipt of damaged or defective items please report the same to our Customer Service team. The request will, however, be entertained once the merchant has checked and determined the same at his own end. This should be reported within Same day of receipt of the products.
                </li>
                <li>
                  In case you feel that the product received is not as shown on the site or as per your expectations, you must bring it to the notice of our customer service within Same day of receiving the product. The Customer Service Team after looking into your complaint will take an appropriate decision.
                </li>
                <li>
                  In case of complaints regarding products that come with a warranty from manufacturers, please refer the issue to them.
                </li>
                <li>
                  In case of any Refunds approved by the FIBERISE FIT PRIVATE LIMITED, it'll take 3-5 days for the refund to be processed to the end customer.
                </li>
              </ul>
            </div>

            <div className="pt-6 border-t border-border">
              <a
                href="https://merchant.razorpay.com/policy/RZHNgccrVdS1Qa/refund"
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

export default RefundPolicy;

