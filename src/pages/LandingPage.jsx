// import { Link } from 'react-router-dom';
// import heroImage from '../assets/hero.png';
// import logo from '../assets/logo cv-pro.png';

// /* -------------------------------------------------------------------------- */
// /*  Icônes SVG                                                                */
// /* -------------------------------------------------------------------------- */

// function Icon({ children, ...props }) {
//     return (
//         <svg
//             viewBox="0 0 24 24"
//             width="1em"
//             height="1em"
//             fill="none"
//             stroke="currentColor"
//             strokeWidth="2"
//             strokeLinecap="round"
//             strokeLinejoin="round"
//             aria-hidden="true"
//             focusable="false"
//             {...props}
//         >
//             {children}
//         </svg>
//     );
// }

// function ArrowRightIcon() {
//     return (
//         <Icon>
//             <path d="M5 12h14" />
//             <path d="m13 6 6 6-6 6" />
//         </Icon>
//     );
// }

// function CheckIcon() {
//     return (
//         <Icon>
//             <path d="m5 12 5 5L20 7" />
//         </Icon>
//     );
// }

// function PencilIcon() {
//     return (
//         <Icon>
//             <path d="M12 20h9" />
//             <path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4Z" />
//         </Icon>
//     );
// }

// function LayoutIcon() {
//     return (
//         <Icon>
//             <rect x="3" y="3" width="18" height="18" rx="2" />
//             <path d="M3 9h18" />
//             <path d="M9 21V9" />
//         </Icon>
//     );
// }

// function DownloadIcon() {
//     return (
//         <Icon>
//             <path d="M12 3v12" />
//             <path d="m7 10 5 5 5-5" />
//             <path d="M5 21h14" />
//         </Icon>
//     );
// }

// /* -------------------------------------------------------------------------- */
// /*  Données de la page                                                        */
// /* -------------------------------------------------------------------------- */

// const NAV_LINKS = [
//     { label: 'Accueil', href: '#accueil' },
//     { label: 'Modèles', href: '#modeles' },
//     { label: 'Fonctionnalités', href: '#fonctionnalites' },
//     { label: 'Comment ça marche', href: '#comment-ca-marche' },
// ];

// const HERO_BENEFITS = ['Personnalisable', 'Aperçu en direct', 'Export PDF et Word'];

// const TRUST_ITEMS = [
//     'Un parcours valorisé',
//     'Une présentation soignée',
//     'Une candidature professionnelle',
// ];

// const FEATURES = [
//     {
//         number: '01',
//         title: 'Création guidée',
//         description:
//             'Renseignez vos informations personnelles, votre formation, vos expériences et vos compétences.',
//         Icon: PencilIcon,
//     },
//     {
//         number: '02',
//         title: 'Modèles professionnels',
//         description:
//             'Choisissez une présentation adaptée à votre métier, à votre parcours et à vos ambitions.',
//         Icon: LayoutIcon,
//     },
//     {
//         number: '03',
//         title: 'Exportation facile',
//         description:
//             'Préparez votre CV pour vos candidatures et exportez-le dans les formats disponibles.',
//         Icon: DownloadIcon,
//     },
// ];

// const MODELS = [
//     {
//         name: 'Classic',
//         description: 'Sobre et professionnel',
//         variant: 'classic',
//     },
//     {
//         name: 'Modern',
//         description: 'Moderne et dynamique',
//         variant: 'modern',
//     },
//     {
//         name: 'Elegant',
//         description: 'Épuré et raffiné',
//         variant: 'elegant',
//     },
//     {
//         name: 'Student',
//         description: 'Adapté aux étudiants',
//         variant: 'student',
//     },
// ];

// const STEPS = [
//     {
//         number: '01',
//         title: 'Créez votre compte',
//         description: 'Accédez à votre espace personnel.',
//     },
//     {
//         number: '02',
//         title: 'Complétez votre profil',
//         description: 'Ajoutez vos formations, expériences et compétences.',
//     },
//     {
//         number: '03',
//         title: 'Personnalisez et exportez',
//         description: 'Choisissez votre présentation et préparez votre document.',
//     },
// ];

// /* -------------------------------------------------------------------------- */
// /*  Petits composants réutilisables                                           */
// /* -------------------------------------------------------------------------- */

// function Brand({ footer = false }) {
//     return (
//         <Link
//             to="/"
//             className={`landing-brand${footer ? ' landing-brand--footer' : ''}`}
//             aria-label="CV-Pro, accueil"
//         >
//             <img src={logo} alt="CV-Pro" />
//         </Link>
//     );
// }

// function SectionHeading({ eyebrow, title, description, left = false }) {
//     return (
//         <div
//             className={`landing-section__heading${
//                 left ? ' landing-section__heading--left' : ''
//             }`}
//         >
//             <span className="landing-section__eyebrow">{eyebrow}</span>
//             <h2>{title}</h2>
//             <p>{description}</p>
//         </div>
//     );
// }

