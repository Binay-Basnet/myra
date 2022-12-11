import { Box, DetailsCard } from '@myra-ui';

import { KymMemberTypesEnum } from '@coop/cbs/data-access';
import { LoanProductCriteria } from '@coop/ebanking/data-access';

export const ProductCriteria = ({
  criteria,
  memberType,
}: {
  criteria: LoanProductCriteria | null | undefined;
  memberType: (KymMemberTypesEnum | null)[] | null | undefined;
}) => (
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
          Gender: <b>{criteria?.gender ?? 'N/A'}</b>
        </li>
        <li>
          Marital Status: <b>{criteria?.maritalStatus ?? 'N/A'}</b>
        </li>
        <li>
          Occupation Detail: <b>{criteria?.occupation ?? 'N/A'}</b>
        </li>
        <li>
          Education Qualification: <b>{criteria?.educationQualification ?? 'N/A'}</b>
        </li>
      </ul>
    </Box>
    <Box px="s16" fontSize="r1" textTransform="capitalize">
      <ul>
        <li>
          Foreign Employment: <b>{criteria?.foreignEmployment ?? 'N/A'}</b>
        </li>
        <li>
          Member Type: <b>{memberType ?? 'N/A'}</b>
        </li>
        <li>
          Institution Type: <b>{criteria?.institutionType ?? 'N/A'}</b>
        </li>
        <li>
          Cooperative Union Type: <b>{criteria?.cooperativeUnion ?? 'N/A'}</b>
        </li>
      </ul>
    </Box>
  </DetailsCard>
);
