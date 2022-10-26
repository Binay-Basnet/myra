import { FrequencyTenure } from '@coop/ebanking/data-access';
import { Box, DetailsCard } from '@coop/shared/ui';

interface ProductTenureProps {
  tenureUnit: FrequencyTenure | undefined | null;
  maxTenure: number | undefined | null;
  minTenure: number | undefined | null;
}

export const ProductTenure = ({ tenureUnit, maxTenure, minTenure }: ProductTenureProps) => {
  if (!maxTenure && !minTenure) return null;

  return (
    <DetailsCard hideBorder title="Tenure">
      <Box px="s16" fontSize="r1" textTransform="capitalize">
        <ul>
          <li>
            Minimum Tenure:{' '}
            <b>
              {minTenure} {tenureUnit?.toLowerCase()}
            </b>
          </li>
          <li>
            Maximum Tenure:{' '}
            <b>
              {maxTenure} {tenureUnit?.toLowerCase()}
            </b>
          </li>
        </ul>
      </Box>
    </DetailsCard>
  );
};
