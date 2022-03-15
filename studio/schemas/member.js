export default {
  name: 'member',
  title: 'Member',
  type: 'object',
  fields: [
    {
      name: 'pseudo',
      title: 'Pseudo',
      type: 'string',
      validation: Rule => Rule.required(),
    },
    {
      name: 'realName',
      title: 'Real Name',
      type: 'string',
    },
    {
      name: 'description',
      title: 'Description',
      type: 'text',
      validation: Rule => Rule.required(),
    },
    {
      name: 'linkedin',
      title: 'LinkedIn',
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
  ],
}
