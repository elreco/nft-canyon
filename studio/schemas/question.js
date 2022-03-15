export default {
  name: 'question',
  title: 'Question',
  type: 'object',
  fields: [
    {
      name: 'question',
      title: 'Question',
      type: 'string',
      validation: Rule => Rule.required(),
    },
    {
      name: 'answer',
      title: 'Answer',
      type: 'string',
      validation: Rule => Rule.required(),
    },
  ],
}
