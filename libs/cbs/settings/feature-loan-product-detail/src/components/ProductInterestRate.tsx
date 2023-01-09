import { Box, DetailsCard } from '@myra-ui';

import { InterestFormState } from '@coop/cbs/data-access';

export const ProductInterestRate = ({
  interestRate,
}: {
  interestRate: InterestFormState | undefined | null;
}) => (
  <DetailsCard title="Interest Rate">
    <Box px="s16" fontSize="r1">
      <ul>
        <li>
          Minimum Rate:&nbsp;
          <b>{interestRate?.minRate !== null ? `${interestRate?.minRate} %` : 'N/A'}</b>
        </li>
        <li>
          Maximum Rate:&nbsp;
          <b>{interestRate?.maxRate !== null ? `${interestRate?.maxRate} %` : 'N/A'}</b>
        </li>

        <li>
          Default Rate:&nbsp;
          <b>{interestRate?.defaultRate !== null ? `${interestRate?.defaultRate} %` : 'N/A'}</b>
        </li>
      </ul>
    </Box>
    <Box px="s16" fontSize="r1" textTransform="capitalize">
      <ul>
        <li>
          CEO Authentication:&nbsp;
          <b>{interestRate?.ceoAuthority !== null ? `${interestRate?.ceoAuthority} %` : 'N/A'}</b>
        </li>
        <li>
          Board Authentication:&nbsp;
          <b>
            {interestRate?.boardAuthority !== null ? `${interestRate?.boardAuthority} %` : 'N/A'}
          </b>
        </li>
      </ul>
    </Box>
  </DetailsCard>
);
