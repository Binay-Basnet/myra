import * as yup from 'yup';

export const validationSchema = yup.object().shape({
  firstName: yup.string().required('First Name is required'),
  lastName: yup.string().required('Last Name is required'),
  middleName: yup.string().notRequired(),
  gender: yup.string().required('Gender is required'),
  title: yup.string().required('Title is required'),
  dateOfBirth: yup.string().required('Date of birth is required'),
  nationality: yup.string().required('Nationality is required'),
  citizenshipNo: yup.string().required('Citizenship No is required'),
  citizenshipPlaceOfIssue: yup
    .string()
    .required('Citizeship Issue Placed is required'),
  citizenshipIssueDate: yup
    .string()
    .required('Citizenship Issue Date is required'),
  occupation: yup.string().required('Occupation  is required'),
  panNumber: yup.string().required('Pan Number is required'),

  fatherName: yup.string().required('Father name is  required'),
  motherName: yup.string().required('Mother name  is required'),
  grandfatherName: yup.string().required('Grandfather name is required'),
  grandmotherName: yup.string().required('Grandmother name  is required'),
  spouseName: yup.string().notRequired(),

  state: yup.string().required('State is required'),
  district: yup.string().required('District is required'),
  vdc: yup.string().required('VDC/Municipality is required'),
  wardNo: yup.string().required('Ward no is required'),
  locality: yup.string().required('Locality is required'),

  officeNo: yup.string().notRequired(),
  residenceNo: yup.string().notRequired(),
  mobileNo: yup
    .number()
    .positive()
    .typeError('please type number ')
    .test(
      'len',
      'Must be exactly 10 characters',
      (val) => !!val && val.toString().length === 10
    )
    .required('Mobile Number is required'),

  nomineeFirstname: yup.string().required('First Name  is required'),
  nomineeMiddlename: yup.string().notRequired(),
  nomineeLastname: yup.string().required('Last Name  is required'),
  nomineeTitle: yup.string().required(' Title is required'),
  nomineeRelation: yup.string().required('Relation is required'),
  nomineePremanentAddress: yup
    .string()
    .required('Permanent address is required'),
  nomineeCitizenshipNo: yup.string().required('Citizenship Number is required'),
  nomineeCitizenshipPlaceOfIssue: yup
    .string()
    .required('Citizenship Issue Place is required'),
  nomineeContactNo: yup
    .string()
    .required('Nominee Contact Number  is required'),
});
