import { FormProvider, useForm } from 'react-hook-form';
import { Box, Divider, Grid, GridItem, Text } from '@chakra-ui/react';

import { CoopUnionEconomicDetailsInput } from '@coop/cbs/data-access';
import { FormInput } from '@coop/shared/form';
import {
  getKymSectionCoOperativeUnion,
  useTranslation,
} from '@coop/shared/utils';

import { useCooperativeUnionEconomicDetails } from '../../../hooks';

interface IIncomeDetailsProps {
  setSection: (section?: { section: string; subSection: string }) => void;
}

export const IncomeDetails = ({ setSection }: IIncomeDetailsProps) => {
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
  const incomeFromFinancialInvestments = isNaN(
    watch('incomeFromFinancialInvestment')
  )
    ? 0
    : watch('incomeFromFinancialInvestment');
  const incomeFromNonFinancialInvestment = isNaN(
    watch('incomeFromNonFinancialInvestment')
  )
    ? 0
    : watch('incomeFromNonFinancialInvestment');
  const incomeFromInvestment = isNaN(watch('incomeFromInvestment'))
    ? 0
    : watch('incomeFromInvestment');
  const servicesIncome = isNaN(watch('incomeFromServiceOperation'))
    ? 0
    : watch('incomeFromServiceOperation');
  const salesIncome = isNaN(watch('incomeFromSales'))
    ? 0
    : watch('incomeFromSales');
  const otherIncome = isNaN(watch('otherIncome')) ? 0 : watch('otherIncome');
  const miscIncome = isNaN(watch('miscellaneousIncome'))
    ? 0
    : watch('miscellaneousIncome');

  const totalIncome =
    Number(incomeFromFinancialInvestments) +
    Number(incomeFromNonFinancialInvestment) +
    Number(incomeFromInvestment) +
    Number(servicesIncome) +
    Number(salesIncome) +
    Number(otherIncome) +
    Number(miscIncome);

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
          id="kymCoopUnionAccIncomeDetails"
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
                {t['kymCoopUnionIncIncomeDetails']}
              </Text>
            </GridItem>

            <GridItem>
              <Text
                mb="s16"
                color="neutralColorLight.Gray-80"
                fontSize="s3"
                fontWeight="SemiBold"
              >
                {t['kymCoopUnionIncAmount']}
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
                {t['kymCoopUnionIncIncomeFromFinancialInvestment']}
              </Text>
            </GridItem>
            <GridItem>
              <FormInput
                textAlign="right"
                type="number"
                min={0}
                name="incomeFromFinancialInvestment"
                __placeholder="0.00"
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
                {t['kymCoopUnionIncIncomeFromNonFinancialInvestment']}
              </Text>
            </GridItem>
            <GridItem>
              <FormInput
                textAlign="right"
                type="number"
                min={0}
                name="incomeFromNonFinancialInvestment"
                __placeholder="0.00"
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
                {t['kymCoopUnionIncIncomeFromInvestment']}
              </Text>
            </GridItem>

            <GridItem>
              <FormInput
                textAlign="right"
                type="number"
                min={0}
                name="incomeFromInvestment"
                __placeholder="0.00"
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
                {t['kymCoopUnionIncIncomeFromServiceOperations']}
              </Text>
            </GridItem>
            <GridItem>
              <FormInput
                textAlign="right"
                type="number"
                min={0}
                name="incomeFromServiceOperation"
                __placeholder="0.00"
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
                {t['kymCoopUnionIncIncomeFromSales']}
              </Text>
            </GridItem>

            <GridItem>
              <FormInput
                textAlign="right"
                type="number"
                min={0}
                name="incomeFromSales"
                __placeholder="0.00"
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
                {t['kymCoopUnionIncOtherIncome']}
              </Text>
            </GridItem>
            <GridItem>
              <FormInput
                textAlign="right"
                type="number"
                min={0}
                name="otherIncome"
                __placeholder="0.00"
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
                {t['kymCoopUnionIncMiscellanousIncome']}
              </Text>
            </GridItem>
            <GridItem>
              <FormInput
                textAlign="right"
                type="number"
                min={0}
                name="miscellaneousIncome"
                __placeholder="0.00"
              />
            </GridItem>
          </Grid>

          <Divider />

          <Grid
            alignItems="center"
            px="s8"
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
                {t['kymCoopUnionIncTotal']}
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
                __placeholder={t['kymCoopUnionIncTotalIncome']}
              />
            </GridItem>
          </Grid>
        </Box>
      </form>
    </FormProvider>
  );
};
