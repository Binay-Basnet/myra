import React from 'react';

import { KYMSettings } from '../components/KYMSettings';

const KYM_FIELDS: Record<string, Array<string | Record<string, string[]>>> = {
  'Personal Information': [
    'gender',
    'nationality',
    'education_qualification',
    'religion',
    'ethnicity',
    'contact_details',
    {
      identification_documents: ['citizenship', 'voter_id', 'driving_license'],
    },
    'marital_status',
    'family_relationship',
    'family_information',
  ],
  'Professional Information': [
    'occupation',
    'occupation_details',
    'family_income',
    'income_source_details', // LEFT
    'est_annual_transaction',
  ],
  'Cooperative Member': [
    'purpose_of_becoming_member',
    'other_cooperative_details',
    'financial_transaction_details',
  ],
  Declaration: [
    'next_to_kin',
    'foreign_employment_options',
    'file_uploads', // UPLOAD
    'declaration', // LEFT
  ],
};

// ================================================================================================ //

export const KYMIndividualSettingsPage = () => {
  return <KYMSettings fields={KYM_FIELDS} />;
};

// ================================================================================================ /
