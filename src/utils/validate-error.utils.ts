import { ValidationError, validate } from 'class-validator'

export const validateError = async (target: object) => {
  const errors = await validate(target)
  if (errors.length > 0) {
    const errorMessages = errors.flatMap((error: ValidationError) => {
      return Object.values(error.constraints)
    })

    return JSON.stringify(errorMessages)
  } else {
    return null
  }
}
