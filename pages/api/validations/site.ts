import { object, string, number, boolean, mixed } from 'yup'

export const siteValidation = object({
  logo: mixed()
    .required('A file is required')
    .test('fileFormat', 'PDF only', (value: File) => {
      console.log(value)
      return value && ['application/pdf'].includes(value.type)
    }),
  name: string().required(),
  owner: string().required(),
  contractMintFunction: string().nullable(),
  maxMintNumber: number().positive().float(),
  contract: mixed()
    .required('A file is required')
    .test('fileFormat', 'PDF only', (value: File) => {
      console.log(value)
      return value && ['application/pdf'].includes(value.type)
    }),
  contractParameter: boolean(),
  instagram: string().url().nullable(),
  twitter: string().url().nullable(),
  opensea: string().url().nullable(),
  discord: string().url().nullable()
})
