import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'
import { SectionHeader } from '@/components/section-header'
import Link from 'next/link'

export const metadata = {
  title: 'Contact | BATIMAG',
  description: "Contactez l'équipe de BATIMAG pour vos questions, partenariats ou publicités.",
}

export default function ContactPage() {
  return (
    <>
      <Navbar />
      <main>
        {/* Hero Section */}
        <section className="py-16 px-4 bg-primary text-white">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl font-bold mb-4">Nous Contacter</h1>
            <p className="text-xl text-white/90">
              Vous avez des questions, des suggestions ou vous souhaitez collaborer ? 
              <br />
              Notre équipe est à votre écoute.
            </p>
          </div>
        </section>

        {/* Contact Info & Form */}
        <section className="py-16 px-4 bg-background">
          <div className="max-w-5xl mx-auto">
            <div className="grid md:grid-cols-3 gap-8 mb-16">
              <div className="bg-secondary p-8 text-center">
                <div className="text-4xl mb-4">📍</div>
                <h3 className="text-xl font-bold text-primary mb-2">Adresse</h3>
                <p className="text-muted-foreground">
                  45, Rue Casablanca<br />
                  Quartier Affaires, Casablanca<br />
                  Maroc
                </p>
              </div>
              <div className="bg-secondary p-8 text-center">
                <div className="text-4xl mb-4">📞</div>
                <h3 className="text-xl font-bold text-primary mb-2">Téléphone</h3>
                <p className="text-muted-foreground">
                  <strong>+212 (0) 522 33 13 28</strong><br />
                  <small>Du lundi au vendredi</small><br />
                  <small>9h00 - 18h00</small>
                </p>
              </div>
              <div className="bg-secondary p-8 text-center">
                <div className="text-4xl mb-4">✉️</div>
                <h3 className="text-xl font-bold text-primary mb-2">Email</h3>
                <p className="text-muted-foreground">
                  <strong>contact@batimag.com</strong><br />
                  <small>Réponse dans les 48h</small><br />
                  <small>Jours ouvrables</small>
                </p>
              </div>
            </div>

            {/* Contact Form */}
            <div className="max-w-2xl mx-auto border border-border p-8">
              <h2 className="text-3xl font-bold text-primary mb-8">Envoyez-nous un Message</h2>
              <form className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-primary mb-2">
                      Nom Complet
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      required
                      className="w-full px-4 py-2 border border-input bg-background text-foreground rounded focus:outline-none focus:ring-2 focus:ring-accent"
                      placeholder="Votre nom"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-primary mb-2">
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      className="w-full px-4 py-2 border border-input bg-background text-foreground rounded focus:outline-none focus:ring-2 focus:ring-accent"
                      placeholder="votre.email@example.com"
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="company" className="block text-sm font-medium text-primary mb-2">
                      Entreprise / Organisation
                    </label>
                    <input
                      type="text"
                      id="company"
                      name="company"
                      className="w-full px-4 py-2 border border-input bg-background text-foreground rounded focus:outline-none focus:ring-2 focus:ring-accent"
                      placeholder="Votre entreprise"
                    />
                  </div>
                  <div>
                    <label htmlFor="subject" className="block text-sm font-medium text-primary mb-2">
                      Sujet
                    </label>
                    <select
                      id="subject"
                      name="subject"
                      required
                      className="w-full px-4 py-2 border border-input bg-background text-foreground rounded focus:outline-none focus:ring-2 focus:ring-accent"
                    >
                      <option value="">Sélectionnez un sujet</option>
                      <option value="partnership">Partenariat</option>
                      <option value="advertising">Publicité</option>
                      <option value="content">Contenu</option>
                      <option value="job">Offre d&apos;emploi</option>
                      <option value="training">Formation</option>
                      <option value="other">Autre</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-primary mb-2">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows={6}
                    className="w-full px-4 py-2 border border-input bg-background text-foreground rounded focus:outline-none focus:ring-2 focus:ring-accent resize-none"
                    placeholder="Votre message..."
                  />
                </div>

                <div className="flex items-start gap-3">
                  <input
                    type="checkbox"
                    id="terms"
                    name="terms"
                    required
                    className="mt-1 w-4 h-4 border border-input rounded focus:ring-2 focus:ring-accent cursor-pointer"
                  />
                  <label htmlFor="terms" className="text-sm text-muted-foreground">
                    J'accepte de recevoir des communications de la part de BATIMAG et j'ai lu la politique de confidentialité.
                  </label>
                </div>

                <button
                  type="submit"
                  className="w-full bg-accent text-white font-bold py-3 rounded hover:bg-accent/90 transition"
                >
                  Envoyer le Message
                </button>
              </form>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-16 px-4 bg-secondary">
          <div className="max-w-4xl mx-auto">
            <SectionHeader 
              title="Questions Fréquemment Posées"
              subtitle="Trouvez les réponses à vos questions"
            />
            <div className="space-y-6 mt-12">
              {[
                {
                  q: "Comment m'inscrire sur BATIMAG ?",
                  a: "L'inscription sur BATIMAG est gratuite et simple. Cliquez sur \"S'inscrire\" en haut de la page, remplissez vos informations et commencez à explorer nos contenus et services."
                },
                {
                  q: 'Quels sont les tarifs des services premium ?',
                  a: 'Nos tarifs varient selon les services. Pour obtenir un devis personnalisé selon vos besoins spécifiques, veuillez nous contacter directement.'
                },
                {
                  q: "Comment publier une offre d'emploi ?",
                  a: "Les entreprises peuvent publier des offres d'emploi directement sur notre plateforme. Contactez notre équipe pour les modalités et tarifs de publication."
                },
                {
                  q: "Pouvez-vous m'aider à trouver un partenaire commercial ?",
                  a: "Oui ! Notre annuaire répertorie les principales entreprises du secteur. Contactez notre équipe B2B pour explorer les opportunités de partenariat."
                },
              ].map((item, i) => (
                <details key={i} className="bg-background p-6 border border-border group">
                  <summary className="cursor-pointer font-bold text-primary flex justify-between items-center">
                    {item.q}
                    <span className="text-accent group-open:rotate-180 transition">▼</span>
                  </summary>
                  <p className="text-muted-foreground mt-4">{item.a}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 px-4 bg-primary text-white">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-4xl font-bold mb-4">Vous n'avez pas trouvé ce que vous cherchiez ?</h2>
            <p className="text-lg mb-8 text-white/90">
              Consultez notre documentation complète ou explorez les différentes sections de BATIMAG.
            </p>
            <Link 
              href="/"
              className="inline-block bg-accent text-white px-8 py-3 rounded font-medium hover:bg-accent/90 transition"
            >
              Retour à l'Accueil
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
