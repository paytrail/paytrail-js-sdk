export const convertObjectToClass = (object: object, targetClass: any) => Object.assign(new targetClass(), object)
