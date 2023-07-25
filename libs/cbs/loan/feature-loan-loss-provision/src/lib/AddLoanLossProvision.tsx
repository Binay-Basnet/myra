import { useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/router';
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  useDisclosure,
} from '@chakra-ui/react';

import { asyncToast, Button, FormSection, Text } from '@myra-ui';

import { useLoanLossProvisionMutation } from '@coop/cbs/data-access';
import { ROUTES } from '@coop/cbs/utils';
import { FormCheckboxGroup, FormLayout, FormTextArea } from '@coop/shared/form';

import {
  GoodLoan,
  Matured1to12Months,
  Matured1to30Days,
  MaturedAbove12Months,
} from '../components';

const provisionOptions = [
  { label: 'Good Loan', value: 'goodLoan' },
  { label: 'Matured (Due) - 1 to 30 days', value: '1to30days' },
  { label: 'Matured (Due) - 1 to 12 months', value: '1to12months' },
  { label: 'Matured (Due) - Above 12 months', value: 'above12months' },
];

export const AddLoanLossProvision = () => {
  const methods = useForm();

  const router = useRouter();

  const confirmCancelRef = useRef<HTMLButtonElement | null>(null);

  const [goodLoanAccounts, setGoodLoanAccounts] = useState<string[]>([]);
  const [matured1to30DaysAccounts, setMatured1to30DaysAccounts] = useState<string[]>([]);
  const [matured1to12MonthsAccounts, setMatured1to12MonthsAccounts] = useState<string[]>([]);
  const [maturedAbove12MonthsAccounts, setMatureAbove12MonthsAccounts] = useState<string[]>([]);

  const {
    isOpen: isConfirmOpen,
    onClose: onConfirmClose,
    onToggle: onConfirmToggle,
  } = useDisclosure();

  const provision = methods.watch('provision');

  const { mutateAsync } = useLoanLossProvisionMutation();

  const handleConfirm = () => {
    const values = methods.getValues();

    let filteredValues;

    if (values?.provision?.includes('goodLoan')) {
      filteredValues = {
        provisionForGoodLoan: true,
        provisionForMatured1To30Days: false,
        provisionForMatured1To12Months: false,
        provisionForAbove12Months: false,
        provisionGood: {
          ...values?.provisionGood,
          loanAccounts: goodLoanAccounts,
        },
        note: values?.note,
      };
    }

    if (values?.provision?.includes('1to30days')) {
      filteredValues = {
        provisionForGoodLoan: false,
        provisionForMatured1To30Days: true,
        provisionForMatured1To12Months: false,
        provisionForAbove12Months: false,
        provision1To30D: {
          ...values?.provision1To30D,
          loanAccounts: matured1to30DaysAccounts,
        },
        note: values?.note,
      };
    }

    if (values?.provision?.includes('1to12months')) {
      filteredValues = {
        provisionForGoodLoan: false,
        provisionForMatured1To30Days: false,
        provisionForMatured1To12Months: true,
        provisionForAbove12Months: false,
        provision1To12M: {
          ...values?.provision1To12M,
          loanAccounts: matured1to12MonthsAccounts,
        },
        note: values?.note,
      };
    }

    if (values?.provision?.includes('above12months')) {
      filteredValues = {
        provisionForGoodLoan: false,
        provisionForMatured1To30Days: false,
        provisionForMatured1To12Months: false,
        provisionForAbove12Months: true,
        provisionAbove12M: {
          ...values?.provisionAbove12M,
          loanAccounts: maturedAbove12MonthsAccounts,
        },
        note: values?.note,
      };
    }

    asyncToast({
      id: 'loan-loss-provision',
      msgs: {
        loading: 'Proceeding loan loss provision',
        success: 'Loan loss provision proceeded',
      },
      promise: mutateAsync({ data: filteredValues }),
      onSuccess: () => router.push(ROUTES.CBS_LOAN_LOSS_PROVISION_LIST),
    });
  };

  return (
    <>
      <FormLayout methods={methods}>
        <FormLayout.Header title="Loan Loss Provision Form" />

        <FormLayout.Content>
          <FormLayout.Form>
            <FormSection header="Provision For">
              <FormCheckboxGroup name="provision" list={provisionOptions} />
            </FormSection>

            {provision?.includes('goodLoan') && (
              <GoodLoan setSelectedAccounts={setGoodLoanAccounts} />
            )}

            {provision?.includes('1to30days') && (
              <Matured1to30Days setSelectedAccounts={setMatured1to30DaysAccounts} />
            )}

            {provision?.includes('1to12months') && (
              <Matured1to12Months setSelectedAccounts={setMatured1to12MonthsAccounts} />
            )}

            {provision?.includes('above12months') && (
              <MaturedAbove12Months setSelectedAccounts={setMatureAbove12MonthsAccounts} />
            )}

            {Boolean(provision?.length) && (
              <FormSection templateColumns={1} divider={false}>
                <FormTextArea name="note" label="Notes" rows={5} />
              </FormSection>
            )}
          </FormLayout.Form>
        </FormLayout.Content>

        <FormLayout.Footer mainButtonLabel="Confirm" mainButtonHandler={onConfirmToggle} />
      </FormLayout>

      <AlertDialog
        isOpen={isConfirmOpen}
        leastDestructiveRef={confirmCancelRef}
        onClose={onConfirmClose}
        isCentered
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader
              fontSize="lg"
              fontWeight="bold"
              borderBottom="1px"
              borderColor="border.layout"
            >
              <Text fontWeight="SemiBold" fontSize="r2" color="gray.800" lineHeight="150%">
                Loan Loss Provision Confirmation
              </Text>
            </AlertDialogHeader>

            <AlertDialogBody borderBottom="1px solid" borderBottomColor="border.layout" p="s16">
              <Text fontSize="s3" fontWeight={400} color="gray.800">
                Are you sure you want to proceed loan loss provision for selected accounts?
              </Text>
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={confirmCancelRef} variant="outline" onClick={onConfirmClose}>
                Cancel
              </Button>
              <Button
                ml={3}
                onClick={() => {
                  onConfirmToggle();
                  handleConfirm();
                }}
              >
                Confirm
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  );
};

export default AddLoanLossProvision;
