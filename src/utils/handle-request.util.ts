export const handleRequest = <T>(promise: Promise<T>): Promise<readonly [any, T | undefined]> => {
  return promise
    .then((data): readonly [undefined, T] => [undefined, data] as const)
    .catch((err): readonly [any, undefined] => [err, undefined] as const)
}
