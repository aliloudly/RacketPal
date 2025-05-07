import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { COLORS } from '@/constants/Colors';

interface SportFilterChipProps {
  label: string;
  isSelected: boolean;
  onPress: () => void;
}

const SportFilterChip: React.FC<SportFilterChipProps> = ({
  label,
  isSelected,
  onPress,
}) => {
  return (
    <TouchableOpacity
      style={[
        styles.chip,
        isSelected && styles.chipSelected,
      ]}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <Text
        style={[
          styles.label,
          isSelected && styles.labelSelected,
        ]}
      >
        {label}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  chip: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 100,
    backgroundColor: '#F1F5F9',
  },
  chipSelected: {
    backgroundColor: COLORS.primary,
  },
  label: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    color: COLORS.textSecondary,
  },
  labelSelected: {
    color: COLORS.white,
  },
});

export default SportFilterChip;