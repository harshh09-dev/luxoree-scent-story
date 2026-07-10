// Captures the last SSR error thrown during request handling so server.ts can
// surface it when h3 swallows the throw into a generic 500.
let lastError: unknown = null;

const originalConsoleError = console.error.bind(console);
console.error = (...args: unknown[]) => {
  for (const arg of args) {
    if (arg instanceof Error) {
      lastError = arg;
      break;
    }
  }
  originalConsoleError(...args);
};

export function consumeLastCapturedError(): unknown {
  const err = lastError;
  lastError = null;
  return err;
}
