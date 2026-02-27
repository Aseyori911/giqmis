import Link from "next/link";
import { ChevronUp } from "lucide-react";
import HeroBanner from "./heroBanner";
import ContactInfo from "./contactInfo";
import ContactForm from "./contactForm";
import ScrollToTop from "../scrollToTop";

export default function ContactPage() {
  return (
    <div>
      <HeroBanner />

      <section className="py-20">
        <div className="container px-4 mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <ContactInfo />
            <div className="container mx-auto w-[80%]">
              <h3 className="text-2xl font-bold text-slate-800 mb-6 relative pb-4">
                Send Us a Message
                <span className="absolute left-0 bottom-0 w-12 h-1 bg-orange-500"></span>
              </h3>
              <ContactForm />
            </div>
          </div>
        </div>
      </section>

      <ScrollToTop />
    </div>
  );
}
