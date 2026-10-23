export type RepositoryCategory =
  | 'tools'
  | 'backend'
  | 'web'
  | 'mobile'
  | 'research'
  | 'learning'
  | 'profile'

export type PortfolioCategory =
  | 'mobile'
  | 'frontend'
  | 'fullstack'
  | 'backend'
  | 'design'
  | 'packages'
  | 'learning'

export type GitHubRepository = {
  name: string
  url: string
  category: RepositoryCategory
  language: string | null
  detailsPending?: boolean
  portfolio?: {
    title: {
      en: string
      id: string
    }
    category: PortfolioCategory
  }
  description: {
    en: string
    id: string
  }
}

export const githubRepositories: GitHubRepository[] = [
  {
    name: 'alpinnz.github.io',
    url: 'https://github.com/alpinnz/alpinnz.github.io',
    category: 'web',
    language: 'TypeScript',
    description: {
      en: 'Personal portfolio built with Next.js static export and GitHub Pages.',
      id: 'Portofolio pribadi dengan Next.js static export dan GitHub Pages.',
    },
  },
  {
    name: 'valfuse-node',
    url: 'https://github.com/alpinnz/valfuse-node',
    category: 'tools',
    language: 'TypeScript',
    description: {
      en: 'Framework-neutral form validation, localization, and developer tooling for Node.js, React, Vue, and Express.',
      id: 'Validasi form, lokalisasi, dan perangkat pengembangan lintas framework untuk Node.js, React, Vue, dan Express.',
    },
  },
  {
    name: 'localization_gen',
    url: 'https://github.com/alpinnz/localization_gen',
    category: 'tools',
    language: 'Dart',
    description: {
      en: 'Generates type-safe Flutter localization code from nested JSON files.',
      id: 'Menghasilkan kode lokalisasi Flutter bertipe aman dari berkas JSON bertingkat.',
    },
  },
  {
    name: 'automation_keys_gen',
    url: 'https://github.com/alpinnz/automation_keys_gen',
    category: 'tools',
    language: 'Dart',
    description: {
      en: 'Standardizes Flutter automation keys with CLI validation and generated documentation.',
      id: 'Menstandarkan automation key Flutter dengan validasi CLI dan dokumentasi otomatis.',
    },
  },
  {
    name: 'go-rest-api-boilerplate',
    url: 'https://github.com/alpinnz/go-rest-api-boilerplate',
    category: 'backend',
    language: 'Go',
    description: {
      en: 'Go API starter with PostgreSQL, Redis-backed sessions, JWT authentication, WebSockets, and generated API docs.',
      id: 'Starter API Go dengan PostgreSQL, sesi Redis, autentikasi JWT, WebSocket, dan dokumentasi API otomatis.',
    },
  },
  {
    name: 'hono-rest-api-boilerplate',
    url: 'https://github.com/alpinnz/hono-rest-api-boilerplate',
    category: 'backend',
    language: 'TypeScript',
    portfolio: {
      title: {
        en: 'Hono REST API Starter',
        id: 'Starter REST API Hono',
      },
      category: 'backend',
    },
    description: {
      en: 'REST API starter using Bun, Hono, Prisma, and PostgreSQL with authentication and release scripts.',
      id: 'Starter REST API dengan Bun, Hono, Prisma, dan PostgreSQL, termasuk autentikasi dan skrip rilis.',
    },
  },
  {
    name: 'research-sanitazion-frontend',
    url: 'https://github.com/alpinnz/research-sanitazion-frontend',
    category: 'research',
    language: 'React · Flutter',
    description: {
      en: 'Cross-platform XSS sanitization study with React and Flutter demos plus a shared set of 60+ test payloads.',
      id: 'Riset sanitasi XSS lintas platform dengan demo React dan Flutter serta lebih dari 60 payload pengujian.',
    },
  },
  {
    name: 'research',
    url: 'https://github.com/alpinnz/research',
    category: 'research',
    language: 'Dart',
    portfolio: {
      title: {
        en: 'Firebase Google Sign-In Study',
        id: 'Riset Google Sign-In Firebase',
      },
      category: 'mobile',
    },
    description: {
      en: 'Research project on Google sign-in with Firebase Authentication across Flutter web and Android.',
      id: 'Riset Google Sign-In dengan Firebase Authentication untuk Flutter web dan Android.',
    },
  },
  {
    name: 'express-rest-api-boilerplate',
    url: 'https://github.com/alpinnz/express-rest-api-boilerplate',
    category: 'backend',
    language: null,
    detailsPending: true,
    description: {
      en: 'Public repository without project files or a project overview yet.',
      id: 'Repositori publik yang belum memiliki berkas proyek atau ringkasan proyek.',
    },
  },
  {
    name: 'synapsis-challenge',
    url: 'https://github.com/alpinnz/synapsis-challenge',
    category: 'learning',
    language: 'Dart',
    portfolio: {
      title: {
        en: 'Synapsis Flutter Challenge',
        id: 'Tantangan Flutter Synapsis',
      },
      category: 'mobile',
    },
    description: {
      en: 'Flutter coding challenge with generated models and unit-test instructions.',
      id: 'Tantangan coding Flutter dengan model hasil generator dan panduan pengujian unit.',
    },
  },
  {
    name: 'skripsi-absensi-app',
    url: 'https://github.com/alpinnz/skripsi-absensi-app',
    category: 'mobile',
    language: 'Dart',
    detailsPending: true,
    description: {
      en: 'Academic Flutter attendance-app repository; its public README still uses the starter template.',
      id: 'Repositori aplikasi absensi Flutter untuk proyek akademik; README publiknya masih memakai template awal.',
    },
  },
  {
    name: 'angkot-app',
    url: 'https://github.com/alpinnz/angkot-app',
    category: 'mobile',
    language: 'Dart',
    detailsPending: true,
    description: {
      en: 'Flutter public-transport app for passengers and drivers; the repository needs a project overview.',
      id: 'Aplikasi angkutan umum Flutter untuk penumpang dan pengemudi; repositori masih memerlukan ringkasan proyek.',
    },
  },
  {
    name: 'skirpsi-wisata-alam-app',
    url: 'https://github.com/alpinnz/skirpsi-wisata-alam-app',
    category: 'mobile',
    language: 'Dart',
    detailsPending: true,
    description: {
      en: 'Academic Flutter starter for a nature-tourism app; project details are not documented yet.',
      id: 'Starter Flutter akademik untuk aplikasi wisata alam; detail proyek belum didokumentasikan.',
    },
  },
  {
    name: 'tracking-children-app',
    url: 'https://github.com/alpinnz/tracking-children-app',
    category: 'mobile',
    language: 'Dart',
    detailsPending: true,
    description: {
      en: 'Flutter repository whose public documentation still uses the starter template.',
      id: 'Repositori Flutter yang dokumentasi publiknya masih memakai template awal.',
    },
  },
  {
    name: 'tracking-car-app',
    url: 'https://github.com/alpinnz/tracking-car-app',
    category: 'mobile',
    language: 'Dart',
    detailsPending: true,
    description: {
      en: 'Flutter vehicle-tracking project; the public README has not been customized yet.',
      id: 'Proyek pelacakan kendaraan dengan Flutter; README publiknya belum disesuaikan.',
    },
  },
  {
    name: 'smartlink-test',
    url: 'https://github.com/alpinnz/smartlink-test',
    category: 'mobile',
    language: 'Dart',
    detailsPending: true,
    description: {
      en: 'Public Flutter repository without a project-specific overview.',
      id: 'Repositori Flutter publik tanpa ringkasan khusus proyek.',
    },
  },
  {
    name: 'bukit-delight-node',
    url: 'https://github.com/alpinnz/bukit-delight-node',
    category: 'web',
    language: 'JavaScript',
    description: {
      en: 'Cafe ordering and management app built with React, Express, and MongoDB.',
      id: 'Aplikasi pemesanan dan pengelolaan kafe dengan React, Express, dan MongoDB.',
    },
  },
  {
    name: 'dosen-spk-web',
    url: 'https://github.com/alpinnz/dosen-spk-web',
    category: 'web',
    language: 'JavaScript',
    detailsPending: true,
    description: {
      en: 'Academic web repository; its public README still contains framework boilerplate.',
      id: 'Repositori web akademik; README publiknya masih berisi dokumentasi bawaan framework.',
    },
  },
  {
    name: 'react-bootstrap',
    url: 'https://github.com/alpinnz/react-bootstrap',
    category: 'web',
    language: null,
    detailsPending: true,
    description: {
      en: 'Public repository with no project files or overview published yet.',
      id: 'Repositori publik yang belum memiliki berkas proyek atau ringkasan.',
    },
  },
  {
    name: 'Seleksi-Bootcamp-Arkademy-Batch-13-5',
    url: 'https://github.com/alpinnz/Seleksi-Bootcamp-Arkademy-Batch-13-5',
    category: 'learning',
    language: 'JavaScript',
    portfolio: {
      title: {
        en: 'Arkademy CRUD Assignment',
        id: 'Tugas CRUD Arkademy',
      },
      category: 'learning',
    },
    description: {
      en: 'Bootcamp CRUD assignment using Node.js, Express, EJS, Bootstrap, and MySQL.',
      id: 'Tugas CRUD bootcamp dengan Node.js, Express, EJS, Bootstrap, dan MySQL.',
    },
  },
  {
    name: 'Seleksi-Bootcamp-Arkademy-Batch-14-1',
    url: 'https://github.com/alpinnz/Seleksi-Bootcamp-Arkademy-Batch-14-1',
    category: 'learning',
    language: 'JavaScript',
    portfolio: {
      title: {
        en: 'Web & SQL Fundamentals',
        id: 'Dasar Web & SQL',
      },
      category: 'learning',
    },
    description: {
      en: 'Early bootcamp exercises covering JavaScript, SQL, HTML, and PHP/MySQL.',
      id: 'Latihan bootcamp awal yang mencakup JavaScript, SQL, HTML, dan PHP/MySQL.',
    },
  },
  {
    name: 'Bootcamp-DumbWays-Batch-14-Kloter-1',
    url: 'https://github.com/alpinnz/Bootcamp-DumbWays-Batch-14-Kloter-1',
    category: 'learning',
    language: 'HTML · JavaScript · CSS',
    portfolio: {
      title: {
        en: 'Coding Bootcamp Exercises',
        id: 'Latihan Bootcamp Coding',
      },
      category: 'learning',
    },
    description: {
      en: 'Early web and database exercises from a coding bootcamp selection project.',
      id: 'Latihan web dan basis data dari proyek seleksi bootcamp coding.',
    },
  },
  {
    name: 'alpinnz',
    url: 'https://github.com/alpinnz/alpinnz',
    category: 'profile',
    language: 'Markdown',
    description: {
      en: 'GitHub profile README with professional background and technology interests.',
      id: 'README profil GitHub berisi latar belakang profesional dan minat teknologi.',
    },
  },
]
