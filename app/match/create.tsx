import { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, TextInput } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { useRouter } from 'expo-router';
import { X, Users, User, Calendar, Trophy, Flag, Clock } from 'lucide-react-native';
import { COLORS } from '@/constants/Colors';
import SegmentedControl from '@/components/common/SegmentedControl';
import PlayerSelection from '@/components/match/PlayerSelection';
import { getSportRules } from '@/utils/sportUtils';

export default function CreateMatchScreen() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [matchType, setMatchType] = useState('singles');
  const [sport, setSport] = useState('tennis');
  const [players, setPlayers] = useState<{
    player1: string,
    player2: string,
    player3: string,
    player4: string
  }>({
    player1: '',
    player2: '',
    player3: '',
    player4: ''
  });
  
  const sportRules = getSportRules(sport);
  
  const handleNext = () => {
    if (step < 3) {
      setStep(step + 1);
    } else {
      // Create match and navigate to match screen
      router.push('/match/1');
    }
  };
  
  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1);
    } else {
      router.back();
    }
  };
  
  const renderStepContent = () => {
    switch (step) {
      case 1:
        return (
          <View style={styles.stepContent}>
            <Text style={styles.stepTitle}>Select Sport & Match Type</Text>
            
            <Text style={styles.sectionLabel}>Sport</Text>
            <View style={styles.sportSelectionGrid}>
              {['tennis', 'badminton', 'pickleball', 'padel', 'squash', 'table-tennis'].map(sportItem => (
                <TouchableOpacity
                  key={sportItem}
                  style={[
                    styles.sportItem,
                    sport === sportItem && styles.sportItemSelected
                  ]}
                  onPress={() => setSport(sportItem)}
                >
                  <Text 
                    style={[
                      styles.sportItemText,
                      sport === sportItem && styles.sportItemTextSelected
                    ]}
                  >
                    {sportItem.charAt(0).toUpperCase() + sportItem.slice(1)}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
            
            <Text style={styles.sectionLabel}>Match Type</Text>
            <SegmentedControl
              values={['Singles', 'Doubles']}
              selectedIndex={matchType === 'singles' ? 0 : 1}
              onChange={(index) => setMatchType(index === 0 ? 'singles' : 'doubles')}
            />
            
            <View style={styles.infoContainer}>
              <Text style={styles.infoTitle}>Sport Rules</Text>
              <Text style={styles.infoText}>
                • {sportRules.scoring}
              </Text>
              <Text style={styles.infoText}>
                • {sportRules.winCondition}
              </Text>
            </View>
          </View>
        );
      case 2:
        return (
          <View style={styles.stepContent}>
            <Text style={styles.stepTitle}>Add Players</Text>
            
            <PlayerSelection
              matchType={matchType}
              players={players}
              onPlayersChange={setPlayers}
            />
            
            <View style={styles.infoContainer}>
              <Text style={styles.infoTitle}>Quick Tip</Text>
              <Text style={styles.infoText}>
                You can add players from your friend list or create a new player profile.
              </Text>
            </View>
          </View>
        );
      case 3:
        return (
          <View style={styles.stepContent}>
            <Text style={styles.stepTitle}>Match Setup</Text>
            
            <View style={styles.settingSection}>
              <View style={styles.settingRow}>
                <View style={styles.settingLabelContainer}>
                  <Trophy size={20} color={COLORS.textSecondary} />
                  <Text style={styles.settingLabel}>Scoring System</Text>
                </View>
                <SegmentedControl
                  values={['Standard', 'Custom']}
                  selectedIndex={0}
                  onChange={() => {}}
                  containerStyle={{ width: 150 }}
                />
              </View>
              
              <View style={styles.settingRow}>
                <View style={styles.settingLabelContainer}>
                  <Flag size={20} color={COLORS.textSecondary} />
                  <Text style={styles.settingLabel}>Sets to Win</Text>
                </View>
                <SegmentedControl
                  values={['1', '3', '5']}
                  selectedIndex={1}
                  onChange={() => {}}
                  containerStyle={{ width: 150 }}
                />
              </View>
              
              <View style={styles.settingRow}>
                <View style={styles.settingLabelContainer}>
                  <Clock size={20} color={COLORS.textSecondary} />
                  <Text style={styles.settingLabel}>Time Limit</Text>
                </View>
                <SegmentedControl
                  values={['None', 'Set']}
                  selectedIndex={0}
                  onChange={() => {}}
                  containerStyle={{ width: 150 }}
                />
              </View>
            </View>
            
            <View style={styles.settingSection}>
              <Text style={styles.sectionLabel}>Location (Optional)</Text>
              <TextInput
                style={styles.input}
                placeholder="Enter court location"
                placeholderTextColor="#9CA3AF"
              />
            </View>
            
            <View style={styles.infoContainer}>
              <Text style={styles.infoTitle}>Ready to Go!</Text>
              <Text style={styles.infoText}>
                Press 'Start Match' to begin scoring. You can edit match settings during play.
              </Text>
            </View>
          </View>
        );
      default:
        return null;
    }
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <StatusBar style="dark" />
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.closeButton}>
          <X size={24} color={COLORS.textPrimary} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Create Match</Text>
        <View style={styles.placeholder} />
      </View>
      
      <View style={styles.progressContainer}>
        <View style={styles.progressBar}>
          <View 
            style={[
              styles.progressIndicator, 
              { width: `${(step / 3) * 100}%` }
            ]} 
          />
        </View>
        <View style={styles.stepsTextContainer}>
          <Text style={styles.stepText}>Sport</Text>
          <Text style={styles.stepText}>Players</Text>
          <Text style={styles.stepText}>Setup</Text>
        </View>
      </View>
      
      <ScrollView 
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {renderStepContent()}
      </ScrollView>
      
      <View style={styles.footer}>
        {step > 1 ? (
          <TouchableOpacity 
            style={styles.backButton} 
            onPress={handleBack}
          >
            <Text style={styles.backButtonText}>Back</Text>
          </TouchableOpacity>
        ) : (
          <View style={styles.placeholder} />
        )}
        
        <TouchableOpacity 
          style={styles.nextButton} 
          onPress={handleNext}
        >
          <Text style={styles.nextButtonText}>
            {step < 3 ? 'Next' : 'Start Match'}
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  closeButton: {
    padding: 8,
  },
  headerTitle: {
    fontFamily: 'Inter-Bold',
    fontSize: 18,
    color: COLORS.textPrimary,
  },
  placeholder: {
    width: 40,
  },
  progressContainer: {
    paddingHorizontal: 16,
    marginBottom: 24,
  },
  progressBar: {
    height: 4,
    backgroundColor: '#E5E7EB',
    borderRadius: 2,
    overflow: 'hidden',
  },
  progressIndicator: {
    height: '100%',
    backgroundColor: COLORS.primary,
    borderRadius: 2,
  },
  stepsTextContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 8,
  },
  stepText: {
    fontFamily: 'Inter-Medium',
    fontSize: 12,
    color: COLORS.textSecondary,
  },
  scrollContent: {
    paddingHorizontal: 16,
    paddingBottom: 80,
  },
  stepContent: {
    marginBottom: 24,
  },
  stepTitle: {
    fontFamily: 'Inter-Bold',
    fontSize: 20,
    color: COLORS.textPrimary,
    marginBottom: 24,
  },
  sectionLabel: {
    fontFamily: 'Inter-Medium',
    fontSize: 16,
    color: COLORS.textPrimary,
    marginBottom: 12,
  },
  sportSelectionGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 24,
  },
  sportItem: {
    width: '48%',
    backgroundColor: COLORS.white,
    paddingVertical: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  sportItemSelected: {
    borderColor: COLORS.primary,
    backgroundColor: COLORS.primary + '10', // 10% opacity
  },
  sportItemText: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    color: COLORS.textPrimary,
  },
  sportItemTextSelected: {
    color: COLORS.primary,
  },
  infoContainer: {
    backgroundColor: '#F1F5F9',
    padding: 16,
    borderRadius: 8,
    marginTop: 24,
  },
  infoTitle: {
    fontFamily: 'Inter-Bold',
    fontSize: 16,
    color: COLORS.textPrimary,
    marginBottom: 8,
  },
  infoText: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: COLORS.textSecondary,
    marginBottom: 4,
  },
  settingSection: {
    backgroundColor: COLORS.white,
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
  },
  settingRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  settingLabelContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  settingLabel: {
    fontFamily: 'Inter-Medium',
    fontSize: 16,
    color: COLORS.textPrimary,
    marginLeft: 12,
  },
  input: {
    backgroundColor: '#F9FAFB',
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 8,
    padding: 12,
    fontFamily: 'Inter-Regular',
    fontSize: 16,
    color: COLORS.textPrimary,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 16,
    backgroundColor: COLORS.white,
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
  backButton: {
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 8,
  },
  backButtonText: {
    fontFamily: 'Inter-Medium',
    fontSize: 16,
    color: COLORS.textPrimary,
  },
  nextButton: {
    backgroundColor: COLORS.primary,
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    minWidth: 120,
    alignItems: 'center',
  },
  nextButtonText: {
    fontFamily: 'Inter-Medium',
    fontSize: 16,
    color: COLORS.white,
  },
});