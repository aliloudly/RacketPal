// This file contains utility functions for handling sport-specific data
// In a real app, this would interact with your API or local storage

// Get sport rules by sport type
export const getSportRules = (sport: string) => {
  const rules: Record<string, any> = {
    tennis: {
      scoring: 'Points progress as 0, 15, 30, 40, Game. First to 6 games wins the set (with 2 game advantage).',
      winCondition: 'Best of 3 or 5 sets. Must win by 2 clear sets.',
      servingRules: 'Players alternate serving every game. Switch sides on odd-numbered games.',
    },
    badminton: {
      scoring: 'Rally scoring to 21 points. Must win by 2 clear points.',
      winCondition: 'Best of 3 games. First to 21 points (or 30 if extended).',
      servingRules: 'Server continues serving until they lose a point. In doubles, teams alternate serving after losing a point.',
    },
    padel: {
      scoring: 'Same as tennis: 0, 15, 30, 40, Game. First to 6 games wins the set.',
      winCondition: 'Best of 3 sets. Must win by 2 clear sets.',
      servingRules: 'Players serve diagonally, alternating sides after each point. Teams change serving every game.',
    },
    squash: {
      scoring: 'Point-a-rally scoring to 11 points. Must win by 2 clear points.',
      winCondition: 'Best of 5 games. First to 11 points (or more if extended).',
      servingRules: 'Server continues serving until they lose a point. Players alternate sides after each point.',
    },
    pickleball: {
      scoring: 'Rally scoring to 11 points. Must win by 2 clear points.',
      winCondition: 'Best of 3 games. First to 11 points (or more if extended).',
      servingRules: 'Double bounce rule applies. Server continues until their team loses a point.',
    },
    'table-tennis': {
      scoring: 'Rally scoring to 11 points. Must win by 2 clear points.',
      winCondition: 'Best of 5 or 7 games. First to 11 points (or more if extended).',
      servingRules: 'Players serve for 2 points each, then switch. In doubles, teams alternate serving every 2 points.',
    },
  };
  
  return rules[sport] || rules.tennis; // Default to tennis rules if sport not found
};