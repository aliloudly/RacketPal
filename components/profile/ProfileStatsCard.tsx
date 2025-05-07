import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { COLORS } from '@/constants/Colors';

interface ProfileStatsCardProps {
  value: string;
  label: string;
}

const ProfileStatsCard: React.FC<ProfileStatsCardProps> = ({ value, label }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.value}>{value}</Text>
      <Text style={styles.label}>{label}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 8,
  },
  value: {
    fontFamily: 'Inter-Bold',
    fontSize: 20,
    color: COLORS.primary,
  },
  label: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: COLORS.textSecondary,
    marginTop: 4,
  },
});

export default ProfileStatsCard;