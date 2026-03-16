import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { HeroSection } from "@/components/home/hero-section"
import { PlatformSections } from "@/components/home/platform-sections"
import { NewsHighlights } from "@/components/home/news-highlights"
import { FeaturedInterviews } from "@/components/home/featured-interviews"
import { JobsPreview } from "@/components/home/jobs-preview"
import { TrainingsPreview } from "@/components/home/trainings-preview"
import { WhyBatimag } from "@/components/home/why-batimag"
import { Partners } from "@/components/home/partners"
import NewsletterForm from "@/components/newsletter-form"
import { AdSection } from "@/components/ad-slot"

export default function HomePage() {
  return (
    <main>
      <Navbar />
      <HeroSection />
      <PlatformSections />
      <NewsHighlights />
      <FeaturedInterviews />
      <JobsPreview />
      <AdSection format="leaderboard" />
      <TrainingsPreview />
      <WhyBatimag />
      <Partners />
      <section className="py-12 bg-slate-50">
        <div className="max-w-2xl mx-auto px-4">
          <NewsletterForm variant="default" />
        </div>
      </section>
      <AdSection format="billboard" className="py-8" />
      <Footer />
    </main>
  )
}
