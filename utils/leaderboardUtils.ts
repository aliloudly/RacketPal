// This file contains utility functions for handling leaderboard data
// In a real app, this would interact with your API or local storage

// Get leaderboard data filtered by sport and timeframe
export const getLeaderboardData = (sport: string, timeframe: string) => {
  // This would fetch from your API or local storage
  return [
    {
      id: '1',
      name: 'John Smith',
      points: 1250,
      winCount: 28,
      matchCount: 35,
      profileImage: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg',
    },
    {
      id: '2',
      name: 'Sarah Johnson',
      points: 1180,
      winCount: 25,
      matchCount: 32,
      profileImage: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg',
    },
    {
      id: '3',
      name: 'Michael Wilson',
      points: 1120,
      winCount: 22,
      matchCount: 30,
      profileImage: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg',
    },
    {
      id: '4',
      name: 'Emma Thompson',
      points: 980,
      winCount: 18,
      matchCount: 28,
      profileImage: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg',
    },
    {
      id: '5',
      name: 'David Rodriguez',
      points: 920,
      winCount: 16,
      matchCount: 26,
      profileImage: 'https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg',
    },
    {
      id: '6',
      name: 'Lisa Chen',
      points: 890,
      winCount: 15,
      matchCount: 24,
      profileImage: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg',
    },
    {
      id: '7',
      name: 'James Taylor',
      points: 850,
      winCount: 14,
      matchCount: 22,
      profileImage: 'https://images.pexels.com/photos/91227/pexels-photo-91227.jpeg',
    },
    {
      id: '8',
      name: 'Robert Garcia',
      points: 820,
      winCount: 12,
      matchCount: 20,
      profileImage: 'https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg',
    },
  ];
};