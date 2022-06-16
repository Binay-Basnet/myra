import { useMemo } from 'react';
import { Box, Divider, Grid, GridItem, Text } from '@chakra-ui/react';
import { FormInput } from '@coop/myra/components';

export const IncomeDetails = ({ watch }: any) => {
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
  const incomeFromFinancialInvestments = watch('incomeFromFinancialInvestment');
  const incomeFromNonFinancialInvestment = watch(
    'incomeFromNonFinancialInvestment'
  );
  const incomeFromInvestment = watch('incomeFromInvestment');
  const servicesIncome = watch('incomeFromServiceOperation');
  const salesIncome = watch('incomeFromSales');
  const otherIncome = watch('otherIncome');
  const miscIncome = watch('miscellnousIncome');

  const totalIncome = useMemo(() => {
    return (
      Number(incomeFromFinancialInvestments) +
      Number(incomeFromNonFinancialInvestment) +
      Number(incomeFromInvestment) +
      Number(servicesIncome) +
      Number(salesIncome) +
      Number(otherIncome) +
      Number(miscIncome)
    );
  }, [
    incomeFromFinancialInvestments,
    incomeFromNonFinancialInvestment,
    incomeFromInvestment,
    servicesIncome,
    salesIncome,
    otherIncome,
    miscIncome,
  ]);

  return (
    <Box
      display="flex"
      flexDirection="column"
      id="Income Details"
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
            Income Details
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
            Income from financial investment
          </Text>
        </GridItem>
        <GridItem>
          <FormInput
            textAlign="right"
            type="number"
            name="incomeFromFinancialInvestment"
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
            Income from non financial investment
          </Text>
        </GridItem>
        <GridItem>
          <FormInput
            textAlign="right"
            type="text"
            name="incomeFromNonFinancialInvestment"
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
            Income from investment
          </Text>
        </GridItem>

        <GridItem>
          <FormInput
            textAlign="right"
            type="number"
            name="incomeFromInvestment"
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
            Income from service operations
          </Text>
        </GridItem>
        <GridItem>
          <FormInput
            textAlign="right"
            type="text"
            name="incomeFromServiceOperation"
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
            Income from sales
          </Text>
        </GridItem>

        <GridItem>
          <FormInput
            textAlign="right"
            type="text"
            name="incomeFromSales"
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
            Other income
          </Text>
        </GridItem>
        <GridItem>
          <FormInput
            textAlign="right"
            type="text"
            name="otherIncome"
            placeholder="0.00"
          />
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
            Miscellanous income
          </Text>
        </GridItem>
        <GridItem>
          <FormInput
            textAlign="right"
            type="text"
            name="miscellnousIncome"
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
            name="totalIncome"
            value={totalIncome}
            placeholder="Total income"
          />
        </GridItem>
      </Grid>
    </Box>
  );
};
