export interface NewsItem {
  id: string;
  title: string;
  description: string;
  fullContent?: string;
  date: string;
  image: string;
  category: string;
}

export interface EventItem {
  id: string;
  title: string;
  description: string;
  fullText?: string;
  day: string;
  month: string;
  year: string;
  time: string;
  location: string;
  category: 'Culture' | 'Sport' | 'Festivités' | 'Cérémonie' | 'Social';
  bannerImage?: string;
}

export interface BulletinItem {
  id: string;
  number: string;
  title: string;
  period: string;
  description: string;
  image: string;
  downloadUrl: string;
  pages: {
    pageNumber: number;
    title: string;
    content: string;
    image?: string;
  }[];
}

export interface ServiceItem {
  id: string;
  name: string;
  category: string;
  phone: string;
  email: string;
  hours: string[];
  location: string;
  description: string;
}

export interface ProcedureItem {
  id: string;
  name: string;
  description: string;
  category: 'Identité' | 'Famille' | 'Urbanisme' | 'Élections' | 'Social';
  requiredDocuments: string[];
  steps: string[];
  processingTime: string;
  cost: string;
}

// Map the generated image paths
export const IMAGES = {
  townHallHero: "/src/assets/images/town_hall_hero_1780999854406.png",
  trainStation: "/src/assets/images/train_station_1780999870863.png",
  schoolSafety: "/src/assets/images/school_safety_1780999885195.png",
  summerVacation: "/src/assets/images/summer_vacation_1780999899263.png",
  townMarket: "/src/assets/images/town_market_1780999912720.png"
};

export const NEWS_DATA: NewsItem[] = [
  {
    id: "g-1",
    title: "Réouverture de la gare",
    date: "01/06/2026",
    category: "Transports & Travaux",
    description: "Senectus et netus et malesuada fames ac turpis egestas. Donec eu libero sit amet...",
    fullContent: "Nous avons le plaisir de vous annoncer la fin des travaux de rénovation et la réouverture complète de notre gare ferroviaire. Ce projet d'envergure permet désormais d'accueillir les voyageurs dans un hall moderne, entièrement accessible aux personnes à mobilité réduite. Les quais ont été rehaussés, la signalétique modernisée et des abris vélos sécurisés installés sur le parvis. Ces nouveaux aménagements visent à encourager l'utilisation des transports collectifs au quotidien pour l'ensemble des habitants de Saint-Venant.",
    image: IMAGES.trainStation
  },
  {
    id: "g-2",
    title: "Sécurité des élèves",
    date: "06/03/2026",
    category: "Éducation & Prévention",
    description: "Senectus et netus et malesuada fames ac turpis egestas. Donec eu libero sit amet...",
    fullContent: "La sécurité de nos enfants est une priorité absolue. À l'approche du nouveau trimestre, la municipalité a procédé au renforcement des contrôles et des signalisations à proximité de l'école primaire. De nouveaux passages piétons surélevés, des panneaux lumineux à LED et des radars pédagogiques interactifs ont été installés. De plus, nos agents de surveillance de la voie publique (ASVP) seront présents à chaque heure de rentrée et de sortie pour veiller au civisme routier et sécuriser la traversée des plus jeunes.",
    image: IMAGES.schoolSafety
  },
  {
    id: "g-3",
    title: "Séjour de vacances pour l'été 2026",
    date: "27/01/2026",
    category: "Jeunesse & Loisirs",
    description: "Senectus et netus et malesuada fames ac turpis egestas. Donec eu libero sit amet...",
    fullContent: "Les inscriptions pour les séjours de vacances municipaux de l'été 2026 sont officiellement ouvertes ! Cette année encore, le service Jeunesse a concocté un programme exceptionnel pour les enfants et adolescents de 6 à 17 ans : séjours sportifs à la montagne, initiations à la voile sur la côte d'Opale, ou encore chantiers de découverte créative. Des tarifs préférentiels calculés selon votre quotient familial sont appliqués afin de permettre au plus grand nombre d'enfants de s'évader et de créer des souvenirs mémorables.",
    image: IMAGES.summerVacation
  },
  {
    id: "g-4",
    title: "Inauguration du nouveau Jardin Public",
    date: "14/05/2026",
    category: "Environnement",
    description: "Un espace vert repensé au cœur de la ville avec de nouvelles aires de jeux inclusives pour les enfants et des chemins pédestres.",
    fullContent: "Le poumon vert de Saint-Venant fait peau neuve. Après six mois d'aménagements paysagers, l'inauguration officielle aura lieu le samedi 16 mai à 11h. Au programme : parcours sensoriels botaniques, arbres mellifères implantés pour favoriser la biodiversité locale, ruches pédagogiques et une toute nouvelle aire de pique-nique ombragée. Venez fêter le printemps en famille lors de cet événement convivial agrémenté d'animations musicales et d'ateliers horticoles.",
    image: IMAGES.townMarket
  },
  {
    id: "g-5",
    title: "Aménagement des pistes cyclables intercommunales",
    date: "08/04/2026",
    category: "Mobilité Douce",
    description: "Développement d'un réseau cyclable de 12km reliant la gare aux zones d'activités et aux villages environnants pour sécuriser vos trajets.",
    fullContent: "Pour répondre aux nouveaux enjeux environnementaux et sécuriser la pratique du vélo, notre commune déploie de nouvelles voies cyclables réservées et signalées. Ce tracé d'intérêt communautaire permet de rejoindre les commerces de proximité et l'établissement scolaire en toute sécurité, réduisant l'impact carbone local. Un jalonnement précis et des stations de gonflage connectées en libre-service complètent ce dispositif moderne.",
    image: IMAGES.trainStation
  }
];

