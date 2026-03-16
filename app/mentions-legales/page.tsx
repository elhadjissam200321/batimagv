import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"

export const metadata = {
  title: "Mentions Légales | BATIMAG",
  description: "Mentions légales et politique de confidentialité de BATIMAG",
}

export default function MentionsLegalesPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-grow">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-primary to-primary/80 text-white py-16 md:py-20">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-5xl font-extrabold mb-4 flex items-center justify-center gap-3">
              <i className="fas fa-gavel"></i>
              Mentions Légales
            </h1>
            <p className="text-lg text-white/90">
              Informations légales et politique de confidentialité
            </p>
          </div>
        </section>

        {/* Content */}
        <section className="py-12 md:py-20 px-4">
          <div className="max-w-4xl mx-auto">
            <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 p-8 md:p-12 space-y-12">
              
              {/* Éditeur */}
              <div>
                <h2 className="text-2xl font-bold text-primary mb-6 flex items-center gap-3">
                  <i className="fas fa-building text-accent"></i>
                  Éditeur du Site
                </h2>
                <div className="prose prose-slate dark:prose-invert max-w-none">
                  <p><strong>BATIMAG</strong></p>
                  <p>
                    Plateforme média et business de référence pour le secteur de la construction, 
                    des infrastructures et de l'immobilier en Afrique.
                  </p>
                  <ul className="space-y-2 mt-4">
                    <li><i className="fas fa-map-marker-alt text-accent mr-2"></i>Siège social : Casablanca, Maroc</li>
                    <li><i className="fas fa-envelope text-accent mr-2"></i>Email : contact@batimag.africa</li>
                    <li><i className="fas fa-phone text-accent mr-2"></i>Téléphone : +212 (0) 5 22 XX XX XX</li>
                  </ul>
                </div>
              </div>

              {/* Hébergement */}
              <div>
                <h2 className="text-2xl font-bold text-primary mb-6 flex items-center gap-3">
                  <i className="fas fa-server text-accent"></i>
                  Hébergement
                </h2>
                <div className="prose prose-slate dark:prose-invert max-w-none">
                  <p>
                    Ce site est hébergé par <strong>Vercel Inc.</strong>
                  </p>
                  <ul className="space-y-2 mt-4">
                    <li><i className="fas fa-map-marker-alt text-accent mr-2"></i>440 N Barranca Ave #4133, Covina, CA 91723, USA</li>
                    <li><i className="fas fa-globe text-accent mr-2"></i>Site web : vercel.com</li>
                  </ul>
                </div>
              </div>

              {/* Propriété intellectuelle */}
              <div>
                <h2 className="text-2xl font-bold text-primary mb-6 flex items-center gap-3">
                  <i className="fas fa-copyright text-accent"></i>
                  Propriété Intellectuelle
                </h2>
                <div className="prose prose-slate dark:prose-invert max-w-none">
                  <p>
                    L'ensemble du contenu de ce site (textes, images, graphismes, logo, icônes, sons, logiciels, etc.) 
                    est la propriété exclusive de BATIMAG ou de ses partenaires et est protégé par les lois françaises 
                    et internationales relatives à la propriété intellectuelle.
                  </p>
                  <p>
                    Toute reproduction, représentation, modification, publication, adaptation de tout ou partie des 
                    éléments du site, quel que soit le moyen ou le procédé utilisé, est interdite, sauf autorisation 
                    écrite préalable de BATIMAG.
                  </p>
                </div>
              </div>

              {/* Protection des données */}
              <div>
                <h2 className="text-2xl font-bold text-primary mb-6 flex items-center gap-3">
                  <i className="fas fa-shield-alt text-accent"></i>
                  Protection des Données Personnelles
                </h2>
                <div className="prose prose-slate dark:prose-invert max-w-none">
                  <p>
                    Conformément au Règlement Général sur la Protection des Données (RGPD), vous disposez des droits suivants :
                  </p>
                  <ul className="space-y-2 mt-4">
                    <li><i className="fas fa-check text-accent mr-2"></i>Droit d'accès à vos données personnelles</li>
                    <li><i className="fas fa-check text-accent mr-2"></i>Droit de rectification de vos données</li>
                    <li><i className="fas fa-check text-accent mr-2"></i>Droit à l'effacement de vos données</li>
                    <li><i className="fas fa-check text-accent mr-2"></i>Droit à la limitation du traitement</li>
                    <li><i className="fas fa-check text-accent mr-2"></i>Droit à la portabilité de vos données</li>
                    <li><i className="fas fa-check text-accent mr-2"></i>Droit d'opposition au traitement</li>
                  </ul>
                  <p className="mt-4">
                    Pour exercer ces droits, vous pouvez nous contacter à l'adresse : <strong>privacy@batimag.africa</strong>
                  </p>
                </div>
              </div>

              {/* Cookies */}
              <div>
                <h2 className="text-2xl font-bold text-primary mb-6 flex items-center gap-3">
                  <i className="fas fa-cookie-bite text-accent"></i>
                  Politique de Cookies
                </h2>
                <div className="prose prose-slate dark:prose-invert max-w-none">
                  <p>
                    Ce site utilise des cookies pour améliorer votre expérience de navigation. Les cookies sont de petits 
                    fichiers texte stockés sur votre appareil qui nous aident à :
                  </p>
                  <ul className="space-y-2 mt-4">
                    <li><i className="fas fa-cog text-accent mr-2"></i>Mémoriser vos préférences</li>
                    <li><i className="fas fa-chart-line text-accent mr-2"></i>Analyser le trafic du site</li>
                    <li><i className="fas fa-lock text-accent mr-2"></i>Assurer la sécurité de votre navigation</li>
                  </ul>
                  <p className="mt-4">
                    Vous pouvez gérer vos préférences de cookies dans les paramètres de votre navigateur.
                  </p>
                </div>
              </div>

              {/* Responsabilité */}
              <div>
                <h2 className="text-2xl font-bold text-primary mb-6 flex items-center gap-3">
                  <i className="fas fa-exclamation-triangle text-accent"></i>
                  Limitation de Responsabilité
                </h2>
                <div className="prose prose-slate dark:prose-invert max-w-none">
                  <p>
                    BATIMAG s'efforce d'assurer au mieux l'exactitude et la mise à jour des informations diffusées sur ce site. 
                    Toutefois, BATIMAG ne peut garantir l'exactitude, la précision ou l'exhaustivité des informations mises à 
                    disposition sur ce site.
                  </p>
                  <p>
                    En conséquence, BATIMAG décline toute responsabilité pour toute imprécision, inexactitude ou omission 
                    portant sur des informations disponibles sur ce site.
                  </p>
                </div>
              </div>

              {/* Contact */}
              <div className="bg-slate-50 dark:bg-slate-700/50 rounded-lg p-6 border border-slate-200 dark:border-slate-600">
                <h3 className="text-xl font-bold text-primary mb-4 flex items-center gap-3">
                  <i className="fas fa-question-circle text-accent"></i>
                  Des Questions ?
                </h3>
                <p className="text-slate-600 dark:text-slate-300 mb-4">
                  Pour toute question concernant ces mentions légales, vous pouvez nous contacter :
                </p>
                <a 
                  href="/contact" 
                  className="inline-flex items-center gap-2 bg-accent hover:bg-orange-600 text-white px-6 py-3 rounded-lg font-bold transition-colors"
                >
                  <i className="fas fa-envelope"></i>
                  Nous Contacter
                </a>
              </div>

            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
