import { useState } from 'react';
import { StyleSheet, View, ScrollView, Text } from 'react-native';

// Importing your custom components
import GoalItem from './components/GoalItem';
import GoalInput from './components/GoalInput';

export default function App() {
  const [courseGoals, setCourseGoals] = useState([]);

  function addGoalHandler(enteredGoalText) {
    if (enteredGoalText.trim().length === 0) return;
    // For ScrollView, we just need the text string in the array
    setCourseGoals((currentCourseGoals) => [
      ...currentCourseGoals,
      enteredGoalText,
    ]);
  }

  return (
    <View style={styles.appContainer}>
      {/* 1. The Input Component */}
      <GoalInput onAddGoal={addGoalHandler} />
      
      {/* 2. The Limited Container for ScrollView Demo */}
      <View style={styles.limitedListWrapper}>
        <Text style={styles.headerText}>ScrollView List Area (Non-Optimized)</Text>
        
        <View style={styles.scrollContainer}>
          <ScrollView alwaysBounceVertical={false}>
            {courseGoals.map((goal, index) => (
              /* We still use the GoalItem component for consistency! */
              <GoalItem key={index} text={goal} />
            ))}
          </ScrollView>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  appContainer: {
    flex: 1,
    paddingTop: 60,
    paddingHorizontal: 20,
    backgroundColor: '#ffffff',
  },
  limitedListWrapper: {
    flex: 4,
    marginTop: 20,
  },
  headerText: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#d32f2f', // Red text to distinguish it from the FlatList version
  },
  scrollContainer: {
    height: 300, // The height limit for the activity
    borderWidth: 2,
    borderColor: '#d32f2f', // Red border to show this is the ScrollView demo
    borderRadius: 10,
    padding: 5,
  },
});