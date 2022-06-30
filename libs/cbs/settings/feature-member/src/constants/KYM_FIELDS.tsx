import { Kym_Field_Custom_Id as KYMOptionEnum } from '@coop/shared/data-access';

import { IncomeSourceDetailsAccComponent } from '../components/IncomeSourceDetailsAccComponent';
import { KYMDeclaration } from '../components/KYMDeclaration';

interface FieldType {
  customId?: KYMOptionEnum;
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
        customId: KYMOptionEnum.Gender,
        key: 'Gender',
        label: 'settingsMemberGender',
      },
      {
        customId: KYMOptionEnum.Nationality,
        key: 'nationality',
        label: 'settingsMemberNationality',
      },
      {
        customId: KYMOptionEnum.EducationQualification,
        key: 'education_qualification',
        label: 'settingsMemberEducationQualification',
      },
      {
        customId: KYMOptionEnum.Religion,
        key: 'religion',
        label: 'settingsMemberReligion',
      },
      {
        customId: KYMOptionEnum.Ethnicity,
        key: 'ethnicity',
        label: 'settingsMemberEthnicity',
      },
      {
        customId: KYMOptionEnum.ContactDetails,
        key: 'Contact Details',
        label: 'settingsMemberContactDetails',
      },
      {
        key: 'customIdentification_documents',
        label: 'settingsMemberIdentificationDocuments',
        hasChildren: true,
        children: [
          // {
          //   key: 'citizenship',
          //   label: 'settingsMemberCitizenship',
          // },
          // {
          //   key: 'voter_customId',
          //   label: 'settingsMemberVoterId',
          // },
          // {
          //   key: 'driving_license',
          //   label: 'settingsMemberDrivingLicense',
          // },
        ],
      },
      {
        customId: KYMOptionEnum.MaritalStatus,
        key: 'marital_status',
        label: 'settingsMemberMaritalStatus',
      },
      {
        customId: KYMOptionEnum.Relationship,
        key: 'family_relationship',
        label: 'settingsMemberFamilyRelationship',
      },
      {
        customId: KYMOptionEnum.FamilyInformation,
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
        customId: KYMOptionEnum.Occupation,
        label: 'settingsMemberOccupation',
        key: 'occupation',
      },
      {
        customId: KYMOptionEnum.OccupationDetails,
        label: 'settingsMemberOccupationDetails',
        key: 'occupation_details',
      },
      {
        customId: KYMOptionEnum.FamilyIncomeSource,
        label: 'settingsMemberFamilyIncome',
        key: 'family_income',
      },
      {
        customId: KYMOptionEnum.IncomeSourceDetails,
        label: 'settingsMemberIncomeSourceDetails',
        key: 'income_source_details',
        component: IncomeSourceDetailsAccComponent,
      },
      {
        customId: KYMOptionEnum.EstimatedAnnualTransaction,
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
        customId: KYMOptionEnum.Purpose,
        label: 'settingsMemberPurposeOfBecomingAMemberOfThisCooperative',
        key: 'purpose_of_becoming_member',
      },
      {
        customId: KYMOptionEnum.OtherCooperativeDetails,
        label: 'settingsMemberOtherCooperativeDetails',
        key: 'other_cooperative_details',
      },
      {
        customId: KYMOptionEnum.FinancialTransactionDetails,
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
        customId: KYMOptionEnum.NextToKinInformation,
        label: 'settingsMemberNextToKinInformation',
        key: 'next_to_kin',
      },
      {
        customId: KYMOptionEnum.ForeignEmploymentOptions,
        label: 'settingsMemberForeignEmploymentOptions',
        key: 'foreign_employment_options',
      },
      {
        customId: KYMOptionEnum.FileUploads,
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
