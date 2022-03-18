export default {
  name: 'site',
  title: 'Site',
  type: 'document',
  fields: [
    {
      name: 'logo',
      title: 'Logo',
      type: 'image',
      validation: Rule => Rule.required(),
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      validation: Rule => Rule.required(),
      options: {
        source: 'name',
        slugify: input => input.toLowerCase().replace(/\s+/g, '-').slice(0, 200)
      }
    },
    {
      name: 'name',
      title: 'Name',
      validation: Rule => Rule.required(),
      type: 'string',
    },
    {
		  name: 'owner',
      type: 'reference',
			title: 'Owner',
      validation: Rule => Rule.required(),
      to: [{type: 'user' }]
    },
    {
		  name: 'contractMintFunction',
			title: 'Contract Mint Function',
      type: 'string',
      validation: Rule => Rule.required(),
    },
    {
		  name: 'maxMintNumber',
			title: 'Max Mint Number',
      type: 'number',
    },
    {
      name: 'discord',
      title: 'Discord',
      type: 'string',
      validation: Rule =>
        Rule.required().uri({
          allowRelative: false, // Allow relative links
          relativeOnly: false, // Force only relative links
          scheme: ["https", "http", "mailto"], // Default is ["https", "http"]
        }),
      
    },
    {
      name: 'opensea',
      title: 'OpenSea',
      type: 'string',
      validation: Rule =>
        Rule.required().uri({
          allowRelative: false, // Allow relative links
          relativeOnly: false, // Force only relative links
          scheme: ["https", "http", "mailto"], // Default is ["https", "http"]
        }),
    },
    {
      name: 'twitter',
      title: 'Twitter',
      type: 'string',
      validation: Rule =>
        Rule.required().uri({
          allowRelative: false, // Allow relative links
          relativeOnly: false, // Force only relative links
          scheme: ["https", "http", "mailto"], // Default is ["https", "http"]
        }),
    },
    {
      name: 'instagram',
      title: 'Instagram',
      type: 'string',
      validation: Rule =>
        Rule.required().uri({
          allowRelative: false, // Allow relative links
          relativeOnly: false, // Force only relative links
          scheme: ["https", "http", "mailto"], // Default is ["https", "http"]
        }),
    },
    {
      title: 'Members',
      name: 'members',
      type: 'array',
      of: [{
        type: 'reference',
        to: [{type: 'member'}]
      }]
    },
    {
      title: 'Milestones',
      name: 'milestones',
      type: 'array',
      of: [{
        type: 'reference',
        to: [{type: 'milestone'}]
      }]
    },
    {
      title: 'Questions',
      name: 'questions',
      type: 'array',
      of: [{
        type: 'reference',
        to: [{type: 'question'}]
      }]
    }
  ],
}
