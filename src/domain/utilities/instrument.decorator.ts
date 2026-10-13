// A decorator that instruments class methods to log their calls and return values. Works for all methods of the class.
//What it does: Logs the method calls and their return values for all methods of the class.
// what T extends { new (...args: any[]): object } means: T is a constructor type that can be instantiated with any arguments and returns an object.
// Where can it be applied: It can be applied to any class to automatically log calls to all its methods.
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function instrument<T extends new (...args: any[]) => object>(
  target: T
) {
  const originalCtor = target.prototype.constructor; // Save the original constructor of the class

  for (const key of Object.getOwnPropertyNames(originalCtor.prototype)) {
    const descriptor = Object.getOwnPropertyDescriptor(
      originalCtor.prototype,
      key
    );

    if (descriptor && typeof descriptor.value === 'function') {
      const originalFunction = descriptor.value; // Save the original method so it can be called later

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      descriptor.value = function (...args: any[]) {
        console.log(
          `Calling method '${key}' with arguments: ${args.join(', ')}`
        );
        const result = originalFunction.apply(this, args); // Call the original method with the provided arguments
        if (result) {
          console.log(`Method ${key} returned: ${result}`);
        }
        return result;
      };

      Object.defineProperty(originalCtor.prototype, key, descriptor); // Redefine the method with the new descriptor that includes the instrumentation
    }
  }
}
