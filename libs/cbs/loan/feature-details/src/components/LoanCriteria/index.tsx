import { Box, DetailsCard } from '@coop/shared/ui';

import { useLoanDetails } from '../../hooks/useLoanDetails';

export const LoanCriteria = () => {
  const { loanProduct, loanProductCriteria } = useLoanDetails();

  return (
    <DetailsCard title="Criteria">
      <Box px="s16" fontSize="r1">
        <ul>
          <li>
            Minimum Age: <b>{loanProductCriteria?.minAge}</b>
          </li>
          <li>
            Maximum Age: <b>{loanProductCriteria?.maxAge}</b>
          </li>
          <li>
            Gender: <b>{loanProductCriteria?.gender?.join(', ')}</b>
          </li>
          <li>
            Marital Status:
            <b>{loanProductCriteria?.maritalStatus?.join(', ')}</b>
          </li>
          <li>
            Occupation Detail: <b>{loanProductCriteria?.occupation?.join(', ')}</b>
          </li>
          <li>
            Education Qualification:{' '}
            <b>{loanProductCriteria?.educationQualification?.join(', ')}</b>
          </li>
        </ul>
      </Box>
      <Box px="s16" fontSize="r1" textTransform="capitalize">
        <ul>
          <li>
            Foreign Employment: <b>{loanProduct?.foreignEmployment ? 'Yes' : 'No'}</b>
          </li>
          <li>
            Institution Union Type: <b>{loanProductCriteria?.institutionType}</b>
          </li>
          <li>
            Nature of Business: <b>-</b>
          </li>
          <li>
            Cooperative Type
            <b>{loanProductCriteria?.cooperativeType}</b>
          </li>
          <li>
            Ethnicity: <b>{loanProductCriteria?.ethnicity?.join(', ') ?? '-'}</b>
          </li>
        </ul>
      </Box>
    </DetailsCard>
  );
};
