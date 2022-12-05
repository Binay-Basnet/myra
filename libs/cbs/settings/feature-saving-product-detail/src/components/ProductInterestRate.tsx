import { InterestFormState } from '@coop/cbs/data-access';
import { Box, DetailsCard } from '@myra-ui';

export const ProductInterestRate = ({
  interestRate,
}: {
  interestRate: InterestFormState | undefined | null;
}) => (
  <DetailsCard title="Interest Rate">
    <Box px="s16" fontSize="r1">
      <ul>
        <li>
          Minimum Rate: <b>{`${interestRate?.minRate} %` ?? 'N/A'}</b>
        </li>
        <li>
          Maximum Rate: <b>{`${interestRate?.maxRate} %` ?? 'N/A'}</b>
        </li>

        <li>
          Default Rate: <b>{`${interestRate?.defaultRate} %` ?? 'N/A'}</b>
        </li>
      </ul>
    </Box>
    <Box px="s16" fontSize="r1" textTransform="capitalize">
      <ul>
        <li>
          CEO Authentication: <b>{`${interestRate?.ceoAuthority} %` ?? 'N/A'}</b>
        </li>
        <li>
          Board Authentication: <b>{`${interestRate?.boardAuthority} %` ?? 'N/A'}</b>
        </li>
      </ul>
    </Box>
  </DetailsCard>
);
