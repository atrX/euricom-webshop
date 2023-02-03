declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace Vi {
    interface AsymmetricMatchersContaining {
      anyOrNil(constructor: unknown): unknown;
    }
  }
}

export const matchers = {
  anyOrNil(received: unknown, constructor: unknown) {
    try {
      expect(received).toEqual(expect.any(constructor));
      return {
        message: () => "Ok",
        pass: true,
      };
    } catch (err) {
      return received === null || received === undefined
        ? {
            message: () => "Ok",
            pass: true,
          }
        : {
            message: () =>
              // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
              `expected ${received} to be ${constructor} type or null`,
            pass: false,
          };
    }
  },
};
