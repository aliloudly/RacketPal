import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { COLORS } from '@/constants/Colors';

interface SportTypeButtonProps {
  label: string;
  isSelected: boolean;
  onPress: () => void;
}

const SportTypeButton: React.FC<SportTypeButtonProps> = ({
  label,
  isSelected,
  onPress,
}) => {
  return (
    <TouchableOpacity
      style={[
        styles.button,
        isSelected && styles.buttonSelected,
      ]}
      onPress={onPress}
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
  button: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 100,
    backgroundColor: COLORS.white,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  buttonSelected: {
    backgroundColor: COLORS.primary,
    borderColor: COLORS.primary,
  },
  label: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    color: COLORS.textPrimary,
  },
  labelSelected: {
    color: COLORS.white,
  },
});

export default SportTypeButton;