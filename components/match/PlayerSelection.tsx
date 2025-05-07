import React from 'react';
import { View, Text, StyleSheet, TextInput, Image } from 'react-native';
import { User } from 'lucide-react-native';
import { COLORS } from '@/constants/Colors';

interface PlayerSelectionProps {
  matchType: string;
  players: {
    player1: string;
    player2: string;
    player3: string;
    player4: string;
  };
  onPlayersChange: (players: any) => void;
}

const PlayerSelection: React.FC<PlayerSelectionProps> = ({
  matchType,
  players,
  onPlayersChange,
}) => {
  const handleChange = (player: string, value: string) => {
    onPlayersChange({
      ...players,
      [player]: value,
    });
  };
  
  return (
    <View style={styles.container}>
      <View style={styles.teamContainer}>
        <Text style={styles.teamTitle}>Team 1</Text>
        
        <View style={styles.playerField}>
          <User size={20} color={COLORS.textSecondary} />
          <TextInput
            style={styles.input}
            placeholder="Player 1 name"
            placeholderTextColor="#9CA3AF"
            value={players.player1}
            onChangeText={(text) => handleChange('player1', text)}
          />
        </View>
        
        {matchType === 'doubles' && (
          <View style={styles.playerField}>
            <User size={20} color={COLORS.textSecondary} />
            <TextInput
              style={styles.input}
              placeholder="Player 3 name"
              placeholderTextColor="#9CA3AF"
              value={players.player3}
              onChangeText={(text) => handleChange('player3', text)}
            />
          </View>
        )}
      </View>
      
      <View style={styles.divider} />
      
      <View style={styles.teamContainer}>
        <Text style={styles.teamTitle}>Team 2</Text>
        
        <View style={styles.playerField}>
          <User size={20} color={COLORS.textSecondary} />
          <TextInput
            style={styles.input}
            placeholder="Player 2 name"
            placeholderTextColor="#9CA3AF"
            value={players.player2}
            onChangeText={(text) => handleChange('player2', text)}
          />
        </View>
        
        {matchType === 'doubles' && (
          <View style={styles.playerField}>
            <User size={20} color={COLORS.textSecondary} />
            <TextInput
              style={styles.input}
              placeholder="Player 4 name"
              placeholderTextColor="#9CA3AF"
              value={players.player4}
              onChangeText={(text) => handleChange('player4', text)}
            />
          </View>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 24,
  },
  teamContainer: {
    marginBottom: 24,
  },
  teamTitle: {
    fontFamily: 'Inter-Bold',
    fontSize: 18,
    color: COLORS.textPrimary,
    marginBottom: 16,
  },
  playerField: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.white,
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  input: {
    flex: 1,
    marginLeft: 12,
    fontFamily: 'Inter-Regular',
    fontSize: 16,
    color: COLORS.textPrimary,
    paddingVertical: 8,
  },
  divider: {
    height: 1,
    backgroundColor: '#E5E7EB',
    marginVertical: 8,
  },
});

export default PlayerSelection;