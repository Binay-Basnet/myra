import { FormProvider, useForm } from 'react-hook-form';
import { Box, Divider, Grid, GridItem, Text } from '@chakra-ui/react';

import { CoopUnionEconomicDetailsInput } from '@coop/cbs/data-access';
import { FormInput } from '@coop/shared/form';
import {
  getKymSectionCoOperativeUnion,
  useTranslation,
} from '@coop/shared/utils';

import { useCooperativeUnionEconomicDetails } from '../../../hooks';

interface IExpenseDetailsProps {
  setSection: (section?: { section: string; subSection: string }) => void;
}

export const ExpenseDetails = ({ setSection }: IExpenseDetailsProps) => {
  const { t } = useTranslation();

  const methods = useForm<CoopUnionEconomicDetailsInput>();

  const { watch } = methods;

  useCooperativeUnionEconomicDetails({ methods });

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
  const riskManagementCost = isNaN(watch('riskManagementCost'))
    ? 0
    : watch('riskManagementCost');
  const deferredTaxExpense = isNaN(watch('deferredTaxExpense'))
    ? 0
    : watch('deferredTaxExpense');
  const totalExpense =
    Number(purchase) +
    Number(DirectExpense) +
    Number(administrativeExpense) +
    Number(financialCost) +
    Number(riskManagementCost) +
    Number(deferredTaxExpense);

  return (
    <FormProvider {...methods}>
      <form
        onFocus={(e) => {
          const kymSection = getKymSectionCoOperativeUnion(e.target.id);

          setSection(kymSection);
        }}
      >
        <Box
          display="flex"
          flexDirection="column"
          id="kymCoopUnionAccExpenseDetails"
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
                {t['kymCoopUnionExpExpenseDetails']}
              </Text>
            </GridItem>

            <GridItem>
              <Text
                mb="s16"
                color="neutralColorLight.Gray-80"
                fontSize="s3"
                fontWeight="SemiBold"
              >
                {t['kymCoopUnionExpAmount']}
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
                {t['kymCoopUnionExpPurchase']}
              </Text>
            </GridItem>
            <GridItem>
              <FormInput
                textAlign="right"
                type="number"
                min={0}
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
                {t['kymCoopUnionExpDirectExpense']}
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
                {t['kymCoopUnionExpAdministrativeExpense']}
              </Text>
            </GridItem>

            <GridItem>
              <FormInput
                textAlign="right"
                type="number"
                min={0}
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
                {t['kymCoopUnionExpFinancialCost']}
              </Text>
            </GridItem>
            <GridItem>
              <FormInput
                textAlign="right"
                type="number"
                min={0}
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
                {t['kymCoopUnionExpRiskManagementExpense']}
              </Text>
            </GridItem>

            <GridItem>
              <FormInput
                textAlign="right"
                type="number"
                min={0}
                name="riskManagementCost"
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
                {t['kymCoopUnionExpDefferedTaxExpense']}
              </Text>
            </GridItem>
            <GridItem>
              <FormInput
                textAlign="right"
                type="number"
                min={0}
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
                {t['kymCoopUnionExpTotal']}
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
                placeholder={t['kymCoopUnionExpTotalAssets']}
              />
            </GridItem>
          </Grid>
        </Box>
      </form>
    </FormProvider>
  );
};
