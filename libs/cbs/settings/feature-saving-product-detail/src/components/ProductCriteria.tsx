import { Box, DetailsCard } from '@myra-ui';

import { DepositProductCriteria } from '@coop/ebanking/data-access';

export const ProductCriteria = ({ criteria }: { criteria: DepositProductCriteria }) => (
  <DetailsCard title="Criteria">
    <Box px="s16" fontSize="r1">
      <ul>
        <li>
          Minimum Age: <b>{criteria?.minAge ?? 'N/A'}</b>
        </li>
        <li>
          Maximum Age: <b>{criteria?.maxAge ?? 'N/A'}</b>
        </li>
        <li>
          Gender: <b>{criteria?.gender?.join(', ') ?? 'N/A'}</b>
        </li>
        <li>
          Marital Status: <b>{criteria?.maritalStatus?.join(', ') ?? 'N/A'}</b>
        </li>
        <li>
          Occupation Detail: <b>{criteria?.occupation?.join(', ') ?? 'N/A'}</b>
        </li>
        <li>
          Education Qualification: <b>{criteria?.educationQualification?.join(', ') ?? 'N/A'}</b>
        </li>
      </ul>
    </Box>
    <Box px="s16" fontSize="r1" textTransform="capitalize">
      <ul>
        <li>
          Member Type: <b>{criteria?.foreignEmployment ? 'Yes' : 'No'}</b>
        </li>
        <li>
          Targaeted Profession: <b>{criteria?.institutionType ?? 'N/A'}</b>
        </li>
      </ul>
    </Box>
  </DetailsCard>
);
