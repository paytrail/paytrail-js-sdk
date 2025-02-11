import { ValidationError, validate } from 'class-validator'

function extractValidationErrors(errors: ValidationError[]): ValidationError[] {
  let allErrors: ValidationError[] = []

  errors.forEach((error) => {
    // Recursively extract errors from children if any
    if (error.children && error.children.length > 0) {
      allErrors = allErrors.concat(extractValidationErrors(error.children))
    } else {
      allErrors.push(error)
    }
  })

  return allErrors
}

export const validateError = async (target: object) => {
  const errors = await validate(target)

  if (errors.length > 0) {
    const errorMessages = extractValidationErrors(errors)

    return JSON.stringify(errorMessages)
  } else {
    return null
  }
}
