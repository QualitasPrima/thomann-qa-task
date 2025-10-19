// Uniform logging across all layers — consistent console output

export function logStep(section: string, message: string) {
  console.log(`🧩 [${section}] ${message}`);
}

export function logInfo(message: string) {
  console.log(`ℹ️ ${message}`);
}

export function logSuccess(message: string) {
  console.log(`✅ ${message}`);
}

export function logError(section: string, error: Error | string) {
  console.error(
    `❌ [${section}] ${typeof error === "string" ? error : error.message}`
  );
}
