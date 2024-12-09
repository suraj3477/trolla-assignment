import React from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types/types';
import { useFormContext } from '../context/FormContext';
import { useTheme } from '../context/ThemeContext';
import StepIndicator from '../components/StepIndicator';

type Step2Props = NativeStackScreenProps<RootStackParamList, 'Step2'>;

const Step2: React.FC<Step2Props> = ({ navigation }) => {
  const { data, updateData } = useFormContext();
  const { isDarkMode } = useTheme();  

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: isDarkMode ? '#121212' : '#fff' },
      ]}
    >
       <StepIndicator currentStep={2} totalSteps={3} />

       <Formik
        initialValues={{
          country: data.country || '',
          state: data.state || '',
          city: data.city || '',
          zip: data.zip || '',
        }}
        validationSchema={Yup.object({
          country: Yup.string().required('Country is required'),
          state: Yup.string().required('State is required'),
          city: Yup.string().required('City is required'),
          zip: Yup.string()
            .matches(/^\d{5}$/, 'ZIP Code must be 5 digits')
            .required('ZIP Code is required'),
        })}
        onSubmit={(values) => {
          updateData(values);
          navigation.navigate('Step3');
        }}
      >
        {({ handleChange, handleBlur, handleSubmit, values, errors }) => (
          <View>
            <Text
              style={[
                styles.label,
                { color: isDarkMode ? '#ccc' : '#000' },
              ]}
            >
              Country:
            </Text>
            <TextInput
              placeholder="Enter your country"
              placeholderTextColor={isDarkMode ? '#888' : '#ccc'}
              value={values.country}
              onChangeText={handleChange('country')}
              onBlur={handleBlur('country')}
              style={[
                styles.input,
                {
                  backgroundColor: isDarkMode ? '#1E1E1E' : '#fff',
                  color: isDarkMode ? '#fff' : '#000',
                },
              ]}
            />
            {errors.country && (
              <Text style={styles.errorText}>{errors.country}</Text>
            )}

            <Text
              style={[
                styles.label,
                { color: isDarkMode ? '#ccc' : '#000' },
              ]}
            >
              State:
            </Text>
            <TextInput
              placeholder="Enter your state"
              placeholderTextColor={isDarkMode ? '#888' : '#ccc'}
              value={values.state}
              onChangeText={handleChange('state')}
              onBlur={handleBlur('state')}
              style={[
                styles.input,
                {
                  backgroundColor: isDarkMode ? '#1E1E1E' : '#fff',
                  color: isDarkMode ? '#fff' : '#000',
                },
              ]}
            />
            {errors.state && (
              <Text style={styles.errorText}>{errors.state}</Text>
            )}

            <Text
              style={[
                styles.label,
                { color: isDarkMode ? '#ccc' : '#000' },
              ]}
            >
              City:
            </Text>
            <TextInput
              placeholder="Enter your city"
              placeholderTextColor={isDarkMode ? '#888' : '#ccc'}
              value={values.city}
              onChangeText={handleChange('city')}
              onBlur={handleBlur('city')}
              style={[
                styles.input,
                {
                  backgroundColor: isDarkMode ? '#1E1E1E' : '#fff',
                  color: isDarkMode ? '#fff' : '#000',
                },
              ]}
            />
            {errors.city && (
              <Text style={styles.errorText}>{errors.city}</Text>
            )}

            <Text
              style={[
                styles.label,
                { color: isDarkMode ? '#ccc' : '#000' },
              ]}
            >
              ZIP Code:
            </Text>
            <TextInput
              placeholder="Enter your ZIP Code"
              placeholderTextColor={isDarkMode ? '#888' : '#ccc'}
              value={values.zip}
              onChangeText={handleChange('zip')}
              onBlur={handleBlur('zip')}
              style={[
                styles.input,
                {
                  backgroundColor: isDarkMode ? '#1E1E1E' : '#fff',
                  color: isDarkMode ? '#fff' : '#000',
                },
              ]}
              keyboardType="numeric"
              maxLength={5}
            />
            {errors.zip && (
              <Text style={styles.errorText}>{errors.zip}</Text>
            )}

             <View style={styles.buttonContainer}>
              <TouchableOpacity
                style={[styles.button, styles.backButton]}
                onPress={() => navigation.navigate('Step1')}
              >
                <Text style={styles.buttonText}>Back</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.button, styles.submitButton]}
                onPress={() => handleSubmit()}
              >
                <Text style={styles.buttonText}>Next</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      </Formik>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  label: {
    marginTop: 0,  
    fontSize: 16,
    fontWeight: '500',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    padding: 12,
    marginVertical: 12,  
    height: 55,  
    backgroundColor: '#f9f9f9',
    color: '#333',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 6,
    elevation: 2,
  },
  errorText: {
    color: 'red',
    fontSize: 12,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 16,
  },
  button: {
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    minWidth: 120,
  },
  backButton: {
    backgroundColor: '#e0e0e0',
  },
  submitButton: {
    backgroundColor: '#4CAF50',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});


export default Step2;
