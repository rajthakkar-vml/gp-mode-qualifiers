export interface LeaderboardEntry {
  id?: string;
  name: string;
  cityState: string;
  phone: string;
  timeTaken: number;
  timestamp: number;
}

const LEADERBOARD_KEY = 'motul_quiz_leaderboard';

// In a static GitHub Pages environment, we just use localStorage.
export async function submitScore(entry: Omit<LeaderboardEntry, 'id' | 'timestamp'>) {
  const currentLeaderboard = await getLeaderboard();
  
  const newEntry: LeaderboardEntry = {
    ...entry,
    id: Math.random().toString(36).substring(7),
    timestamp: Date.now(),
  };
  
  currentLeaderboard.push(newEntry);
  
  // Sort by time (lowest first)
  currentLeaderboard.sort((a, b) => a.timeTaken - b.timeTaken);
  
  // Optional: limit to top 100
  const top100 = currentLeaderboard.slice(0, 100);
  
  localStorage.setItem(LEADERBOARD_KEY, JSON.stringify(top100));
}

// Kept for signature compatibility with App.tsx, but no-op in static setup
export async function syncPendingSubmissions() {
  return;
}

export async function getLeaderboard(): Promise<LeaderboardEntry[]> {
  try {
    const data = localStorage.getItem(LEADERBOARD_KEY);
    return data ? JSON.parse(data) : [];
  } catch (error) {
    console.error('Failed to read leaderboard from localStorage:', error);
    return [];
  }
}
