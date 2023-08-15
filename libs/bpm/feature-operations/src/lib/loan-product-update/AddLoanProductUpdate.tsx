import { useForm } from 'react-hook-form';
import { useRouter } from 'next/router';

import { asyncToast } from '@myra-ui';

import {
  LoanUpdateData,
  LoanUpdateType,
  useSetBpmOperationsLoanProductUpdateMutation,
} from '@coop/cbs/data-access';
import { ROUTES } from '@coop/cbs/utils';
import { FormLayout } from '@coop/shared/form';

import {
  LoanProcessingChargesUpdate,
  LoanProductPremiumUpdate,
} from '../../components/loanProductUpdateData';
import { LoanProductUpdateBasicDetails } from '../../components/loanProductUpdateData/BasicDetails';

export const BPMOperationsLoanProductUpdate = () => {
  // const [triggerQuery, setTriggerQury] = useState(false);
  const methods = useForm<LoanUpdateData & { productId: string; updateType: LoanUpdateType }>();
  const { watch } = methods;
  const router = useRouter();
  const productId = watch('productId');
  const updateType = watch('updateType');

  const { mutateAsync } = useSetBpmOperationsLoanProductUpdateMutation();

  // const { data: dataDetails } = useGetSavingsProductDetailQuery(
  //   { id: productId as string },
  //   { enabled: triggerQuery }
  // );
  // const detailData = dataDetails?.settings?.general?.depositProduct?.depositProductDetail?.data;

  // const natureOfProduct = detailData?.nature;
  // const isMandatoryFlag = detailData?.isMandatorySaving;

  const submitForm = () => {
    const data = methods.getValues();
    asyncToast({
      id: 'bpm-event',
      msgs: {
        success: 'Saving Product Updated Successfully',
        loading: 'Updating Saving Product',
      },
      onSuccess: () => {
        router.push(ROUTES?.BPM_OPERATIONS_SAVING_PRODUCT_UPDATES_LIST);
      },
      promise: mutateAsync({
        productId: data?.productId as string,
        updateType: data?.updateType as LoanUpdateType,
        data: {
          notes: data?.notes,
          files: data?.files,
        } as LoanUpdateData,
      }),
    });
  };

  // useEffect(() => {
  //   if (productId) {
  //     setTriggerQury(true);
  //   }
  // }, [productId]);

  return (
    <FormLayout methods={methods}>
      <FormLayout.Header title="Loan Product Updates" />

      <FormLayout.Content>
        <FormLayout.Form>
          <LoanProductUpdateBasicDetails />
          {productId && updateType === 'PRODUCT_PREMIUM_UPDATE' && <LoanProductPremiumUpdate />}
          {productId && updateType === 'LOAN_PROCESSING_CHARGE_UPDATE' && (
            <LoanProcessingChargesUpdate />
          )}
        </FormLayout.Form>
      </FormLayout.Content>
      <FormLayout.Footer mainButtonLabel="Save" mainButtonHandler={submitForm} />
    </FormLayout>
  );
};

export default BPMOperationsLoanProductUpdate;
