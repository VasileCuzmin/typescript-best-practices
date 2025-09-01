// eslint-disable-next-line @typescript-eslint/prefer-function-type, @typescript-eslint/no-explicit-any
export function instrument<T extends { new (...args: any[]): object }>(
  target: T
) {
  const originalCtor = target.prototype.constructor;

  for (const key of Object.getOwnPropertyNames(originalCtor.prototype)) {
    const descriptor = Object.getOwnPropertyDescriptor(
      originalCtor.prototype,
      key
    );

    if (descriptor && typeof descriptor.value === 'function') {
      const originalFunction = descriptor.value;

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      descriptor.value = function (...args: any[]) {
        console.log(
          `Calling method '${key}' with arguments: ${args.join(', ')}`
        );
        const result = originalFunction.apply(this, args);
        if (result) {
          console.log(`Method ${key} returned: ${result}`);
        }
        return result;
      };

      Object.defineProperty(originalCtor.prototype, key, descriptor);
    }
  }
}
