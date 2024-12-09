import React, { createContext, useContext, useState, ReactNode } from 'react';

interface FormData {
  name: string;
  email: string;
  phone: string;
  country: string;
  state: string;
  city: string;
  zip: string;
}

interface FormContextType {
  data: FormData;
  updateData: (newData: Partial<FormData>) => void;
}

const FormContext = createContext<FormContextType | null>(null);

export const useFormContext = () => {
  const context = useContext(FormContext);

  if (!context) {
    throw new Error('useFormContext must be used within a FormProvider');
  }

  return context;
};

interface FormProviderProps {
  children: ReactNode;
}

export const FormProvider: React.FC<FormProviderProps> = ({ children }) => {
  const [data, setData] = useState<FormData>({
    name: '',
    email: '',
    phone: '',
    country: '',
    state: '',
    city: '',
    zip: '',
  });

  const updateData = (newData: Partial<FormData>) => {
    setData((prev) => ({ ...prev, ...newData }));
  };

  return (
    <FormContext.Provider value={{ data, updateData }}>
      {children}
    </FormContext.Provider>
  );
};

export default FormContext;
