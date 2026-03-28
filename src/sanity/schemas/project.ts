import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'project',
  title: 'Project',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Project Title',
      type: 'string',
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'shortDescription',
      title: 'Short Description',
      type: 'text',
      rows: 3,
      description: 'Brief description for listing page',
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'fullDescription',
      title: 'Full Description',
      type: 'text',
      rows: 8,
      description: 'Detailed description for project page',
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'thumbnail',
      title: 'Thumbnail Image',
      type: 'image',
      options: {
        hotspot: true,
      },
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'coverImage',
      title: 'Cover Image',
      type: 'image',
      options: {
        hotspot: true,
      },
      description: 'Hero image for detail page',
    }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {
        list: [
          { title: 'AI/Machine Learning', value: 'AI/Machine Learning' },
          { title: 'Blockchain', value: 'Blockchain' },
          { title: 'Full Stack', value: 'Full Stack' },
          { title: 'Frontend', value: 'Frontend' },
          { title: 'Backend', value: 'Backend' },
          { title: 'Mobile', value: 'Mobile' },
          { title: 'DevOps', value: 'DevOps' },
        ],
        layout: 'dropdown',
      },
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'technologies',
      title: 'Technologies',
      type: 'array',
      of: [{ type: 'string' }],
      options: {
        layout: 'tags',
      },
      validation: Rule => Rule.required().min(1),
    }),
    defineField({
      name: 'featured',
      title: 'Featured',
      type: 'boolean',
      initialValue: false,
    }),
    defineField({
      name: 'role',
      title: 'Your Role',
      type: 'string',
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'duration',
      title: 'Duration',
      type: 'string',
      placeholder: 'e.g., Mar 2024 - Jan 2025',
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'team',
      title: 'Team Size',
      type: 'string',
      placeholder: 'e.g., Solo project or Startup team of 3',
    }),
    defineField({
      name: 'liveUrl',
      title: 'Live URL',
      type: 'url',
      description: 'Link to live project',
    }),
    defineField({
      name: 'githubUrl',
      title: 'GitHub URL',
      type: 'url',
      description: 'Link to GitHub repository (optional)',
    }),
    defineField({
      name: 'challenge',
      title: 'Challenge',
      type: 'text',
      rows: 4,
      description: 'What was the main challenge?',
    }),
    defineField({
      name: 'solution',
      title: 'Solution',
      type: 'text',
      rows: 4,
      description: 'How did you solve it?',
    }),
    defineField({
      name: 'solutionCode',
      title: 'Solution Code Snippet',
      type: 'text',
      rows: 10,
      description: 'Optional code example to showcase the solution',
    }),
    defineField({
      name: 'features',
      title: 'Key Features',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'title',
              title: 'Feature Title',
              type: 'string',
              validation: (Rule: any) => Rule.required(),
            },
            {
              name: 'content',
              title: 'Feature Details',
              type: 'text',
              rows: 3,
              description: 'Detailed description (shown in tooltip on hover)',
            },
          ],
          preview: {
            select: {
              title: 'title',
              subtitle: 'content',
            },
          },
        },
      ],
      description: 'List of main features with tooltips',
    }),
    defineField({
      name: 'gallery',
      title: 'Gallery Sections',
      type: 'array',
      of: [{ type: 'projectGallery' }],
      description: 'Organized photo gallery by sections',
    }),
    defineField({
      name: 'outcome',
      title: 'Outcome & Impact',
      type: 'text',
      rows: 4,
      description: 'Results and impact of the project',
    }),
    defineField({
      name: 'order',
      title: 'Display Order',
      type: 'number',
      initialValue: 0,
      description: 'Lower numbers appear first',
    }),
  ],
  orderings: [
    {
      title: 'Display Order',
      name: 'orderAsc',
      by: [{ field: 'order', direction: 'asc' }],
    },
    {
      title: 'Featured First',
      name: 'featuredFirst',
      by: [
        { field: 'featured', direction: 'desc' },
        { field: 'order', direction: 'asc' },
      ],
    },
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'category',
      media: 'thumbnail',
    },
  },
})