export const EVENTS_DATA: EventItem[] = [
  {
    id: "e-1",
    title: "Fête des voisins",
    day: "26",
    month: "JUI",
    year: "2026",
    category: "Festivités",
    time: "À partir de 19h00",
    location: "Dans tous les quartiers de la commune",
    description: "Et si on prenait le temps de se rencontrer ? Apportez u...",
    fullText: "La traditionnelle Fête des Voisins est l'occasion parfaite pour tisser des liens d'amitié et partager un moment de convivialité avec son entourage proche. Que ce soit au coin d'une rue, dans un hall d'immeuble, une cour ou un jardin public, la municipalité encourage ces rassemblements spontanés en mettant gratuitement à disposition des tables, des bancs et des kits d'accueil (gobelets réutilisables, ballons, invitations). Inscrivez votre regroupement de quartier auprès de la mairie avant le 20 juin !",
    bannerImage: IMAGES.townMarket
  },
  {
    id: "e-2",
    title: "Fête de la musique",
    day: "21",
    month: "JUI",
    year: "2026",
    category: "Culture",
    time: "18h00 à 00h30",
    location: "Place de la Mairie et Grand-Rue",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit...",
    fullText: "Célébrez le solstice d'été en musique ! La commune s'enflamme pour la fête de la musique avec 4 scènes thématiques installées en centre-ville : Pop/Rock face à la mairie, Jazz & Blues dans la cour du Kiosque, Musique du monde au parc public, et une scène ouverte aux talents locaux amateurs dans la Halle. Venez chanter et danser au rythme des guitares, percussions et cuivres. Entrée libre et restauration locale sur place proposée par nos associations saint-venantaises !",
    bannerImage: IMAGES.trainStation
  },
  {
    id: "e-3",
    title: "Célébrations patriotiques",
    day: "23",
    month: "JUI",
    year: "2026",
    category: "Cérémonie",
    time: "10h00 à 13h00",
    location: "Monument aux Morts et Salons de la Mairie",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit...",
    fullText: "La commémoration officielle des fêtes de l'indépendance et de la liberté réunira les corps municipaux, les représentants des anciens combattants, et les enfants des écoles pour un hommage solennel. Défilé républicain officiel dans la rue principale, lever des couleurs, suivi d'une performance chorale de notre harmonie municipale. Un vin d'honneur chaleureux sera ensuite servi dans les salons de l'Hôtel de Ville, ouvert à tous les habitants citoyens.",
    bannerImage: IMAGES.townHallHero
  },
  {
    id: "e-4",
    title: "Cinéma sous les Étoiles",
    day: "15",
    month: "AOÛ",
    year: "2026",
    category: "Culture",
    time: "21h30",
    location: "Pelouse du Grand Jardin",
    description: "Projection en plein air sur écran géant du chef-d'œuvre familial de l'année. Apportez votre plaid !",
    fullText: "Quoi de plus agréable qu'une projection cinématographique sous le ciel étoilé d'août ? Dès la tombée de la nuit, installez-vous confortablement sur les transats ou de grands tapis d'herbe pour savourer un superbe film d'animation tous publics. Boissons rafraîchissantes, pop-corn bio et gourmandises disponibles sur place. En cas de mauvaise météo météo, le repli se fera dans la Salle Polyvalente.",
    bannerImage: IMAGES.schoolSafety
  },
  {
    id: "e-5",
    title: "Trail de la Vallée de la Lys",
    day: "13",
    month: "SEP",
    year: "2026",
    category: "Sport",
    time: "08h30 à 14h00",
    location: "Départ complexe sportif Léo Lagrange",
    description: "Événement sportif annuel avec 3 parcours de 5km (famille), 12km (nature) et 25km (confirmé).",
    fullText: "Chaussez vos baskets pour la 6ème édition du Trail de la Lys ! Un magnifique tracé à travers chemins boisés, berges fluviales préservées et sentiers pittoresques. Organisé en collaboration étroite avec l'Athlétic Club de Saint-Venant, cet événement éco-responsable reverse 2€ par dossard vendu à l'association d'aide à l'enfance durable de la région. Ravitaillements bio tout le long des parcours.",
    bannerImage: IMAGES.townMarket
  }
];

