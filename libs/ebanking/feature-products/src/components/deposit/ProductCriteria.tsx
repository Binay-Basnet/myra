import { DepositProductCriteria } from '@coop/ebanking/data-access';
import { Box, DetailsCard } from '@coop/shared/ui';

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
          Education Qualification: <b>{criteria?.educationQualification?.join(', ') ?? 'N/A'}</b>
        </li>
        <li>
          Ethnicity: <b>{criteria?.ethnicity?.join(', ') ?? '-'}</b>
        </li>
      </ul>
    </Box>
    <Box px="s16" fontSize="r1" textTransform="capitalize">
      <ul>
        <li>
          Marital Status: <b>{criteria?.maritalStatus?.join(', ') ?? 'N/A'}</b>
        </li>
        <li>
          Occupation Detail: <b>{criteria?.occupation?.join(', ') ?? 'N/A'}</b>
        </li>
        <li>
          Foreign Employment Details: <b>{criteria?.foreignEmployment ? 'Yes' : 'No'}</b>
        </li>
        <li>
          Institution Type: <b>{criteria?.institutionType ?? 'N/A'}</b>
        </li>
        <li>
          Cooperative Union Type: <b>{criteria?.cooperativeType ?? 'N/A'}</b>
        </li>
      </ul>
    </Box>
  </DetailsCard>
);
