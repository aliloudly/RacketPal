// This file contains utility functions for handling club data
// In a real app, this would interact with your API or local storage

// Get club by ID
export const getClubById = (id: string) => {
  // This would fetch from your API or local storage
  return {
    id,
    name: 'Downtown Tennis Club',
    image: 'https://images.pexels.com/photos/1103829/pexels-photo-1103829.jpeg',
    location: 'Central Park, New York',
    description: 'A vibrant community of tennis enthusiasts of all levels. Regular tournaments, social events, and coaching available.',
    memberCount: 54,
    eventCount: 8,
    matchCount: 132,
    leaderboard: [
      {
        id: '1',
        name: 'John Smith',
        image: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg',
        points: 1250,
        wins: 28,
        matchesPlayed: 35,
      },
      {
        id: '2',
        name: 'Sarah Johnson',
        image: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg',
        points: 1180,
        wins: 25,
        matchesPlayed: 32,
      },
      {
        id: '3',
        name: 'Michael Wilson',
        image: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg',
        points: 1120,
        wins: 22,
        matchesPlayed: 30,
      },
    ],
  };
};

// Get club members
export const getClubMembers = (clubId: string) => {
  // This would fetch from your API or local storage
  return [
    {
      id: '1',
      name: 'John Smith',
      image: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg',
      role: 'Admin',
      matchCount: 35,
      winRate: 80,
    },
    {
      id: '2',
      name: 'Sarah Johnson',
      image: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg',
      role: 'Member',
      matchCount: 32,
      winRate: 78,
    },
    {
      id: '3',
      name: 'Michael Wilson',
      image: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg',
      role: 'Member',
      matchCount: 30,
      winRate: 73,
    },
    {
      id: '4',
      name: 'Emma Thompson',
      image: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg',
      role: 'Member',
      matchCount: 28,
      winRate: 64,
    },
    {
      id: '5',
      name: 'David Rodriguez',
      image: 'https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg',
      role: 'Member',
      matchCount: 26,
      winRate: 62,
    },
  ];
};

// Get club events
export const getClubEvents = (clubId: string) => {
  // This would fetch from your API or local storage
  return [
    {
      id: '1',
      title: 'Summer Tournament',
      type: 'Tournament',
      description: 'Annual summer tournament with prizes for winners in singles and doubles categories.',
      date: 'June 15-17, 2024',
      time: '9:00 AM - 6:00 PM',
      location: 'Main Courts',
      participants: 32,
    },
    {
      id: '2',
      title: 'Beginner Clinic',
      type: 'Training',
      description: 'Learn the basics of tennis with our professional coaches in a friendly environment.',
      date: 'May 25, 2024',
      time: '10:00 AM - 12:00 PM',
      location: 'Practice Courts',
      participants: 12,
    },
    {
      id: '3',
      title: 'Social Mixer',
      type: 'Social',
      description: 'Casual matches and networking with other club members. Refreshments provided.',
      date: 'June 3, 2024',
      time: '6:00 PM - 9:00 PM',
      location: 'Clubhouse & Courts',
      participants: 24,
    },
  ];
};