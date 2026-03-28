import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'projectGallery',
  title: 'Gallery Section',
  type: 'object',
  fields: [
    defineField({
      name: 'sectionKey',
      title: 'Section Key',
      type: 'string',
      description: 'Unique identifier (e.g., landing, dashboard, chat)',
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'title',
      title: 'Section Title',
      type: 'string',
      description: 'Display name (e.g., Landing Page, Dashboard)',
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'string',
      description: 'Brief description of this section',
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'images',
      title: 'Images',
      type: 'array',
      of: [{ type: 'projectImage' }],
      validation: Rule => Rule.min(1),
    }),
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'sectionKey',
    },
  },
})
