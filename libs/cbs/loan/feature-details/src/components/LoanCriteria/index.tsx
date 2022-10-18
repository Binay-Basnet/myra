import { Box, DetailsCard } from '@coop/shared/ui';

import { useLoanDetails } from '../../hooks/useLoanDetails';

export const LoanCriteria = () => {
  const { loanPreview } = useLoanDetails();

  return (
    <DetailsCard title="Criteria">
      <Box px="s16" fontSize="r1">
        <ul>
          <li>
            Minimum Age: <b>{loanPreview?.criteria?.minAge}</b>
          </li>
          <li>
            Maximum Age: <b>{loanPreview?.criteria?.maxAge}</b>
          </li>
          <li>
            Gender: <b>{loanPreview?.criteria?.gender?.join(', ')}</b>
          </li>
          <li>
            Marital Status:
            <b>{loanPreview?.criteria?.maritalStatus?.join(', ')}</b>
          </li>
          <li>
            Occupation Detail: <b>{loanPreview?.criteria?.occupation?.join(', ')}</b>
          </li>
          <li>
            Education Qualification:{' '}
            <b>{loanPreview?.criteria?.educationQualification?.join(', ')}</b>
          </li>
        </ul>
      </Box>
      <Box px="s16" fontSize="r1" textTransform="capitalize">
        <ul>
          <li>
            Foreign Employment: <b>{loanPreview?.criteria?.foreignEmployment ? 'Yes' : 'No'}</b>
          </li>
          <li>
            Institution Union Type: <b>{loanPreview?.criteria?.institutionType}</b>
          </li>
          <li>
            Nature of Business: <b>-</b>
          </li>
          <li>
            Cooperative Type
            <b>{loanPreview?.criteria?.cooperativeType}</b>
          </li>
          <li>
            Ethnicity: <b>{loanPreview?.criteria?.ethnicity?.join(', ') ?? '-'}</b>
          </li>
        </ul>
      </Box>
    </DetailsCard>
  );
};
