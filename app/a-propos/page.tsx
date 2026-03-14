import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'
import { SectionHeader } from '@/components/section-header'
import Image from 'next/image'
import Link from 'next/link'

export const metadata = {
  title: 'À Propos de BATIMAG | La plateforme de référence du BTP en Afrique',
  description: 'Découvrez la mission et les valeurs de BATIMAG, la plateforme média et business dédiée au secteur de la construction en Afrique.',
}

export default function AboutPage() {
  return (
    <>
      <Navbar />
      <main>
        {/* Hero Section */}
        <section className="relative h-96 overflow-hidden">
          <Image
            src="/images/about-hero.jpg"
            alt="À propos de BATIMAG"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
            <div className="text-center text-white">
              <h1 className="text-5xl font-bold mb-4">À Propos de BATIMAG</h1>
              <p className="text-xl">La voix du secteur de la construction en Afrique</p>
            </div>
          </div>
        </section>

        {/* Mission Section */}
        <section className="py-16 px-4 bg-background">
          <div className="max-w-4xl mx-auto">
            <SectionHeader 
              title="Notre Mission"
              subtitle="Connecter, informer et développer"
            />
            <div className="grid md:grid-cols-2 gap-8 mt-12">
              <div>
                <h3 className="text-2xl font-bold text-primary mb-4">Connecter l'écosystème BTP</h3>
                <p className="text-muted-foreground mb-4">
                  BATIMAG crée un pont entre les professionnels du secteur de la construction, des infrastructures et de l'immobilier en Afrique. Nous rassemblons les acteurs clés de l'industrie sur une plateforme unique.
                </p>
                <p className="text-muted-foreground">
                  Que vous soyez entrepreneur, ingénieur, fournisseur ou investisseur, BATIMAG est votre lieu de connexion pour les opportunités, les partenariats et la croissance.
                </p>
              </div>
              <div>
                <h3 className="text-2xl font-bold text-primary mb-4">Informer avec rigueur</h3>
                <p className="text-muted-foreground mb-4">
                  Notre équipe de journalistes et d'experts produit quotidiennement des contenus de qualité couvrant les actualités, tendances et enjeux du secteur en Afrique.
                </p>
                <p className="text-muted-foreground">
                  Nous nous engageons à offrir une information fiable, pertinente et exploitable pour les décideurs et professionnels du secteur.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Values Section */}
        <section className="py-16 px-4 bg-secondary">
          <div className="max-w-4xl mx-auto">
            <SectionHeader 
              title="Nos Valeurs"
              subtitle="Ce qui nous guide"
            />
            <div className="grid md:grid-cols-3 gap-8 mt-12">
              <div className="bg-background p-8 border border-border">
                <div className="w-12 h-12 bg-accent text-white rounded flex items-center justify-center mb-4 text-xl font-bold">
                  ✓
                </div>
                <h4 className="text-xl font-bold text-primary mb-2">Intégrité</h4>
                <p className="text-muted-foreground">
                  Nous maintenons les plus hauts standards d'éthique journalistique et professionnelle dans tous nos contenus et services.
                </p>
              </div>
              <div className="bg-background p-8 border border-border">
                <div className="w-12 h-12 bg-accent text-white rounded flex items-center justify-center mb-4 text-xl font-bold">
                  ✓
                </div>
                <h4 className="text-xl font-bold text-primary mb-2">Innovation</h4>
                <p className="text-muted-foreground">
                  Nous adoptons les dernières technologies pour offrir une expérience utilisateur moderne et des solutions digitales pertinentes.
                </p>
              </div>
              <div className="bg-background p-8 border border-border">
                <div className="w-12 h-12 bg-accent text-white rounded flex items-center justify-center mb-4 text-xl font-bold">
                  ✓
                </div>
                <h4 className="text-xl font-bold text-primary mb-2">Impact</h4>
                <p className="text-muted-foreground">
                  Nous mesurons notre succès par l'impact positif que nous créons pour le secteur et pour le développement économique en Afrique.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Team Section */}
        <section className="py-16 px-4 bg-background">
          <div className="max-w-4xl mx-auto">
            <SectionHeader 
              title="Notre Équipe"
              subtitle="Des experts passionnés"
            />
            <div className="grid md:grid-cols-3 gap-8 mt-12">
              {[
                { name: 'Ahmed Bennani', role: 'Directeur Général', image: '/images/interview-1.jpg' },
                { name: 'Fatima Kone', role: 'Directrice Éditoriale', image: '/images/interview-2.jpg' },
                { name: 'Pierre Luc', role: 'Responsable Annuaire & B2B', image: '/images/interview-1.jpg' },
              ].map((member, i) => (
                <div key={i} className="text-center">
                  <div className="relative h-48 mb-4 overflow-hidden">
                    <Image
                      src={member.image}
                      alt={member.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <h4 className="text-lg font-bold text-primary">{member.name}</h4>
                  <p className="text-muted-foreground">{member.role}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Why Choose Section */}
        <section className="py-16 px-4 bg-secondary">
          <div className="max-w-4xl mx-auto">
            <SectionHeader 
              title="Pourquoi Choisir BATIMAG"
              subtitle="Les avantages de notre plateforme"
            />
            <div className="space-y-6 mt-12">
              <div className="flex gap-4">
                <div className="text-3xl text-accent font-bold flex-shrink-0">01</div>
                <div>
                  <h4 className="text-xl font-bold text-primary mb-2">Audience Qualifiée</h4>
                  <p className="text-muted-foreground">
                    Accédez à des milliers de professionnels actifs du secteur BTP à travers l'Afrique.
                  </p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="text-3xl text-accent font-bold flex-shrink-0">02</div>
                <div>
                  <h4 className="text-xl font-bold text-primary mb-2">Contenu Exclusif</h4>
                  <p className="text-muted-foreground">
                    Bénéficiez d'analyses approfondies, de rapports sectoriels et de contenus premium.
                  </p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="text-3xl text-accent font-bold flex-shrink-0">03</div>
                <div>
                  <h4 className="text-xl font-bold text-primary mb-2">Opportunités Commerciales</h4>
                  <p className="text-muted-foreground">
                    Trouvez des partenaires, des clients et des opportunités d'affaires dans le répertoire des entreprises.
                  </p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="text-3xl text-accent font-bold flex-shrink-0">04</div>
                <div>
                  <h4 className="text-xl font-bold text-primary mb-2">Formation Continue</h4>
                  <p className="text-muted-foreground">
                    Accéder à des programmes de formation et de certification pour développer vos compétences.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 px-4 bg-primary text-white">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-4xl font-bold mb-4">Rejoignez BATIMAG</h2>
            <p className="text-lg mb-8 text-white/90">
              Devenez part de la plus grande communauté BTP en Afrique et accédez à des opportunités sans précédent.
            </p>
            <div className="flex gap-4 justify-center flex-wrap">
              <Link 
                href="/contact"
                className="bg-accent text-white px-8 py-3 rounded font-medium hover:bg-accent/90 transition"
              >
                Nous Contacter
              </Link>
              <Link 
                href="/"
                className="bg-white text-primary px-8 py-3 rounded font-medium hover:bg-white/90 transition"
              >
                Retour à l'Accueil
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
