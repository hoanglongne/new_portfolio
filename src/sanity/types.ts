// Sanity types
export interface SanityImage {
  _type: 'image'
  asset: {
    _ref: string
    _type: 'reference'
  }
}

export interface ProjectImage {
  image: SanityImage
  alt: string
  caption?: string
}

export interface ProjectGallerySection {
  sectionKey: string
  title: string
  description: string
  images: ProjectImage[]
}

export interface SanityProject {
  _id: string
  _createdAt: string
  title: string
  slug: {
    current: string
  }
  shortDescription: string
  fullDescription: string
  thumbnail: SanityImage
  coverImage?: SanityImage
  category: string
  technologies: string[]
  featured: boolean
  role: string
  duration: string
  team?: string
  liveUrl?: string
  githubUrl?: string
  challenge?: string
  solution?: string
  solutionCode?: string
  features?: {
    title: string
    content?: string
  }[]
  gallery?: ProjectGallerySection[]
  outcome?: string
  order: number
}

// Frontend types (transformed from Sanity)
export interface ProjectDetail {
  id: string
  slug: string
  title: string
  shortDescription: string
  fullDescription: string
  technologies: string[]
  category: string
  featured: boolean

  role: string
  duration: string
  team?: string
  liveUrl?: string
  githubUrl?: string

  thumbnail: string
  coverImage: string

  challenge?: string
  solution?: string
  solutionCode?: string

  features: {
    title: string
    content?: string
  }[]

  gallery: {
    [sectionKey: string]: {
      title: string
      description: string
      images: {
        url: string
        alt: string
        caption?: string
      }[]
    }
  }

  outcome?: string
}
