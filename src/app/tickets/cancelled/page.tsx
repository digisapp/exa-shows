import { Metadata } from "next";
import Link from "next/link";
import { Header, Footer } from "@/components/layout";
import { GlassCard, GlassButton } from "@/components/ui";
import { XCircle, ArrowLeft, HelpCircle } from "lucide-react";

export const metadata: Metadata = {
  title: "Purchase Cancelled",
  description: "Your ticket purchase was cancelled.",
};

export default function TicketCancelledPage() {
  return (
    <>
      <Header />
      <main className="pt-24 pb-12 min-h-screen flex items-center">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <GlassCard padding="lg">
            {/* Cancelled icon */}
            <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-white/5 flex items-center justify-center">
              <XCircle size={48} className="text-white/40" />
            </div>

            {/* Title */}
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Purchase Cancelled
            </h1>

            <p className="text-white/70 text-lg mb-8">
              Your ticket purchase was cancelled. No charges were made to your account.
            </p>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/shows">
                <GlassButton variant="primary" leftIcon={<ArrowLeft size={18} />}>
                  Back to Shows
                </GlassButton>
              </Link>
              <Link href="/contact">
                <GlassButton variant="ghost" leftIcon={<HelpCircle size={18} />}>
                  Need Help?
                </GlassButton>
              </Link>
            </div>
          </GlassCard>

          {/* Assistance text */}
          <p className="mt-8 text-white/40 text-sm">
            Having trouble purchasing?{" "}
            <Link href="/contact" className="text-[#00BFFF] hover:underline">
              Contact our support team
            </Link>
          </p>
        </div>
      </main>
      <Footer />
    </>
  );
}
