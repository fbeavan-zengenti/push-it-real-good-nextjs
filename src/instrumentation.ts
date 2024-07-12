export async function register() {
  if (process.env.NEXT_RUNTIME === "nodejs") {
    console.info(`hit instrumentation register`);
  }
  if (process.env.NEXT_RUNTIME === "edge") {
  }
}
