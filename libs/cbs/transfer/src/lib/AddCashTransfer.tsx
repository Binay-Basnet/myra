import { useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/router';

import { asyncToast, FormFooter, FormHeader } from '@myra-ui';

import {
  ServiceCentreCashTransferInput,
  useSetServiceCenterCashTransferMutation,
} from '@coop/cbs/data-access';
import { ROUTES } from '@coop/cbs/utils';
import { FormLayout } from '@coop/shared/form';
import { featureCode } from '@coop/shared/utils';

import { LedgerTable, ServiceCenterTable } from '../components';

type CashTransferSelfEntry = {
  accountId: { label: string; value: string };
  cr?: string;
  dr?: string;
};

type CashTransferServiceCentreEntry = {
  branchId: { label: string; value: string };
  cr?: string;
  dr?: string;
};

type ServiceCenterTransferForm = {
  branchEntries: CashTransferServiceCentreEntry[];
  selfEntries: CashTransferSelfEntry[];
  note: string;
};

export const AddCashTransfer = () => {
  const methods = useForm<ServiceCenterTransferForm>();
  const router = useRouter();

  const { getValues, watch } = methods;

  const branchId = watch('branchEntries');

  const selectedBranch = branchId && branchId[0]?.branchId;

  const { mutateAsync } = useSetServiceCenterCashTransferMutation();
  const values = getValues();

  const { crBranchTotal, drBranchTotal } = useMemo(() => {
    let tempCR = 0;
    let tempDR = 0;

    values['branchEntries']?.forEach((entry) => {
      tempCR += Number(entry?.cr ?? 0);
      tempDR += Number(entry?.dr ?? 0);
    });

    return { crBranchTotal: tempCR, drBranchTotal: tempDR };
  }, [values]);

  const { crSelfTotal, drSelfTotal } = useMemo(() => {
    let tempCR = 0;
    let tempDR = 0;

    values['selfEntries']?.forEach((entry) => {
      tempCR += Number(entry?.cr ?? 0);
      tempDR += Number(entry?.dr ?? 0);
    });

    return { crSelfTotal: Number(tempCR.toFixed(2)), drSelfTotal: Number(tempDR.toFixed(2)) };
  }, [values]);

  const disableButton = () => {
    if (
      selectedBranch &&
      (crBranchTotal + crSelfTotal).toFixed(2) === (drSelfTotal + drBranchTotal).toFixed(2)
    ) {
      return false;
    }
    return true;
  };

  const handleSubmit = () => {
    const value = getValues();
    const updatedData = {
      ...value,
      selfEntries: value['selfEntries']?.map((item: CashTransferSelfEntry) => ({
        ...item,
        accountId: item.accountId.value,

        dr: String(item.dr),
        cr: String(item.cr),
      })),
      branchEntries: value['branchEntries']?.map((item: CashTransferServiceCentreEntry) => ({
        ...item,
        branchId: item.branchId.value,
        dr: String(item.dr),
        cr: String(item.cr),
      })),
    };

    asyncToast({
      id: 'add-vault-transfer',
      msgs: {
        loading: 'Adding Service Center Cash Transfer',
        success: 'Inter Service Center Transaction Successful',
      },
      promise: mutateAsync({ data: updatedData as ServiceCentreCashTransferInput }),
      onSuccess: () => {
        router.push(ROUTES.CBS_TRANSFER_INTER_SERVICE_TRANS_LIST);
      },
    });
  };

  return (
    <FormLayout methods={methods}>
      <FormHeader
        title={`Inter Service Center Transaction - ${featureCode.newVaultTransfer}`}
        closeLink={ROUTES.CBS_TRANSFER_INTER_SERVICE_TRANS_LIST}
      />

      <FormLayout.Content>
        <FormLayout.Form>
          <LedgerTable />
          <ServiceCenterTable />
        </FormLayout.Form>
      </FormLayout.Content>

      <FormFooter
        mainButtonLabel="Done"
        mainButtonHandler={handleSubmit}
        isMainButtonDisabled={disableButton()}
      />
    </FormLayout>
  );
};

export default AddCashTransfer;
