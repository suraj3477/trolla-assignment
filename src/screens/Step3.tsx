import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Modal } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import LottieView from 'lottie-react-native';
import { RootStackParamList } from '../types/types';
import { useFormContext } from '../context/FormContext';
import { useTheme } from '../context/ThemeContext';  
import StepIndicator from '../components/StepIndicator';

type Step3Props = NativeStackScreenProps<RootStackParamList, 'Step3'>;

const Step3: React.FC<Step3Props> = ({ navigation }) => {
  const { data } = useFormContext();
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { isDarkMode } = useTheme();  

  const handleSubmit = () => {
    setIsSubmitted(true);
    setTimeout(() => {
      setIsSubmitted(false);
      navigation.navigate('SubmittedData', { data }); 
    }, 3000);  
  };

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: isDarkMode ? '#121212' : '#f4f4f4' }, 
      ]}
    >
      <StepIndicator currentStep={3} totalSteps={3} />

       <View
        style={[
          styles.card,
          {
            backgroundColor: isDarkMode ? '#333' : '#fff', 
          },
        ]}
      >
        <Text style={[styles.cardTitle, { color: isDarkMode ? '#fff' : '#333' }]}>Summary</Text>
        <View style={styles.summaryRow}>
          <Text style={[styles.summaryLabel, { color: isDarkMode ? '#ccc' : '#555' }]}>Name:</Text>
          <Text style={[styles.summaryValue, { color: isDarkMode ? '#fff' : '#000' }]}>{data.name}</Text>
        </View>
        <View style={styles.summaryRow}>
          <Text style={[styles.summaryLabel, { color: isDarkMode ? '#ccc' : '#555' }]}>Email:</Text>
          <Text style={[styles.summaryValue, { color: isDarkMode ? '#fff' : '#000' }]}>{data.email}</Text>
        </View>
        <View style={styles.summaryRow}>
          <Text style={[styles.summaryLabel, { color: isDarkMode ? '#ccc' : '#555' }]}>Phone:</Text>
          <Text style={[styles.summaryValue, { color: isDarkMode ? '#fff' : '#000' }]}>{data.phone}</Text>
        </View>
        <View style={styles.summaryRow}>
          <Text style={[styles.summaryLabel, { color: isDarkMode ? '#ccc' : '#555' }]}>Country:</Text>
          <Text style={[styles.summaryValue, { color: isDarkMode ? '#fff' : '#000' }]}>{data.country}</Text>
        </View>
        <View style={styles.summaryRow}>
          <Text style={[styles.summaryLabel, { color: isDarkMode ? '#ccc' : '#555' }]}>State:</Text>
          <Text style={[styles.summaryValue, { color: isDarkMode ? '#fff' : '#000' }]}>{data.state}</Text>
        </View>
        <View style={styles.summaryRow}>
          <Text style={[styles.summaryLabel, { color: isDarkMode ? '#ccc' : '#555' }]}>City:</Text>
          <Text style={[styles.summaryValue, { color: isDarkMode ? '#fff' : '#000' }]}>{data.city}</Text>
        </View>
        <View style={styles.summaryRow}>
          <Text style={[styles.summaryLabel, { color: isDarkMode ? '#ccc' : '#555' }]}>ZIP Code:</Text>
          <Text style={[styles.summaryValue, { color: isDarkMode ? '#fff' : '#000' }]}>{data.zip}</Text>
        </View>
      </View>

       <View style={styles.buttonGroup}>
        <TouchableOpacity
          style={[styles.button, styles.backButton, { backgroundColor: isDarkMode ? '#444' : '#e0e0e0' }]}
          onPress={() => navigation.navigate('Step1')}
        >
          <Text style={styles.buttonText}>Back to Step 1</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, styles.backButton, { backgroundColor: isDarkMode ? '#444' : '#e0e0e0' }]}
          onPress={() => navigation.navigate('Step2')}
        >
          <Text style={styles.buttonText}>Back to Step 2</Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity
        style={[styles.button, styles.submitButton, { backgroundColor: isDarkMode ? '#388e3c' : '#4CAF50' }]}
        onPress={handleSubmit}
      >
        <Text style={styles.buttonText}>Submit</Text>
      </TouchableOpacity>

       {isSubmitted && (
        <Modal transparent={true} animationType="fade" visible={isSubmitted}>
          <View style={styles.modalContainer}>
            <LottieView
              source={require('../../assets/successanimation.json')} 
              autoPlay
              loop={false}
              style={styles.lottie}
            />
            <Text style={[styles.successText, { color: isDarkMode ? '#fff' : '#000' }]}>Form Submitted Successfully!</Text>
          </View>
        </Modal>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  card: {
    borderRadius: 10,
    padding: 16,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 5 },
    shadowRadius: 10,
    elevation: 5,
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 8,
  },
  summaryLabel: {
    fontSize: 16,
    fontWeight: '500',
  },
  summaryValue: {
    fontSize: 16,
    fontWeight: '400',
  },
  buttonGroup: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  button: {
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    minWidth: 120,
  },
  backButton: {},
  submitButton: {},
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',  
  },
  lottie: {
    width: 200,
    height: 200,
  },
  successText: {
    marginTop: 20,
    fontSize: 18,
    fontWeight: '600',
  },
});

export default Step3;
