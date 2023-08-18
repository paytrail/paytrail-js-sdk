import { ValidationError, validate } from 'class-validator'

export const validateError = async (target: object) => {
  try {
    const errors = await validate(target)
    if (errors.length > 0) {
      const errorMessages = errors.flatMap((error: ValidationError) => {
        return Object.values(error.constraints || [])
      })

      return [JSON.stringify(errorMessages), undefined]
    } else {
      return [undefined, true]
    }
  } catch (error) {
    return [(error as Error).message, undefined]
  }
}
