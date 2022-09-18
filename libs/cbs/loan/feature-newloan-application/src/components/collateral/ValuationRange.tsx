import { useFormContext } from 'react-hook-form';

import { Alert, Box, GridItem, Text } from '@coop/shared/ui';

import { useLoanProductContext } from '../../hooks/useLoanProduct';

export const ValuationRange = () => {
  const { watch } = useFormContext();

  const { product } = useLoanProductContext();

  const collateralType = watch('collateralType');

  const collateral = product?.collateralValue?.find((c) => c?.type === collateralType);

  return (
    <GridItem colSpan={4}>
      <Alert status="info" title="Range" hideCloseIcon>
        <Box pt="s8" as="ul">
          <li>
            {collateral?.name?.toLowerCase().includes('land') ? (
              <Text fontWeight="400" fontSize="r1">
                FMV:{' '}
                <b>
                  {collateral?.minFMV} - {collateral?.maxFMV}%
                </b>{' '}
                and DV:
                <b>
                  {' '}
                  {collateral?.minDV} - {collateral?.maxDV}%
                </b>
              </Text>
            ) : (
              <Text fontWeight="400" fontSize="r1">
                {collateral?.name?.toLowerCase().includes('vehicle')
                  ? 'Deprecated Value: '
                  : 'Valuation Percentage: '}
                <b>
                  {collateral?.minValue} - {collateral?.maxValue}%
                </b>
              </Text>
            )}
          </li>
        </Box>
      </Alert>
    </GridItem>
  );
};
