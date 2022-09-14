import { useEffect } from 'react';
import { useFieldArray, useFormContext } from 'react-hook-form';

import { LoanProductInput } from '@coop/cbs/data-access';
import { FormInput } from '@coop/shared/form';
import { Box, Grid, Text } from '@coop/shared/ui';
import { useTranslation } from '@coop/shared/utils';

export const LandAndBuilding = () => {
  const { t } = useTranslation();
  const { watch } = useFormContext<LoanProductInput>();
  const collateralTypes = watch('collateralTypes');

  const { fields, append } = useFieldArray({ name: 'collateralValues' });

  useEffect(() => {
    append({});
  }, [collateralTypes]);

  return (
    <>
      {fields.map((item, index) => (
        <Box
          key={item.id}
          p="s16"
          border="1px solid"
          borderColor="border.layout"
          borderRadius="br2"
        >
          <Grid templateColumns="repeat(2,1fr)" gap="s16">
            <FormInput
              name={`collateralValues.${index}.minFMV`}
              label={t['loanProductMinimumFMV']}
              textAlign="right"
              rightElement={
                <Text fontWeight="Medium" fontSize="r1" color="primary.500">
                  %
                </Text>
              }
              type="number"
            />
            <FormInput
              name={`collateralValues.${index}.maxFMV`}
              label={t['loanProductMaximumFMV']}
              textAlign="right"
              rightElement={
                <Text fontWeight="Medium" fontSize="r1" color="primary.500">
                  %
                </Text>
              }
              type="number"
            />
            <FormInput
              name="landAndBuilding.minDV"
              label={t['loanProductMinimumDV']}
              textAlign="right"
              rightElement={
                <Text fontWeight="Medium" fontSize="r1" color="primary.500">
                  %
                </Text>
              }
              type="number"
            />
            <FormInput
              name="landAndBuilding.maxDV"
              label={t['loanProductMaximumDV']}
              textAlign="right"
              rightElement={
                <Text fontWeight="Medium" fontSize="r1" color="primary.500">
                  %
                </Text>
              }
              type="number"
            />
          </Grid>
        </Box>
      ))}
    </>
  );
};
