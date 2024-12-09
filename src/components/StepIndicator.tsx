import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

interface StepIndicatorProps {
  currentStep: number;
  totalSteps: number;
}

const StepIndicator: React.FC<StepIndicatorProps> = ({
  currentStep,
  totalSteps,
}) => {
  return (
    <View style={styles.container}>
      {Array.from({length: totalSteps}, (_, index) => {
        const step = index + 1;
        const isActive = step === currentStep;
        const isCompleted = step < currentStep;

        return (
          <View key={step} style={styles.stepContainer}>
            <View
              style={[
                styles.stepCircle,
                isActive
                  ? styles.activeStepCircle
                  : isCompleted
                  ? styles.completedStepCircle
                  : styles.inactiveStepCircle,
              ]}>
              <Text
                style={[
                  styles.stepText,
                  isActive || isCompleted
                    ? styles.activeStepText
                    : styles.inactiveStepText,
                ]}>
                {step}
              </Text>
            </View>

            <Text style={styles.stepLabel}>Step {step}</Text>
          </View>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 20,
    paddingHorizontal: 20,
  },
  stepContainer: {
    alignItems: 'center',
  },
  stepCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  activeStepCircle: {
    backgroundColor: '#4CAF50',
  },
  completedStepCircle: {
    backgroundColor: '#2196F3',
  },
  inactiveStepCircle: {
    backgroundColor: '#E0E0E0',
  },
  stepText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  activeStepText: {
    color: '#FFFFFF',
  },
  inactiveStepText: {
    color: '#9E9E9E',
  },
  connector: {
    position: 'absolute',
    top: 20,
    left: -20,
    right: 20,
    height: 2,
  },
  activeConnector: {
    backgroundColor: '#4CAF50',
  },
  inactiveConnector: {
    backgroundColor: '#E0E0E0',
  },
  stepLabel: {
    marginTop: 8,
    fontSize: 12,
    fontWeight: '500',
    color: '#757575',
  },
});

export default StepIndicator;
