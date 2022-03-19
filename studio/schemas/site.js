export default {
  name: 'site',
  title: 'Site',
  type: 'document',
  fields: [
    {
      name: 'logo',
      title: 'Logo',
      type: 'image',
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'name',
        slugify: input => input.toLowerCase().replace(/\s+/g, '-').slice(0, 200)
      }
    },
    {
      name: 'name',
      title: 'Name',
      type: 'string',
    },
    {
		  name: 'owner',
      type: 'reference',
			title: 'Owner',
      to: [{type: 'user' }]
    },
    {
		  name: 'contractAddress',
			title: 'Contract Address',
      type: 'string',
    },
    {
		  name: 'contractMintFunction',
			title: 'Contract Mint Function',
      type: 'string',
    },
    {
		  name: 'contractParameter',
			title: 'Contract Parameter',
      type: 'boolean',
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
    },
    {
      name: 'opensea',
      title: 'OpenSea',
      type: 'string',
    },
    {
      name: 'twitter',
      title: 'Twitter',
      type: 'string',
    },
    {
      name: 'instagram',
      title: 'Instagram',
      type: 'string',
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
