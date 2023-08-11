export const handleRequest = <T>(promise: Promise<T>) => {
  return promise.then((data) => [undefined, data] as const).catch((err) => [err, undefined] as const)
}
