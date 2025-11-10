import { Card } from "@/components/ui/card";
import { ExternalLink } from "lucide-react";

const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen bg-background pt-24 pb-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <Card className="p-8 md:p-12 bg-gradient-premium">
          <div className="space-y-8">
            <div>
              <h1 className="text-4xl lg:text-5xl font-bold text-foreground mb-4">
                Privacy Policy
              </h1>
              <p className="text-muted-foreground">
                Last updated on Oct 30 2025
              </p>
            </div>

            <div className="space-y-6 text-foreground leading-relaxed">
              <p>
                This privacy policy sets out how FIBERISE FIT PRIVATE LIMITED uses and protects any information that you give FIBERISE FIT PRIVATE LIMITED when you visit their website and/or agree to purchase from them.
              </p>

              <p>
                FIBERISE FIT PRIVATE LIMITED is committed to ensuring that your privacy is protected. Should we ask you to provide certain information by which you can be identified when using this website, and then you can be assured that it will only be used in accordance with this privacy statement.
              </p>

              <p>
                FIBERISE FIT PRIVATE LIMITED may change this policy from time to time by updating this page. You should check this page from time to time to ensure that you adhere to these changes.
              </p>

              <div>
                <h2 className="text-2xl font-semibold text-foreground mb-4 mt-8">
                  We may collect the following information:
                </h2>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Name</li>
                  <li>Contact information including email address</li>
                  <li>Demographic information such as postcode, preferences and interests, if required</li>
                  <li>Other information relevant to customer surveys and/or offers</li>
                </ul>
              </div>

              <div>
                <h2 className="text-2xl font-semibold text-foreground mb-4 mt-8">
                  What we do with the information we gather
                </h2>
                <p className="mb-3">
                  We require this information to understand your needs and provide you with a better service, and in particular for the following reasons:
                </p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Internal record keeping.</li>
                  <li>We may use the information to improve our products and services.</li>
                  <li>We may periodically send promotional emails about new products, special offers or other information which we think you may find interesting using the email address which you have provided.</li>
                  <li>From time to time, we may also use your information to contact you for market research purposes. We may contact you by email, phone, fax or mail. We may use the information to customise the website according to your interests.</li>
                </ul>
              </div>

              <p>
                We are committed to ensuring that your information is secure. In order to prevent unauthorised access or disclosure we have put in suitable measures.
              </p>

              <div>
                <h2 className="text-2xl font-semibold text-foreground mb-4 mt-8">
                  How we use cookies
                </h2>
                <p className="mb-3">
                  A cookie is a small file which asks permission to be placed on your computer's hard drive. Once you agree, the file is added and the cookie helps analyze web traffic or lets you know when you visit a particular site. Cookies allow web applications to respond to you as an individual. The web application can tailor its operations to your needs, likes and dislikes by gathering and remembering information about your preferences.
                </p>
                <p className="mb-3">
                  We use traffic log cookies to identify which pages are being used. This helps us analyze data about webpage traffic and improve our website in order to tailor it to customer needs. We only use this information for statistical analysis purposes and then the data is removed from the system.
                </p>
                <p>
                  Overall, cookies help us provide you with a better website, by enabling us to monitor which pages you find useful and which you do not. A cookie in no way gives us access to your computer or any information about you, other than the data you choose to share with us.
                </p>
                <p className="mt-3">
                  You can choose to accept or decline cookies. Most web browsers automatically accept cookies, but you can usually modify your browser setting to decline cookies if you prefer. This may prevent you from taking full advantage of the website.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-semibold text-foreground mb-4 mt-8">
                  Controlling your personal information
                </h2>
                <p className="mb-3">
                  You may choose to restrict the collection or use of your personal information in the following ways:
                </p>
                <ul className="list-disc list-inside space-y-2 ml-4 mb-4">
                  <li>whenever you are asked to fill in a form on the website, look for the box that you can click to indicate that you do not want the information to be used by anybody for direct marketing purposes</li>
                  <li>if you have previously agreed to us using your personal information for direct marketing purposes, you may change your mind at any time by writing to or emailing us at support@fiberisefit.com</li>
                </ul>
                <p className="mb-3">
                  We will not sell, distribute or lease your personal information to third parties unless we have your permission or are required by law to do so. We may use your personal information to send you promotional information about third parties which we think you may find interesting if you tell us that you wish this to happen.
                </p>
                <p>
                  If you believe that any information we are holding on you is incorrect or incomplete, please write to 731/508 S/F, PLOT NO.7 BLOCK 56 DB GUPTA ROAD Karol Bagh Central Delhi New Delhi Delhi India 110005 Sat Nagar SO DELHI 110005. or contact us at 7011803119 or support@fiberisefit.com as soon as possible. We will promptly correct any information found to be incorrect.
                </p>
              </div>
            </div>

            <div className="pt-6 border-t border-border">
              <a
                href="https://merchant.razorpay.com/policy/RZHNgccrVdS1Qa/privacy"
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

export default PrivacyPolicy;

