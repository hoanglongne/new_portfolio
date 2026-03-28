/**
 * Script to import CV projects into Sanity CMS
 * 
 * Usage:
 * 1. Make sure your .env.local has NEXT_PUBLIC_SANITY_PROJECT_ID and NEXT_PUBLIC_SANITY_DATASET
 * 2. Run: node scripts/import-cv-projects.js
 * 
 * This will create/update all projects from your CV in Sanity
 */

const sanityClient = require('@sanity/client');
const fs = require('fs');
const path = require('path');

// Simple .env.local parser (no dependency on dotenv package)
function loadEnvFile() {
    const envPath = path.join(__dirname, '..', '.env.local');

    if (!fs.existsSync(envPath)) {
        console.error('❌ Error: .env.local file not found');
        console.log('Please create .env.local with your Sanity credentials');
        process.exit(1);
    }

    const envContent = fs.readFileSync(envPath, 'utf-8');
    const lines = envContent.split('\n');

    const env = {};
    lines.forEach(line => {
        const trimmed = line.trim();
        if (trimmed && !trimmed.startsWith('#')) {
            const [key, ...valueParts] = trimmed.split('=');
            const value = valueParts.join('=').trim();
            env[key.trim()] = value;
        }
    });

    return env;
}

// Load environment variables
const env = loadEnvFile();

// Initialize Sanity client with write token
const client = sanityClient.createClient({
    projectId: env.NEXT_PUBLIC_SANITY_PROJECT_ID,
    dataset: env.NEXT_PUBLIC_SANITY_DATASET || 'production',
    apiVersion: '2024-01-01',
    useCdn: false,
    // You'll need to create a token at https://sanity.io/manage
    // Settings -> API -> Tokens -> Add API token (Editor permission)
    token: env.SANITY_API_TOKEN,
});

// ─── Image Upload Helpers ───────────────────────────────────────────────────
const PROJECTS_DIR = path.join(__dirname, '..', 'public', 'projects');

async function uploadImage(relativePath) {
    const fullPath = path.join(PROJECTS_DIR, relativePath);
    if (!fs.existsSync(fullPath)) {
        console.log(`   ⚠️  Image not found: ${relativePath}, skipping...`);
        return null;
    }
    const imageBuffer = fs.readFileSync(fullPath);
    const filename = path.basename(relativePath);
    console.log(`   📸 Uploading: ${relativePath}...`);
    const asset = await client.assets.upload('image', imageBuffer, { filename });
    return {
        _type: 'image',
        asset: {
            _type: 'reference',
            _ref: asset._id,
        },
    };
}

function generateKey() {
    return Math.random().toString(36).substring(2, 10);
}

// ─── Image Configuration Per Project ────────────────────────────────────────
const imageConfig = {
    'spine-finance': {
        thumbnail: 'spine/thumbnail.png',
        coverImage: 'spine/thumbnail.png',
        gallery: [
            {
                sectionKey: 'overview',
                title: 'Platform Overview',
                description: 'Main interface of the Spine Finance DeFi dashboard',
                images: [
                    { file: 'spine/screencapture-testnet-spine-finance-Rise-borrow-2026-03-28-20_12_15.png', alt: 'Borrow page - fixed-rate borrowing interface' },
                    { file: 'spine/screencapture-testnet-spine-finance-Rise-lend-0x87924ca0a8918d66e618e4898d6101443068d2da-2026-03-28-20_12_45.png', alt: 'Lending page - deposit assets to earn yield' },
                    { file: 'spine/screencapture-testnet-spine-finance-Rise-portfolio-2026-03-28-20_13_33.png', alt: 'Portfolio dashboard - aggregated positions overview' },
                ]
            },
            {
                sectionKey: 'vaults',
                title: 'Vault Management',
                description: 'ERC-4626 vault configuration and monitoring',
                images: [
                    { file: 'spine/screencapture-testnet-spine-finance-Rise-vaults-2026-03-28-20_13_46.png', alt: 'Vault list - all available vaults' },
                    { file: 'spine/screencapture-testnet-spine-finance-Rise-vaults-0x6cc0ee45ec0685a717fab1c67a64ee1ce28032fa-overview-2026-03-28-20_14_32.png', alt: 'Vault overview - detailed vault metrics' },
                    { file: 'spine/screencapture-testnet-spine-finance-Rise-vaults-0x6cc0ee45ec0685a717fab1c67a64ee1ce28032fa-creditbooks-2026-03-28-20_15_29.png', alt: 'Vault credit books - lending market configuration' },
                    { file: 'spine/screencapture-testnet-spine-finance-Rise-vaults-0x6cc0ee45ec0685a717fab1c67a64ee1ce28032fa-routings-2026-03-28-20_17_08.png', alt: 'Vault routings - idle liquidity routing to Morpho/Aave' },
                    { file: 'spine/screencapture-testnet-spine-finance-Rise-liquidation-2026-03-28-20_18_01.png', alt: 'Liquidation page - manage liquidation events' },
                ]
            },
        ]
    },
    'elms-learning': {
        thumbnail: 'lms.png',
        coverImage: 'lms.png',
        gallery: []
    },
    'singapore-maritime': {
        thumbnail: 'gearindigo.png',
        coverImage: 'gearindigo.png',
        gallery: []
    },
    'b2b2c-travel-api': {
        thumbnail: 'travel-api-placeholder.png',
        coverImage: 'travel-api-placeholder.png',
        gallery: []
    },
    'gear-indigo': {
        thumbnail: 'gearindigo.png',
        coverImage: 'gearindigo.png',
        gallery: []
    },
    'oratio': {
        thumbnail: 'oratio/thumbnail.png',
        coverImage: 'oratio/thumbnail.png',
        gallery: [
            {
                sectionKey: 'app-interface',
                title: 'Application Interface',
                description: 'ORATIO IELTS Speaking practice platform screens',
                images: [
                    { file: 'oratio/screencapture-localhost-3001-2026-03-28-20_23_44.png', alt: 'ORATIO main page' },
                    { file: 'oratio/screencapture-localhost-3001-2026-03-28-20_27_03.png', alt: 'ORATIO practice session interface' },
                ]
            },
        ]
    },
    'era-tourist': {
        thumbnail: 'era/thumbnail.png',
        coverImage: 'era/thumbnail.png',
        gallery: [
            {
                sectionKey: 'homepage',
                title: 'Homepage & Categories',
                description: 'ERA Tourist multi-region travel platform',
                images: [
                    { file: 'era/screencapture-localhost-3000-2026-03-28-20_32_40.png', alt: 'ERA Tourist homepage' },
                    { file: 'era/screencapture-localhost-3000-category-halal-tours-2026-03-28-20_38_13.png', alt: 'Halal Tours category page' },
                ]
            },
            {
                sectionKey: 'tour-planning',
                title: 'Tour Planning',
                description: 'AI-powered tour planning engine',
                images: [
                    { file: 'era/screencapture-localhost-3000-tour-planning-2026-03-28-20_40_12.png', alt: 'Tour planning interface' },
                    { file: 'era/screencapture-localhost-3000-tour-planning-results-2026-03-28-20_43_46.png', alt: 'Tour planning results' },
                    { file: 'era/screencapture-localhost-3000-tour-planning-results-2026-03-28-20_44_48.png', alt: 'Tour planning results detail' },
                ]
            },
        ]
    },
};

