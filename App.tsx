import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Step1 from './src/screens/Step1';
import Step2 from './src/screens/Step2';
import Step3 from './src/screens/Step3';
import SubmittedDataScreen from './src/screens/SubmittedDataScreen';
import {FormProvider} from './src/context/FormContext';
import {RootStackParamList} from './src/types/types';
import {ThemeProvider} from './src/context/ThemeContext';  

const Stack = createNativeStackNavigator<RootStackParamList>();

const App = () => {
  return (
    <ThemeProvider>
      <FormProvider>
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen
              name="Step1"
              component={Step1}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="Step2"
              component={Step2}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="Step3"
              component={Step3}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="SubmittedData"
              component={SubmittedDataScreen}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </FormProvider>
    </ThemeProvider>
  );
};

export default App;
