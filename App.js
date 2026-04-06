import { useState } from 'react';
import { StyleSheet, View, ScrollView, Text, Modal, Button, Alert, Pressable } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons'; // 

import GoalItem from './components/GoalItem';
import GoalInput from './components/GoalInput';

export default function App() {
  const [courseGoals, setCourseGoals] = useState([]);
  const [isBurdenModalVisible, setIsBurdenModalVisible] = useState(false);

  function addGoalHandler(enteredGoalText) {
    if (enteredGoalText.trim().length === 0) return;
    
    // Supplementary 2: Check if list > 5 
    if (courseGoals.length >= 5) {
      setIsBurdenModalVisible(true);
    }

    setCourseGoals((currentCourseGoals) => [
      ...currentCourseGoals,
      { text: enteredGoalText, id: Math.random().toString() },
    ]);
  }

  // Task 6: Delete with Confirmation 
  function deleteGoalHandler(id) {
    Alert.alert(
      "Confirm Delete",
      "Are you sure you want to remove this goal?",
      [
        { text: "Cancel", style: "cancel" },
        { 
          text: "Delete", 
          style: "destructive", 
          onPress: () => {
            setCourseGoals(currentGoals => currentGoals.filter(goal => goal.id !== id));
          } 
        }
      ]
    );
  }

  // Supplementary 1: Icon Click Welcome 
  function userWelcomeHandler() {
    Alert.alert("Welcome!", "Welcome to the application, Jake Norwin Aduana!");
  }

  return (
    <View style={styles.appContainer}>
      {/* Task 5: User Icon in Navigation Area  */}
      <View style={styles.navBar}>
         <Pressable onPress={userWelcomeHandler}>
            <MaterialIcons name="person" size={32} color="#5e0acc" />
         </Pressable>
      </View>

      {/* Supplementary 2: Burden Modal  */}
      <Modal visible={isBurdenModalVisible} animationType="slide" transparent={true}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalText}>Warning: Don't overwhelm yourself with too much burden!</Text>
            <Button title="I Understand" onPress={() => setIsBurdenModalVisible(false)} color="#d32f2f" />
          </View>
        </View>
      </Modal>

      <GoalInput onAddGoal={addGoalHandler} />
      
      <View style={styles.limitedListWrapper}>
        <Text style={styles.headerText}>My Course Goals</Text>
        <View style={styles.scrollContainer}>
          <ScrollView alwaysBounceVertical={false}>
            {courseGoals.map((goal) => (
              <GoalItem 
                key={goal.id} 
                id={goal.id} 
                text={goal.text} 
                onDeleteItem={deleteGoalHandler} 
              />
            ))}
          </ScrollView>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  appContainer: { flex: 1, paddingTop: 60, paddingHorizontal: 20, backgroundColor: '#ffffff' },
  navBar: { flexDirection: 'row', justifyContent: 'flex-end', marginBottom: 10 },
  limitedListWrapper: { flex: 4, marginTop: 20 },
  headerText: { fontSize: 16, fontWeight: 'bold', marginBottom: 10, color: '#d32f2f' },
  scrollContainer: { height: 300, borderWidth: 2, borderColor: '#d32f2f', borderRadius: 10, padding: 5 },
  modalOverlay: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0,0,0,0.5)' },
  modalContent: { width: '80%', padding: 20, backgroundColor: 'white', borderRadius: 10, alignItems: 'center' },
  modalText: { fontSize: 18, textAlign: 'center', marginBottom: 20 }
});