// function MiniCv({ variant }) {
//     return (
//         <div className={`landing-mini-cv landing-mini-cv--${variant}`}>
//             <div className="landing-mini-cv__header">
//                 <div className="landing-mini-cv__avatar" />
//                 <div className="landing-mini-cv__identity">
//                     <span />
//                     <span />
//                     <span />
//                 </div>
//             </div>

//             <div className="landing-mini-cv__section">
//                 <span className="landing-mini-cv__heading" />
//                 <span />
//                 <span />
//                 <span />
//             </div>

//             <div className="landing-mini-cv__section">
//                 <span className="landing-mini-cv__heading" />
//                 <span />
//                 <span />
//             </div>

//             <div className="landing-mini-cv__section">
//                 <span className="landing-mini-cv__heading" />
//                 <span />
//                 <span />
//             </div>
//         </div>
//     );
// }

// /* -------------------------------------------------------------------------- */
// /*  Sections                                                                  */
// /* -------------------------------------------------------------------------- */

// function Navbar() {
//     return (
//         <header className="landing-navbar">
//             <div className="landing-container landing-navbar__inner">
//                 <Brand />

//                 <nav className="landing-nav" aria-label="Navigation principale">
//                     {NAV_LINKS.map((link) => (
//                         <a key={link.href} href={link.href}>
//                             {link.label}
//                         </a>
//                     ))}
//                 </nav>

//                 <div className="landing-navbar__actions">
//                     <Link to="/connexion" className="landing-login">
//                         Connexion
//                     </Link>
//                     <Link
//                         to="/inscription"
//                         className="landing-button landing-button--small"
//                     >
//                         Commencer
//                     </Link>
//                 </div>
//             </div>
//         </header>
//     );
// }

// function Hero() {
//     return (
//         <section className="landing-hero" id="accueil">
//             <div className="landing-container landing-hero__grid">
//                 <div className="landing-hero__content">
//                     <div className="landing-eyebrow">
//                         <span className="landing-eyebrow__dot" />
//                         DONNEZ DE L'ÉLAN À VOTRE CARRIÈRE
//                     </div>

//                     <h1>
//                         Votre parcours mérite un <span>CV exceptionnel.</span>
//                     </h1>

//                     <p className="landing-hero__description">
//                         Créez un CV professionnel qui valorise vos compétences,
//                         met en lumière votre parcours et vous aide à saisir de
//                         nouvelles opportunités.
//                     </p>

//                     <div className="landing-hero__actions">
//                         <Link to="/inscription" className="landing-button">
//                             Créer mon CV
//                             <ArrowRightIcon />
//                         </Link>

//                         <a
//                             href="#modeles"
//                             className="landing-button landing-button--outline"
//                         >
//                             Découvrir les modèles
//                         </a>
//                     </div>

//                     <div className="landing-hero__benefits">
//                         {HERO_BENEFITS.map((benefit) => (
//                             <span key={benefit}>
//                                 <span className="landing-check">
//                                     <CheckIcon />
//                                 </span>
//                                 {benefit}
//                             </span>
//                         ))}
//                     </div>
//                 </div>

//                 <div className="landing-hero__visual">
//                     <div className="landing-hero__glow" />

//                     <div className="landing-hero__image-frame">
//                         <img
//                             src={heroImage}
//                             alt="Illustration de création d'un CV professionnel"
//                         />
//                     </div>

//                     <div className="landing-floating-card landing-floating-card--top">
//                         <span className="landing-floating-card__icon">
//                             <CheckIcon />
//                         </span>
//                         <div>
//                             <strong>Votre CV, votre style</strong>
//                             <span>Personnalisez chaque détail</span>
//                         </div>
//                     </div>

//                     <div className="landing-floating-card landing-floating-card--bottom">
//                         <span className="landing-floating-card__icon landing-floating-card__icon--blue">
//                             PDF
//                         </span>
//                         <div>
//                             <strong>Prêt pour vos candidatures</strong>
//                             <span>Un document professionnel</span>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </section>
//     );
// }

// function Trust() {
//     return (
//         <section className="landing-trust">
//             <div className="landing-container landing-trust__inner">
//                 <p>LES OUTILS POUR PRÉSENTER LE MEILLEUR DE VOUS-MÊME</p>
//                 <div className="landing-trust__items">
//                     {TRUST_ITEMS.map((item) => (
//                         <span key={item}>{item}</span>
//                     ))}
//                 </div>
//             </div>
//         </section>
//     );
// }

// function Features() {
//     return (
//         <section className="landing-section" id="fonctionnalites">
//             <div className="landing-container">
//                 <SectionHeading
//                     eyebrow="POURQUOI CV-PRO ?"
//                     title="Tout ce qu'il faut pour créer un bon CV"
//                     description="Des outils simples pour transformer vos informations en un document clair, cohérent et professionnel."
//                 />

