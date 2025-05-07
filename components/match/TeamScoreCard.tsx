import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { COLORS } from '@/constants/Colors';

interface TeamScoreCardProps {
  team: any;
  score: any;
  isServing: boolean;
  onAddPoint: () => void;
  isTennis: boolean;
}

const TeamScoreCard: React.FC<TeamScoreCardProps> = ({
  team,
  score,
  isServing,
  onAddPoint,
  isTennis,
}) => {
  // Format point display based on sport (tennis uses 0, 15, 30, 40, Ad)
  const getPointDisplay = () => {
    if (isTennis) {
      if (score.points === 0) return '0';
      return String(score.points);
    } else {
      return String(score.points);
    }
  };
  
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.teamName}>{team.name}</Text>
        {isServing && (
          <View style={styles.servingIndicator}>
            <Text style={styles.servingText}>Serving</Text>
          </View>
        )}
      </View>
      
      <View style={styles.teamInfo}>
        {team.players?.map((player: any, index: number) => (
          <View key={index} style={styles.playerInfo}>
            <Image 
              source={{ uri: player.image }} 
              style={styles.playerImage} 
            />
            <Text style={styles.playerName}>{player.name}</Text>
          </View>
        ))}
      </View>
      
      <TouchableOpacity
        style={styles.pointButton}
        onPress={onAddPoint}
      >
        <Text style={styles.pointText}>{getPointDisplay()}</Text>
        <Text style={styles.addPointText}>Tap to add point</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 16,
    padding: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  teamName: {
    fontFamily: 'Inter-Bold',
    fontSize: 18,
    color: COLORS.white,
  },
  servingIndicator: {
    backgroundColor: COLORS.primary,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  servingText: {
    fontFamily: 'Inter-Medium',
    fontSize: 12,
    color: COLORS.white,
  },
  teamInfo: {
    marginBottom: 20,
  },
  playerInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  playerImage: {
    width: 32,
    height: 32,
    borderRadius: 16,
    marginRight: 8,
  },
  playerName: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.9)',
  },
  pointButton: {
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
  },
  pointText: {
    fontFamily: 'Inter-Bold',
    fontSize: 48,
    color: COLORS.white,
  },
  addPointText: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.7)',
    marginTop: 8,
  },
});

export default TeamScoreCard;