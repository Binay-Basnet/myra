import { Kym_Field_Parent } from '@coop/shared/data-access';

import { IncomeSourceDetailsAccComponent } from '../components/IncomeSourceDetailsAccComponent';
import { KYMDeclaration } from '../components/KYMDeclaration';
import { KYMCustomFieldEnum, KYMFieldParentEnum } from '../types';

interface FieldType {
  customId?: KYMCustomFieldEnum;
  parentId?: KYMFieldParentEnum;
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
        customId: KYMCustomFieldEnum.Gender,
        key: 'Gender',
        label: 'settingsMemberGender',
      },
      {
        customId: KYMCustomFieldEnum.Nationality,
        key: 'nationality',
        label: 'settingsMemberNationality',
      },
      {
        customId: KYMCustomFieldEnum.EducationQualification,
        key: 'education_qualification',
        label: 'settingsMemberEducationQualification',
      },
      {
        customId: KYMCustomFieldEnum.Religion,
        key: 'religion',
        label: 'settingsMemberReligion',
      },
      {
        customId: KYMCustomFieldEnum.Ethnicity,
        key: 'ethnicity',
        label: 'settingsMemberEthnicity',
      },
      {
        customId: KYMCustomFieldEnum.ContactDetails,
        key: 'Contact Details',
        label: 'settingsMemberContactDetails',
      },
      {
        key: 'customIdentification_documents',
        label: 'settingsMemberIdentificationDocuments',
        parentId: Kym_Field_Parent.Identification,
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
        customId: KYMCustomFieldEnum.MaritalStatus,
        key: 'marital_status',
        label: 'settingsMemberMaritalStatus',
      },
      {
        customId: KYMCustomFieldEnum.Relationship,
        key: 'family_relationship',
        label: 'settingsMemberFamilyRelationship',
      },
      {
        customId: KYMCustomFieldEnum.FamilyInformation,
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
        customId: KYMCustomFieldEnum.Occupation,
        label: 'settingsMemberOccupation',
        key: 'occupation',
      },
      {
        customId: KYMCustomFieldEnum.OccupationDetails,
        label: 'settingsMemberOccupationDetails',
        key: 'occupation_details',
      },
      {
        customId: KYMCustomFieldEnum.FamilyIncomeSource,
        label: 'settingsMemberFamilyIncome',
        key: 'family_income',
      },
      {
        customId: KYMCustomFieldEnum.IncomeSourceDetails,
        label: 'settingsMemberIncomeSourceDetails',
        key: 'income_source_details',
        component: IncomeSourceDetailsAccComponent,
      },
      {
        customId: KYMCustomFieldEnum.EstimatedAnnualTransaction,
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
        customId: KYMCustomFieldEnum.Purpose,
        label: 'settingsMemberPurposeOfBecomingAMemberOfThisCooperative',
        key: 'purpose_of_becoming_member',
      },
      {
        customId: KYMCustomFieldEnum.OtherCooperativeDetails,
        label: 'settingsMemberOtherCooperativeDetails',
        key: 'other_cooperative_details',
      },
      {
        customId: KYMCustomFieldEnum.FinancialTransactionDetails,
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
        customId: KYMCustomFieldEnum.NextToKinInformation,
        label: 'settingsMemberNextToKinInformation',
        key: 'next_to_kin',
      },
      {
        customId: KYMCustomFieldEnum.ForeignEmploymentOptions,
        label: 'settingsMemberForeignEmploymentOptions',
        key: 'foreign_employment_options',
      },
      {
        customId: KYMCustomFieldEnum.FileUploads,
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
