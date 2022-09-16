import { useFormContext } from 'react-hook-form';

import { LoanProduct } from '@coop/cbs/data-access';
import { Alert, Box, GridItem, Text } from '@coop/shared/ui';

interface LandCollateralProps {
  product?: LoanProduct;
}

export const ValuationRange = ({ product }: LandCollateralProps) => {
  const { watch } = useFormContext();

  const collateralType = watch('collateralType');

  const collateral = product?.collateralValue?.find((c) => c?.type === collateralType);

  return (
    <GridItem colSpan={4}>
      <Alert status="info" title="Range" hideCloseIcon>
        <Box pt="s8" as="ul">
          <li>
            <Text fontWeight="400" fontSize="r1">
              FMV:
              <b>
                {collateral?.maxFMV}-{collateral?.minFMV}%
              </b>
              and DV
              <b>
                {collateral?.minDV}- {collateral?.maxDV}%
              </b>
            </Text>
          </li>
        </Box>
      </Alert>
    </GridItem>
  );
};
