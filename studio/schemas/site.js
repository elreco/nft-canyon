export default {
  name: 'site',
  title: 'Site',
  type: 'document',
  fieldsets: [
    {name: 'social', title: 'Social Networks'},
    {name: 'contract', title: 'Contract Informations'},
  ],
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
      name: 'about',
      title: 'About',
      type: 'string',
    },
    {
      name: 'mainTitle',
      title: 'Main Title',
      type: 'string',
    },
    {
      name: 'mainSubtitle',
      title: 'Main Subtitle',
      type: 'string',
    },
    {
      name: 'mainColor',
      title: 'Main Color',
      type: 'string',
    },
    {
      name: 'secondaryColor',
      title: 'Secondary Color',
      type: 'string',
    },
    {
		  name: 'owner',
      type: 'reference',
			title: 'Owner',
      to: [{type: 'user' }]
    },
    {
		  name: 'contract',
			title: 'Smart Contract File',
      type: 'file',
      fields: [
        {
          name: 'name',
          type: 'string',
          title: 'Contract Name'
        }
      ]
    },
    // contract / mint infos
    {
		  name: 'contractTotalMintedFunction',
			title: 'Total Minted Function',
      type: 'string',
    },
    {
		  name: 'contractAlreadyMintedFunction',
			title: 'Already Minted Function',
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
      type: 'string',
    },
    {
		  name: 'maxMint',
			title: 'Max Mint Number',
      type: 'string',
    },
    {
		  name: 'maxSupplyNumber',
			title: 'Max Supply Number',
      type: 'number',
    },
    {
		  name: 'mintPrice',
			title: 'Mint Price',
      type: 'number',
    },
    {
      name: 'whitelistMintDate',
      title: 'Whitelist Mint Date',
      type: 'datetime',
    },
    {
      name: 'publicMintDate',
      title: 'Public Mint Date',
      type: 'datetime',
    },
    {
      name: 'status',
      title: 'Mint Status (0 = close, 1 = wl mint, 2 = public mint)',
      type: 'number',
    },
    // social networks
    {
      name: 'twitter',
      title: 'Twitter',
      type: 'string',
      fieldset: 'social'
    },
    {
      name: 'instagram',
      title: 'Instagram',
      type: 'string',
      fieldset: 'social'
    },
    {
      name: 'discord',
      title: 'Discord',
      type: 'string',
      fieldset: 'social'
    },
    {
      name: 'opensea',
      title: 'OpenSea',
      type: 'string',
      fieldset: 'social'
    },
    // objects
    {
      title: 'Collection',
      name: 'collection',
      type: 'array',
      of: [{
        type: 'image',
      }]
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
