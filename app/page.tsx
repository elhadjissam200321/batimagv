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

export default function HomePage() {
  return (
    <main>
      <Navbar />
      <HeroSection />
      <PlatformSections />
      <NewsHighlights />
      <FeaturedInterviews />
      <JobsPreview />
      <TrainingsPreview />
      <WhyBatimag />
      <Partners />
      <Footer />
    </main>
  )
}
