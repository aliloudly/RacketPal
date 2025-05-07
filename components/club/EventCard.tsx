import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Calendar, Clock, MapPin } from 'lucide-react-native';
import { COLORS } from '@/constants/Colors';

interface EventCardProps {
  event: any;
}

const EventCard: React.FC<EventCardProps> = ({ event }) => {
  return (
    <TouchableOpacity style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>{event.title}</Text>
        <View style={styles.badge}>
          <Text style={styles.badgeText}>{event.type}</Text>
        </View>
      </View>
      
      <Text style={styles.description}>{event.description}</Text>
      
      <View style={styles.infoSection}>
        <View style={styles.infoItem}>
          <Calendar size={14} color={COLORS.textSecondary} />
          <Text style={styles.infoText}>{event.date}</Text>
        </View>
        
        <View style={styles.infoItem}>
          <Clock size={14} color={COLORS.textSecondary} />
          <Text style={styles.infoText}>{event.time}</Text>
        </View>
        
        <View style={styles.infoItem}>
          <MapPin size={14} color={COLORS.textSecondary} />
          <Text style={styles.infoText}>{event.location}</Text>
        </View>
      </View>
      
      <View style={styles.footer}>
        <Text style={styles.participantsText}>
          {event.participants} participants
        </Text>
        
        <TouchableOpacity style={styles.joinButton}>
          <Text style={styles.joinButtonText}>Join</Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.white,
    borderRadius: 12,
    padding: 16,
    width: 280,
    marginRight: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  title: {
    fontFamily: 'Inter-Bold',
    fontSize: 16,
    color: COLORS.textPrimary,
    flex: 1,
  },
  badge: {
    backgroundColor: COLORS.primary + '20', // 20% opacity
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
    marginLeft: 8,
  },
  badgeText: {
    fontFamily: 'Inter-Medium',
    fontSize: 12,
    color: COLORS.primary,
  },
  description: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: COLORS.textSecondary,
    marginBottom: 12,
  },
  infoSection: {
    marginBottom: 12,
  },
  infoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
  },
  infoText: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: COLORS.textSecondary,
    marginLeft: 8,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 4,
  },
  participantsText: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: COLORS.textSecondary,
  },
  joinButton: {
    backgroundColor: COLORS.primary,
    paddingVertical: 6,
    paddingHorizontal: 16,
    borderRadius: 100,
  },
  joinButtonText: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    color: COLORS.white,
  },
});

export default EventCard;