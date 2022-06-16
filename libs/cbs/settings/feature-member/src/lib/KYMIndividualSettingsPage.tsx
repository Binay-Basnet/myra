import React from 'react';

import { Box } from '@coop/shared/ui';

import { IncomeSourceDetailsAccComponent } from '../components/IncomeSourceDetailsAccComponent';
import { KYMDeclaration } from '../components/KYMDeclaration';
import { KYMSettings } from '../components/KYMSettings';

interface FieldType {
  key: string;
  label: string;
  component?: (props: any) => JSX.Element;
  children?: FieldType[];
}

const UPDATED_KYM_FIELDS: FieldType[] = [
  {
    key: 'personal_information',
    label: 'Personal Information',
    children: [
      {
        key: 'gender',
        label: 'Gender',
      },
      {
        key: 'nationality',
        label: 'Nationality',
      },
      {
        key: 'education_qualification',
        label: 'Education Qualification',
      },
      {
        key: 'religion',
        label: 'Religion',
      },
      {
        key: 'ethnicity',
        label: 'Ethnicity',
      },
      {
        key: 'contact_details',
        label: 'Contact Details',
      },
      {
        key: 'identification_documents',
        label: 'Identification Documents',
        children: [
          {
            key: 'citizenship',
            label: 'Citizenship',
          },
          {
            key: 'voter_id',
            label: 'Voter Id',
          },
          {
            key: 'driving_license',
            label: 'Driving License',
          },
        ],
      },
      {
        key: 'marital_status',
        label: 'Marital Status',
      },
      {
        key: 'family_relationship',
        label: 'Family Relationship',
      },
      {
        key: 'family_information',
        label: 'Family Information',
      },
    ],
  },
  {
    key: 'Professional Information',
    label: 'Professional Information',
    children: [
      {
        label: 'Occupation',
        key: 'occupation',
      },
      {
        label: 'Occupation Details',
        key: 'occupation_details',
      },
      {
        label: 'Family Income',
        key: 'family_income',
      },
      {
        label: 'Income Source Details',
        key: 'income_source_details',
        component: IncomeSourceDetailsAccComponent,
      },
      {
        label: 'Estimated Annual Transaction',
        key: 'est_annual_transaction',
      },
    ],
  },
  {
    key: 'Cooperative Member',
    label: 'Cooperative Member',
    children: [
      {
        label: 'Purpose of becoming a member of this cooperative',
        key: 'purpose_of_becoming_member',
      },
      {
        label: 'Other Cooperative Details',
        key: 'other_cooperative_details',
      },
      {
        label: 'Other Cooperative Details',
        key: 'other_cooperative_details',
      },
      {
        label: 'Financial Transaction Details',
        key: 'financial_transaction_details',
      },
    ],
  },
  {
    key: 'Declaration',
    label: 'declaration',
    children: [
      {
        label: 'Next to Kin Information',
        key: 'next_to_kin',
      },
      {
        label: 'Foreign Employment Options',
        key: 'foreign_employment_options',
      },
      {
        label: 'File Uploads',
        key: 'file_uploads',
      },
      {
        label: 'Declaration',
        key: 'declaration',
        component: KYMDeclaration,
      },
    ],
  },
];

// ================================================================================================ //

export const KYMIndividualSettingsPage = () => {
  return (
    <Box display="flex" flexDirection="column" gap="s16">
      {UPDATED_KYM_FIELDS.map((sectionFields) => (
        <KYMSettings fields={sectionFields} />
      ))}
    </Box>
  );
};

// ================================================================================================ /
