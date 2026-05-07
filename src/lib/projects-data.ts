import { ProjectDetail } from '@/types/project';

// Raw project data from CV
export const cvProjects = [
    {
        _type: 'project',
        _id: 'spine-finance',
        title: 'Spine Finance Dashboard',
        slug: {
            _type: 'slug',
            current: 'spine-finance'
        },
        shortDescription: 'A DeFi dashboard for fixed-rate lending, borrowing, and vault management across multiple EVM chains including Rise, HyperEVM, Base, and Ethereum.',
        fullDescription: `Spine Finance Dashboard is the primary web interface for Spine Finance — a fixed-rate lending and borrowing DeFi protocol. The platform enables users to earn yield by depositing assets into ERC-4626 compliant vaults, borrow against collateral at fixed interest rates, and manage vault configurations as liquidity providers. It solves the problem of volatile interest rates in DeFi by offering predictable, fixed-rate lending and borrowing markets.

Target users include DeFi lenders seeking stable yield, borrowers who want predictable interest costs, and vault managers (liquidity providers) who configure vault parameters, credit books, timelocks, and idle-liquidity routing to external protocols like Morpho and Aave. The platform operates across multiple EVM-compatible chains — currently Rise (primary), HyperEVM, Ethereum, Base, and Citrea Testnet.

Built with React 19 and TypeScript in a multi-app monorepo structure, the app leverages a Promise-based suspension architecture with React 19's use() hook for parallel data loading. Each page section loads independently without blocking the UI, enabling sub-second perceived load times even when fetching from multiple on-chain sources. The codebase consists of 408 source files totaling ~61,000 lines of TypeScript/React code.

On-chain data flows through wagmi/viem with multicall batching and a subgraph indexer, while authentication uses AWS Amplify with Cognito's custom wallet-based auth flow. The platform features comprehensive charting with Recharts, real-time price data from Chainlink oracles, and a custom design system built on Radix UI primitives.`,
        category: 'Blockchain',
        technologies: [
            'React 19',
            'TypeScript',
            'Vite',
            'wagmi v3',
            'viem',
            'RainbowKit',
            'TanStack Query v5',
            'AWS Amplify',
            'Cognito',
            'GraphQL',
            'Radix UI',
            'Recharts',
            'ERC-4626',
            'Chainlink',
            'Styled Components'
        ],
        featured: true,
        role: 'Lead Frontend Engineer',
        duration: 'Nov 2024 - Mar 2026',
        team: 'Startup founding team',
        liveUrl: 'https://testnet.spine.finance/Rise/earn',
        challenge: 'Building a responsive DeFi dashboard that loads data from multiple on-chain sources (smart contracts, subgraph indexers, Chainlink oracles) across multiple chains — without blocking the entire UI when any single data source is slow or unavailable. Each page needs 5–10 independent async data streams.',
        solution: 'Implemented a Promise-based suspension architecture leveraging React 19\'s use() hook. Page-level contexts create non-blocking promises, and each component independently suspends on its own data with co-located skeleton states. Combined with dual-strategy vault discovery (subgraph-first with on-chain event log fallback) and TanStack Query persistence for data resilience.',
        features: [
            {
                title: 'Fixed-Rate Lending & Borrowing',
                content: 'Users deposit assets into ERC-4626 vaults to earn yield or open fixed-rate borrow positions backed by collateral. Each market defined by collateral type × maturity date with configurable LTV ratios and real-time metrics (utilization, APY, liquidity)'
            },
            {
                title: 'Multi-Chain Vault Discovery',
                content: 'Automatic vault discovery across 5 EVM chains using dual-strategy approach — subgraph indexer with on-chain event log fallback. Vault managers configure credit books, idle-liquidity routing to Morpho/Aave, and monitor performance analytics'
            },
            {
                title: 'Real-Time Portfolio Dashboard',
                content: 'Aggregated view of all positions (lending + borrowing) across every vault and chain. Tracks shares, asset value, earnings, debt, collateral, and LTV. Historical charts show APY trends and share price evolution powered by Recharts'
            },
            {
                title: 'Independent Section Loading',
                content: 'React 19 Suspense architecture where each page section loads independently. Slow oracle queries don\'t block charts; delayed subgraph responses don\'t prevent metrics rendering. Perceived load time equals fastest data source'
            },
            {
                title: 'Wallet-Based Authentication',
                content: 'Web3 authentication via RainbowKit integrated with AWS Cognito custom auth. Users sign wallet challenge to authenticate, eliminating email/password friction while maintaining secure AWS Amplify session management'
            }
        ],
        outcome: 'Production-ready DeFi dashboard deployed across 5 EVM chains. Codebase: 408 files, 61,000 lines of TypeScript/React. 50+ reusable UI components with Storybook documentation. Architecture enables parallel loading from multiple on-chain sources without UI blocking.',
        order: 1,
        thumbnail: '/projects/spine/thumbnail.png',
        coverImage: '/projects/spine/thumbnail.png',
        gallery: [
            {
                sectionKey: 'overview',
                title: 'Platform Overview',
                description: 'Main interface of the Spine Finance DeFi dashboard',
                images: [
                    { image: '/projects/spine/screencapture-testnet-spine-finance-Rise-borrow-2026-03-28-20_12_15.png', alt: 'Borrow page - fixed-rate borrowing interface' },
                    { image: '/projects/spine/screencapture-testnet-spine-finance-Rise-lend-0x87924ca0a8918d66e618e4898d6101443068d2da-2026-03-28-20_12_45.png', alt: 'Lending page - deposit assets to earn yield' },
                    { image: '/projects/spine/screencapture-testnet-spine-finance-Rise-portfolio-2026-03-28-20_13_33.png', alt: 'Portfolio dashboard - aggregated positions overview' },
                ]
            },
            {
                sectionKey: 'vaults',
                title: 'Vault Management',
                description: 'ERC-4626 vault configuration and monitoring',
                images: [
                    { image: '/projects/spine/screencapture-testnet-spine-finance-Rise-vaults-2026-03-28-20_13_46.png', alt: 'Vault list - all available vaults' },
                    { image: '/projects/spine/screencapture-testnet-spine-finance-Rise-vaults-0x6cc0ee45ec0685a717fab1c67a64ee1ce28032fa-overview-2026-03-28-20_14_32.png', alt: 'Vault overview - detailed vault metrics' },
                    { image: '/projects/spine/screencapture-testnet-spine-finance-Rise-vaults-0x6cc0ee45ec0685a717fab1c67a64ee1ce28032fa-creditbooks-2026-03-28-20_15_29.png', alt: 'Vault credit books - lending market configuration' },
                    { image: '/projects/spine/screencapture-testnet-spine-finance-Rise-vaults-0x6cc0ee45ec0685a717fab1c67a64ee1ce28032fa-routings-2026-03-28-20_17_08.png', alt: 'Vault routings - idle liquidity routing to Morpho/Aave' },
                    { image: '/projects/spine/screencapture-testnet-spine-finance-Rise-liquidation-2026-03-28-20_18_01.png', alt: 'Liquidation page - manage liquidation events' },
                ]
            },
        ]
    },
    {
        _type: 'project',
        _id: 'cortex-hub',
        title: 'CORTEX HUB',
        slug: {
            _type: 'slug',
            current: 'cortex-hub'
        },
        shortDescription: 'A full-stack EdTech hub that unifies language-learning apps through shared data models, centralized APIs, and cross-app session bridging.',
        fullDescription: `CORTEX HUB is the central layer of a multi-app language-learning ecosystem, connecting specialized products such as Lexica, Oratio, Solilo, and Synapse under a single technical architecture. The platform is built as a Turborepo monorepo with shared TypeScript contracts via @cortex/types, enabling consistent data exchange across apps.

The system combines a Next.js hub/landing experience with a NestJS core API for centralized processing, real-time communication, and AI-ready analytics workflows. It is designed to integrate Supabase/PostgreSQL for durable storage, Redis + BullMQ for background jobs, and Socket.io for live interactions, while preserving app-level autonomy through mapper-based integration.

From a product architecture perspective, the hub is positioned as the orchestration layer for scale, with a data-driven UI model and roadmap that supports growth from a small set of live apps to a larger ecosystem.`,
        category: 'Full Stack',
        technologies: [
            'TypeScript',
            'Next.js',
            'NestJS',
            'Turborepo',
            'pnpm Workspaces',
            'Supabase',
            'PostgreSQL',
            'Redis',
            'BullMQ',
            'Socket.io',
            'Pino',
            'Framer Motion'
        ],
        featured: true,
        role: 'To be updated',
        duration: 'To be updated',
        team: 'To be updated',
        liveUrl: 'https://cortexedtech.vercel.app',
        challenge: 'Build a scalable ecosystem where multiple focused EdTech apps can share identity, progress, and learning signals without becoming a monolithic super app.',
        solution: 'Implemented a monorepo-based hub architecture with shared domain types (@cortex/types), mapper-driven app integration, centralized NestJS APIs, and an auth-bridge approach using postMessage for cross-subdomain session interoperability.',
        features: [
            {
                title: 'Shared Type System Across Apps',
                content: 'Introduced @cortex/types as a single source of truth for user, assessment, progress, and action-log contracts, reducing integration drift across frontend and backend services.'
            },
            {
                title: 'Centralized Core API for Ecosystem Orchestration',
                content: 'Built a NestJS core service layer to aggregate cross-app learning data and support AI/analytics pipelines with a unified integration surface.'
            },
            {
                title: 'Cross-Subdomain Auth Bridge',
                content: 'Implemented a secure postMessage-based auth bridge with origin allow-listing to pass session context between hub and satellite apps in multi-domain deployments.'
            },
            {
                title: 'Realtime and Background Processing Foundation',
                content: 'Designed infrastructure to support Socket.io realtime events and BullMQ + Redis async processing for non-blocking data refinement and heavy tasks.'
            },
            {
                title: 'Data-Driven Ecosystem Interface',
                content: 'Structured the hub frontend around typed data models and modular sections (arsenal, incubator, roadmap, partnership) to scale feature presentation as the ecosystem grows.'
            }
        ],
        outcome: 'Established a production-oriented foundation spanning 5 frontend apps and 1 core backend in one monorepo, with documented scaling targets from 4 to 20+ apps and a completed 7-section hub interface implementation in current project artifacts.',
        order: 2,
        thumbnail: '/projects/cortex-hub-placeholder.png',
        coverImage: '/projects/cortex-hub-placeholder.png',
        gallery: [
            {
                sectionKey: 'App',
                title: 'Basic Flow',
                description: 'Main flow of the CORTEX HUB with ecosystem overview, app directory, and roadmap sections',
                images: [
                    { image: '/projects/hub/hub1.png', alt: 'CORTEX HUB homepage' },
                    { image: '/projects/hub/hub2.png', alt: 'CORTEX HUB homepage' },
                ]
            },
        ]
    },
    {
        _type: 'project',
        _id: 'lexica',
        title: 'Lexica',
        slug: {
            _type: 'slug',
            current: 'lexica-ielts-vocabulary-pwa'
        },
        shortDescription: 'A mobile-first vocabulary learning PWA that combines swipe-based practice, voice recognition, ELO adaptation, and SRS progression for IELTS learners.',
        fullDescription: `Lexica is a focused vocabulary product in the CORTEX ecosystem, designed as a high-frequency micro-learning app with Tinder-style interactions and a strong mobile-first UX. It is implemented with Next.js App Router, React, TypeScript, Tailwind CSS, and Framer Motion, with persistent client state managed by Zustand.

The learning engine combines ELO-based deck routing, spaced repetition progress states, and an energy system that controls session intensity. For advanced cards, Lexica introduces a voice-driven mastery flow using the Web Speech API (including webkitSpeechRecognition fallback), turning pronunciation into an active learning checkpoint instead of a passive review step.

Lexica also includes story unlock mechanics and CORTEX sync hooks to push learned vocabulary events to the central API, making it a practical acquisition layer that feeds downstream speaking and analytics experiences across the broader platform.`,
        category: 'Frontend',
        technologies: [
            'Next.js',
            'React',
            'TypeScript',
            'Tailwind CSS',
            'Framer Motion',
            'Zustand',
            'Web Speech API',
            'Progressive Web App (PWA)',
            'next-pwa',
            'Recharts',
            '@use-gesture/react',
            'Vercel'
        ],
        featured: true,
        role: 'To be updated',
        duration: 'To be updated',
        team: 'To be updated',
        liveUrl: 'https://cortex-lexica.vercel.app',
        githubUrl: 'To be updated',
        challenge: 'Deliver a fast, engaging vocabulary trainer that avoids passive memorization while still supporting adaptive difficulty, pronunciation practice, and long-term retention on mobile devices.',
        solution: 'Built a PWA-first architecture with animated swipe interactions, ELO-based difficulty routing, SRS card progression, and a voice-first mastery mechanic, then connected learning events to CORTEX via structured sync actions.',
        features: [
            {
                title: 'Adaptive ELO Deck Routing',
                content: 'Dynamically adjusts card difficulty from user performance signals, helping maintain flow while reducing frustration and stagnation.'
            },
            {
                title: 'Voice-Driven Mastery Flow',
                content: 'Uses Web Speech API with browser fallback to require repeated correct pronunciation on high-value cards before progression.'
            },
            {
                title: 'Spaced Repetition State Machine',
                content: 'Tracks per-card learning states and review schedules to move users from first exposure to durable mastery.'
            },
            {
                title: 'Energy and Streak Mechanics',
                content: 'Implements daily energy limits, midnight reset logic, streak tracking, and highest-ELO progression to reinforce consistent practice behavior.'
            },
            {
                title: 'Story Unlock and Funnel Integration',
                content: 'Unlocks contextual stories after vocabulary milestones and links practice outcomes into the broader CORTEX learning journey.'
            },
            {
                title: 'CORTEX Sync and Security Hardening',
                content: 'Provides bulk vocabulary sync to the core API and applies deployment headers such as CSP, frame restrictions, and microphone permissions policy.'
            }
        ],
        outcome: 'Core roadmap phases for gameplay, voice interaction, progression logic, and production hardening are marked complete in project artifacts; deployment and cross-browser/device validation are still pending.',
        order: 3,
        thumbnail: '/projects/lexica/lexica1.png',
        coverImage: '/projects/lexica/lexica1.png',
        gallery: [
            {
                sectionKey: 'App',
                title: 'Basic Flow',
                description: 'Main flow of Lexica with ELO-based card routing, swipe interactions, and voice mastery checkpoint',
                images: [
                    { image: '/projects/lexica/lexica1.png', alt: 'Lexica homepage' },
                    { image: '/projects/lexica/lexica2.png', alt: 'Lexica homepage' },
                    { image: '/projects/lexica/lexica3.png', alt: 'Lexica homepage' },
                    { image: '/projects/lexica/lexica4.png', alt: 'Lexica homepage' },
                    { image: '/projects/lexica/lexica5.png', alt: 'Lexica homepage' },
                ]
            },
            {
                sectionKey: 'PWA',
                title: 'PWA Flow',
                description: 'Main flow of Lexica PWA with ELO-based card routing, swipe interactions, and voice mastery checkpoint',
                images: [
                    { image: '/projects/lexica/lexica-pwa1.jpeg', alt: 'Lexica PWA homepage' },
                    { image: '/projects/lexica/lexica-pwa2.jpeg', alt: 'Lexica PWA homepage' },
                    { image: '/projects/lexica/lexica-pwa3.jpeg', alt: 'Lexica PWA homepage' },
                    { image: '/projects/lexica/lexica-pwa4.jpeg', alt: 'Lexica PWA homepage' },
                    { image: '/projects/lexica/lexica-pwa5.jpeg', alt: 'Lexica PWA homepage' },
                    { image: '/projects/lexica/lexica-pwa6.jpeg', alt: 'Lexica PWA homepage' },
                ]
            },
        ]
    },
    {
        _type: 'project',
        _id: 'synapse',
        title: 'Synapse',
        slug: {
            _type: 'slug',
            current: 'synapse-phrasal-verb-survival'
        },
        shortDescription: 'A terminal-style phrasal verb learning app that uses AI-generated cyberpunk survival scenarios with branching outcomes based on particle selection.',
        fullDescription: `Synapse is a unique language learning product that teaches phrasal verbs through immersive cyberpunk survival scenarios. Built with a brutalist terminal aesthetic (JetBrains Mono, green/amber on absolute black), it transforms grammar practice into an interactive narrative experience.

The backend leverages a multi-provider AI architecture with Gemini 1.5 Flash as primary, Groq (Llama 3.3 70B) as high-speed fallback, and Gemma (Ollama) as local fallback, creating a 4-layer reliability system. The AI acts as "Synapse Architect," generating contextual scenarios where particle choice determines survival outcomes.

The system implements token optimization by compressing session history to only the last 2 stages, preventing context overflow while maintaining narrative continuity. Each mission consists of 5 stages with lives and integrity tracking, creating tension and meaningful consequences for incorrect particle selection. World Bible definitions provide consistent lore across multiple cyberpunk settings and mission types.`,
        category: 'Full Stack',
        technologies: [
            'Next.js',
            'React',
            'TypeScript',
            'NestJS',
            'Tailwind CSS',
            'Gemini API',
            'Groq API',
            'Ollama',
            'Lucide React',
            '@cortex/types',
            'Supabase'
        ],
        featured: true,
        role: 'To be updated',
        duration: 'To be updated',
        team: 'To be updated',
        liveUrl: 'https://cortex-synapse.vercel.app',
        githubUrl: 'To be updated',
        challenge: 'Create an engaging phrasal verb trainer that avoids dry grammar exercises while maintaining educational rigor and handling AI generation costs efficiently.',
        solution: 'Built a terminal-themed survival game with multi-provider AI fallback system, token-optimized history compression, and World Bible lore structure to generate consistent cyberpunk narratives with real phrasal verb learning embedded in high-stakes choices.',
        features: [
            {
                title: 'Multi-Provider AI Architecture',
                content: 'Implements 4-layer fallback system (Gemini → Groq → Gemma → Static) ensuring scenario generation reliability while optimizing for cost and speed.'
            },
            {
                title: 'Token-Optimized History Compression',
                content: 'Maintains narrative continuity by keeping only the last 2 stages in context, reducing API costs while preserving story coherence across 5-stage missions.'
            },
            {
                title: 'World Bible Lore System',
                content: 'Defines consistent cyberpunk settings with faction details and mission templates, enabling AI to generate contextually appropriate scenarios without drift.'
            },
            {
                title: 'Lives and Integrity Mechanics',
                content: 'Tracks player survival through lives counter and system integrity percentage, with particle effects that can restore health or boost performance on correct answers.'
            },
            {
                title: 'Brutalist Terminal Aesthetic',
                content: 'Delivers immersive experience through JetBrains Mono typography, scanline effects, grid backgrounds, and technical UI elements (mission codes, status indicators).'
            },
            {
                title: 'Multi-Mission Structure',
                content: 'Supports multiple worlds and mission types with branching narratives, enabling varied phrasal verb contexts from infiltration to survival scenarios.'
            }
        ],
        thumbnail: '/projects/synapse/synapse1.png',
        gallery: [
            {
                sectionKey: 'App',
                title: 'Basic Flow',
                description: 'Main flow of Synapse with AI-generated scenario, particle selection, and outcome consequences',
                images: [
                    { image: '/projects/synapse/synapse1.png', alt: 'synapse1' },
                    { image: '/projects/synapse/synapse2.png', alt: 'synapse2' },
                    { image: '/projects/synapse/synapse3.png', alt: 'synapse3' },
                    { image: '/projects/synapse/synapse4.png', alt: 'synapse4' },
                ]
            },
        ],
        outcome: 'Successfully implemented multi-mission structure with optimized token usage and stabilized 4-layer AI fallback; UI upgraded to v2.5 with comprehensive brutalist terminal design system.',
        order: 4
    },
    {
        _type: 'project',
        _id: 'oratio',
        title: 'ORATIO',
        slug: {
            _type: 'slug',
            current: 'oratio-ielts-speaking'
        },
        shortDescription: 'Real-time audio platform connecting language learners worldwide to practice IELTS Speaking with matched partners via live calls, feedback, and progress tracking.',
        fullDescription: `ORATIO is an online IELTS Speaking practice platform that connects language learners worldwide through real-time audio calls. The application addresses the biggest pain point for IELTS test-takers: lack of real practice partners, while 1-on-1 tutoring costs are prohibitively expensive ($15-50 USD per session).

ORATIO provides a 100% free solution, enabling learners to find compatible partners matched by band score within 30 seconds. The target audience includes students, international students, working professionals needing IELTS certification, and self-learners — targeting a market of 3M+ IELTS test-takers annually in Vietnam and 20M+ language learners globally.

Built as a full-stack Next.js 16 application with TypeScript, the platform uses Supabase for backend infrastructure (PostgreSQL database, authentication, realtime subscriptions, Row Level Security) and LiveKit for high-quality audio calls. The matchmaking system combines server actions with realtime subscription and polling fallback for reliability.

The application implements a complete flow: Authentication → Matchmaking → Partner Found → Audio Call (LiveKit) → Rating/Feedback → Call Summary, along with social features including Leaderboard, Achievements, Friends, Profile, and Call History.`,
        category: 'Full Stack',
        technologies: [
            'Next.js 16',
            'React 19',
            'TypeScript',
            'Supabase',
            'PostgreSQL',
            'LiveKit',
            'Tailwind CSS v4',
            'Shadcn/UI',
            'SWR',
            'Realtime Subscriptions'
        ],
        featured: true,
        role: 'Full-stack Developer',
        duration: 'Mar 2026 - Present',
        challenge: 'Building a reliable real-time matchmaking system where two users can find each other based on compatible band scores, while handling race conditions (duplicate matches from concurrent polls), stale callback references from React re-renders, and maintaining stable audio connections between users over the internet.',
        solution: 'Implemented a matchmaking flow combining Supabase Realtime subscription (instant match detection) with polling fallback (ensuring no missed matches). Used useRef pattern to maintain stable callback references, preventing polling cancellation from re-renders. Replaced .single() queries with .order().limit(1) + array access to handle edge cases. LiveKit server-side token generation ensures only authenticated users in matches can join rooms, with room authorization checks at API route level.',
        features: [
            {
                title: 'Smart Matchmaking System',
                content: 'Automatic partner search by compatible band score (±2.0 range) using Supabase Realtime subscription with polling fallback. Queue management with waiting/matched/cancelled states, FIFO ordering, real-time search timer, and online learners count updated every 5 seconds'
            },
            {
                title: 'Real-time Audio Calls with LiveKit',
                content: 'High-quality audio calls using LiveKit infrastructure with server-side token generation and room authorization. Supports mute/unmute, audio visualizer, partner presence detection, and auto-disconnect when partner leaves'
            },
            {
                title: 'Structured IELTS Q&A Practice',
                content: 'Simulates complete IELTS Speaking Test format with 3 Parts (Part 1: warm-up, Part 2: long-turn, Part 3: discussion). Interviewer/Candidate roles with auto-swap after each turn, 18 questions per session with real-time role swap requests between users'
            },
            {
                title: 'Rating & Feedback System',
                content: 'Post-call partner ratings (1-9 scale matching IELTS), feedback tags, detailed comments, and would-match-again flags. Scores breakdown across 4 criteria: Fluency, Vocabulary, Grammar, Pronunciation with Row Level Security'
            },
            {
                title: 'Comprehensive Database Security',
                content: 'All 4 database tables (profiles, match_queue, matches, session_feedback) protected with Row Level Security policies. Users can only view their own matches, edit their own profiles, and access relevant feedback'
            }
        ],
        outcome: 'MVP functional with complete core flow (Auth → Match → Call → Feedback) working end-to-end. Database secured with 100% RLS policy coverage across all tables. Matchmaking averages ~30 seconds to find partners with ~99% match detection reliability through dual subscription + polling approach.',
        order: 5,
        thumbnail: '/projects/oratio/thumbnail.png',
        coverImage: '/projects/oratio/thumbnail.png',
        gallery: [
            {
                sectionKey: 'app-interface',
                title: 'Application Interface',
                description: 'ORATIO IELTS Speaking practice platform screens',
                images: [
                    { image: '/projects/oratio/screencapture-localhost-3001-2026-03-28-20_23_44.png', alt: 'ORATIO main page' },
                    { image: '/projects/oratio/screencapture-localhost-3001-2026-03-28-20_27_03.png', alt: 'ORATIO practice session interface' },
                ]
            },
        ]
    },
    {
        _type: 'project',
        _id: 'era-tourist',
        title: 'ERA Tourist — Multi-Region TravelTech Platform',
        slug: {
            _type: 'slug',
            current: 'era-tourist-multi-region'
        },
        shortDescription: 'Multi-region bilingual (VN/EN) travel platform enabling customers to create personalized tour itineraries. Single codebase → multiple market-specific websites.',
        fullDescription: `ERA Tourist is a Multi-Region SaaS TravelTech platform designed to deploy multiple tourism websites serving different market segments (Indochine, Halal Tourism, Domestic, etc.) from a single codebase. Each domain has its own region configuration, navigation menu, and tour/category content, while being centrally managed through one Admin Panel.

The platform's standout feature is the personalized Tour Planning system: instead of just displaying pre-made tours like traditional travel websites, ERA Tourist allows customers to build custom itineraries day-by-day — selecting accommodations, restaurants, activities, and transportation — with an automatic pricing engine supporting dual-currency (VND/USD), seasonal pricing, group pricing, and agent/partner discounts. Tour plans can be exported to Excel for sharing.

Built with React 18 + Vite for frontend and Supabase (PostgreSQL) for backend/database/auth/storage, deployed on Vercel with global CDN. Multi-layer security includes Row Level Security (RLS) on all tables, route guards for admin/auth pages, and 5-tier role-based access (Super Admin → User). The entire interface and content support bilingual Vietnamese/English with instant switching without reload.

The project has completed a production-ready MVP with ~50,000 lines of code, 162 source files, 21 service modules, 40+ database migrations, and comprehensive documentation. The Admin Panel enables operations teams to run 100% independently without developers — from managing tours, categories, media, navigation, planning assets, bookings, to user roles.`,
        category: 'Full Stack',
        technologies: [
            'React 18',
            'Vite 5',
            'React Router v6',
            'Supabase',
            'PostgreSQL',
            'Supabase Auth',
            'Supabase Storage',
            'Tailwind CSS 4',
            'Bootstrap 5',
            'PapaParse',
            'SheetJS/xlsx',
            'React Markdown',
            'Vercel'
        ],
        featured: true,
        role: 'Full-stack Developer',
        duration: 'To be updated',
        liveUrl: 'https://inbound-website-one.vercel.app',
        challenge: 'Building a travel platform serving multiple market segments (domestic tourists, international visitors, Halal travelers, Indochine) without creating separate websites — a common problem that increases build & maintenance costs 3-5x, scatters data, and forces content teams to duplicate entry across multiple systems. Additionally, needed to enable customer tour customization instead of just fixed package selection.',
        solution: 'Designed Multi-Region SaaS architecture — 1 codebase deploys to N domains, each recognizing VITE_REGION to filter corresponding content. Centralized Admin Panel manages all regions, assigning tours/categories/navigation per region. Built Tour Planning Engine with 4-step workflow: input info → system suggestions → customize daily → review & book, integrated with smart pricing engine (dual-currency, seasonal, group pricing, agent discounts). Secured with RLS + route guards + 5-tier role-based access. Marginal cost of expanding to new markets reduced to nearly zero.',
        features: [
            {
                title: 'Multi-Region SaaS Architecture',
                content: '1 codebase → N websites (e.g., indochine.eratourist.com, halal.eratourist.com). Each region has separate navigation menus and tour/category content, centrally managed from 1 Admin Panel. Adding new markets only requires creating region + assigning content + deploy, no additional code needed'
            },
            {
                title: 'Tour Planning Engine with Smart Pricing',
                content: 'System allows customers to build custom day-by-day itineraries: select accommodations (3-tier: room type → rate plan → daily rate), restaurants (by time/cuisine), activities (morning/afternoon/evening slots), transportation. Auto-pricing with dual-currency VND/USD, seasonal pricing, group tiers (2-3/4-6/7+ people), agent/partner discounts. Export to Excel'
            },
            {
                title: 'Comprehensive Admin Panel (12+ modules)',
                content: 'Full dashboard with 12+ management pages: Tours, Categories, Regions, Media Library, 3-level Navigation Editor (Mega Menu), Planning Assets (Accommodations/Restaurants/Activities), Transport Routes, Booking Management, User & Role Management (5 tiers), Activity Bookings. CSV/Excel bulk import with preview + validation. 100% operable without developers'
            },
            {
                title: 'Full Bilingual System (VN/EN)',
                content: 'Complete bilingual support across all layers: UI, tour content, categories, planning assets, navigation, notifications, pricing (VND + USD). Instant language switching without reload, URL auto-adds ?lang= for sharing in correct language. Centralized translations for ~200+ keys'
            },
            {
                title: 'Security & Role-based Access Control',
                content: 'Multi-layer security: Row Level Security (RLS) on all Supabase tables, Admin Route Guard (access only when VITE_ADMIN_ENABLED=true), Auth Route Guard, Protected Routes, 5-tier permissions (Super Admin / Admin / Agent / Partner / User) with discount % for Agent/Partner roles. Real-time notification polling every 30s'
            }
        ],
        outcome: 'Production-ready MVP: ~50,000 LOC, 162 source files, 21 service modules, 40+ DB migrations, 12+ admin modules, 100+ React components. Full bilingual support (VN/EN) with ~200+ translation keys. 5-tier role-based access. Deployed on Vercel with multi-domain SPA configuration. Comprehensive documentation (4 guides). Ready for production operations.',
        order: 6,
        thumbnail: '/projects/era/thumbnail.png',
        coverImage: '/projects/era/thumbnail.png',
        gallery: [
            {
                sectionKey: 'homepage',
                title: 'Homepage & Categories',
                description: 'ERA Tourist multi-region travel platform',
                images: [
                    { image: '/projects/era/screencapture-localhost-3000-2026-03-28-20_32_40.png', alt: 'ERA Tourist homepage' },
                    { image: '/projects/era/screencapture-localhost-3000-category-halal-tours-2026-03-28-20_38_13.png', alt: 'Halal Tours category page' },
                ]
            },
            {
                sectionKey: 'tour-planning',
                title: 'Tour Planning',
                description: 'AI-powered tour planning engine',
                images: [
                    { image: '/projects/era/screencapture-localhost-3000-tour-planning-2026-03-28-20_40_12.png', alt: 'Tour planning interface' },
                    { image: '/projects/era/screencapture-localhost-3000-tour-planning-results-2026-03-28-20_43_46.png', alt: 'Tour planning results' },
                    { image: '/projects/era/screencapture-localhost-3000-tour-planning-results-2026-03-28-20_44_48.png', alt: 'Tour planning results detail' },
                ]
            },
        ]
    },
    {
        _type: 'project',
        _id: 'gear-indigo',
        title: 'GEAR.indigo — AI-Powered Development Platform',
        slug: {
            _type: 'slug',
            current: 'gear-indigo'
        },
        shortDescription: 'LLM-based idea-to-product generator that transforms natural language into full development documentation and source code for SME businesses.',
        fullDescription: `GEAR.indigo is an AI-powered development platform built by LANCETIER that empowers SME businesses to go from idea to production-ready code using natural language. The platform generates comprehensive development documentation — from requirement specifications, system design, database schemas, ER diagrams, screen wireframes, to functional source code — all step-by-step with consistency across documents.

As a core engineer in the startup team, I planned, designed, and implemented most of the platform's core features including the SVG editor for diagram generation, real-time chat function with streaming data, directory builder for the reverse engineering mode (which reads GitHub repositories and generates program documentation), and the product deployment pipeline.

Key capabilities include: cost & man-hour estimation from feature lists, step-by-step document generation (requirements → design → code), source code generation from documents, and reverse engineering from GitHub repositories. The platform supports a tiered pricing model (Free/Basic/Pro) and serves multiple Japanese enterprise clients including system integrators and web marketing companies.

Built with Next.js for the frontend, the platform leverages LLM APIs for intelligent document and code generation, with a focus on the Japanese enterprise market.`,
        category: 'AI/Machine Learning',
        technologies: [
            'Next.js',
            'React',
            'TypeScript',
            'Python',
            'Node.js',
            'MongoDB',
            'LLM/AI',
            'OpenAI API',
            'SVG Editor',
            'Streaming SSE',
            'GitHub API',
            'Tailwind CSS'
        ],
        featured: false,
        role: 'Core Engineer',
        duration: 'Mar 2024 - Jan 2025',
        team: 'Startup team',
        liveUrl: 'https://gearindigo.app/',
        challenge: 'Building an AI platform that generates consistent, high-quality development documentation across multiple stages (requirements → design → code) while maintaining coherence between documents. Also needed to support reverse engineering of existing codebases from GitHub repositories.',
        solution: 'Implemented a step-by-step generation pipeline where each document stage feeds context to the next, ensuring consistency. Built a custom SVG editor for diagram generation, integrated streaming SSE for real-time AI responses, and created a directory builder that crawls GitHub repos to generate comprehensive program documentation.',
        features: [
            {
                title: 'Step-by-Step Document Generation',
                content: 'Generates requirement specs, system design docs, DB schemas, ER diagrams, screen wireframes, and source code — each stage building on the previous for full consistency'
            },
            {
                title: 'Cost & Man-Hour Estimation',
                content: 'Automatically generates feature lists and screen lists from project descriptions, then estimates development cost and man-hours needed'
            },
            {
                title: 'Source Code Generation',
                content: 'Transforms design documents into functional source code with test-driven development support, accelerating the development process'
            },
            {
                title: 'GitHub Reverse Engineering',
                content: 'Reads source code from GitHub repositories and generates comprehensive program documentation — useful for onboarding and legacy system understanding'
            },
            {
                title: 'Real-time AI Chat & Streaming',
                content: 'Interactive chat interface with SSE streaming for real-time AI responses. Team members can discuss and refine documents collaboratively on-screen'
            },
            {
                title: 'SVG Diagram Editor',
                content: 'Custom-built SVG editor for generating and editing ER diagrams, screen transition diagrams, system architecture diagrams, and sequence diagrams'
            }
        ],
        outcome: 'Production SaaS platform serving multiple Japanese enterprise clients. Adopted by system integrators (MAKE A CHANGE, Walkers, BizLink) and web marketing companies (GladCube) for requirement definition, cost estimation, and development documentation. Tiered pricing model (Free/$14.99/$29.99 per month).',
        order: 7,
        thumbnail: '/projects/gearindigo.png',
        coverImage: '/projects/gearindigo.png',
        gallery: []
    },
    {
        _type: 'project',
        _id: 'elms-learning',
        title: 'E-Learning Marketplace',
        slug: {
            _type: 'slug',
            current: 'elms-learning-marketplace'
        },
        shortDescription: 'Udemy-scale Learning Management System with video streaming, secure payments, multi-instructor management, and comprehensive course administration.',
        fullDescription: `A comprehensive Learning Management System built for an English center in Ho Chi Minh City, featuring the complete infrastructure needed for modern online education.

The platform handles authentication, attendance tracking, meeting scheduling, class enrollment, assignment submission, exam systems, and much more. Designed to scale like Udemy, it supports multiple instructors, thousands of students, and handles video streaming with adaptive quality.

Built with a focus on user experience and reliability, the system provides role-based access control for students, instructors, and administrators, ensuring secure and efficient management of educational content.`,
        category: 'Full Stack',
        technologies: [
            'Next.js',
            'React',
            'TypeScript',
            'Node.js',
            'Express',
            'MongoDB',
            'AWS S3',
            'Video Streaming',
            'Stripe',
            'Tailwind CSS'
        ],
        featured: false,
        role: 'Full-stack Developer',
        duration: 'May 2023 - Present',
        liveUrl: 'https://elms-xi.vercel.app/',
        challenge: 'Creating a scalable LMS that can handle high-quality video streaming, secure payment processing, and complex permission systems for multiple user roles.',
        solution: 'Implemented cloud-based video storage with adaptive streaming, integrated Stripe for secure payments, and designed a flexible MongoDB schema with role-based access control.',
        features: [
            {
                title: 'Multi-tier Authentication',
                content: 'Role-based access control for students, instructors, and administrators with JWT-based authentication'
            },
            {
                title: 'Video Streaming Infrastructure',
                content: 'Adaptive video player with quality selection, progress tracking, and resume functionality'
            },
            {
                title: 'Course Management',
                content: 'Complete CRUD operations for courses, lessons, assignments, and quizzes with rich text editor'
            },
            {
                title: 'Payment Integration',
                content: 'Secure payment processing with Stripe supporting multiple currencies and payment methods'
            },
            {
                title: 'Real-time Attendance',
                content: 'Live attendance tracking with QR code scanning and geolocation verification'
            },
            {
                title: 'Analytics Dashboard',
                content: 'Comprehensive analytics for student progress, course performance, and revenue tracking'
            }
        ],
        outcome: 'Successfully deployed and serving 500+ active users with high satisfaction rates. Handles thousands of video views daily with minimal server costs.',
        order: 8,
        thumbnail: '/projects/lms.png',
        coverImage: '/projects/lms.png',
        gallery: []
    },
    {
        _type: 'project',
        _id: 'singapore-maritime',
        title: 'Singapore Maritime Automation',
        slug: {
            _type: 'slug',
            current: 'singapore-maritime-automation'
        },
        shortDescription: 'Mission-critical control dashboard for port machinery automation, increasing monitoring efficiency by 30% with real-time data visualization.',
        fullDescription: `A national-scale automation solution for Singapore's maritime sector, providing real-time control and monitoring of port machinery operations. This mission-critical system handles the automation of complex port equipment with stringent reliability requirements.

The dashboard provides operators with comprehensive visibility into machinery status, performance metrics, and operational alerts. Built to handle the high-stakes environment of port operations where downtime directly impacts national logistics infrastructure.

The system integrates with various industrial IoT sensors and controllers, processing real-time data streams to provide actionable insights and automated control capabilities.`,
        category: 'Full Stack',
        technologies: [
            'React',
            'TypeScript',
            'Node.js',
            'WebSocket',
            'Real-time Data Processing',
            'Industrial IoT',
            'Docker',
            'Monitoring Systems'
        ],
        featured: false,
        role: 'Fullstack Developer',
        duration: '8 months',
        challenge: 'Building a highly reliable real-time monitoring system for critical infrastructure with zero tolerance for downtime and complex data visualization requirements.',
        solution: 'Implemented redundant WebSocket connections with automatic failover, designed an efficient data aggregation pipeline, and created intuitive visualizations for complex machinery states.',
        features: [
            {
                title: 'Real-time Machinery Monitoring',
                content: 'Live status tracking of port equipment with sub-second update latency'
            },
            {
                title: 'Performance Analytics',
                content: 'Comprehensive metrics tracking leading to 30% improvement in monitoring efficiency'
            },
            {
                title: 'Automated Alert System',
                content: 'Intelligent alerting for anomalies, maintenance needs, and critical status changes'
            },
            {
                title: 'Control Interface',
                content: 'Secure operator interface for remote machinery control with audit logging'
            },
            {
                title: 'Data Visualization',
                content: 'Interactive dashboards with historical data, trends, and predictive analytics'
            }
        ],
        outcome: 'Deployed to production controlling critical port infrastructure. Achieved 30% increase in monitoring efficiency and significantly reduced response time to operational issues.',
        order: 9,
        thumbnail: '/projects/gearindigo.png',
        coverImage: '/projects/gearindigo.png',
        gallery: []
    },
    {
        _type: 'project',
        _id: 'b2b2c-travel-api',
        title: 'B2B2C Travel API Hub',
        slug: {
            _type: 'slug',
            current: 'b2b2c-travel-api-hub'
        },
        shortDescription: 'High-concurrency API integration hub for international OTAs with complex data mapping for cross-border market expansion.',
        fullDescription: `Enterprise-scale API integration platform designed to bridge legacy travel systems with modern SaaS ecosystems and international OTA (Online Travel Agency) providers. The system handles high-concurrency traffic while maintaining data integrity across diverse provider formats.

    As a core fullstack developer, I architected high-integrity API mapping solutions for legacy-to-SaaS migrations within heavy enterprise ecosystems. This involved refactoring complex database schemas and processing algorithms to handle the demands of international travel booking platforms.

The platform serves as a critical middleware layer, enabling seamless data flow between disparate systems while handling rate limiting, caching, and data transformation at scale.`,
        category: 'Backend',
        technologies: [
            'Node.js',
            'TypeScript',
            'Express',
            'PostgreSQL',
            'Redis',
            'API Gateway',
            'Microservices',
            'Docker',
            'Load Balancing'
        ],
        featured: false,
        role: 'Fullstack Developer',
        duration: 'Jun 2025 - Present',
        team: 'Enterprise development team',
        challenge: 'Mapping complex legacy travel APIs to modern standards while maintaining 99.9% uptime and handling thousands of concurrent requests with sub-100ms latency.',
        solution: 'Built a microservices architecture with intelligent caching, implemented database query optimization, and created a flexible mapping engine that reduced API latency by 40%.',
        features: [
            {
                title: 'Legacy API Mapping',
                content: 'Intelligent transformation layer converting legacy formats to modern RESTful APIs'
            },
            {
                title: 'High-Concurrency Handling',
                content: 'Optimized connection pooling and request queuing supporting thousands of simultaneous requests'
            },
            {
                title: 'Performance Optimization',
                content: 'Achieved 40% reduction in API latency through caching strategies and query optimization'
            },
            {
                title: 'Data Integrity',
                content: 'Comprehensive validation and error handling ensuring data consistency across provider systems'
            },
            {
                title: 'Monitoring & Analytics',
                content: 'Real-time performance monitoring with detailed analytics on API usage and bottlenecks'
            }
        ],
        outcome: 'Successfully deployed handling millions of API requests monthly with 40% improvement in response times. Enabled cross-border market expansion for multiple OTA clients.',
        order: 10,
        thumbnail: '/projects/travel-api-placeholder.png',
        coverImage: '/projects/travel-api-placeholder.png',
        gallery: []
    },
];