// CV Projects data based on Official_CV.pdf and current work
const cvProjects = [
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
        liveUrl: 'https://app.spine.finance/',
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
        order: 1
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
        featured: true,
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
        order: 2
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
        featured: true,
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
        order: 3
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

As a core fullstack developer at Specific Group, I architected high-integrity API mapping solutions for legacy-to-SaaS migrations within heavy enterprise ecosystems. This involved refactoring complex database schemas and processing algorithms to handle the demands of international travel booking platforms.

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
        featured: true,
        role: 'Fullstack Developer',
        duration: 'Nov 2023 - Oct 2024',
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
        order: 5
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
        order: 6
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
        featured: true,
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
        order: 3
    }
];

async function importProjects() {
    console.log('🚀 Starting CV projects import to Sanity...\n');

    if (!env.SANITY_API_TOKEN) {
        console.error('❌ Error: SANITY_API_TOKEN not found in .env.local');
        console.log('\n📝 To create a token:');
        console.log('1. Go to https://sanity.io/manage');
        console.log('2. Select your project');
        console.log('3. Go to Settings -> API -> Tokens');
        console.log('4. Click "Add API token"');
        console.log('5. Give it a name (e.g., "Import Script")');
        console.log('6. Select "Editor" permission');
        console.log('7. Copy the token and add to .env.local as SANITY_API_TOKEN=your_token');
        process.exit(1);
    }

    try {
        // ── Step 1: Upload images ──────────────────────────────────────────────
        console.log('📸 Step 1: Uploading images to Sanity...\n');

        const imageRefs = {};
        for (const [projectId, config] of Object.entries(imageConfig)) {
            console.log(`  📁 ${projectId}`);
            imageRefs[projectId] = {};

            // Thumbnail (required)
            if (config.thumbnail) {
                imageRefs[projectId].thumbnail = await uploadImage(config.thumbnail);
            }

            // Cover image
            if (config.coverImage) {
                imageRefs[projectId].coverImage = await uploadImage(config.coverImage);
            }

            // Gallery sections
            if (config.gallery && config.gallery.length > 0) {
                imageRefs[projectId].gallery = [];
                for (const section of config.gallery) {
                    const uploadedImages = [];
                    for (const img of section.images) {
                        const uploaded = await uploadImage(img.file);
                        if (uploaded) {
                            uploadedImages.push({
                                _type: 'projectImage',
                                _key: generateKey(),
                                image: uploaded,
                                alt: img.alt,
                                caption: img.caption || '',
                            });
                        }
                    }
                    if (uploadedImages.length > 0) {
                        imageRefs[projectId].gallery.push({
                            _type: 'projectGallery',
                            _key: generateKey(),
                            sectionKey: section.sectionKey,
                            title: section.title,
                            description: section.description,
                            images: uploadedImages,
                        });
                    }
                }
            }
            console.log('');
        }

        // ── Step 2: Import projects with image refs ───────────────────────────
        console.log('📦 Step 2: Importing projects...\n');

        for (const project of cvProjects) {
            console.log(`📦 Importing: ${project.title}...`);

            const refs = imageRefs[project._id] || {};
            const projectWithImages = {
                ...project,
                ...(refs.thumbnail && { thumbnail: refs.thumbnail }),
                ...(refs.coverImage && { coverImage: refs.coverImage }),
                ...(refs.gallery && refs.gallery.length > 0 && { gallery: refs.gallery }),
            };

            const result = await client.createOrReplace(projectWithImages);

            console.log(`✅ Successfully imported: ${project.title}`);
            console.log(`   ID: ${result._id}`);
            console.log(`   Slug: ${project.slug.current}\n`);
        }

        console.log('🎉 All CV projects imported successfully!');
        console.log('\n📍 Next steps:');
        console.log('1. Visit http://localhost:3000/studio to view projects');
        console.log('2. Visit http://localhost:3000/work to see your projects live!');

    } catch (error) {
        console.error('❌ Error importing projects:', error.message);
        if (error.response) {
            console.error('Response:', error.response);
        }
        process.exit(1);
    }
}

// Run the import
importProjects();
