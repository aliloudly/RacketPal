import { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Animated, Vibration, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { useLocalSearchParams, useRouter, Stack } from 'expo-router';
import { X, MoveVertical as MoreVertical, RotateCcw, Share2, Clock, Pause, Trophy } from 'lucide-react-native';
import { COLORS } from '@/constants/Colors';
import TeamScoreCard from '@/components/match/TeamScoreCard';
import { getMatchById } from '@/utils/matchUtils';

export default function MatchScreen() {
  const router = useRouter();
  const { id } = useLocalSearchParams();
  const [match, setMatch] = useState<any>(null);
  const [matchState, setMatchState] = useState({
    team1: { points: 0, games: 0, sets: 0 },
    team2: { points: 0, games: 0, sets: 0 },
    currentSet: 1,
    isMatchPoint: false,
    isGamePoint: false,
    isSetPoint: false,
    isCompleted: false,
    isPaused: false,
    elapsedTime: 0,
  });
  
  const pointAnimation = useRef(new Animated.Value(1)).current;
  const [showPointAlert, setShowPointAlert] = useState(false);
  const [pointAlertText, setPointAlertText] = useState('');
  
  useEffect(() => {
    // Fetch match details
    const matchData = getMatchById(id as string);
    setMatch(matchData);
    
    // Initialize timer
    const timer = setInterval(() => {
      if (!matchState.isPaused && !matchState.isCompleted) {
        setMatchState(prev => ({
          ...prev,
          elapsedTime: prev.elapsedTime + 1
        }));
      }
    }, 1000);
    
    return () => clearInterval(timer);
  }, [id, matchState.isPaused, matchState.isCompleted]);
  
  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
  };
  
  const handleAddPoint = (team: 'team1' | 'team2') => {
    if (matchState.isCompleted || matchState.isPaused) return;
    
    const newState = { ...matchState };
    
    // Handle tennis scoring logic (0, 15, 30, 40, Game)
    const points = newState[team].points;
    const otherTeam = team === 'team1' ? 'team2' : 'team1';
    
    if (points === 0) newState[team].points = 15;
    else if (points === 15) newState[team].points = 30;
    else if (points === 30) newState[team].points = 40;
    else if (points === 40) {
      // Check for deuce
      if (newState[otherTeam].points === 40) {
        newState[team].points = 'Ad';
      } else if (newState[otherTeam].points === 'Ad') {
        newState[otherTeam].points = 40; // Back to deuce
      } else {
        // Game won
        newState[team].points = 0;
        newState[otherTeam].points = 0;
        newState[team].games += 1;
        
        showPointNotification('Game');
        
        // Check if set is won (6 games, with 2 game difference)
        if (newState[team].games >= 6 && newState[team].games - newState[otherTeam].games >= 2) {
          newState[team].sets += 1;
          newState[team].games = 0;
          newState[otherTeam].games = 0;
          newState.currentSet += 1;
          
          showPointNotification('Set');
          
          // Check if match is won (best of 3 sets)
          if (newState[team].sets >= 2) {
            newState.isCompleted = true;
            showPointNotification('Match');
            showMatchCompleteAnimation();
          }
        }
      }
    } else if (points === 'Ad') {
      // Game won from advantage
      newState[team].points = 0;
      newState[otherTeam].points = 0;
      newState[team].games += 1;
      
      showPointNotification('Game');
      
      if (newState[team].games >= 6 && newState[team].games - newState[otherTeam].games >= 2) {
        newState[team].sets += 1;
        newState[team].games = 0;
        newState[otherTeam].games = 0;
        newState.currentSet += 1;
        
        showPointNotification('Set');
        
        if (newState[team].sets >= 2) {
          newState.isCompleted = true;
          showPointNotification('Match');
          showMatchCompleteAnimation();
        }
      }
    }
    
    // Update match point, game point, set point status
    updatePointStatus(newState);
    
    // Vibration feedback when adding points
    if (Platform.OS !== 'web') {
      Vibration.vibrate(50);
    }
    
    setMatchState(newState);
  };
  
  const updatePointStatus = (state: typeof matchState) => {
    // Check for game point
    if (state.team1.points === 40 && state.team2.points < 40) {
      state.isGamePoint = true;
    } else if (state.team2.points === 40 && state.team1.points < 40) {
      state.isGamePoint = true;
    } else if (state.team1.points === 'Ad' || state.team2.points === 'Ad') {
      state.isGamePoint = true;
    } else {
      state.isGamePoint = false;
    }
    
    // Check for set point
    if ((state.team1.games === 5 && state.isGamePoint && state.team1.points > state.team2.points) ||
        (state.team2.games === 5 && state.isGamePoint && state.team2.points > state.team1.points)) {
      state.isSetPoint = true;
      state.isGamePoint = false; // Override with higher priority
    } else {
      state.isSetPoint = false;
    }
    
    // Check for match point
    if ((state.team1.sets === 1 && state.isSetPoint && state.team1.games > state.team2.games) ||
        (state.team2.sets === 1 && state.isSetPoint && state.team2.games > state.team1.games)) {
      state.isMatchPoint = true;
      state.isSetPoint = false; // Override with higher priority
    } else {
      state.isMatchPoint = false;
    }
  };
  
  const showPointNotification = (type: 'Game' | 'Set' | 'Match') => {
    setPointAlertText(`${type} Point!`);
    setShowPointAlert(true);
    
    Animated.sequence([
      Animated.timing(pointAnimation, {
        toValue: 1.3,
        duration: 300,
        useNativeDriver: true,
      }),
      Animated.timing(pointAnimation, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      })
    ]).start();
    
    setTimeout(() => {
      setShowPointAlert(false);
    }, 2000);
  };
  
  const showMatchCompleteAnimation = () => {
    // Add match complete animation logic
  };
  
  const handlePauseToggle = () => {
    setMatchState(prev => ({
      ...prev,
      isPaused: !prev.isPaused
    }));
  };
  
  if (!match) {
    return (
      <View style={styles.loadingContainer}>
        <Text style={styles.loadingText}>Loading match...</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <StatusBar style="light" />
      <Stack.Screen
        options={{
          headerShown: true,
          headerStyle: { backgroundColor: COLORS.primary },
          headerTintColor: COLORS.white,
          headerTitle: match.type === 'singles' ? 'Singles Match' : 'Doubles Match',
          headerLeft: () => (
            <TouchableOpacity onPress={() => router.back()} style={styles.headerButton}>
              <X size={24} color={COLORS.white} />
            </TouchableOpacity>
          ),
          headerRight: () => (
            <TouchableOpacity style={styles.headerButton}>
              <MoreVertical size={24} color={COLORS.white} />
            </TouchableOpacity>
          ),
        }}
      />
      
      <View style={styles.matchInfo}>
        <View style={styles.sportInfo}>
          <Text style={styles.sportText}>{match.sport}</Text>
          <Text style={styles.setInfo}>Set {matchState.currentSet}</Text>
        </View>
        
        <View style={styles.timeContainer}>
          <Clock size={16} color={COLORS.white} />
          <Text style={styles.timeText}>{formatTime(matchState.elapsedTime)}</Text>
        </View>
      </View>
      
      <View style={styles.scoreContainer}>
        <TeamScoreCard 
          team={match.team1}
          score={matchState.team1}
          isServing={true}
          onAddPoint={() => handleAddPoint('team1')}
          isTennis={match.sport === 'tennis'}
        />
        
        <View style={styles.scoreBoard}>
          <View style={styles.setsContainer}>
            <View style={styles.setScore}>
              <Text style={styles.setBubble}>{matchState.team1.sets}</Text>
            </View>
            <Text style={styles.setsText}>SETS</Text>
            <View style={styles.setScore}>
              <Text style={styles.setBubble}>{matchState.team2.sets}</Text>
            </View>
          </View>
          
          <View style={styles.gamesContainer}>
            <Text style={styles.gamesText}>GAMES</Text>
            <View style={styles.gamesScores}>
              <Text style={styles.gameScore}>{matchState.team1.games}</Text>
              <Text style={styles.gameScore}>{matchState.team2.games}</Text>
            </View>
          </View>
        </View>
        
        <TeamScoreCard 
          team={match.team2}
          score={matchState.team2}
          isServing={false}
          onAddPoint={() => handleAddPoint('team2')}
          isTennis={match.sport === 'tennis'}
        />
      </View>
      
      {showPointAlert && (
        <Animated.View 
          style={[
            styles.pointAlert,
            {
              transform: [{ scale: pointAnimation }],
              backgroundColor: 
                pointAlertText.includes('Match') ? '#EF4444' :
                pointAlertText.includes('Set') ? '#F59E0B' : 
                '#3B82F6'
            }
          ]}
        >
          <Text style={styles.pointAlertText}>{pointAlertText}</Text>
        </Animated.View>
      )}
      
      {matchState.isMatchPoint && !showPointAlert && (
        <View style={[styles.pointIndicator, { backgroundColor: '#EF4444' }]}>
          <Text style={styles.pointIndicatorText}>MATCH POINT</Text>
        </View>
      )}
      
      {matchState.isSetPoint && !showPointAlert && !matchState.isMatchPoint && (
        <View style={[styles.pointIndicator, { backgroundColor: '#F59E0B' }]}>
          <Text style={styles.pointIndicatorText}>SET POINT</Text>
        </View>
      )}
      
      {matchState.isGamePoint && !showPointAlert && !matchState.isSetPoint && !matchState.isMatchPoint && (
        <View style={[styles.pointIndicator, { backgroundColor: '#3B82F6' }]}>
          <Text style={styles.pointIndicatorText}>GAME POINT</Text>
        </View>
      )}
      
      {matchState.isCompleted ? (
        <View style={styles.matchCompleteContainer}>
          <Trophy size={64} color={COLORS.primary} />
          <Text style={styles.matchCompleteTitle}>Match Complete!</Text>
          <Text style={styles.winnerText}>
            {matchState.team1.sets > matchState.team2.sets ? match.team1.name : match.team2.name} Wins!
          </Text>
          
          <View style={styles.actionButtonsContainer}>
            <TouchableOpacity style={styles.actionButton}>
              <RotateCcw size={20} color={COLORS.textPrimary} />
              <Text style={styles.actionButtonText}>Rematch</Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.actionButton}>
              <Share2 size={20} color={COLORS.textPrimary} />
              <Text style={styles.actionButtonText}>Share</Text>
            </TouchableOpacity>
          </View>
          
          <TouchableOpacity 
            style={styles.finishButton}
            onPress={() => router.push('/history')}
          >
            <Text style={styles.finishButtonText}>Finish</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <View style={styles.controlsContainer}>
          <View style={styles.actionRow}>
            <TouchableOpacity style={styles.controlButton}>
              <RotateCcw size={24} color={COLORS.textPrimary} />
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={[styles.pauseButton, matchState.isPaused && styles.pauseButtonActive]}
              onPress={handlePauseToggle}
            >
              <Pause size={24} color={matchState.isPaused ? COLORS.white : COLORS.textPrimary} />
              <Text 
                style={[
                  styles.pauseButtonText, 
                  matchState.isPaused && styles.pauseButtonTextActive
                ]}
              >
                {matchState.isPaused ? 'Resume' : 'Pause'}
              </Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.controlButton}>
              <Share2 size={24} color={COLORS.textPrimary} />
            </TouchableOpacity>
          </View>
        </View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0F172A', // Darker background for score screen
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    fontFamily: 'Inter-Medium',
    fontSize: 16,
    color: COLORS.textPrimary,
  },
  headerButton: {
    padding: 8,
  },
  matchInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: COLORS.primary,
  },
  sportInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  sportText: {
    fontFamily: 'Inter-Bold',
    fontSize: 16,
    color: COLORS.white,
    textTransform: 'capitalize',
  },
  setInfo: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.8)',
    marginLeft: 12,
  },
  timeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  timeText: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    color: COLORS.white,
    marginLeft: 6,
  },
  scoreContainer: {
    flex: 1,
    justifyContent: 'space-between',
    padding: 16,
  },
  scoreBoard: {
    alignItems: 'center',
    marginVertical: 20,
  },
  setsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  setScore: {
    marginHorizontal: 16,
  },
  setBubble: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: COLORS.primary,
    textAlign: 'center',
    textAlignVertical: 'center',
    fontFamily: 'Inter-Bold',
    fontSize: 20,
    color: COLORS.white,
    overflow: 'hidden',
    lineHeight: 40,
  },
  setsText: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.7)',
  },
  gamesContainer: {
    alignItems: 'center',
  },
  gamesText: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.7)',
    marginBottom: 8,
  },
  gamesScores: {
    flexDirection: 'row',
    width: 80,
    justifyContent: 'space-between',
  },
  gameScore: {
    fontFamily: 'Inter-Bold',
    fontSize: 24,
    color: COLORS.white,
  },
  controlsContainer: {
    paddingHorizontal: 16,
    paddingBottom: 24,
  },
  actionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  controlButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  pauseButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 100,
  },
  pauseButtonActive: {
    backgroundColor: COLORS.primary,
  },
  pauseButtonText: {
    fontFamily: 'Inter-Medium',
    fontSize: 16,
    color: COLORS.textPrimary,
    marginLeft: 8,
  },
  pauseButtonTextActive: {
    color: COLORS.white,
  },
  pointAlert: {
    position: 'absolute',
    top: '45%',
    alignSelf: 'center',
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 100,
    elevation: 5,
  },
  pointAlertText: {
    fontFamily: 'Inter-Bold',
    fontSize: 18,
    color: COLORS.white,
  },
  pointIndicator: {
    alignSelf: 'center',
    paddingVertical: 6,
    paddingHorizontal: 16,
    borderRadius: 100,
    marginBottom: 16,
  },
  pointIndicatorText: {
    fontFamily: 'Inter-Bold',
    fontSize: 14,
    color: COLORS.white,
  },
  matchCompleteContainer: {
    alignItems: 'center',
    paddingBottom: 32,
  },
  matchCompleteTitle: {
    fontFamily: 'Inter-Bold',
    fontSize: 24,
    color: COLORS.white,
    marginTop: 16,
  },
  winnerText: {
    fontFamily: 'Inter-Medium',
    fontSize: 18,
    color: 'rgba(255, 255, 255, 0.8)',
    marginTop: 8,
  },
  actionButtonsContainer: {
    flexDirection: 'row',
    marginTop: 32,
    marginBottom: 16,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.white,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 100,
    marginHorizontal: 8,
  },
  actionButtonText: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    color: COLORS.textPrimary,
    marginLeft: 8,
  },
  finishButton: {
    backgroundColor: COLORS.primary,
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 100,
    marginTop: 16,
  },
  finishButtonText: {
    fontFamily: 'Inter-Bold',
    fontSize: 16,
    color: COLORS.white,
  },
});