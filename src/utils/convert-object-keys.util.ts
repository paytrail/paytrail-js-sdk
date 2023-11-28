export const convertObjectKeys = (obj: Record<string, any>): Record<string, any> => {
  const convertedObj: Record<string, any> = {}
  for (const key in obj) {
    if (Object.hasOwnProperty.call(obj, key)) {
      const convertedKey = key.replace(/([A-Z])/g, '-$1').toLowerCase()
      convertedObj[convertedKey] = obj[key]
    }
  }
  return convertedObj
}
