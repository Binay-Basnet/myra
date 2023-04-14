import { Box, Grid, GridItem, Text } from '@myra-ui';

import { FormEditableTable } from '@coop/shared/form';
import { useTranslation } from '@coop/shared/utils';

type CashTransferTableType = {
  transferred_to: string;
  amount: string;
};

export const CashTransferTable = () => {
  const { t } = useTranslation();

  return (
    <Box display="flex" flexDir="column" gap="s12">
      <FormEditableTable<CashTransferTableType>
        name="data"
        columns={[
          {
            accessor: 'transferred_to',
            header: t['accountingCashTransferFormTableTransferredTo'],
            cellWidth: 'auto',
            fieldType: 'select',
          },
          {
            accessor: 'amount',
            header: t['accountingCashTransferFormTableAmount'],
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
