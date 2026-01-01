import { Metadata } from "next";
import Link from "next/link";
import { Header, Footer } from "@/components/layout";
import { GlassCard, GlassButton } from "@/components/ui";
import { CheckCircle, Ticket, Mail, Calendar, ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Purchase Successful",
  description: "Your ticket purchase was successful.",
};

export default function TicketSuccessPage() {
  return (
    <>
      <Header />
      <main className="pt-24 pb-12 min-h-screen flex items-center">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <GlassCard padding="lg" glow="pink">
            {/* Success icon */}
            <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-gradient-to-r from-[#00FF00]/20 to-[#00BFFF]/20 flex items-center justify-center">
              <CheckCircle size={48} className="text-[#00FF00]" />
            </div>

            {/* Title */}
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Purchase <span className="gradient-text">Successful!</span>
            </h1>

            <p className="text-white/70 text-lg mb-8">
              Thank you for your purchase. Your tickets have been confirmed.
            </p>

            {/* Confirmation details */}
            <div className="space-y-4 mb-8">
              <div className="flex items-center justify-center gap-3 text-white/60">
                <Mail size={20} className="text-[#00BFFF]" />
                <span>Confirmation email sent to your inbox</span>
              </div>
              <div className="flex items-center justify-center gap-3 text-white/60">
                <Ticket size={20} className="text-[#FF69B4]" />
                <span>Your ticket includes a QR code for entry</span>
              </div>
              <div className="flex items-center justify-center gap-3 text-white/60">
                <Calendar size={20} className="text-[#FFED4E]" />
                <span>Event details included in your email</span>
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/dashboard">
                <GlassButton variant="gold" leftIcon={<Ticket size={18} />}>
                  View My Tickets
                </GlassButton>
              </Link>
              <Link href="/shows">
                <GlassButton variant="secondary" rightIcon={<ArrowRight size={18} />}>
                  Browse More Shows
                </GlassButton>
              </Link>
            </div>
          </GlassCard>

          {/* Need help */}
          <p className="mt-8 text-white/40 text-sm">
            Questions about your order?{" "}
            <Link href="/contact" className="text-[#00BFFF] hover:underline">
              Contact Support
            </Link>
          </p>
        </div>
      </main>
      <Footer />
    </>
  );
}
