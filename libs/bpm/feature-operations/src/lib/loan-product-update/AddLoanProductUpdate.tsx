import { useForm } from 'react-hook-form';
import { useRouter } from 'next/router';
import { omit, pick } from 'lodash';

import { asyncToast } from '@myra-ui';

import {
  LoanUpdateData,
  LoanUpdateType,
  useSetBpmOperationsLoanProductUpdateMutation,
} from '@coop/cbs/data-access';
import { ROUTES } from '@coop/cbs/utils';
import { FormLayout } from '@coop/shared/form';

import {
  LoanAccountPremiumUpdate,
  LoanNotes,
  LoanPenaltyUpdate,
  LoanProcessingChargesUpdate,
  LoanProductPremiumUpdate,
  LoanTenureUpdate,
} from '../../components/loanProductUpdateData';
import { LoanProductUpdateBasicDetails } from '../../components/loanProductUpdateData/BasicDetails';
import { LoanLimitUpdate } from '../../components/loanProductUpdateData/LoanLimitUpdate';

export const BPMOperationsLoanProductUpdate = () => {
  // const [triggerQuery, setTriggerQury] = useState(false);
  const methods = useForm<LoanUpdateData & { productId: string; updateType: LoanUpdateType }>();
  const { watch } = methods;
  const router = useRouter();
  const productId = watch('productId');
  const updateType = watch('updateType');

  const { mutateAsync } = useSetBpmOperationsLoanProductUpdateMutation();

  const submitForm = () => {
    const data = methods.getValues();
    const filteredValue = omit({ ...data }, 'productId', 'updateType');
    let updatedData;

    if (data?.updateType === 'ACCOUNT_PREMIUM_UPDATE') {
      updatedData = pick({ ...filteredValue }, 'accountPremium');
    }
    if (data?.updateType === 'LOAN_LIMIT_UPDATE') {
      updatedData = pick({ ...filteredValue }, 'loanLimit');
    }
    if (data?.updateType === 'LOAN_PROCESSING_CHARGE_UPDATE') {
      updatedData = pick({ ...filteredValue }, 'loanProcessingCharge');
    }
    if (data?.updateType === 'PENALTY_UPDATE') {
      updatedData = pick({ ...filteredValue }, 'penalty');
    }
    if (data?.updateType === 'PRODUCT_PREMIUM_UPDATE') {
      updatedData = pick({ ...filteredValue }, 'productPremium');
    }
    if (data?.updateType === 'PRODUCT_TENURE_UPDATE') {
      updatedData = pick({ ...filteredValue }, 'tenure');
    }
    asyncToast({
      id: 'bpm-event',
      msgs: {
        success: 'Loan Product Updated Successfully',
        loading: 'Updating Loan Product',
      },
      onSuccess: () => {
        router.push(ROUTES?.BPM_OPERATIONS_LOAN_PRODUCT_UPDATES_LIST);
      },
      promise: mutateAsync({
        productId: data?.productId as string,
        updateType: data?.updateType as LoanUpdateType,
        data: {
          ...updatedData,
          notes: data?.notes,
          files: data?.files,
        } as LoanUpdateData,
      }),
    });
  };

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
          {productId && updateType === 'LOAN_LIMIT_UPDATE' && <LoanLimitUpdate />}
          {productId && updateType === 'ACCOUNT_PREMIUM_UPDATE' && <LoanAccountPremiumUpdate />}
          {productId && updateType === 'PRODUCT_TENURE_UPDATE' && <LoanTenureUpdate />}
          {productId && updateType === 'PENALTY_UPDATE' && <LoanPenaltyUpdate />}
          {productId && updateType && <LoanNotes />}
        </FormLayout.Form>
      </FormLayout.Content>
      <FormLayout.Footer mainButtonLabel="Save" mainButtonHandler={submitForm} />
    </FormLayout>
  );
};

export default BPMOperationsLoanProductUpdate;
