// This file contains utility functions for handling match data
// In a real app, this would interact with your API or local storage

// Get active matches (matches in progress)
export const getActiveMatches = () => {
  // This would fetch from your API or local storage
  return [
    {
      id: '1',
      sport: 'tennis',
      type: 'singles',
      status: 'in_progress',
      elapsedTime: '32:15',
      team1: {
        name: 'John Smith',
        sets: 1,
      },
      team2: {
        name: 'Michael Johnson',
        sets: 0,
      },
      currentSetScore: {
        team1: 3,
        team2: 2,
      },
    },
  ];
};

// Get upcoming matches
export const getUpcomingMatches = () => {
  // This would fetch from your API or local storage
  return [
    {
      id: '2',
      sport: 'badminton',
      type: 'doubles',
      date: 'Tomorrow',
      time: '10:00 AM',
      location: 'City Sports Center',
      team1: {
        name: 'Team Alpha',
      },
      team2: {
        name: 'Team Beta',
      },
    },
    {
      id: '3',
      sport: 'pickleball',
      type: 'singles',
      date: 'Sat, May 15',
      time: '2:30 PM',
      location: 'Downtown Courts',
      team1: {
        name: 'Sarah Johnson',
      },
      team2: {
        name: 'Emma Williams',
      },
    },
  ];
};

// Get match history
export const getMatchHistory = () => {
  // This would fetch from your API or local storage
  return [
    {
      id: '4',
      sport: 'tennis',
      date: 'Today',
      team1: {
        name: 'You',
      },
      team2: {
        name: 'Robert Chen',
      },
      team1Score: 2,
      team2Score: 1,
      result: 'won',
      duration: '1h 15m',
    },
    {
      id: '5',
      sport: 'squash',
      date: 'Yesterday',
      team1: {
        name: 'You',
      },
      team2: {
        name: 'Alex Turner',
      },
      team1Score: 1,
      team2Score: 3,
      result: 'lost',
      duration: '45m',
    },
    {
      id: '6',
      sport: 'badminton',
      date: 'May, 10',
      team1: {
        name: 'You & David',
      },
      team2: {
        name: 'Sam & Kate',
      },
      team1Score: 2,
      team2Score: 0,
      result: 'won',
      duration: '38m',
    },
    {
      id: '7',
      sport: 'tennis',
      date: 'May 5',
      team1: {
        name: 'You',
      },
      team2: {
        name: 'James Wilson',
      },
      team1Score: 1,
      team2Score: 2,
      result: 'lost',
      duration: '1h 30m',
    },
  ];
};

// Get match by ID
export const getMatchById = (id: string) => {
  // This would fetch from your API or local storage
  const activeMocks = [
    {
      id: '1',
      sport: 'tennis',
      type: 'singles',
      team1: {
        name: 'John Smith',
        players: [
          {
            name: 'John Smith',
            image: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg',
          }
        ]
      },
      team2: {
        name: 'Michael Johnson',
        players: [
          {
            name: 'Michael Johnson',
            image: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg',
          }
        ]
      },
    }
  ];
  
  return activeMocks.find(match => match.id === id);
};