import { FormEditableTable } from '@coop/shared/form';
import { Box, Grid, GridItem, Text } from '@myra-ui';
import { useTranslation } from '@coop/shared/utils';

type QuickPaymentTableType = {
  account: string;
  amount: string;
};

export const QuickPaymentTable = () => {
  const { t } = useTranslation();

  return (
    <Box display="flex" flexDir="column" gap="s12">
      <FormEditableTable<QuickPaymentTableType>
        name="data"
        columns={[
          {
            accessor: 'account',
            header: t['accountingQuickPaymentFormTableAccount'],
            cellWidth: 'auto',
          },
          {
            accessor: 'amount',
            header: t['accountingQuickPaymentFormTableAmount'],
            isNumeric: true,
          },
        ]}
      />
      <Grid
        p="s4"
        borderRadius="br2"
        justifyContent="end"
        bg="background.500"
        templateColumns="repeat(3,1fr)"
      >
        <GridItem colSpan={2}>
          <Box textAlign="right" borderRight="1px" borderColor="border.layout">
            <Text fontWeight="SemiBold" fontSize="r1" color="Gray.800" lineHeight="25px" mr="s8">
              Total
            </Text>
          </Box>
        </GridItem>
        <GridItem colSpan={1}>
          <Box display="flex" justifyContent="center">
            <Text fontWeight="SemiBold" fontSize="r1" color="Gray.800" lineHeight="25px" mr="s8">
              4500
            </Text>
          </Box>
        </GridItem>
      </Grid>
    </Box>
  );
};
