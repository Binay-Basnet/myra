import { Box, DetailsCard, Grid, Text } from '@myra-ui';

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
  <DetailsCard title="Interest Breakdown" hasTable>
    <Text fontSize="r1" fontWeight={500} px="s16">
      Account Premium
    </Text>
    <Grid
      p="s16"
      pt="0"
      templateColumns="repeat(3,1fr)"
      gap="s16"
      sx={{
        '@media print': {
          py: 's8',
          px: '0',
          gap: 's8',
        },
      }}
    >
      {' '}
      <Box px="s16" fontSize="r1">
        <ul>
          <li>
            Minimum Rate:&nbsp;
            <b>{interestRate?.minRate !== null ? `${interestRate?.minRate} %` : 'N/A'}</b>
          </li>
          <li>
            Maximum Rate: &nbsp;
            <b>{interestRate?.maxRate !== null ? `${interestRate?.maxRate} %` : 'N/A'}</b>
          </li>

          <li>
            Default Rate: &nbsp;
            <b>{interestRate?.defaultRate !== null ? `${interestRate?.defaultRate} %` : 'N/A'}</b>
          </li>
        </ul>
      </Box>
      <Box px="s16" fontSize="r1" textTransform="capitalize">
        <ul>
          <li>
            CEO Authentication: &nbsp;
            <b>{interestRate?.ceoAuthority !== null ? `${interestRate?.ceoAuthority} %` : 'N/A'}</b>
          </li>
          <li>
            Board Authentication: &nbsp;
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
    </Grid>
    <Grid
      pt="0"
      templateColumns="repeat(3,1fr)"
      gap="s16"
      sx={{
        '@media print': {
          py: 's8',
          px: '0',
          gap: 's8',
        },
      }}
    >
      <Text fontSize="r1" fontWeight={500} px="s16">
        Allowable Change in Interest Rate
      </Text>
      <Box px="s16" fontSize="r1" textTransform="capitalize">
        <ul>
          <li>
            Effective Interest Rate: &nbsp;
            <b>
              {currentOrgRate && productPremium && interestRate?.defaultRate
                ? `${
                    Number(currentOrgRate) +
                    Number(productPremium) +
                    Number(interestRate?.defaultRate)
                  } %`
                : 'N/A'}
            </b>
          </li>
        </ul>
      </Box>
    </Grid>
    <Grid
      p="s16"
      pt="0"
      templateColumns="repeat(3,1fr)"
      gap="s16"
      sx={{
        '@media print': {
          py: 's8',
          px: '0',
          gap: 's8',
        },
      }}
    >
      <Box px="s16" fontSize="r1" textTransform="capitalize">
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
    </Grid>
  </DetailsCard>
);
