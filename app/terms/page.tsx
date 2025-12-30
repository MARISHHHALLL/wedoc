import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Terms and Conditions",
  description: "Terms and Conditions for Blog App",
};

export default function TermsAndConditionsPage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-16 max-w-4xl">
        <div className="bg-card rounded-lg shadow-sm border border-border p-8 md:p-12">
          <h1 className="text-4xl font-bold mb-2">Terms and Conditions</h1>
          <p className="text-muted-foreground mb-8">
            Last updated: {new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}
          </p>

          <div className="prose prose-neutral dark:prose-invert max-w-none">
            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">1. Agreement to Terms</h2>
              <p className="text-foreground mb-4">
                By accessing or using Blog App ("the Service"), you agree to be bound by these Terms and Conditions ("Terms"). If you disagree with any part of these terms, then you may not access the Service.
              </p>
              <p className="text-foreground">
                These Terms apply to all visitors, users, and others who access or use the Service.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">2. Use License</h2>
              <p className="text-foreground mb-4">
                Permission is granted to temporarily access and use the Service for personal, non-commercial transitory viewing only. This is the grant of a license, not a transfer of title, and under this license you may not:
              </p>
              <ul className="list-disc pl-6 mb-4 space-y-2 text-foreground">
                <li>Modify or copy the materials</li>
                <li>Use the materials for any commercial purpose or for any public display</li>
                <li>Attempt to reverse engineer any software contained on the Service</li>
                <li>Remove any copyright or other proprietary notations from the materials</li>
                <li>Transfer the materials to another person or "mirror" the materials on any other server</li>
              </ul>
              <p className="text-foreground">
                This license shall automatically terminate if you violate any of these restrictions and may be terminated by us at any time.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">3. User Accounts</h2>
              <p className="text-foreground mb-4">
                When you create an account with us, you must provide information that is accurate, complete, and current at all times. You are responsible for:
              </p>
              <ul className="list-disc pl-6 mb-4 space-y-2 text-foreground">
                <li>Maintaining the security of your account and password</li>
                <li>All activities that occur under your account</li>
                <li>Notifying us immediately of any unauthorized use of your account</li>
              </ul>
              <p className="text-foreground">
                We reserve the right to suspend or terminate accounts that violate these Terms or engage in any fraudulent, abusive, or illegal activity.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">4. User Content</h2>
              <p className="text-foreground mb-4">
                Our Service allows you to post, link, store, share, and otherwise make available certain information, text, graphics, or other material ("Content"). You are responsible for the Content that you post on or through the Service, including its legality, reliability, and appropriateness.
              </p>
              <p className="text-foreground mb-4">
                By posting Content on or through the Service, you grant us the right and license to use, modify, publicly perform, publicly display, reproduce, and distribute such Content on and through the Service.
              </p>
              <p className="text-foreground mb-4">
                You represent and warrant that:
              </p>
              <ul className="list-disc pl-6 mb-4 space-y-2 text-foreground">
                <li>The Content is yours or you have the right to use it and grant us the rights and license as provided in these Terms</li>
                <li>The posting of your Content on or through the Service does not violate the privacy rights, publicity rights, copyrights, contract rights, or any other rights of any person</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">5. Prohibited Uses</h2>
              <p className="text-foreground mb-4">
                You may not use the Service:
              </p>
              <ul className="list-disc pl-6 mb-4 space-y-2 text-foreground">
                <li>In any way that violates any applicable national or international law or regulation</li>
                <li>To transmit, or procure the sending of, any advertising or promotional material without our prior written consent</li>
                <li>To impersonate or attempt to impersonate the company, a company employee, another user, or any other person or entity</li>
                <li>In any way that infringes upon the rights of others, or in any way is illegal, threatening, fraudulent, or harmful</li>
                <li>To engage in any other conduct that restricts or inhibits anyone's use or enjoyment of the Service</li>
                <li>To introduce any viruses, trojan horses, worms, logic bombs, or other material that is malicious or technologically harmful</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">6. Intellectual Property Rights</h2>
              <p className="text-foreground mb-4">
                The Service and its original content, features, and functionality are and will remain the exclusive property of Blog App and its licensors. The Service is protected by copyright, trademark, and other laws. Our trademarks and trade dress may not be used in connection with any product or service without our prior written consent.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">7. Termination</h2>
              <p className="text-foreground mb-4">
                We may terminate or suspend your account and bar access to the Service immediately, without prior notice or liability, under our sole discretion, for any reason whatsoever and without limitation, including but not limited to a breach of the Terms.
              </p>
              <p className="text-foreground">
                If you wish to terminate your account, you may simply discontinue using the Service or contact us to request account deletion.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">8. Disclaimer</h2>
              <p className="text-foreground mb-4">
                The information on this Service is provided on an "as is" basis. To the fullest extent permitted by law, we exclude all representations, warranties, conditions, and terms relating to our Service and the use of this Service.
              </p>
              <p className="text-foreground">
                We do not warrant that the Service will be available at all times or that it will be error-free, secure, or free from viruses or other harmful components.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">9. Limitation of Liability</h2>
              <p className="text-foreground mb-4">
                In no event shall Blog App, nor its directors, employees, partners, agents, suppliers, or affiliates, be liable for any indirect, incidental, special, consequential, or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting from your use of the Service.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">10. Indemnification</h2>
              <p className="text-foreground mb-4">
                You agree to defend, indemnify, and hold harmless Blog App and its licensee and licensors, and their employees, contractors, agents, officers and directors, from and against any and all claims, damages, obligations, losses, liabilities, costs or debt, and expenses (including but not limited to attorney's fees).
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">11. Governing Law</h2>
              <p className="text-foreground mb-4">
                These Terms shall be interpreted and governed by the laws of [Your Jurisdiction], without regard to its conflict of law provisions. Our failure to enforce any right or provision of these Terms will not be considered a waiver of those rights.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">12. Changes to Terms</h2>
              <p className="text-foreground mb-4">
                We reserve the right, at our sole discretion, to modify or replace these Terms at any time. If a revision is material, we will provide at least 30 days notice prior to any new terms taking effect.
              </p>
              <p className="text-foreground">
                By continuing to access or use our Service after those revisions become effective, you agree to be bound by the revised terms.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">13. Contact Information</h2>
              <p className="text-foreground mb-4">
                If you have any questions about these Terms and Conditions, please contact us:
              </p>
              <ul className="list-none space-y-2 text-foreground">
                <li>Email: legal@blogapp.com</li>
                <li>Address: [Your Company Address]</li>
              </ul>
            </section>
          </div>

          <div className="mt-12 pt-8 border-t border-border">
            <Link 
              href="/" 
              className="text-primary hover:underline inline-flex items-center gap-2"
            >
              ← Back to Home
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