//                 <div className="landing-feature-grid">
//                     {FEATURES.map(({ number, title, description, Icon: FeatureIcon }) => (
//                         <article className="landing-feature-card" key={number}>
//                             <div className="landing-feature-card__top">
//                                 <span className="landing-feature-card__icon">
//                                     <FeatureIcon />
//                                 </span>
//                                 <span className="landing-feature-card__number">
//                                     {number}
//                                 </span>
//                             </div>

//                             <h3>{title}</h3>
//                             <p>{description}</p>
//                         </article>
//                     ))}
//                 </div>
//             </div>
//         </section>
//     );
// }

// function Models() {
//     return (
//         <section className="landing-models" id="modeles">
//             <div className="landing-container">
//                 <div className="landing-models__heading">
//                     <SectionHeading
//                         left
//                         eyebrow="NOS MODÈLES"
//                         title="Un style qui vous ressemble"
//                         description="Découvrez différents styles de CV et choisissez celui qui correspond à votre objectif professionnel."
//                     />

//                     <Link to="/inscription" className="landing-text-link">
//                         Créer mon CV <ArrowRightIcon />
//                     </Link>
//                 </div>

//                 <div className="landing-model-grid">
//                     {MODELS.map(({ name, description, variant }) => (
//                         <article className="landing-model-card" key={name}>
//                             <div className={`landing-model-card__preview ${variant}`}>
//                                 <MiniCv variant={variant} />
//                                 <span className="landing-model-card__label">
//                                     {name.toUpperCase()}
//                                 </span>
//                             </div>

//                             <div className="landing-model-card__info">
//                                 <div>
//                                     <h3>{name}</h3>
//                                     <p>{description}</p>
//                                 </div>
//                                 <Link
//                                     to="/inscription"
//                                     className="landing-model-card__arrow"
//                                     aria-label={`Créer un CV avec le style ${name}`}
//                                 >
//                                     <ArrowRightIcon />
//                                 </Link>
//                             </div>
//                         </article>
//                     ))}
//                 </div>
//             </div>
//         </section>
//     );
// }

// function Steps() {
//     return (
//         <section className="landing-steps" id="comment-ca-marche">
//             <div className="landing-container landing-steps__grid">
//                 <div>
//                     <span className="landing-section__eyebrow">
//                         SIMPLE ET PRATIQUE
//                     </span>
//                     <h2>Votre prochain CV en quelques étapes</h2>
//                     <p>
//                         Avancez à votre rythme et construisez un CV adapté à
//                         votre profil, que vous soyez étudiant, jeune diplômé ou
//                         professionnel.
//                     </p>
//                     <Link to="/inscription" className="landing-button">
//                         Commencer maintenant <ArrowRightIcon />
//                     </Link>
//                 </div>

//                 <div className="landing-step-list">
//                     {STEPS.map(({ number, title, description }) => (
//                         <article className="landing-step" key={number}>
//                             <span>{number}</span>
//                             <div>
//                                 <h3>{title}</h3>
//                                 <p>{description}</p>
//                             </div>
//                         </article>
//                     ))}
//                 </div>
//             </div>
//         </section>
//     );
// }

// function CallToAction() {
//     return (
//         <section className="landing-cta">
//             <div className="landing-container">
//                 <div className="landing-cta__inner">
//                     <div>
//                         <span className="landing-section__eyebrow">
//                             LE PROCHAIN CHAPITRE VOUS APPARTIENT
//                         </span>
//                         <h2>Prêt à valoriser votre parcours ?</h2>
//                         <p>
//                             Commencez à créer un CV à la hauteur de vos
//                             ambitions.
//                         </p>
//                     </div>

//                     <Link
//                         to="/inscription"
//                         className="landing-button landing-button--white"
//                     >
//                         Créer mon CV gratuitement <ArrowRightIcon />
//                     </Link>
//                 </div>
//             </div>
//         </section>
//     );
// }

// function Footer() {
//     return (
//         <footer className="landing-footer">
//             <div className="landing-container landing-footer__inner">
//                 <Brand footer />

//                 <p>Construisez votre avenir, un CV à la fois.</p>

//                 <div className="landing-footer__links">
//                     <Link to="/connexion">Connexion</Link>
//                     <Link to="/inscription">Inscription</Link>
//                 </div>

//                 <span className="landing-footer__copyright">
//                     © {new Date().getFullYear()} CV-Pro. Tous droits réservés.
//                 </span>
//             </div>
//         </footer>
//     );
// }

// /* -------------------------------------------------------------------------- */
// /*  Page                                                                      */
// /* -------------------------------------------------------------------------- */

