// This file contains utility functions for handling user data
// In a real app, this would interact with your API or local storage

// Get current user profile
export const getUserProfile = () => {
  // This would fetch from your API or local storage
  return {
    id: 'current-user',
    name: 'Alex Johnson',
    bio: 'Tennis and badminton enthusiast. Playing for 5 years and always looking for a challenge!',
    favoriteSports: ['Tennis', 'Badminton', 'Pickleball'],
    matchesPlayed: 24,
    winRate: 68,
    ranking: 8,
  };
};

// Get user by ID
export const getUserById = (id: string) => {
  // This would fetch from your API or local storage
  return {
    id,
    name: 'John Smith',
    profileImage: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg',
    bio: 'Professional tennis player with 10+ years of experience. Love competing and meeting new players.',
    favoriteSports: ['Tennis', 'Padel', 'Squash'],
    badges: ['Pro Player', 'Tournament Champion'],
    achievements: [
      {
        title: 'City Tournament Winner',
        date: 'May 2024',
      },
      {
        title: '50 Matches Played',
        date: 'April 2024',
      },
      {
        title: '10 Win Streak',
        date: 'March 2024',
      },
    ],
  };
};

// Get user stats by ID
export const getUserStats = (id: string) => {
  // This would fetch from your API or local storage
  return {
    matchesPlayed: 42,
    wins: 28,
    losses: 14,
    winRate: 67,
    avgMatchDuration: '58 min',
    pointsPerMatch: 21,
    rankingPoints: 1250,
  };
};

// Get user's friends
export const getUserFriends = () => {
  // This would fetch from your API or local storage
  return [
    {
      id: '1',
      name: 'Sarah Johnson',
      profileImage: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg',
      matchesPlayed: 32,
      winRate: 72,
      ranking: 5,
    },
    {
      id: '2',
      name: 'David Rodriguez',
      profileImage: 'https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg',
      matchesPlayed: 28,
      winRate: 64,
      ranking: 12,
    },
    {
      id: '3',
      name: 'Emma Thompson',
      profileImage: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg',
      matchesPlayed: 36,
      winRate: 69,
      ranking: 8,
    },
  ];
};

// Get user's clubs
export const getUserClubs = () => {
  // This would fetch from your API or local storage
  return [
    {
      id: '1',
      name: 'Downtown Tennis Club',
      image: 'https://images.pexels.com/photos/1103829/pexels-photo-1103829.jpeg',
      memberCount: 54,
      location: 'Central Park',
    },
    {
      id: '2',
      name: 'Riverside Racket Sports',
      image: 'https://images.pexels.com/photos/6572946/pexels-photo-6572946.jpeg',
      memberCount: 78,
      location: 'Riverside Dr',
    },
  ];
};

// Get user's match history
export const getUserMatchHistory = (userId: string) => {
  // This would fetch from your API or local storage
  return [
    {
      id: '1',
      sport: 'Tennis',
      date: 'May 10, 2024',
      team1: {
        name: 'John Smith',
      },
      team2: {
        name: 'Michael Wilson',
      },
      score: '6-4, 7-5',
      result: 'won',
    },
    {
      id: '2',
      sport: 'Badminton',
      date: 'May 5, 2024',
      team1: {
        name: 'John Smith',
      },
      team2: {
        name: 'David Rodriguez',
      },
      score: '21-18, 19-21, 21-17',
      result: 'won',
    },
    {
      id: '3',
      sport: 'Padel',
      date: 'April 28, 2024',
      team1: {
        name: 'John & Sarah',
      },
      team2: {
        name: 'Emma & Michael',
      },
      score: '4-6, 6-3, 4-6',
      result: 'lost',
    },
  ];
};