import { useMemo } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useRouter } from 'next/router';

import { asyncToast, Box, Container, FormFooter, FormHeader } from '@myra-ui';

import {
  CashTransferSelfEntry,
  CashTransferServiceCentreEntry,
  ServiceCentreCashTransferInput,
  useSetServiceCenterCashTransferMutation,
} from '@coop/cbs/data-access';
import { ROUTES } from '@coop/cbs/utils';
import { featureCode } from '@coop/shared/utils';

import { LedgerTable, ServiceCenterTable } from '../components';

/* eslint-disable-next-line */
export interface AddCashTransferProps {}

export const AddCashTransfer = () => {
  const methods = useForm();
  const router = useRouter();

  const { getValues, watch } = methods;

  const branchId = watch('branchEntries');

  const selectedBranch = branchId && branchId[0]?.branchId;

  const { mutateAsync } = useSetServiceCenterCashTransferMutation();
  const values = getValues();

  const { crBranchTotal, drBranchTotal } = useMemo(() => {
    let tempCR = 0;
    let tempDR = 0;

    values['branchEntries']?.forEach((entry: CashTransferServiceCentreEntry) => {
      tempCR += Number(entry?.cr ?? 0);
      tempDR += Number(entry?.dr ?? 0);
    });

    return { crBranchTotal: tempCR, drBranchTotal: tempDR };
  }, [values]);

  const { crSelfTotal, drSelfTotal } = useMemo(() => {
    let tempCR = 0;
    let tempDR = 0;

    values['selfEntries']?.forEach((entry: CashTransferSelfEntry) => {
      tempCR += Number(entry?.cr ?? 0);
      tempDR += Number(entry?.dr ?? 0);
    });

    return { crSelfTotal: tempCR, drSelfTotal: tempDR };
  }, [values]);

  const disableButton = () => {
    if (selectedBranch && crBranchTotal === drSelfTotal && drBranchTotal === crSelfTotal) {
      return false;
    }
    return true;
  };

  const handleSubmit = () => {
    const updatedData = {
      ...values,
      selfEntries: values['selfEntries']?.map((item: CashTransferSelfEntry) => ({
        ...item,
        dr: String(item.dr),
        cr: String(item.cr),
      })),
      branchEntries: values['branchEntries']?.map((item: CashTransferServiceCentreEntry) => ({
        ...item,
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
        router.push(ROUTES.CBS_TRANSFER_SERVICE_TRANSFER_LIST);
      },
    });
  };

  return (
    <>
      <Container minW="container.xl" height="fit-content">
        <Box position="sticky" top="0" bg="gray.100" width="100%" zIndex="10">
          <FormHeader
            title={`Inter Service Center Transaction - ${featureCode.newVaultTransfer}`}
            closeLink={ROUTES.CBS_TRANSFER_SERVICE_TRANSFER_LIST}
          />
        </Box>

        <Box bg="white">
          <FormProvider {...methods}>
            <form>
              <Box minH="calc(100vh - 170px)" pb="s60">
                <LedgerTable />
                <ServiceCenterTable />
              </Box>
            </form>
          </FormProvider>
        </Box>
      </Container>

      <Box position="relative" margin="0px auto">
        <Box bottom="0" position="fixed" width="100%" bg="gray.100" zIndex={10}>
          <Container minW="container.xl" height="fit-content">
            <FormFooter
              mainButtonLabel="Done"
              mainButtonHandler={handleSubmit}
              isMainButtonDisabled={disableButton()}
            />
          </Container>
        </Box>
      </Box>
    </>
  );
};

export default AddCashTransfer;
