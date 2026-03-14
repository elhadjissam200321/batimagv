'use client'

import Link from 'next/link'
import {
  Clock,
  MapPin,
  GraduationCap,
  Users,
  Monitor,
  Award,
  CheckCircle,
  ArrowLeft,
  Share2,
  Heart,
  Calendar,
  DollarSign,
  Building2,
} from 'lucide-react'
import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'
import { useState, use } from 'react'

const trainingsData = [
  {
    id: 1,
    title: 'Management de Projet BTP – Niveau Expert',
    institution: 'Institut Africain du Bâtiment',
    location: 'Casablanca, Maroc',
    duration: '6 mois',
    level: 'Bac+3',
    mode: 'Présentiel',
    domain: 'Management BTP',
    students: 120,
    image: '/images/training-1.jpg',
    price: '25 000 MAD',
    description:
      'Une formation complète en gestion de projets BTP couvrant les aspects techniques, financiers et humains. Destinée aux cadres et futurs managers du secteur de la construction.',
    fullDescription: `Cette formation d'excellence est conçue pour développer les compétences de gestion de projet essentielles aux professionnels du BTP. Elle combine théorie et pratique avec des études de cas réelles.

Les participants acquerront une expertise complète en:
- Planification et suivi de projets complexes
- Gestion budgétaire et contrôle des coûts
- Management d'équipes multidisciplinaires
- Évaluation et mitigation des risques
- Communication et leadership en environnement BTP`,
    objectives: [
      'Maîtriser les outils et méthodes de gestion de projet modernes',
      "Développer des compétences en leadership et management d'équipe",
      'Apprendre à gérer les budgets et les délais de chantier',
      'Acquérir une expertise en prévention des risques et HSE',
      'Comprendre les enjeux économiques et stratégiques du BTP africain',
    ],
    program: [
      {
        week: '1-4',
        title: 'Fondamentaux du Management de Projet',
        topics: [
          'Introduction aux méthodologies Agile et PMI',
          'Planification et estimation budgétaire',
          'Gestion des ressources',
        ],
      },
      {
        week: '5-8',
        title: 'Gestion des Équipes et Leadership',
        topics: [
          "Dynamique d'équipe en contexte BTP",
          'Leadership situationnel',
          'Communication et résolution de conflits',
        ],
      },
      {
        week: '9-16',
        title: 'Études de Cas et Projets Pratiques',
        topics: [
          'Suivi de chantiers réels',
          'Gestion des imprévus',
          'Projet final de synthèse',
        ],
      },
      {
        week: '17-24',
        title: 'Spécialisations et Stage',
        topics: [
          'Gestion des contrats BTP',
          'BIM et digitalisation',
          'Stage en entreprise (2 mois)',
        ],
      },
    ],
    requirements: [
      "Diplôme de niveau Bac+2 minimum ou 3 ans d'expérience professionnelle",
      'Maîtrise du français et des outils informatiques basiques',
      'Motivation et intérêt pour le secteur du BTP',
    ],
    certification: 'Diplôme reconnu par les chambres de commerce africaines',
    startDates: ['15 Janvier 2025', '15 Avril 2025', '15 Septembre 2025'],
    contact: {
      email: 'info@iab.ma',
      phone: '+212 522 XXX XXX',
      website: 'www.iab.ma',
    },
  },
  {
    id: 2,
    title: 'BIM – Modélisation des Informations du Bâtiment',
    institution: 'ENITA Campus Dakar',
    location: 'Dakar, Sénégal',
    duration: '4 mois',
    level: 'Bac+2',
    mode: 'Hybride',
    domain: 'BIM',
    students: 80,
    image: '/images/training-1.jpg',
    price: '1 200 000 FCFA',
    description: "Maîtrisez la modélisation BIM avec les outils leaders du marché. Formation intensive couvrant Revit, Navisworks et l'intégration BIM dans les flux de travail.",
    fullDescription: `La formation BIM prépare les professionnels à l'utilisation des technologies de modélisation 3D dans les projets de construction modernes.

Vous apprendrez à:
- Créer et gérer des modèles BIM complets
- Utiliser les principaux logiciels du marché
- Intégrer le BIM dans les processus de projet
- Collaborer en environnement numérique`,
    objectives: [
      'Maîtriser Autodesk Revit et les outils BIM essentiels',
      'Créer des modèles 3D complets et coordonnés',
      'Exploiter les données BIM pour la gestion de projet',
      'Collaborer efficacement en environnement BIM',
      'Comprendre les enjeux de la transformation numérique',
    ],
    program: [
      {
        week: '1-2',
        title: 'Initiation à Revit',
        topics: [
          'Interface et commandes essentielles',
          'Gestion des familles et composants',
          'Création de plans et documents',
        ],
      },
      {
        week: '3-6',
        title: 'Modélisation Avancée',
        topics: ['Modèles multi-disciplinaires', 'Coordination des métiers', 'Navisworks'],
      },
      {
        week: '7-12',
        title: 'Projets Pratiques et Certification',
        topics: [
          'Projet complet de modélisation',
          'Certification Autodesk',
          'Préparation professionnelle',
        ],
      },
    ],
    requirements: [
      'Connaissances basiques en architecture ou génie civil',
      'Compétences informatiques intermédiaires',
      'Accès à un ordinateur performant',
    ],
    certification: 'Certification Autodesk Revit + Diplôme ENITA',
    startDates: ['10 Février 2025', '15 Mai 2025', '01 Octobre 2025'],
    contact: {
      email: 'formations@enita.sn',
      phone: '+221 33 XXX XXX',
      website: 'www.enita.sn',
    },
  },
]

