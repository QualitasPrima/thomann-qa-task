export function logStep(context: string, message: string) {
  console.log(`🧩 [${context}] ${message}`);
}

export function logSuccess(message: string) {
  console.log(`✅ ${message}`);
}
