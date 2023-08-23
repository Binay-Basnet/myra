import { useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/router';

import { asyncToast, FormSection } from '@myra-ui';

import {
  FundManagementInput,
  useAddProfitToFundManagementDataMutation,
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

  const { watch, getValues } = methods;

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
      promise: addProfitToFundManagement({ data: filteredValues as FundManagementInput }),
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
