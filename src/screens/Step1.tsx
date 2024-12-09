import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Modal,
  ScrollView,
} from 'react-native';
import {Formik} from 'formik';
import * as Yup from 'yup';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from '../types/types';
import {useFormContext} from '../context/FormContext';
import {useTheme} from '../context/ThemeContext';
import StepIndicator from '../components/StepIndicator';
import {Switch} from 'react-native-paper';

type Step1Props = NativeStackScreenProps<RootStackParamList, 'Step1'>;

const Step1: React.FC<Step1Props> = ({navigation}) => {
  const {data, updateData} = useFormContext();
  console.log('data---', data);
  const {isDarkMode, toggleTheme} = useTheme();
  const [isModalVisible, setIsModalVisible] = useState(false);

  const toggleModal = () => {
    setIsModalVisible(!isModalVisible);
  };

  return (
    <View
      style={[
        styles.container,
        {backgroundColor: isDarkMode ? '#121212' : '#fff'},
      ]}>
      <View style={styles.topBar}>
        <Text style={[styles.title, {color: isDarkMode ? '#fff' : '#000'}]}>
          Step 1 Form
        </Text>
        <View style={styles.switchContainer}>
          <Text style={{color: isDarkMode ? '#fff' : '#000', marginRight: 8}}>
            {isDarkMode ? 'Dark Mode' : 'Light Mode'}
          </Text>
          <Switch
            value={isDarkMode}
            onValueChange={toggleTheme}
            color="#4CAF50"
          />
        </View>
      </View>

      <StepIndicator currentStep={1} totalSteps={3} />

      <Formik
        initialValues={data}
        validationSchema={Yup.object({
          name: Yup.string().required('Name is required'),
          email: Yup.string()
            .email('Invalid email')
            .required('Email is required'),
          phone: Yup.string()
            .required('Phone number is required')
            .matches(/^\d{10}$/, 'Phone number must be 10 digits'),
        })}
        onSubmit={values => {
          updateData(values);
          navigation.navigate('Step2');
        }}>
        {({handleChange, handleBlur, handleSubmit, values, errors}) => (
          <View>
            <View style={styles.inputContainer}>
              <Text
                style={[styles.label, {color: isDarkMode ? '#ccc' : '#000'}]}>
                Name:
              </Text>
              <TextInput
                placeholder="Enter your name"
                placeholderTextColor={isDarkMode ? '#888' : '#ccc'}
                value={values.name}
                onChangeText={handleChange('name')}
                onBlur={handleBlur('name')}
                style={[
                  styles.input,
                  {
                    backgroundColor: isDarkMode ? '#1E1E1E' : '#fff',
                    color: isDarkMode ? '#fff' : '#000',
                  },
                ]}
              />
              {errors.name && (
                <Text style={styles.errorText}>{errors.name}</Text>
              )}
            </View>

            <View style={styles.inputContainer}>
              <Text
                style={[styles.label, {color: isDarkMode ? '#ccc' : '#000'}]}>
                Email:
              </Text>
              <TextInput
                placeholder="Enter your email"
                placeholderTextColor={isDarkMode ? '#888' : '#ccc'}
                value={values.email}
                onChangeText={handleChange('email')}
                onBlur={handleBlur('email')}
                style={[
                  styles.input,
                  {
                    backgroundColor: isDarkMode ? '#1E1E1E' : '#fff',
                    color: isDarkMode ? '#fff' : '#000',
                  },
                ]}
              />
              {errors.email && (
                <Text style={styles.errorText}>{errors.email}</Text>
              )}
            </View>

            <View style={styles.inputContainer}>
              <Text
                style={[styles.label, {color: isDarkMode ? '#ccc' : '#000'}]}>
                Phone:
              </Text>
              <TextInput
                placeholder="Enter your phone number"
                placeholderTextColor={isDarkMode ? '#888' : '#ccc'}
                value={values.phone}
                onChangeText={handleChange('phone')}
                onBlur={handleBlur('phone')}
                style={[
                  styles.input,
                  {
                    backgroundColor: isDarkMode ? '#1E1E1E' : '#fff',
                    color: isDarkMode ? '#fff' : '#000',
                  },
                ]}
                keyboardType="numeric"
                maxLength={10}
              />
              {errors.phone && (
                <Text style={styles.errorText}>{errors.phone}</Text>
              )}
            </View>

            <TouchableOpacity
              style={[styles.button, styles.submitButton]}
              onPress={() => handleSubmit()}>
              <Text style={styles.buttonText}>Next</Text>
            </TouchableOpacity>
          </View>
        )}
      </Formik>

      <Modal
        visible={isModalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={toggleModal}>
        <View style={styles.modalBackground}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>Saved Data</Text>
            <ScrollView>
              {data ? (
                <>
                  <View style={styles.savedData}>
                    <Text style={styles.savedText}>Name: {data.name}</Text>
                    <Text style={styles.savedText}>Email: {data.email}</Text>
                    <Text style={styles.savedText}>Phone: {data.phone}</Text>
                    <Text style={styles.savedText}>City: {data.city}</Text>
                    <Text style={styles.savedText}>State: {data.state}</Text>
                    <Text style={styles.savedText}>
                      Country: {data.country}
                    </Text>
                    <Text style={styles.savedText}>Zip: {data.zip}</Text>
                  </View>
                </>
              ) : (
                <Text style={styles.noDataText}>No data saved yet.</Text>
              )}
            </ScrollView>
            <TouchableOpacity style={styles.closeButton} onPress={toggleModal}>
              <Text style={styles.buttonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
      {data && (
        <TouchableOpacity
          style={styles.showSavedDataButton}
          onPress={toggleModal}>
          <Text style={styles.buttonText}>Show Saved Data</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
    borderColor: '#E0E0E0',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  topBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 8,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  switchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  label: {
    fontSize: 16,
    fontWeight: '500',
  },
  inputContainer: {
    marginBottom: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    padding: 12,
    marginVertical: 8,
    height: 45,
    backgroundColor: '#f9f9f9',
    color: '#333',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.08,
    shadowRadius: 6,
    elevation: 2,
  },
  inputError: {
    borderColor: 'red',
    shadowOpacity: 0.2,
    shadowColor: 'red',
  },
  errorText: {
    color: 'red',
    fontSize: 12,
    marginTop: 4,
  },
  button: {
    padding: 12,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    minWidth: 120,
  },
  submitButton: {
    backgroundColor: '#4CAF50',
    marginTop: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  showSavedDataButton: {
    marginTop: 20,
    padding: 12,
    backgroundColor: '#007BFF',
    borderRadius: 10,
    alignSelf: 'flex-end',
    width: 150,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalBackground: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContainer: {
    width: '80%',
    padding: 20,
    backgroundColor: '#fff',
    borderRadius: 10,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  savedData: {
    marginBottom: 15,
    padding: 20,
    backgroundColor: '#f1f1f1',
    borderRadius: 8,
  },
  savedText: {
    fontSize: 16,
  },
  separator: {
    borderBottomWidth: 1,
    borderColor: '#ccc',
    marginTop: 10,
  },
  noDataText: {
    fontSize: 16,
    color: '#888',
  },
  closeButton: {
    marginTop: 20,
    padding: 12,
    backgroundColor: '#FF5733',
    borderRadius: 8,
    alignItems: 'center',
    width:100
  },
});

export default Step1;
