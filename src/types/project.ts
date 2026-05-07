// Project types
export interface ProjectImage {
  image: string;
  alt: string;
  caption?: string;
}

export interface ProjectGallerySection {
  sectionKey: string;
  title: string;
  description: string;
  images: ProjectImage[];
}

export interface ProjectDetail {
  id: string;
  slug: string;
  title: string;
  shortDescription: string;
  fullDescription: string;
  technologies: string[];
  category: string;
  featured: boolean;

  role: string;
  duration: string;
  team?: string;
  liveUrl?: string;
  githubUrl?: string;

  thumbnail: string;
  coverImage: string;

  challenge?: string;
  solution?: string;
  solutionCode?: string;

  features: {
    title: string;
    content?: string;
  }[];

  gallery: ProjectGallerySection[];

  outcome?: string;
  order: number;
}
