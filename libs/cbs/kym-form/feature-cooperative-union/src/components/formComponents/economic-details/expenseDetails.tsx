import { useMemo } from 'react';
import { Box, Divider, Grid, GridItem, Text } from '@chakra-ui/react';

import { FormInput } from '@coop/shared/form';

export const ExpenseDetails = ({ watch }: any) => {
  //   const cashEquivalent = watch('cashAndCashEquivalent');
  //   const bank = watch('bank');
  //   const investments = watch('investments');
  //   const loan = watch('loan');
  //   const currentAssets = watch('nonCurrentAssets');
  //   const nonCurrentAssets = watch('otherNonCurrentAssets');

  //   const totalAssets = useMemo(() => {
  //     return (
  //       Number(cashEquivalent) +
  //       Number(bank) +
  //       Number(investments) +
  //       Number(loan) +
  //       Number(currentAssets) +
  //       Number(nonCurrentAssets)
  //     );
  //   }, [
  //     cashEquivalent,
  //     bank,
  //     investments,
  //     loan,
  //     currentAssets,
  //     nonCurrentAssets,
  //   ]);
  const purchase = isNaN(watch('purchase')) ? 0 : watch('purchase');
  const DirectExpense = isNaN(watch('directExpense'))
    ? 0
    : watch('directExpense');
  const administrativeExpense = isNaN(watch('administrativeExpense'))
    ? 0
    : watch('administrativeExpense');
  const financialCost = isNaN(watch('financialCost'))
    ? 0
    : watch('financialCost');
  const deferredTaxExpense = isNaN(watch('deferredTaxExpense'))
    ? 0
    : watch('deferredTaxExpense');
  const totalExpense =
    Number(purchase) +
    Number(DirectExpense) +
    Number(administrativeExpense) +
    Number(financialCost) +
    Number(deferredTaxExpense);

  return (
    <Box
      display="flex"
      flexDirection="column"
      id="Expense Details"
      scrollMarginTop={'200px'}
    >
      <Grid
        columnGap={40}
        alignItems="center"
        px="s14"
        templateColumns="repeat(2,1fr)"
      >
        <GridItem>
          <Text
            mb="s16"
            color="neutralColorLight.Gray-80"
            fontSize="s3"
            fontWeight="SemiBold"
          >
            Expense Details
          </Text>
        </GridItem>

        <GridItem>
          <Text
            mb="s16"
            color="neutralColorLight.Gray-80"
            fontSize="s3"
            fontWeight="SemiBold"
          >
            Amount
          </Text>
        </GridItem>
      </Grid>

      <Divider />

      <Grid
        alignItems="center"
        px="s8"
        py="s12"
        templateColumns="repeat(2,1fr)"
        columnGap={40}
      >
        <GridItem>
          <Text
            color="neutralColorLight.Gray-80"
            fontSize="s3"
            fontWeight="Regular"
          >
            Purchase
          </Text>
        </GridItem>
        <GridItem>
          <FormInput
            textAlign="right"
            type="number"
            name="purchase"
            placeholder="0.00"
          />
        </GridItem>
      </Grid>

      <Grid
        alignItems="center"
        px="s8"
        py="s12"
        templateColumns="repeat(2,1fr)"
        columnGap={40}
      >
        <GridItem>
          <Text
            color="neutralColorLight.Gray-80"
            fontSize="s3"
            fontWeight="Regular"
          >
            Direct Expense
          </Text>
        </GridItem>
        <GridItem>
          <FormInput
            textAlign="right"
            type="text"
            name="directExpense"
            placeholder="0.00"
          />
        </GridItem>
      </Grid>

      <Grid
        alignItems="center"
        px="s8"
        py="s12"
        templateColumns="repeat(2,1fr)"
        columnGap={40}
      >
        <GridItem>
          <Text
            color="neutralColorLight.Gray-80"
            fontSize="s3"
            fontWeight="Regular"
          >
            Administrative expense
          </Text>
        </GridItem>

        <GridItem>
          <FormInput
            textAlign="right"
            type="number"
            name="administrativeExpense"
            placeholder="0.00"
          />
        </GridItem>
      </Grid>

      <Grid
        alignItems="center"
        px="s8"
        py="s12"
        templateColumns="repeat(2,1fr)"
        columnGap={40}
      >
        <GridItem>
          <Text
            color="neutralColorLight.Gray-80"
            fontSize="s3"
            fontWeight="Regular"
          >
            Financial cost
          </Text>
        </GridItem>
        <GridItem>
          <FormInput
            textAlign="right"
            type="text"
            name="financialCost"
            placeholder="0.00"
          />
        </GridItem>
      </Grid>

      <Grid
        alignItems="center"
        px="s8"
        py="s12"
        templateColumns="repeat(2,1fr)"
        columnGap={40}
      >
        <GridItem>
          <Text
            color="neutralColorLight.Gray-80"
            fontSize="s3"
            fontWeight="Regular"
          >
            Risk management expense
          </Text>
        </GridItem>

        <GridItem>
          <FormInput
            textAlign="right"
            type="text"
            name="riskManangementCost"
            placeholder="0.00"
          />
        </GridItem>
      </Grid>

      <Grid
        alignItems="center"
        px="s8"
        py="s12"
        templateColumns="repeat(2,1fr)"
        columnGap={40}
      >
        <GridItem>
          <Text
            color="neutralColorLight.Gray-80"
            fontSize="s3"
            fontWeight="Regular"
          >
            Deffered tax Expense
          </Text>
        </GridItem>
        <GridItem>
          <FormInput
            textAlign="right"
            type="text"
            name="deferredTaxExpense"
            placeholder="0.00"
          />
        </GridItem>
      </Grid>

      <Divider />

      <Grid
        alignItems="center"
        px="14px"
        py="s16"
        templateColumns="repeat(2,1fr)"
        columnGap={40}
      >
        <GridItem>
          <Text
            mb="s16"
            color="neutralColorLight.Gray-80"
            fontSize="s3"
            fontWeight="SemiBold"
          >
            Total
          </Text>
        </GridItem>

        <GridItem>
          <FormInput
            isDisabled={true}
            bg="neutralColorLight.Gray-20"
            border="1px solid"
            borderColor="disabled.disabled"
            textAlign="right"
            type="text"
            name="totalExpense"
            value={totalExpense}
            placeholder="Total assets"
          />
        </GridItem>
      </Grid>
    </Box>
  );
};
