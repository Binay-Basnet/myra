import { IncomeSourceDetailsAccComponent } from '../components/IncomeSourceDetailsAccComponent';
import { KYMDeclaration } from '../components/KYMDeclaration';

interface FieldType {
  id?: string;
  key?: string;
  label: string;
  hasChildren?: boolean;
  component?: (props: { isExpanded: boolean }) => JSX.Element;
  children?: FieldType[];
}

export const KYM_FIELDS: FieldType[] = [
  {
    key: 'personal_information',
    label: 'settingsMemberSection1PersonalInformation',
    children: [
      {
        key: 'gender',
        label: 'settingsMemberGender',
      },
      {
        key: 'nationality',
        label: 'settingsMemberNationality',
      },
      {
        key: 'education_qualification',
        label: 'settingsMemberEducationQualification',
      },
      {
        key: 'religion',
        label: 'settingsMemberReligion',
      },
      {
        key: 'ethnicity',
        label: 'settingsMemberEthnicity',
      },
      {
        key: 'contact_details',
        label: 'settingsMemberContactDetails',
      },
      {
        key: 'identification_documents',
        label: 'settingsMemberIdentificationDocuments',
        hasChildren: true,
        children: [
          // {
          //   key: 'citizenship',
          //   label: 'settingsMemberCitizenship',
          // },
          // {
          //   key: 'voter_id',
          //   label: 'settingsMemberVoterId',
          // },
          // {
          //   key: 'driving_license',
          //   label: 'settingsMemberDrivingLicense',
          // },
        ],
      },
      {
        key: 'marital_status',
        label: 'settingsMemberMaritalStatus',
      },
      {
        key: 'family_relationship',
        label: 'settingsMemberFamilyRelationship',
      },
      {
        key: 'family_information',
        label: 'settingsMemberFamilyInformation',
      },
    ],
  },
  {
    key: 'Professional Information',
    label: 'settingsMemberSection2ProfessionalInformation',
    children: [
      {
        label: 'settingsMemberOccupation',
        key: 'occupation',
      },
      {
        label: 'settingsMemberOccupationDetails',
        key: 'occupation_details',
      },
      {
        label: 'settingsMemberFamilyIncome',
        key: 'family_income',
      },
      {
        label: 'settingsMemberIncomeSourceDetails',
        key: 'income_source_details',
        component: IncomeSourceDetailsAccComponent,
      },
      {
        label: 'settingsMemberEstimatedAnnualTransaction',
        key: 'est_annual_transaction',
      },
    ],
  },
  {
    key: 'Cooperative Member',
    label: 'settingsMemberSection3CooperativeMember',
    children: [
      {
        label: 'settingsMemberPurposeOfBecomingAMemberOfThisCooperative',
        key: 'purpose_of_becoming_member',
      },
      {
        label: 'settingsMemberOtherCooperativeDetails',
        key: 'other_cooperative_details',
      },
      {
        label: 'settingsMemberFinancialTransactionDetails',
        key: 'financial_transaction_details',
      },
    ],
  },
  {
    key: 'declaration',
    label: 'settingsMemberSection4Declaration',
    children: [
      {
        label: 'settingsMemberNextToKinInformation',
        key: 'next_to_kin',
      },
      {
        label: 'settingsMemberForeignEmploymentOptions',
        key: 'foreign_employment_options',
      },
      {
        label: 'settingsMemberFileUploads',
        key: 'file_uploads',
      },
      {
        label: 'settingsMemberDeclaration',
        key: 'declaration',
        component: KYMDeclaration,
      },
    ],
  },
  {
    key: 'custom',
    label: 'settingsMemberSection5CustomFields',
  },
];
