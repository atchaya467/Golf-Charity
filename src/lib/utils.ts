// Pure utility functions extracted from mockData (no DB dependency)

export function countMatches(userScores: number[], winningNumbers: number[]): number {
  return userScores.filter(s => winningNumbers.includes(s)).length;
}

export function calculatePayouts(
  totalPool: number,
  tier1Winners: number,
  tier2Winners: number,
  tier3Winners: number
) {
  const tier1Pool = totalPool * 0.4;
  const tier2Pool = totalPool * 0.35;
  const tier3Pool = totalPool * 0.25;

  return {
    tier1: tier1Winners > 0 ? tier1Pool / tier1Winners : 0,
    tier2: tier2Winners > 0 ? tier2Pool / tier2Winners : 0,
    tier3: tier3Winners > 0 ? tier3Pool / tier3Winners : 0,
  };
}
