 import React from 'react';
import {View, Text, StyleSheet, ScrollView, TouchableOpacity} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from '../types/types';
import {useTheme} from '../context/ThemeContext';   

type SubmittedDataScreenProps = NativeStackScreenProps<
  RootStackParamList,
  'SubmittedData'
>;

const SubmittedDataScreen: React.FC<SubmittedDataScreenProps> = ({route, navigation}) => {
  const {data} = route.params;  
  const {isDarkMode} = useTheme();   

  const handleGoHome = () => {
    navigation.navigate('Step1');  
  };

  return (
    <ScrollView
      contentContainerStyle={[
        styles.container,
        {backgroundColor: isDarkMode ? '#121212' : '#f9f9f9'},  
      ]}
    >
      <View
        style={[
          styles.card,
          {backgroundColor: isDarkMode ? '#333' : '#fff'},  
        ]}
      >
        {Object.entries(data).map(([key, value]) => (
          <View key={key} style={styles.row}>
            <Text
              style={[
                styles.label,
                {color: isDarkMode ? '#ccc' : '#555'}, 
              ]}
            >
              {key.charAt(0).toUpperCase() + key.slice(1)}:
            </Text>
            <Text
              style={[
                styles.value,
                {color: isDarkMode ? '#fff' : '#333'},  
              ]}
            >
              {String(value)}
            </Text>
          </View>
        ))}
      </View>

       <TouchableOpacity
        style={[styles.button, styles.homeButton]}
        onPress={handleGoHome}
      >
        <Text style={styles.buttonText}>Go to Home</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 16,
  },
  card: {
    padding: 16,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: {width: 0, height: 5},
    shadowRadius: 10,
    elevation: 5,
    marginBottom: 20,  
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 8,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
  },
  value: {
    fontSize: 16,
  },
  button: {
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    minWidth: 120,
    marginTop: 16,
  },
  homeButton: {
    backgroundColor: '#4CAF50',  
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default SubmittedDataScreen;
