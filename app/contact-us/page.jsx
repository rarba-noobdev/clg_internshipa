"use client";

import React from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { 
  MapPin, 
  Phone, 
  Mail, 
  Clock, 
  Send,
  CheckCircle2,
  Building2,
  ArrowRight
} from "lucide-react";

const ContactUs = () => {
  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-gradient-to-b from-white via-gray-50 to-white">
        <div className="container mx-auto px-4 md:px-6 lg:px-8 py-12 md:py-16 space-y-16">
          
          {/* Hero Header */}
          <header className="text-center max-w-3xl mx-auto">
            <Badge variant="outline" className="mb-4 text-green-600 border-green-600">
              Contact Level
            </Badge>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-4">
              We’re Here When You Need Us
            </h1>
            <p className="text-lg text-muted-foreground">
              Support, sales, or just curious — we reply in <strong>under 2 hours</strong>.
            </p>
          </header>

          {/* Contact Info Grid */}
          <section className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: <Building2 className="h-6 w-6" />,
                title: "Head Office",
                details: (
                  <>
                    <strong>Level Technologies Pvt. Ltd.</strong><br />
                    3rd Floor, Tech Tower<br />
                    Hitech City, Hyderabad<br />
                    Telangana 500081, India
                  </>
                ),
              },
              {
                icon: <Phone className="h-6 w-6" />,
                title: "Call Us",
                details: (
                  <>
                    <strong>Support:</strong> +91 800 888 1234<br />
                    <strong>Sales:</strong> +91 800 888 5678<br />
                    <span className="text-xs">Mon–Sat, 9AM–7PM IST</span>
                  </>
                ),
              },
              {
                icon: <Mail className="h-6 w-6" />,
                title: "Email",
                details: (
                  <>
                    <strong>Support:</strong> support@level.in<br />
                    <strong>Partnerships:</strong> hello@level.in<br />
                    <span className="text-xs">Replies in &lt;2 hrs</span>
                  </>
                ),
              },
              {
                icon: <Clock className="h-6 w-6" />,
                title: "Live Chat",
                details: (
                  <>
                    <strong>24/7 AI + Human Support</strong><br />
                    Instant answers, no hold time<br />
                    <Button size="sm" className="mt-2 bg-green-600 hover:bg-green-700 text-white">
                      Chat Now <Send className="ml-1 h-3 w-3" />
                    </Button>
                  </>
                ),
              },
            ].map((item, idx) => (
              <Card key={idx} className="p-6 hover:shadow-md transition-shadow">
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-green-100 rounded-xl text-green-600">
                    {item.icon}
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-2">{item.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {item.details}
                    </p>
                  </div>
                </div>
              </Card>
            ))}
          </section>

          {/* Contact Form */}
          <section className="max-w-2xl mx-auto">
            <Card className="p-8 md:p-10">
              <h2 className="text-2xl md:text-3xl font-bold mb-6 text-center">
                Drop Us a Line
              </h2>
              <form className="space-y-5">
                <div className="grid md:grid-cols-2 gap-5">
                  <div>
                    <Label htmlFor="name">Your Name</Label>
                    <Input id="name" placeholder="Alex Smith" className="mt-1" />
                  </div>
                  <div>
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" type="email" placeholder="alex@level.in" className="mt-1" />
                  </div>
                </div>
                <div>
                  <Label htmlFor="subject">Subject</Label>
                  <Input id="subject" placeholder="Product Inquiry / Order Help" className="mt-1" />
                </div>
                <div>
                  <Label htmlFor="message">Your Message</Label>
                  <Textarea
                    id="message"
                    placeholder="How can we help you today?"
                    rows={5}
                    className="mt-1"
                  />
                </div>
                <Button className="w-full bg-green-600 hover:bg-green-700" size="lg">
                  Send Message <Send className="ml-2 h-4 w-4" />
                </Button>
              </form>
              <p className="text-center text-xs text-muted-foreground mt-4 flex items-center justify-center gap-1">
                <CheckCircle2 className="h-3 w-3 text-green-600" />
                We respond in <strong>under 2 hours</strong> during business hours.
              </p>
            </Card>
          </section>

          {/* Map */}
          <section className="max-w-5xl mx-auto">
            <Card className="overflow-hidden">
              <div className="bg-gray-200 border-2 border-dashed rounded-xl w-full h-96 flex items-center justify-center text-muted-foreground">
                <p className="flex items-center gap-2">
                  <MapPin className="h-5 w-5" />
                  Interactive Map (Hyderabad HQ)
                </p>
              </div>
            </Card>
          </section>

          {/* Final CTA */}
          <section className="text-center">
            <Card className="inline-block p-8 bg-gradient-to-r from-green-600 to-emerald-600 text-white">
              <h3 className="text-2xl font-bold mb-3">Need Help Right Now?</h3>
              <p className="mb-6 opacity-90">Chat with us — no phone, no wait.</p>
              <Button size="lg" variant="secondary">
                Start Live Chat <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Card>
          </section>
        </div>
      </main>

      <Footer />
    </>
  );
};

export default ContactUs;