// Helper to remove undefined fields for Next.js serialization
function removeUndefinedFields<T extends Record<string, any>>(obj: T): T {
    return Object.fromEntries(
        Object.entries(obj).filter(([_, value]) => value !== undefined)
    ) as T;
}

// Transform raw data to ProjectDetail format
export function getAllProjects(): ProjectDetail[] {
    return cvProjects.map(project => removeUndefinedFields({
        id: project._id,
        slug: project.slug.current,
        title: project.title,
        shortDescription: project.shortDescription,
        fullDescription: project.fullDescription,
        technologies: project.technologies,
        category: project.category,
        featured: project.featured,
        role: project.role,
        duration: project.duration,
        team: project.team,
        liveUrl: project.liveUrl,
        githubUrl: project.githubUrl,
        thumbnail: project.thumbnail || '',
        coverImage: project.coverImage || project.thumbnail || '',
        challenge: project.challenge,
        solution: project.solution,
        features: project.features || [],
        gallery: project.gallery?.map(section => ({
            sectionKey: section.sectionKey,
            title: section.title,
            description: section.description,
            images: section.images.map(img => ({
                image: img.image,
                alt: img.alt,
                caption: ''
            }))
        })) || [],
        outcome: project.outcome,
        order: project.order
    }));
}

export function getProjectBySlug(slug: string): ProjectDetail | null {
    const project = cvProjects.find(p => p.slug.current === slug);
    if (!project) return null;

    return removeUndefinedFields({
        id: project._id,
        slug: project.slug.current,
        title: project.title,
        shortDescription: project.shortDescription,
        fullDescription: project.fullDescription,
        technologies: project.technologies,
        category: project.category,
        featured: project.featured,
        role: project.role,
        duration: project.duration,
        team: project.team,
        liveUrl: project.liveUrl,
        githubUrl: project.githubUrl,
        thumbnail: project.thumbnail || '',
        coverImage: project.coverImage || project.thumbnail || '',
        challenge: project.challenge,
        solution: project.solution,
        features: project.features || [],
        gallery: project.gallery?.map(section => ({
            sectionKey: section.sectionKey,
            title: section.title,
            description: section.description,
            images: section.images.map(img => ({
                image: img.image,
                alt: img.alt,
                caption: ''
            }))
        })) || [],
        outcome: project.outcome,
        order: project.order
    });
}

export function getAllProjectSlugs(): string[] {
    return cvProjects.map(p => p.slug.current);
}

export function getAllCategories(): string[] {
    const categories = new Set(cvProjects.map(p => p.category));
    return Array.from(categories);
}
