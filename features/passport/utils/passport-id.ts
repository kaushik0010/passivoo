/**
 * A simple deterministic random number generator.
 * Given the same seed string, it will always output the same sequence of characters.
 */
function deterministicString(seed: string, length: number): string {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let result = "";
  
  // 1. Create a numeric hash from the seed string
  let hash = 0;
  for (let i = 0; i < seed.length; i++) {
    hash = ((hash << 5) - hash) + seed.charCodeAt(i);
    hash |= 0; // Convert to 32bit integer
  }
  hash = Math.abs(hash);

  // 2. Generate characters using a basic Linear Congruential Generator (LCG)
  let currentSeed = hash === 0 ? 12345 : hash;
  for (let i = 0; i < length; i++) {
    currentSeed = (currentSeed * 9301 + 49297) % 233280;
    result += chars.charAt(Math.floor((currentSeed / 233280) * chars.length));
  }
  
  return result;
}

/**
 * Generates a random block for Guest users.
 */
function generateRandomBlock(): string {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let block = "";
  for (let i = 0; i < 4; i++) {
    block += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return block;
}

/**
 * Generates a professional, machine-readable Document ID.
 * Format: PV-[PREFIX]-[4_CHARS]-[4_CHARS]
 * @param eventPrefix e.g., 'F26'
 * @param userId Optional. If provided, the ID will remain permanently fixed for this user.
 */
export function generatePassportId(eventPrefix: string, userId?: string): string {
  if (userId) {
    // Authenticated User: Always generate the exact same string based on their unique DB ID
    const block1 = deterministicString(userId + "-block1", 4);
    const block2 = deterministicString(userId + "-block2", 4);
    return `PV-${eventPrefix}-${block1}-${block2}`;
  }
  
  // Guest User: Completely random (handled by localStorage persistence later)
  return `PV-${eventPrefix}-${generateRandomBlock()}-${generateRandomBlock()}`;
}