export default function FormationDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params)
  const training = trainingsData.find((t) => t.id === parseInt(resolvedParams.id))
  const [isSaved, setIsSaved] = useState(false)

  if (!training) {
    return (
      <div className="min-h-screen bg-[#f6f7f8]">
        <Navbar />
        <div className="mx-auto max-w-7xl px-4 py-20 text-center lg:px-8">
          <h1 className="text-3xl font-bold text-[#0e1f2f]">Formation non trouvée</h1>
          <Link
            href="/formations"
            className="mt-6 inline-flex items-center gap-2 text-[#F28C28] hover:text-orange-700"
          >
            <ArrowLeft size={18} />
            Retour aux formations
          </Link>
        </div>
        <Footer />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#f6f7f8] font-sans text-[#0e1f2f]">
      <Navbar />

      {/* Breadcrumb */}
      <div className="border-b border-slate-200 bg-white px-4 py-4 lg:px-8">
        <div className="mx-auto flex max-w-7xl items-center gap-2 text-sm text-slate-500">
          <Link href="/" className="hover:text-[#0e1f2f]">
            Accueil
          </Link>
          <span>/</span>
          <Link href="/formations" className="hover:text-[#0e1f2f]">
            Formations
          </Link>
          <span>/</span>
          <span className="text-[#0e1f2f]">{training.title}</span>
        </div>
      </div>

      {/* Hero Header */}
      <section className="relative overflow-hidden bg-white px-4 py-12 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <Link href="/formations" className="mb-6 inline-flex items-center gap-2 text-[#0e1f2f] hover:text-[#F28C28]">
            <ArrowLeft size={18} />
            Retour
          </Link>
          <h1 className="mb-4 text-4xl font-black text-[#0e1f2f] text-balance leading-tight">
            {training.title}
          </h1>
          <div className="mb-8 flex flex-wrap items-center gap-4 text-slate-600">
            <div className="flex items-center gap-2">
              <Building2 size={18} className="text-[#F28C28]" />
              <span>{training.institution}</span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin size={18} className="text-[#F28C28]" />
              <span>{training.location}</span>
            </div>
            <span className="rounded-full bg-[#0e1f2f]/10 px-3 py-1 text-sm font-semibold text-[#0e1f2f]">
              {training.domain}
            </span>
          </div>

          {/* Key Info Cards */}
          <div className="grid gap-4 md:grid-cols-5">
            {[
              { icon: Clock, label: 'Durée', value: training.duration },
              { icon: GraduationCap, label: 'Niveau', value: training.level },
              { icon: Monitor, label: 'Mode', value: training.mode },
              { icon: Users, label: 'Participants', value: `${training.students}` },
              { icon: DollarSign, label: 'Tarif', value: training.price },
            ].map(({ icon: Icon, label, value }) => (
              <div
                key={label}
                className="flex items-center gap-3 rounded-lg border border-slate-200 bg-white p-4"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#0e1f2f]/10">
                  <Icon size={18} className="text-[#F28C28]" />
                </div>
                <div>
                  <p className="text-xs font-semibold text-slate-500">{label}</p>
                  <p className="font-bold text-[#0e1f2f]">{value}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Main Content */}
      <div className="mx-auto max-w-7xl px-4 py-12 lg:grid lg:grid-cols-3 lg:gap-8 lg:px-8">
        {/* Left Column */}
        <div className="lg:col-span-2">
          {/* Overview */}
          <section className="mb-10 rounded-xl bg-white p-8 shadow-sm">
            <h2 className="mb-4 text-2xl font-bold text-[#0e1f2f]">Aperçu de la formation</h2>
            <p className="leading-relaxed text-slate-600 whitespace-pre-line">{training.fullDescription}</p>
          </section>

          {/* Objectives */}
          <section className="mb-10 rounded-xl bg-white p-8 shadow-sm">
            <h2 className="mb-6 text-2xl font-bold text-[#0e1f2f]">Objectifs pédagogiques</h2>
            <ul className="space-y-3">
              {training.objectives.map((obj, i) => (
                <li key={i} className="flex items-start gap-3">
                  <CheckCircle size={20} className="mt-0.5 shrink-0 text-[#F28C28]" />
                  <span className="text-slate-700">{obj}</span>
                </li>
              ))}
            </ul>
          </section>

          {/* Program */}
          <section className="mb-10 rounded-xl bg-white p-8 shadow-sm">
            <h2 className="mb-6 text-2xl font-bold text-[#0e1f2f]">Programme de formation</h2>
            <div className="space-y-6">
              {training.program.map((module, i) => (
                <div key={i} className="border-l-4 border-[#F28C28] pl-6">
                  <div className="mb-2">
                    <span className="text-xs font-bold text-[#F28C28]">Semaines {module.week}</span>
                    <h3 className="text-lg font-bold text-[#0e1f2f]">{module.title}</h3>
                  </div>
                  <ul className="space-y-1">
                    {module.topics.map((topic, j) => (
                      <li key={j} className="flex items-center gap-2 text-slate-600">
                        <span className="h-1 w-1 rounded-full bg-[#F28C28]" />
                        {topic}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </section>

          {/* Requirements */}
          <section className="rounded-xl bg-white p-8 shadow-sm">
            <h2 className="mb-6 text-2xl font-bold text-[#0e1f2f]">Prérequis</h2>
            <ul className="space-y-3">
              {training.requirements.map((req, i) => (
                <li key={i} className="flex items-start gap-3">
                  <CheckCircle size={20} className="mt-0.5 shrink-0 text-slate-400" />
                  <span className="text-slate-700">{req}</span>
                </li>
              ))}
            </ul>
          </section>
        </div>

        {/* Right Sidebar */}
        <div className="mt-10 lg:mt-0">
          {/* CTA Card */}
          <div className="mb-6 rounded-xl bg-white p-6 shadow-sm">
            <div className="mb-6">
              <p className="text-sm text-slate-500">Prochaines sessions :</p>
              <ul className="mt-3 space-y-2">
                {training.startDates.map((date, i) => (
                  <li
                    key={i}
                    className="flex items-center gap-2 rounded-lg bg-[#0e1f2f]/5 px-3 py-2 text-sm font-medium text-[#0e1f2f]"
                  >
                    <Calendar size={14} />
                    {date}
                  </li>
                ))}
              </ul>
            </div>

            <button className="w-full rounded-lg bg-[#F28C28] px-6 py-3 text-sm font-bold text-white transition-colors hover:bg-orange-700 mb-3">
              S&apos;inscrire maintenant
            </button>
            <button className="w-full rounded-lg border-2 border-[#0e1f2f] px-6 py-3 text-sm font-bold text-[#0e1f2f] transition-colors hover:bg-[#0e1f2f]/5">
              Demander plus d&apos;infos
            </button>

            <div className="mt-4 flex gap-2 border-t border-slate-200 pt-4">
              <button
                onClick={() => setIsSaved(!isSaved)}
                className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-lg transition-colors ${
                  isSaved
                    ? 'bg-red-50 text-red-600'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                <Heart size={16} fill={isSaved ? 'currentColor' : 'none'} />
                Sauvegarder
              </button>
              <button className="flex-1 flex items-center justify-center gap-2 py-2 rounded-lg bg-slate-100 text-slate-600 transition-colors hover:bg-slate-200">
                <Share2 size={16} />
                Partager
              </button>
            </div>
          </div>

          {/* Certification */}
          <div className="mb-6 rounded-xl bg-white p-6 shadow-sm">
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-[#F28C28]/10">
              <Award size={24} className="text-[#F28C28]" />
            </div>
            <h3 className="mb-2 font-bold text-[#0e1f2f]">Certification obtenue</h3>
            <p className="text-sm text-slate-600">{training.certification}</p>
          </div>

          {/* Contact */}
          <div className="rounded-xl bg-[#0e1f2f] p-6 text-white">
            <h3 className="mb-4 font-bold">Besoin d&apos;aide ?</h3>
            <div className="space-y-3 text-sm">
              <p>
                <strong>Email :</strong>
                <br />
                <a href={`mailto:${training.contact.email}`} className="text-[#F28C28] hover:underline">
                  {training.contact.email}
                </a>
              </p>
              <p>
                <strong>Téléphone :</strong>
                <br />
                <a href={`tel:${training.contact.phone}`} className="text-[#F28C28] hover:underline">
                  {training.contact.phone}
                </a>
              </p>
              <p>
                <strong>Site web :</strong>
                <br />
                <a
                  href={`https://${training.contact.website}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#F28C28] hover:underline"
                >
                  {training.contact.website}
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Related Trainings */}
      <section className="mx-auto max-w-7xl px-4 py-16 lg:px-8">
        <h2 className="mb-8 text-2xl font-bold text-[#0e1f2f]">Autres formations similaires</h2>
        <div className="grid gap-6 md:grid-cols-2">
          {trainingsData
            .filter((t) => t.id !== training.id)
            .slice(0, 2)
            .map((t) => (
              <Link
                key={t.id}
                href={`/formations/${t.id}`}
                className="group rounded-lg border border-slate-200 bg-white p-6 transition-all hover:border-[#F28C28] hover:shadow-lg"
              >
                <div className="mb-3 flex items-start justify-between">
                  <h3 className="font-bold text-[#0e1f2f] group-hover:text-[#F28C28]">{t.title}</h3>
                </div>
                <p className="mb-4 text-sm text-slate-600">{t.institution}</p>
                <div className="flex flex-wrap gap-2">
                  {[
                    { icon: Clock, value: t.duration },
                    { icon: MapPin, value: t.location },
                  ].map(({ icon: Icon, value }, i) => (
                    <span key={i} className="flex items-center gap-1 text-xs text-slate-500">
                      <Icon size={14} />
                      {value}
                    </span>
                  ))}
                </div>
              </Link>
            ))}
        </div>
      </section>

      <Footer />
    </div>
  )
}
