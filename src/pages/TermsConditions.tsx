import { Card } from "@/components/ui/card";
import { ExternalLink } from "lucide-react";

const TermsConditions = () => {
  return (
    <div className="min-h-screen bg-background pt-24 pb-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <Card className="p-8 md:p-12 bg-gradient-premium">
          <div className="space-y-8">
            <div>
              <h1 className="text-4xl lg:text-5xl font-bold text-foreground mb-4">
                Terms & Conditions
              </h1>
              <p className="text-muted-foreground">
                Last updated on Oct 30 2025
              </p>
            </div>

            <div className="space-y-6 text-foreground leading-relaxed">
              <p>
                For the purpose of these Terms and Conditions, The term "we", "us", "our" used anywhere on this page shall mean FIBERISE FIT PRIVATE LIMITED, whose registered/operational office is 731/508 S/F, PLOT NO.7 BLOCK 56 DB GUPTA ROAD Karol Bagh Central Delhi New Delhi Delhi India 110005 Sat Nagar SO DELHI 110005. "you", "your", "user", "visitor" shall mean any natural or legal person who is visiting our website and/or agreed to purchase from us.
              </p>

              <p>
                Your use of the website and/or purchase from us are governed by following Terms and Conditions:
              </p>

              <ul className="list-disc list-inside space-y-3 ml-4">
                <li>
                  The content of the pages of this website is subject to change without notice.
                </li>
                <li>
                  Neither we nor any third parties provide any warranty or guarantee as to the accuracy, timeliness, performance, completeness or suitability of the information and materials found or offered on this website for any particular purpose. You acknowledge that such information and materials may contain inaccuracies or errors and we expressly exclude liability for any such inaccuracies or errors to the fullest extent permitted by law.
                </li>
                <li>
                  Your use of any information or materials on our website and/or product pages is entirely at your own risk, for which we shall not be liable. It shall be your own responsibility to ensure that any products, services or information available through our website and/or product pages meet your specific requirements.
                </li>
                <li>
                  Our website contains material which is owned by or licensed to us. This material includes, but are not limited to, the design, layout, look, appearance and graphics. Reproduction is prohibited other than in accordance with the copyright notice, which forms part of these terms and conditions.
                </li>
                <li>
                  All trademarks reproduced in our website which are not the property of, or licensed to, the operator are acknowledged on the website.
                </li>
                <li>
                  Unauthorized use of information provided by us shall give rise to a claim for damages and/or be a criminal offense.
                </li>
                <li>
                  From time to time our website may also include links to other websites. These links are provided for your convenience to provide further information.
                </li>
                <li>
                  You may not create a link to our website from another website or document without FIBERISE FIT PRIVATE LIMITED's prior written consent.
                </li>
                <li>
                  Any dispute arising out of use of our website and/or purchase with us and/or any engagement with us is subject to the laws of India.
                </li>
                <li>
                  We, shall be under no liability whatsoever in respect of any loss or damage arising directly or indirectly out of the decline of authorization for any Transaction, on Account of the Cardholder having exceeded the preset limit mutually agreed by us with our acquiring bank from time to time.
                </li>
              </ul>
            </div>

            <div className="pt-6 border-t border-border">
              <a
                href="https://merchant.razorpay.com/policy/RZHNgccrVdS1Qa/terms"
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

export default TermsConditions;

