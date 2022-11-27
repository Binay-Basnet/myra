import { FormInput } from '@coop/shared/form';
import { Box, Grid, Text } from '@myra-ui';
import { useTranslation } from '@coop/shared/utils';

export const Vehicle = () => {
  const { t } = useTranslation();

  return (
    <Box p="s16" border="1px solid" borderColor="border.layout" borderRadius="br2">
      <Grid templateColumns="repeat(2,1fr)" gap="s16">
        <FormInput
          name="vehicle.minValue"
          label={t['loanProductMinimumPercentageofDepriciatedValue']}
          textAlign="right"
          rightElement={
            <Text fontWeight="Medium" fontSize="r1" color="primary.500">
              %
            </Text>
          }
          type="number"
        />
        <FormInput
          name="vehicle.maxValue"
          label={t['loanProductMaximumPercentageofDepriciatedValue']}
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
  );
};
