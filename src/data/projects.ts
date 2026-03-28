export interface ProjectImage {
    url: string;
    alt: string;
    caption?: string;
}

export interface ProjectSection {
    title: string;
    description: string;
    images: ProjectImage[];
}

export interface ProjectGallery {
    [sectionKey: string]: ProjectSection;
}

export interface ProjectDetail {
    id: number;
    slug: string;
    title: string;
    shortDescription: string;
    fullDescription: string;
    technologies: string[];
    category: string;
    featured: boolean;

    // Project details
    role: string;
    duration: string;
    team?: string;
    liveUrl?: string;
    githubUrl?: string;

    // Hero image for listing page
    thumbnail: string;

    // Cover image for detail page
    coverImage: string;

    // Challenges & Solutions
    challenge?: string;
    solution?: string;

    // Key features
    features: string[];

    // Photo gallery organized by sitemap/sections
    gallery: ProjectGallery;

    // Outcome/Results
    outcome?: string;
}

export const projectsData: ProjectDetail[] = [
    {
        id: 1,
        slug: 'gear-indigo',
        title: 'Gear Indigo',
        shortDescription: 'An AI-based business starter that helps SMEs generate product ideas and code. Features include SVG editor, chat functionality, streaming data processing, and product deployment.',
        fullDescription: `Gear Indigo is an innovative AI-powered platform designed to help small and medium enterprises (SMEs) transform their business ideas into reality. The platform combines advanced AI capabilities with intuitive design tools to enable non-technical users to create, customize, and deploy web applications.
        
The system leverages modern AI models to understand user requirements through natural conversation, generates production-ready code, and provides a complete development environment with visual editors and deployment pipelines.`,

        technologies: ['React', 'Next.js', 'TypeScript', 'Node.js', 'OpenAI API', 'Tailwind CSS', 'Python', 'Docker'],
        category: 'AI/Machine Learning',
        featured: true,

        role: 'Full-stack Engineer & Core Team Member',
        duration: 'Mar 2024 - Jan 2025',
        team: 'Startup team of 2 developers',
        liveUrl: 'https://gearindigo.app/',

        thumbnail: '/projects/gearindigo.png',
        coverImage: '/projects/gearindigo.png',

        challenge: 'Creating an accessible platform that bridges the gap between business ideas and technical implementation, while handling complex real-time AI interactions and code generation.',

        solution: 'Built a modular architecture with streaming data handlers, implemented a custom SVG editor for visual customization, and developed a robust chat system that processes AI responses in real-time. Added directory builder for reverse engineering existing products.',

        features: [
            'AI-powered chat interface for requirement gathering',
            'Real-time streaming data processing',
            'Custom SVG editor with drag-and-drop functionality',
            'Automated code generation based on user inputs',
            'Directory structure builder for reverse engineering',
            'One-click deployment pipeline',
            'Template marketplace for quick starts',
            'Collaborative workspace features'
        ],

        gallery: {
            'landing': {
                title: 'Landing & Marketing',
                description: 'First impression and product showcase',
                images: [
                    {
                        url: '/projects/gearindigo/landing-hero.png',
                        alt: 'Gear Indigo landing page hero section',
                        caption: 'Hero section with value proposition'
                    },
                    {
                        url: '/projects/gearindigo/landing-features.png',
                        alt: 'Features overview',
                        caption: 'Key features showcase'
                    }
                ]
            },
            'dashboard': {
                title: 'Dashboard',
                description: 'Project management and overview',
                images: [
                    {
                        url: '/projects/gearindigo/dashboard-main.png',
                        alt: 'Main dashboard view',
                        caption: 'User dashboard with project list'
                    },
                    {
                        url: '/projects/gearindigo/dashboard-analytics.png',
                        alt: 'Analytics view',
                        caption: 'Project analytics and insights'
                    }
                ]
            },
            'chat': {
                title: 'AI Chat Interface',
                description: 'Conversational requirement gathering and code generation',
                images: [
                    {
                        url: '/projects/gearindigo/chat-interface.png',
                        alt: 'AI chat interface',
                        caption: 'Real-time AI conversation'
                    },
                    {
                        url: '/projects/gearindigo/chat-streaming.png',
                        alt: 'Streaming responses',
                        caption: 'Live streaming data processing'
                    }
                ]
            },
            'editor': {
                title: 'SVG Editor',
                description: 'Visual customization tool for designs',
                images: [
                    {
                        url: '/projects/gearindigo/editor-main.png',
                        alt: 'SVG editor interface',
                        caption: 'Visual editor with layers panel'
                    },
                    {
                        url: '/projects/gearindigo/editor-tools.png',
                        alt: 'Editor toolbox',
                        caption: 'Comprehensive editing tools'
                    }
                ]
            },
            'deployment': {
                title: 'Deployment',
                description: 'One-click deployment and hosting',
                images: [
                    {
                        url: '/projects/gearindigo/deployment-config.png',
                        alt: 'Deployment configuration',
                        caption: 'Deployment settings and environment variables'
                    },
                    {
                        url: '/projects/gearindigo/deployment-success.png',
                        alt: 'Successful deployment',
                        caption: 'Live project with URL'
                    }
                ]
            }
        },

        outcome: 'Successfully launched and onboarded 100+ early users. The platform reduced the time from idea to deployed product from weeks to hours, enabling SMEs to validate their business concepts quickly.'
    },
    {
        id: 2,
        slug: 'spine-finance',
        title: 'Spine Finance',
        shortDescription: 'A decentralized marketplace for lending and borrowing tokens with blockchain integration, real-time data handling, and web3 transaction processing.',
        fullDescription: `Spine Finance is a DeFi platform built on Ethereum that enables users to lend and borrow crypto assets in a trustless manner. The platform uses smart contracts to automate lending processes, calculate interest rates dynamically, and ensure secure transactions.
        
As one of the first two developers, I built the entire UI from scratch and integrated complex blockchain functionalities including wallet connections, contract interactions, and real-time data synchronization.`,

        technologies: ['React', 'Web3.js', 'Ethereum', 'Solidity', 'TypeScript', 'Tailwind CSS', 'Ethers.js'],
        category: 'Blockchain',
        featured: true,

        role: 'Core Frontend Engineer',
        duration: 'Dec 2023 - Jul 2024',
        team: 'Startup team (2 initial developers)',
        liveUrl: 'https://app.spine.finance/',

        thumbnail: '/projects/spine.png',
        coverImage: '/projects/spine.png',

        challenge: 'Building a responsive and intuitive interface for complex DeFi operations while handling real-time blockchain data, managing wallet connections, and ensuring transaction security.',

        solution: 'Developed a modular component architecture with React hooks for Web3 interactions, implemented optimistic UI updates for better UX, and created custom hooks for contract calls and event listening.',

        features: [
            'Multi-wallet support (MetaMask, WalletConnect)',
            'Real-time APY calculations',
            'Supply and borrow dashboards',
            'Transaction history with on-chain verification',
            'Collateral management system',
            'Liquidation protection alerts',
            'Gas optimization for transactions',
            'Market analytics and charts'
        ],

        gallery: {
            'landing': {
                title: 'Landing Page',
                description: 'DeFi platform introduction',
                images: [
                    {
                        url: '/projects/spine/landing.png',
                        alt: 'Spine Finance landing page'
                    }
                ]
            },
            'markets': {
                title: 'Markets',
                description: 'Available lending and borrowing markets',
                images: [
                    {
                        url: '/projects/spine/markets-overview.png',
                        alt: 'Markets overview'
                    }
                ]
            },
            'dashboard': {
                title: 'User Dashboard',
                description: 'Portfolio management and positions',
                images: [
                    {
                        url: '/projects/spine/dashboard.png',
                        alt: 'User dashboard'
                    }
                ]
            }
        },

        outcome: 'Platform reached $5M+ in total value locked (TVL) within first 3 months. Successfully processed thousands of lending and borrowing transactions with zero security incidents.'
    },
    {
        id: 3,
        slug: 'elms-learning-system',
        title: 'ELMS Learning System',
        shortDescription: 'A comprehensive learning management system with features for authentication, attendance tracking, meeting scheduling, class enrollment, and exam management.',
        fullDescription: `ELMS is a full-featured Learning Management System designed for educational institutions to manage courses, students, and instructors. The platform provides comprehensive tools for online learning, attendance tracking, assignment submission, and performance analytics.
        
Built with a modern tech stack, ELMS handles everything from user authentication to complex scheduling algorithms and grade calculations.`,

        technologies: ['React', 'Next.js', 'MongoDB', 'Node.js', 'Express', 'Tailwind CSS', 'JWT'],
        category: 'Full Stack',
        featured: true,

        role: 'Full-stack Developer',
        duration: '6 months',
        liveUrl: 'https://elms-xi.vercel.app/',

        thumbnail: '/projects/lms.png',
        coverImage: '/projects/lms.png',

        challenge: 'Creating a scalable system that handles multiple user roles (students, teachers, admins) with complex permissions, real-time attendance tracking, and secure exam management.',

        solution: 'Implemented role-based access control (RBAC), designed a flexible MongoDB schema for nested course structures, and built real-time features using webhooks and polling mechanisms.',

        features: [
            'Multi-role authentication system',
            'Course and class management',
            'Real-time attendance tracking',
            'Virtual meeting integration',
            'Assignment submission and grading',
            'Exam management with timer',
            'Grade book and analytics',
            'Email notifications',
            'Student progress tracking'
        ],

        gallery: {
            'authentication': {
                title: 'Authentication',
                description: 'Login and user management',
                images: [
                    {
                        url: '/projects/elms/login.png',
                        alt: 'Login page'
                    }
                ]
            },
            'dashboard': {
                title: 'Dashboard',
                description: 'Role-specific dashboards',
                images: [
                    {
                        url: '/projects/elms/student-dashboard.png',
                        alt: 'Student dashboard'
                    },
                    {
                        url: '/projects/elms/teacher-dashboard.png',
                        alt: 'Teacher dashboard'
                    }
                ]
            },
            'courses': {
                title: 'Course Management',
                description: 'Course creation and enrollment',
                images: [
                    {
                        url: '/projects/elms/course-list.png',
                        alt: 'Course list'
                    }
                ]
            }
        },

        outcome: 'Deployed successfully for pilot testing with 500+ users. Reduced administrative workload by 60% through automation of attendance and grading processes.'
    }
];

// Helper functions
export const getProjectBySlug = (slug: string): ProjectDetail | undefined => {
    return projectsData.find(project => project.slug === slug);
};

export const getAllProjectSlugs = (): string[] => {
    return projectsData.map(project => project.slug);
};

export const getFeaturedProjects = (): ProjectDetail[] => {
    return projectsData.filter(project => project.featured);
};

export const getProjectsByCategory = (category: string): ProjectDetail[] => {
    if (category === 'All') return projectsData;
    return projectsData.filter(project => project.category === category);
};
