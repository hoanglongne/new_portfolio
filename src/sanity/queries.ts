import { client } from './client'
import { urlFor } from './image'
import { SanityProject, ProjectDetail } from './types'

// Transform Sanity project to frontend format
function transformProject(sanityProject: SanityProject): ProjectDetail {
  // Transform gallery
  const gallery: ProjectDetail['gallery'] = {}

  if (sanityProject.gallery) {
    sanityProject.gallery.forEach(section => {
      gallery[section.sectionKey] = {
        title: section.title,
        description: section.description,
        images: section.images.map(img => ({
          url: urlFor(img.image).width(1920).quality(90).url(),
          alt: img.alt,
          caption: img.caption,
        })),
      }
    })
  }

  return {
    id: sanityProject._id,
    slug: sanityProject.slug.current,
    title: sanityProject.title,
    shortDescription: sanityProject.shortDescription,
    fullDescription: sanityProject.fullDescription,
    technologies: sanityProject.technologies,
    category: sanityProject.category,
    featured: sanityProject.featured,
    role: sanityProject.role,
    duration: sanityProject.duration,
    team: sanityProject.team,
    liveUrl: sanityProject.liveUrl,
    githubUrl: sanityProject.githubUrl,
    thumbnail: urlFor(sanityProject.thumbnail).width(800).height(600).quality(90).url(),
    coverImage: sanityProject.coverImage
      ? urlFor(sanityProject.coverImage).width(1920).height(1080).quality(90).url()
      : urlFor(sanityProject.thumbnail).width(1920).height(1080).quality(90).url(),
    challenge: sanityProject.challenge,
    solution: sanityProject.solution,
    solutionCode: sanityProject.solutionCode,
    features: sanityProject.features || [],
    gallery,
    outcome: sanityProject.outcome,
  }
}

// Get all projects
export async function getAllProjects(): Promise<ProjectDetail[]> {
  const query = `*[_type == "project"] | order(order asc) {
    _id,
    _createdAt,
    title,
    slug,
    shortDescription,
    fullDescription,
    thumbnail,
    coverImage,
    category,
    technologies,
    featured,
    role,
    duration,
    team,
    liveUrl,
    githubUrl,
    challenge,
    solution,
    solutionCode,
    features,
    gallery,
    outcome,
    order
  }`

  const projects = await client.fetch<SanityProject[]>(query)
  return projects.map(transformProject)
}

// Get project by slug
export async function getProjectBySlug(slug: string): Promise<ProjectDetail | null> {
  const query = `*[_type == "project" && slug.current == $slug][0] {
    _id,
    _createdAt,
    title,
    slug,
    shortDescription,
    fullDescription,
    thumbnail,
    coverImage,
    category,
    technologies,
    featured,
    role,
    duration,
    team,
    liveUrl,
    githubUrl,
    challenge,
    solution,
    solutionCode,
    features,
    gallery,
    outcome,
    order
  }`

  const project = await client.fetch<SanityProject | null>(query, { slug })
  return project ? transformProject(project) : null
}

// Get all project slugs (for static generation)
export async function getAllProjectSlugs(): Promise<string[]> {
  const query = `*[_type == "project"].slug.current`
  return client.fetch<string[]>(query)
}

// Get featured projects
export async function getFeaturedProjects(): Promise<ProjectDetail[]> {
  const query = `*[_type == "project" && featured == true] | order(order asc) {
    _id,
    _createdAt,
    title,
    slug,
    shortDescription,
    fullDescription,
    thumbnail,
    coverImage,
    category,
    technologies,
    featured,
    role,
    duration,
    team,
    liveUrl,
    githubUrl,
    challenge,
    solution,
    solutionCode,
    features,
    gallery,
    outcome,
    order
  }`

  const projects = await client.fetch<SanityProject[]>(query)
  return projects.map(transformProject)
}

// Get projects by category
export async function getProjectsByCategory(category: string): Promise<ProjectDetail[]> {
  if (category === 'All') {
    return getAllProjects()
  }

  const query = `*[_type == "project" && category == $category] | order(order asc) {
    _id,
    _createdAt,
    title,
    slug,
    shortDescription,
    fullDescription,
    thumbnail,
    coverImage,
    category,
    technologies,
    featured,
    role,
    duration,
    team,
    liveUrl,
    githubUrl,
    challenge,
    solution,
    solutionCode,
    features,
    gallery,
    outcome,
    order
  }`

  const projects = await client.fetch<SanityProject[]>(query, { category })
  return projects.map(transformProject)
}

// Get all categories
export async function getAllCategories(): Promise<string[]> {
  const query = `array::unique(*[_type == "project"].category)`
  return client.fetch<string[]>(query)
}
