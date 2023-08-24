import { useEffect, useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/router';

import { asyncToast, FormSection } from '@myra-ui';

import {
  FundManagementInput,
  useAddProfitToFundManagementDataMutation,
  useGetFundManagementFormStateQuery,
} from '@coop/cbs/data-access';
import { FormLayout } from '@coop/shared/form';
import { featureCode } from '@coop/shared/utils';

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

  const { watch, getValues, reset } = methods;

  const otherFunds = watch('otherFunds');

  const isSubmitDisabled = useMemo(() => {
    if (!otherFunds) {
      return true;
    }

    const totalPercent = otherFunds?.reduce((sum, fund) => {
      sum += Number(fund?.percent ?? 0);
      return sum;
    }, 0);

    return totalPercent !== 100;
  }, [otherFunds]);

  const id = router?.query?.['id'];

  const { data: editData } = useGetFundManagementFormStateQuery({ id: id as string });

  useEffect(() => {
    if (editData?.profitToFundManagement?.get?.record) {
      const formData = editData?.profitToFundManagement?.get?.record;

      // const profitBeforeTax = (grossProfit - (staffBonusFund / 100) * grossProfit || 0).toFixed(2);

      // const netProfit = (formData?. profitBeforeTax - (incomeTax / 100) * profitBeforeTax || 0).toFixed(2);

      reset({
        ...methods.getValues(),
        staffBonusFund: formData?.staffBonusFund,
        incomeTax: formData?.incomeTax,
        generalReserveFund: [
          {
            particular: '20.1 General Reserve Fund',
            percent: Number(formData?.generalReserveFund || 0),
            // thisYear: 0,
            // // lastYear: Number(generalReserveFundAmount ?? 0),
            // lastYear: 0,
          },
        ],
        distributionTable: [
          {
            distribution: '20.2 Patronage Refund Fund',
            percent: Number(formData?.patronageRefundFund || 0),
            // thisYear: 0,
            // lastYear: Number(patronageRefundFundAmount ?? 0),
            lastYear: 0,
          },
          {
            distribution: '20.3 Cooperative Promotion Fund',
            percent: Number(formData?.cooperativePromotionFund || 0),
            // thisYear: 0,
            // lastYear: Number(cooperativePromotionFundAmount ?? 0),
            lastYear: 0,
          },
        ],
        otherFunds: formData?.otherFunds?.map((other) => ({
          accountCode: {
            label: other?.accountName,
            value: other?.accountCode,
          } as unknown as string,
          // accountCode: other?.accountCode,
          percent: other?.percent as number,
        })),
      });
    }
  }, [editData]);

  const { mutateAsync: addProfitToFundManagement } = useAddProfitToFundManagementDataMutation();

  const handleSubmit = () => {
    const values = getValues();

    const filteredValues = {
      staffBonusFund: values['staffBonusFund'],
      incomeTax: values['incomeTax'],
      generalReserveFund: values['generalReserveFund'][0].percent,
      patronageRefundFund: values['distributionTable'][0].percent,
      cooperativePromotionFund: values['distributionTable'][1].percent,
      otherFunds: values?.otherFunds?.map(({ accountCode, percent }) => ({
        accountCode: (accountCode as unknown as { value: string })?.value,
        percent,
      })),
    };

    asyncToast({
      id: 'add-profit-to-fund-management',
      msgs: {
        loading: 'Adding profit to fund management data',
        success: 'Added profit to fund management',
      },
      promise: id
        ? addProfitToFundManagement({
            id: id as string,
            data: filteredValues as FundManagementInput,
          })
        : addProfitToFundManagement({ data: filteredValues as FundManagementInput }),
      onSuccess: () => router.back(),
    });
  };

  return (
    <FormLayout methods={methods}>
      <FormLayout.Header
        title={`New Profit to Fund Management - ${featureCode?.newProfitToFundManagement}`}
        // closeLink="/others/fund-management/list"
      />

      <FormLayout.Content>
        <FormLayout.Form>
          <BasicFundManagement />

          <FormSection header="Appropriation of Profit (Profit Distribution)" divider={false}>
            <ParticularTable />

            <DistributionTable />

            <OtherFundDistributionTable />
          </FormSection>
        </FormLayout.Form>
      </FormLayout.Content>

      <FormLayout.Footer
        mainButtonLabel="Submit"
        mainButtonHandler={handleSubmit}
        isMainButtonDisabled={isSubmitDisabled}
      />
    </FormLayout>
  );
};