export const BULLETINS_DATA: BulletinItem[] = [
  {
    id: "b-1",
    number: "N°8 / Hiver 2025",
    title: "N°1 : Hiver 2025",
    period: "Hiver 2025 (Édition Trimestrielle)",
    description: "Dans le bulletin municipal N°8 de la ville de Ma Commune, le dossier principal est consacré au sport...",
    image: "/src/assets/images/town_market_1780999912720.png", // Or stylized
    downloadUrl: "#",
    pages: [
      {
        pageNumber: 1,
        title: "Éditorial du Maire & Sommaire",
        content: "Chères Saint-Venantaises, Chers Saint-Venantais, l'année 2025 s'ouvre sous le signe de l'engagement civique et du sport pour tous. Ce numéro dresse le bilan des installations et présente nos grands événements. Notre priorité absolue reste votre qualité de vie et le dynamisme de nos commerces.",
        image: IMAGES.townHallHero
      },
      {
        pageNumber: 2,
        title: "Dossier : Le Sport au Cœur de Saint-Venant",
        content: "Modernisation des plateaux multisports du complexe, rénovation du court de tennis couvert et subventions accrues pour nos 15 clubs sportifs. Saint-Venant encourage la pratique à tous les âges individuels pour la santé de ses concitoyens. Découvrez nos champions locaux !",
        image: IMAGES.townMarket
      },
      {
        pageNumber: 3,
        title: "Vie Associative & Événements à venir",
        content: "Les bénévoles font battre le cœur de notre commune. Dans ce numéro, focus sur les nouvelles initiatives d'entraide solidaire, l'atelier couture intergénérationnel et le programme complet des festivités d'été qui animeront nos rues, nos parcs et nos monuments."
      },
      {
        pageNumber: 4,
        title: "Urbanisme, Budget & Infos Pratiques",
        content: "Rapport budgétaire simplifié : répartition transparente des dépenses avec maintien des taux d'imposition locaux inchangés. Point sur les travaux en cours d'assainissement de la Grand-Rue, contacts d'urgence des pharmacies de garde, et calendrier révisé de la collecte sélective de déchets.",
        image: IMAGES.trainStation
      }
    ]
  },
  {
    id: "b-2",
    number: "N°7 / Automne 2024",
    title: "N°2 : Automne 2024",
    period: "Automne 2024",
    description: "Retrouvez les dossiers sur la transition écologique locale, l'isolation thermique de nos écoles publiques, et la programmation théâtrale de la rentrée des classes.",
    image: "/src/assets/images/train_station_1780999870863.png",
    downloadUrl: "#",
    pages: [
      { pageNumber: 1, title: "Édito : Rentrée Responsable", content: "Chères concoyennes et citoyens, cap sur la rentrée scolaire ! Ce trimestre est marqué par d'importants investissements d'avenir visant l'efficacité énergétique de nos principaux bâtiments communaux." },
      { pageNumber: 2, title: "Dossier Énergie : Moins de watts, plus de vert", content: "Amélioration des toitures de l'école Pasteur et passage de tout l'éclairage public communal au LED intelligent avec baisse d'intensité nocturne." }
    ]
  },
  {
    id: "b-3",
    number: "N°6 / Été 2024",
    title: "N°3 : Été 2024",
    period: "Été 2024",
    description: "Guide complet de la saison estivale, plans des pistes de randonnée cycliste balisées, et l'histoire passionnante de nos fortifications médiévales.",
    image: "/src/assets/images/town_hall_hero_1780999854406.png",
    downloadUrl: "#",
    pages: [
      { pageNumber: 1, title: "Bel été à Saint-Venant", content: "Le soleil brille et nous invite à nous retrouver nombreux en plein air. Ce catalogue présente l'intégralité du Festi-Lys 2024 !" }
    ]
  }
];

