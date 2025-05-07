import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ViewStyle } from 'react-native';
import { COLORS } from '@/constants/Colors';

interface SegmentedControlProps {
  values: string[];
  selectedIndex: number;
  onChange: (index: number) => void;
  containerStyle?: ViewStyle;
}

const SegmentedControl: React.FC<SegmentedControlProps> = ({
  values,
  selectedIndex,
  onChange,
  containerStyle,
}) => {
  return (
    <View style={[styles.container, containerStyle]}>
      {values.map((value, index) => (
        <TouchableOpacity
          key={index}
          style={[
            styles.segment,
            selectedIndex === index && styles.selectedSegment,
            index === 0 && styles.firstSegment,
            index === values.length - 1 && styles.lastSegment,
          ]}
          onPress={() => onChange(index)}
          activeOpacity={0.7}
        >
          <Text
            style={[
              styles.segmentText,
              selectedIndex === index && styles.selectedSegmentText,
            ]}
          >
            {value}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: '#F1F5F9',
    borderRadius: 8,
    padding: 4,
    height: 40,
  },
  segment: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 6,
    borderRadius: 6,
  },
  firstSegment: {
    borderTopLeftRadius: 6,
    borderBottomLeftRadius: 6,
  },
  lastSegment: {
    borderTopRightRadius: 6,
    borderBottomRightRadius: 6,
  },
  selectedSegment: {
    backgroundColor: COLORS.white,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 1,
    elevation: 1,
  },
  segmentText: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    color: COLORS.textSecondary,
  },
  selectedSegmentText: {
    color: COLORS.primary,
  },
});

export default SegmentedControl;