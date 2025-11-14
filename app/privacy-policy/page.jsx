"use client";

import React from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Shield, Mail, Phone, Globe, Lock } from "lucide-react";

const PrivacyPolicy = () => {
  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-gradient-to-b from-white via-gray-50 to-white">
        <div className="container mx-auto px-4 md:px-6 lg:px-8 py-12 md:py-16 max-w-5xl">
          
          {/* Header */}
          <header className="text-center mb-12">
            <Badge variant="outline" className="mb-4 text-green-600 border-green-600">
              Legal
            </Badge>
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-3">
              Privacy Policy
            </h1>
            <p className="text-lg text-muted-foreground">
              Last updated: <strong>November 14, 2025</strong>
            </p>
          </header>

          <Card className="p-8 md:p-10 shadow-sm">
            <div className="prose prose-lg max-w-none text-muted-foreground space-y-8">

              {/* Intro */}
              <section>
                <p className="text-foreground leading-relaxed">
                  At <strong>Level Technologies Pvt. Ltd.</strong>, your privacy is our priority. 
                  This Privacy Policy explains how we collect, use, and protect your information when you use our website.
                </p>
              </section>

              <Separator />

              {/* 1. Information We Collect */}
              <section>
                <h2 className="text-2xl font-bold text-foreground mb-3 flex items-center gap-2">
                  <Globe className="h-5 w-5 text-green-600" />
                  1. Information We Collect
                </h2>
                <ul className="space-y-3 ml-6">
                  <li><strong>Personal Data:</strong> Name, email, phone, and shipping address when you create an account or place an order.</li>
                  <li><strong>Payment Data:</strong> Processed securely via trusted partners (we do not store full card details).</li>
                  <li><strong>Usage Data:</strong> IP address, browser type, pages visited, and time spent on site.</li>
                  <li><strong>Account Data:</strong> Order history, wishlist, and preferences.</li>
                </ul>
              </section>

              <Separator />

              {/* 2. How We Use Your Data */}
              <section>
                <h2 className="text-2xl font-bold text-foreground mb-3 flex items-center gap-2">
                  <Lock className="h-5 w-5 text-green-600" />
                  2. How We Use Your Information
                </h2>
                <ul className="space-y-2 ml-6">
                  <li>Process and fulfill your orders</li>
                  <li>Send order confirmations and updates</li>
                  <li>Improve your shopping experience</li>
                  <li>Send promotional offers (you can opt out)</li>
                  <li>Prevent fraud and ensure site security</li>
                  <li>Comply with legal obligations</li>
                </ul>
              </section>

              <Separator />

              {/* 3. Sharing Your Data */}
              <section>
                <h2 className="text-2xl font-bold text-foreground mb-3 flex items-center gap-2">
                  <Shield className="h-5 w-5 text-green-600" />
                  3. When We Share Your Information
                </h2>
                <ul className="space-y-3 ml-6">
                  <li><strong>Service Providers:</strong> With trusted partners for payment, shipping, and analytics.</li>
                  <li><strong>Legal Requirements:</strong> When required by law or to protect our rights.</li>
                  <li><strong>Business Transfers:</strong> In case of merger, acquisition, or sale of assets.</li>
                </ul>
                <p className="mt-3 text-sm italic">We never sell your personal data.</p>
              </section>

              <Separator />

              {/* 4. Security */}
              <section>
                <h2 className="text-2xl font-bold text-foreground mb-3 flex items-center gap-2">
                  <Lock className="h-5 w-5 text-green-600" />
                  4. Data Security
                </h2>
                <p>
                  We use industry-standard encryption (SSL/TLS), secure servers, and regular audits to protect your data. 
                  However, no system is 100% secure — we continuously improve our defenses.
                </p>
              </section>

              <Separator />

              {/* 5. Your Rights */}
              <section>
                <h2 className="text-2xl font-bold text-foreground mb-3 flex items-center gap-2">
                  <Shield className="h-5 w-5 text-green-600" />
                  5. Your Rights
                </h2>
                <ul className="space-y-2 ml-6">
                  <li>Access your personal data</li>
                  <li>Correct inaccurate information</li>
                  <li>Request deletion of your data</li>
                  <li>Opt out of marketing emails</li>
                  <li>Withdraw consent where applicable</li>
                </ul>
                <p className="mt-3">To exercise any right, contact us below.</p>
              </section>

              <Separator />

              {/* 6. Contact */}
              <section>
                <h2 className="text-2xl font-bold text-foreground mb-3 flex items-center gap-2">
                  <Mail className="h-5 w-5 text-green-600" />
                  6. Contact Us
                </h2>
                <div className Watching="space-y-2">
                  <p className="flex items-center gap-2">
                    <Mail className="h-4 w-4" />
                    <a href="mailto:privacy@level.in" className="text-green-600 hover:underline">
                      privacy@level.in
                    </a>
                  </p>
                  <p className="flex items-center gap-2">
                    <Phone className="h-4 w-4" />
                    <a href="tel:+918008881234" className="text-green-600 hover:underline">
                      +91 800 888 1234
                    </a>
                  </p>
                </div>
              </section>
            </div>
          </Card>

          {/* Trust Badge */}
          <div className="mt-12 text-center">
            <p className="text-sm text-muted-foreground">
              <Shield className="inline h-4 w-4 mr-1 text-green-600" />
              Your data is encrypted and protected. Shop with confidence.
            </p>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
};

export default PrivacyPolicy;