import { Box, DetailsCard, Text } from '@myra-ui';

import { InterestFormState } from '@coop/cbs/data-access';

interface IProductInterestRateProps {
  interestRate: InterestFormState | undefined | null;
  productPremium: number | null | undefined;
  currentOrgRate: number | null | undefined;
}

export const ProductInterestRate = ({
  interestRate,
  productPremium,
  currentOrgRate,
}: IProductInterestRateProps) => (
  <DetailsCard title="Interest Rate" hasThreeRows>
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
    <Box px="s16" fontSize="r1" textTransform="capitalize">
      <ul>
        <li>
          Organization Rate: &nbsp;
          <b>{typeof currentOrgRate === 'number' ? `${currentOrgRate} %` : 'N/A'}</b>
        </li>
        <li>
          Product Premium: &nbsp;
          <b>{typeof productPremium === 'number' ? `${productPremium} %` : 'N/A'}</b>
        </li>
      </ul>
    </Box>
    <Box px="s16" fontSize="r1" textTransform="capitalize">
      <Text fontSize="r1" fontWeight={500}>
        Allowable Change in Interest Rate
      </Text>
      <ul>
        <li>
          Minimum Rate: &nbsp;
          <b>
            {typeof interestRate?.changeMin === 'number' ? `${interestRate?.changeMin} %` : 'N/A'}
          </b>
        </li>
        <li>
          Maximum Rate: &nbsp;
          <b>
            {typeof interestRate?.changeMax === 'number' ? `${interestRate?.changeMax} %` : 'N/A'}
          </b>
        </li>
      </ul>
    </Box>
  </DetailsCard>
);
