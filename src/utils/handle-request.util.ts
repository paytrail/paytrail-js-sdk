export const handleRequest = async <T>(promise: Promise<T>): Promise<readonly [any, T]> => {
  return promise
    .then((data): readonly [any, T] => [undefined, data] as const)
    .catch((err): readonly [any, T] => [err, undefined] as const)
}
