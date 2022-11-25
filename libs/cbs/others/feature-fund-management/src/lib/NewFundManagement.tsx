import { useMemo } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useRouter } from 'next/router';

import {
  FundManagementInput,
  useAddProfitToFundManagementDataMutation,
} from '@coop/cbs/data-access';
import { asyncToast, Box, Container, FormFooter, FormHeader, FormSection } from '@coop/shared/ui';

import { CustomFundManagementInput } from './type';
import {
  BasicFundManagement,
  DistributionTable,
  OtherFundDistributionTable,
  ParticularTable,
} from '../components';

export const NewFundManagement = () => {
  const router = useRouter();

  const methods = useForm<CustomFundManagementInput>();

  const { watch, getValues } = methods;

  const otherFunds = watch('otherFunds');

  const isSubmitDisabled = useMemo(() => {
    if (!otherFunds) {
      return true;
    }

    // eslint-disable-next-line no-return-assign
    const totalPercent = otherFunds?.reduce((sum, fund) => (sum += Number(fund?.percent ?? 0)), 0);

    return totalPercent !== 100;
  }, [otherFunds]);

  const { mutateAsync: addProfitToFundManagement } = useAddProfitToFundManagementDataMutation();

  const handleSubmit = () => {
    const values = getValues();

    const filteredValues = {
      grossProfit: values['grossProfit'],
      staffBonusFund: values['staffBonusFund'],
      incomeTax: values['incomeTax'],
      generalReserveFund: values['generalReserveFund'][0].percent,
      patronageRefundFund: values['distributionTable'][0].percent,
      cooperativePromotionFund: values['distributionTable'][1].percent,
      otherFunds: values?.otherFunds?.map(({ accountCode, percent }) => ({ accountCode, percent })),
    };

    asyncToast({
      id: 'add-profit-to-fund-management',
      msgs: {
        loading: 'Adding profit to fund management data',
        success: 'Added profit to fund management',
      },
      promise: addProfitToFundManagement({ data: filteredValues as FundManagementInput }),
      onSuccess: () => router.push('/others/fund-management/list'),
    });
  };

  return (
    <>
      <Container minW="container.xl" height="fit-content">
        <Box position="sticky" top="110px" bg="gray.100" width="100%" zIndex="10">
          <FormHeader
            title="New Profit to Fund Management"
            closeLink="/others/fund-management/list"
          />
        </Box>

        <Box bg="white" pb="80px">
          <FormProvider {...methods}>
            <form>
              <Box minH="calc(100vh - 170px)">
                <BasicFundManagement />

                <FormSection header="Appropriation of Profit (Profit Distribution)">
                  <ParticularTable />

                  <DistributionTable />

                  <OtherFundDistributionTable />
                </FormSection>
              </Box>
            </form>
          </FormProvider>
        </Box>
      </Container>

      <Box position="relative" margin="0px auto">
        <Box bottom="0" position="fixed" width="100%" bg="gray.100" zIndex={10}>
          <Container minW="container.xl" height="fit-content">
            <FormFooter
              mainButtonLabel="Submit"
              mainButtonHandler={handleSubmit}
              isMainButtonDisabled={isSubmitDisabled}
            />
          </Container>
        </Box>
      </Box>
    </>
  );
};