// export default function LandingPage() {
//     return (
//         <main className="landing-page">
//             <Navbar />
//             <Hero />
//             <Trust />
//             <Features />
//             <Models />
//             <Steps />
//             <CallToAction />
//             <Footer />
//         </main>
//     );
// }





import { Link } from 'react-router-dom';
import heroImage from '../assets/hero.png';

const BENEFITS = ['Personnalisable', 'Aperçu en direct', 'Export PDF et Word'];

function ArrowRightIcon({ className = '' }) {
    return (
        <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
            className={className}
        >
            <path d="M5 12h14" />
            <path d="m13 6 6 6-6 6" />
        </svg>
    );
}

function CheckIcon({ className = '' }) {
    return (
        <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
            className={className}
        >
            <path d="m5 12 5 5L20 7" />
        </svg>
    );
}

export default function LandingPage() {
    return (
        <main className="relative min-h-screen overflow-hidden bg-slate-950 text-white">
            {/* Décors lumineux en arrière-plan */}
            <div className="pointer-events-none absolute -right-32 -top-32 h-96 w-96 rounded-full bg-blue-600/30 blur-3xl" />
            <div className="pointer-events-none absolute -bottom-32 -left-32 h-96 w-96 rounded-full bg-indigo-500/20 blur-3xl" />

            {/* Barre de navigation */}
            <header className="relative mx-auto flex max-w-6xl items-center justify-between px-6 py-6">
                <Link
                    to="/"
                    className="flex items-center gap-3"
                    aria-label="CV-Pro, accueil"
                >
                    <img
                        src="/logocv.png"
                        alt="Logo CV-Pro"
                        className="h-10 w-10 rounded-lg bg-white p-1 object-contain"
                    />
                    <span className="text-xl font-bold tracking-tight">
                        CV<span className="text-blue-400">Pro</span>
                    </span>
                </Link>

                <Link
                    to="/connexion"
                    className="text-sm font-semibold text-slate-300 transition hover:text-white"
                >
                    Connexion
                </Link>
            </header>

            {/* Section vitrine */}
            <section className="relative mx-auto grid max-w-6xl items-center gap-12 px-6 pb-20 pt-8 lg:grid-cols-2 lg:gap-16 lg:pt-16">
                {/* Contenu */}
                <div className="text-center lg:text-left">
                    <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-2 text-xs font-semibold uppercase tracking-widest text-blue-200">
                        <span className="h-2 w-2 rounded-full bg-blue-400" />
                        Donnez de l'élan à votre carrière
                    </span>

                    <h1 className="mt-6 text-4xl font-bold leading-tight tracking-tight sm:text-5xl lg:text-6xl">
                        Votre parcours mérite un{' '}
                        <span className="bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent">
                            CV exceptionnel.
                        </span>
                    </h1>

                    <p className="mx-auto mt-6 max-w-xl text-base leading-7 text-slate-300 sm:text-lg lg:mx-0">
                        Créez un CV professionnel qui valorise vos compétences,
                        met en lumière votre parcours et vous aide à saisir de
                        nouvelles opportunités.
                    </p>

                    {/* Bouton principal vers l'inscription */}
                    <div className="mt-8 flex justify-center lg:justify-start">
                        <Link
                            to="/inscription"
                            className="group inline-flex items-center gap-3 rounded-xl bg-blue-600 px-8 py-4 text-base font-semibold text-white shadow-lg shadow-blue-600/30 transition hover:bg-blue-500 focus:outline-none focus:ring-4 focus:ring-blue-300/40"
                        >
                            Créer mon CV
                            <ArrowRightIcon className="h-5 w-5 transition-transform group-hover:translate-x-1" />
                        </Link>
                    </div>

                    {/* Avantages */}
                    <ul className="mt-8 flex flex-wrap justify-center gap-x-6 gap-y-3 text-sm text-slate-300 lg:justify-start">
                        {BENEFITS.map((benefit) => (
                            <li key={benefit} className="flex items-center gap-2">
                                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-blue-500/20 text-blue-300">
                                    <CheckIcon className="h-3 w-3" />
                                </span>
                                {benefit}
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Image vitrine unique */}
                <div className="relative mx-auto w-full max-w-lg">
                    <div className="absolute inset-0 -z-0 rounded-full bg-blue-600/30 blur-3xl" />
                    <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 p-3 shadow-2xl shadow-blue-900/40 backdrop-blur">
                        <img
                            src={heroImage}
                            alt="Illustration de création d'un CV professionnel"
                            className="h-auto w-full rounded-2xl object-cover"
                        />
                    </div>
                </div>
            </section>

            {/* Pied de page */}
            <footer className="relative border-t border-white/10 py-6 text-center text-xs text-slate-500">
                © {new Date().getFullYear()} CV-Pro. Tous droits réservés.
            </footer>
        </main>
    );
}