export const SERVICES_DATA: ServiceItem[] = [
  {
    id: "s-1",
    name: "Service État Civil & Identité",
    category: "Mairie",
    phone: "03 21 00 11 22",
    email: "etatcivil@saintvenant.fr",
    hours: ["Lundi, Mardi, Jeudi, Vendredi : 9h00 - 12h00 / 14h00 - 17h00", "Mercredi : 9h00 - 12h00"],
    location: "Accueil principal de la Mairie - Rez-de-chaussée",
    description: "Délivrance de pièces nationales d'identité (cartes d'identité, passeports), actes de naissance, mariage, décès, recensement citoyen et inscriptions sur la liste électorale."
  },
  {
    id: "s-2",
    name: "Service Urbanisme & Travaux",
    category: "Travaux",
    phone: "03 21 00 11 23",
    email: "urbanisme@saintvenant.fr",
    hours: ["Mardi et Jeudi : 14h00 - 17h00 (Uniquement sur rendez-vous)", "Vendredi : 9h00 - 12h00"],
    location: "Hôtel de Ville - 1er étage",
    description: "Consultation du Plan Local d'Urbanisme (PLU), dépôt de permis de construire, déclaration préalable de travaux, enseignes et autorisations environnementales diverses."
  },
  {
    id: "s-3",
    name: "CCAS (Action Sociale)",
    category: "Solidarité",
    phone: "03 21 00 11 24",
    email: "ccas@saintvenant.fr",
    hours: ["Lundi, Mercredi et Vendredi : 9h00 - 12h00"],
    location: "Maison des Services Solidaires, Rue des Jardins",
    description: "Soutien aux personnes âgées, isolées ou en précarité. Aide légale et facultative, dossiers de logement social, portage de repas à domicile et inscriptions au registre canicule."
  },
  {
    id: "s-4",
    name: "École Primaire Municipale Jean de la Fontaine",
    category: "Éducation",
    phone: "03 21 00 11 25",
    email: "ecole.fontaine@saintvenant.fr",
    hours: ["Lundi, Mardi, Jeudi, Vendredi : 8h30 - 11h45 / 13h45 - 16h30"],
    location: "15 Rue de l'École",
    description: "Établissement public communal accueillant les élèves de la maternelle au CM2. Services de cantine et accueil périscolaire attenants."
  },
  {
    id: "s-5",
    name: "Bibliothèque Municipale & Cybercentre",
    category: "Culture",
    phone: "03 21 00 11 26",
    email: "bibliotheque@saintvenant.fr",
    hours: ["Mercredi : 10h00 - 12h00 / 14h00 - 18h00", "Samedi : 9h30 - 12h30"],
    location: "Espace Culturel Louis Aragon, Allée des Poètes",
    description: "Lieu de lecture, prêt gratuit de livres, magazines et jeux de société. Ordinateurs connectés avec accès internet gratuit et conseillers numériques."
  }
];

