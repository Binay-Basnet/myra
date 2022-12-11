import { Box, DetailsCard } from '@myra-ui';

import { DepositProductCriteria, KymMemberTypesEnum } from '@coop/cbs/data-access';

export const ProductCriteria = ({
  criteria,
  memberType,
}: {
  criteria: DepositProductCriteria | null | undefined;
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
          Member Type: <b>{memberType?.join(', ') ?? 'N/A'}</b>
        </li>
        {/* <li>
          Targeted Profession: <b>{criteria?.institutionType?.join(', ') ?? 'N/A'}</b>
        </li> */}
      </ul>
    </Box>
  </DetailsCard>
);
