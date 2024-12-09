import * as Yup from 'yup';

export const personalDetailsSchema = Yup.object({
  name: Yup.string().required('Name is required'),
  email: Yup.string().email('Invalid email').required('Email is required'),
  phone: Yup.string().required('Phone is required'),
});

export const addressDetailsSchema = Yup.object({
  country: Yup.string().required('Country is required'),
  state: Yup.string().required('State is required'),
  city: Yup.string().required('City is required'),
  zip: Yup.string().required('ZIP code is required'),
});
