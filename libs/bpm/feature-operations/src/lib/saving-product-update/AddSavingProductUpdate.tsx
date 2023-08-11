import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/router';
import { omit } from 'lodash';

import { asyncToast, Text } from '@myra-ui';

import {
  SvUpdateData,
  SvUpdateType,
  useGetSavingsProductDetailQuery,
  useSetBpmOperationsSavingProductUpdateMutation,
} from '@coop/cbs/data-access';
import { ROUTES } from '@coop/cbs/utils';
import { FormLayout } from '@coop/shared/form';

import {
  AccountCloseFeesAndChargesUpdate,
  AccountPremiumUpdate,
  BalanceLimitUpdate,
  ChequeServicesUpdate,
  PenaltyChargeUpdate,
  PrematurePenaltyUpdate,
  ProductTenureUpdate,
  RebateUpdate,
  SavingProductUpdateBasicDetails,
  WithdrawPenaltyUpdate,
} from '../../components/savingProductUpdate';
import { AccountOpenFeesAndChargesUpdate } from '../../components/savingProductUpdate/AccountOpenFeesAndChargesUpdate';
import { ProductInterestUpdate } from '../../components/savingProductUpdate/ProductInterestUpdate';

export const BPMOperationsSavingProductUpdate = () => {
  const [triggerQuery, setTriggerQury] = useState(false);
  const methods = useForm<SvUpdateData & { productId: string; updateType: SvUpdateType }>();
  const { watch } = methods;
  const router = useRouter();
  const productId = watch('productId');
  const updateType = watch('updateType');

  const { mutateAsync } = useSetBpmOperationsSavingProductUpdateMutation();

  const { data: dataDetails } = useGetSavingsProductDetailQuery(
    { id: productId as string },
    { enabled: triggerQuery }
  );
  const detailData = dataDetails?.settings?.general?.depositProduct?.depositProductDetail?.data;

  const natureOfProduct = detailData?.nature;
  const isMandatoryFlag = detailData?.isMandatorySaving;

  const submitForm = () => {
    const data = methods.getValues();
    const filteredValue = omit({ ...data }, 'productId', 'updateType');

    asyncToast({
      id: 'bpm-event',
      msgs: {
        success: 'Saving Product Updated Successfully',
        loading: 'Updating Saving Product',
      },
      onSuccess: () => {
        router.push(ROUTES?.BPM_OPERATIONS_MINOR_ADDITION_LIST);
      },
      promise: mutateAsync({
        productId: data?.productId as string,
        updateType: data?.updateType as SvUpdateType,
        data: {
          ...filteredValue,
        } as SvUpdateData,
      }),
    });
  };

  useEffect(() => {
    if (productId) {
      setTriggerQury(true);
    }
  }, [productId]);

  return (
    <FormLayout methods={methods}>
      <FormLayout.Header title="Saving Product Updates" />

      <FormLayout.Content>
        <FormLayout.Form>
          <SavingProductUpdateBasicDetails />
          {productId &&
            updateType === SvUpdateType?.ProductPremiumUpdate &&
            natureOfProduct !== 'CURRENT' && <ProductInterestUpdate />}
          {productId &&
            updateType === SvUpdateType?.ProductPremiumUpdate &&
            natureOfProduct === 'CURRENT' && (
              <Text p="s32" color="danger.500">
                This Feature is not applicable for this product.{' '}
              </Text>
            )}
          {productId && updateType === SvUpdateType?.AccountOpenFeesAndChargeUpdate && (
            <AccountOpenFeesAndChargesUpdate />
          )}
          {productId && updateType === SvUpdateType?.AccountCloseFeesAndChargeUpdate && (
            <AccountCloseFeesAndChargesUpdate />
          )}
          {productId && updateType === SvUpdateType?.ChequeSettingsUpdate && (
            <ChequeServicesUpdate />
          )}
          {productId && updateType === SvUpdateType?.BalanceLimitUpdate && <BalanceLimitUpdate />}
          {productId && updateType === SvUpdateType?.AccountPremiumUpdate && (
            <AccountPremiumUpdate />
          )}
          {productId && updateType === SvUpdateType?.ProductTenureUpdate && <ProductTenureUpdate />}
          {productId && updateType === SvUpdateType?.PrematurePenaltyUpdate && (
            <PrematurePenaltyUpdate />
          )}
          {productId && updateType === SvUpdateType?.WithdrawPenaltyUpdate && (
            <WithdrawPenaltyUpdate />
          )}
          {productId &&
            updateType === SvUpdateType?.RebateUpdate &&
            (natureOfProduct === 'RECURRING_SAVING' ||
              (natureOfProduct === 'SAVING' && isMandatoryFlag)) && <RebateUpdate />}
          {productId &&
            updateType === SvUpdateType?.RebateUpdate &&
            !(
              natureOfProduct === 'RECURRING_SAVING' ||
              (natureOfProduct === 'SAVING' && isMandatoryFlag)
            ) && (
              <Text p="s32" color="danger.500">
                This Feature is not applicable for this product.{' '}
              </Text>
            )}
          {productId && updateType === SvUpdateType?.PenaltyChargeUpdate && <PenaltyChargeUpdate />}
        </FormLayout.Form>
      </FormLayout.Content>
      <FormLayout.Footer mainButtonLabel="Save" mainButtonHandler={submitForm} />
    </FormLayout>
  );
};

export default BPMOperationsSavingProductUpdate;