export const PROCEDURES_DATA: ProcedureItem[] = [
  {
    id: "p-1",
    name: "Pièce d'Identité (CNI / Passeport)",
    description: "Demande initiale ou renouvellement en vue d'obtenir un titre d'identité valide officiel.",
    category: "Identité",
    requiredDocuments: [
      "Pré-demande ANTS complétée en ligne",
      "Justificatif de domicile récent (moins de 3 mois)",
      "Photo d'identité certifiée conforme conforme",
      "Ancien titre d'identité (en cas de renouvellement)",
      "Timbres fiscaux (86€ uniquement pour le Passeport adulte)"
    ],
    steps: [
      "Effectuer la pré-demande en ligne sur le site officiel de l'ANTS",
      "Prendre un rendez-vous obligatoire en mairie depuis notre Portail (bouton dédié Rdv CNI)",
      "Se présenter au rendez-vous en personne pour la prise d'empreintes avec tous les documents originaux",
      "Suivre l'avancement et retirer le titre personnel en personne au lieu du dépôt sous 3 à 5 semaines."
    ],
    processingTime: "3 à 5 semaines (selon flux préfectoraux)",
    cost: "CNI Gratuite (sauf perte/vol : 25€) | Passeport adulte : 86€"
  },
  {
    id: "p-2",
    name: "Acte de Naissance / Mariage",
    description: "Délivrance de copie intégrale ou d'extrait avec/sans filiation d'acte rédigé dans la commune.",
    category: "Famille",
    requiredDocuments: [
      "Copie de la pièce d'identité du demandeur",
      "Preuve du lien de filiation direct si vous demandez l'acte d'un tiers"
    ],
    steps: [
      "Remplir le formulaire d'acte civique de l'état-civil",
      "Acheminer la demande par courrier postal ou la retirer directement sur place au guichet",
      "L'acte imprimé officiel scellé vous est délivré gratuitement de main propre ou par voie postale sécurisée."
    ],
    processingTime: "Sur place immédiat | Par courrier sous 48h",
    cost: "Gratuit"
  },
  {
    id: "p-3",
    name: "Inscription sur les Listes Électorales",
    description: "Permet de pouvoir voter lors des prochains scrutins nationaux, départementaux ou municipaux.",
    category: "Élections",
    requiredDocuments: [
      "Formulaire CERFA n°12669 dûment rempli",
      "Pièce d'identité en cours de validité (recto/verso)",
      "Justificatif d'attache ou de domicile récent dans la commune de Saint-Venant"
    ],
    steps: [
      "Effectuer la démarche en ligne via Service-Public.fr ou venir en personne au guichet Mairie",
      "Présenter les pièces justificatives d'identité et de domicile d'attache",
      "Confirmation de votre inscription validée avec réception de votre carte électorale l'année suivante par courrier postal."
    ],
    processingTime: "Prise en compte immédiate",
    cost: "Gratuit"
  },
  {
    id: "p-4",
    name: "Déclaration Préalable de Travaux (DP)",
    description: "Obligatoire pour des travaux légers non soumis au permis de construire (clôtures, façades, abri de jardin, fenêtres).",
    category: "Urbanisme",
    requiredDocuments: [
      "Formulaire CERFA d'urbanisme complété",
      "Plan de situation du terrain au sein de la commune",
      "Plan des façades et des toitures concernées par les modifications",
      "Visuels 3D d'insertion ou photographies d'environnement"
    ],
    steps: [
      "Élaborer le dossier de plans d'après le cahier des charges du PLU de la commune",
      "Déposer 4 exemplaires complets au guichet Urbanisme ou soumettre via le portail numérique SVE",
      "Attendre le délai d'instruction légal d'un mois sans objection des services pour démarrer vos travaux de rénovation."
    ],
    processingTime: "1 mois d'instruction obligatoire",
    cost: "Gratuit"
  }
];
