import { useEffect, useMemo, useRef } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useReactToPrint } from 'react-to-print';
import { useRouter } from 'next/router';
import { useQueryClient } from '@tanstack/react-query';

import {
  Alert,
  asyncToast,
  Box,
  Button,
  Container,
  FormFooter,
  FormHeader,
  FormSection,
  GridItem,
} from '@myra-ui';

import {
  SlipSizeStandard,
  useAppSelector,
  useGetWithdrawSlipDataQuery,
  useGetWithdrawSlipPrintPreferenceQuery,
  usePrintSlipMutation,
  WithdrawSlipIssueInput,
} from '@coop/cbs/data-access';
import { ROUTES } from '@coop/cbs/utils';
import { FormAccountSelect, FormMemberSelect, FormSelect } from '@coop/shared/form';

import { WithdrawPrintCard, WithdrawSlipBookPrintPreviewCard } from '../component';

interface CustomWithdrawSlipIssueInput extends WithdrawSlipIssueInput {
  memberId: string;
  printSize: '7*3.5' | '9*3' | '7.5*3.5';
}

const totalNumberOptions = [
  {
    label: '5',
    value: 5,
  },
  {
    label: '10',
    value: 10,
  },
  {
    label: '25',
    value: 25,
  },
  {
    label: '50',
    value: 50,
  },
];

export const WithdrawSlipBookPrint = () => {
  const router = useRouter();

  const slipId = router?.query?.id;

  const user = useAppSelector((state) => state?.auth?.user);

  const queryClient = useQueryClient();

  const { data: printPreferenceData } = useGetWithdrawSlipPrintPreferenceQuery();
  const printPreferenceList = printPreferenceData?.settings?.general?.printPreference?.get?.data;

  const selectedPrintPreference = useMemo(
    () => printPreferenceList?.find((preference) => preference?.isSlipStandardActive),
    [printPreferenceList]
  );

  const methods = useForm<CustomWithdrawSlipIssueInput>({
    defaultValues: { printSize: '7*3.5' },
  });

  const { watch, getValues, reset } = methods;

  const { data: withdrawSlipQueryData } = useGetWithdrawSlipDataQuery(
    { requestID: slipId as string },
    { enabled: !!slipId }
  );

  const withdrawSlipData = withdrawSlipQueryData?.withdrawSlip?.getWithdrawSlipData?.data;

  useEffect(() => {
    if (withdrawSlipData) {
      reset({
        memberId: withdrawSlipData?.member?.id,
        accountId: withdrawSlipData?.account?.id,
        count: Number(withdrawSlipData?.noOfLeaves),
      });
    }
  }, [withdrawSlipData]);

  const memberId = watch('memberId');
  const count = watch('count');
  const { from, to } = useMemo(
    () => ({
      from: withdrawSlipData?.availableRange?.from,
      to: withdrawSlipData?.availableRange?.to,
    }),
    [withdrawSlipData]
  );

  const slipDimensions = {
    [SlipSizeStandard.Width_9Height_3]: {
      height: 3,
      width: 9,
    },
    [SlipSizeStandard.Width_7Point5Height_3Point5]: {
      height: 3.5,
      width: 7.5,
    },
    [SlipSizeStandard.Width_7Height_3Point5]: {
      height: 3.5,
      width: 7,
    },
    [SlipSizeStandard.Custom]: {
      height: selectedPrintPreference?.slipSizeCustom?.height || 0,
      width: selectedPrintPreference?.slipSizeCustom?.width || 0,
    },
  };

  const componentRef = useRef<HTMLInputElement | null>(null);

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
    onAfterPrint: () => {
      const data = getValues();

      asyncToast({
        id: 'save-withdraw-slip-print-data',
        msgs: {
          loading: 'Saving print data',
          success: 'Print data saved',
        },
        promise: savePrintSlip({
          data: { requestID: slipId as string, noOfLeaves: data.count },
        }),
        onSuccess: () => queryClient.invalidateQueries(['getWithdrawSlipData']),
      });
    },
  });

  const { mutateAsync: savePrintSlip } = usePrintSlipMutation();

  const handleSave = () => {
    handlePrint();
  };

  const slipHeight = slipDimensions[selectedPrintPreference?.slipSizeStandard || 'CUSTOM'].height;
  const slipWidth = slipDimensions[selectedPrintPreference?.slipSizeStandard || 'CUSTOM'].width;

  const printProps = {
    height: slipHeight,
    width: slipWidth,
    branchPosition: selectedPrintPreference?.blockOne,
    accountPosition: selectedPrintPreference?.blockTwo,
    slipNumberPosition: selectedPrintPreference?.blockThree,
    details: {
      branch: user?.branch?.name as string,
      memberName: withdrawSlipData?.member?.name?.local as string,
      accountNumber: withdrawSlipData?.account?.id as string,
      accountName: withdrawSlipData?.account?.accountName as string,
      slipNumber: String(from),
    },
  };

  return (
    <>
      <Container minW="container.xl" height="fit-content">
        <Box position="sticky" top="0" bg="gray.100" width="100%" zIndex="10">
          <FormHeader title="Withdraw Slip Print" />
        </Box>

        <Box bg="white">
          <FormProvider {...methods}>
            <Box
              display="none"
              sx={{
                '@media print': {
                  display: 'flex',
                },
                '@page': {
                  size: 'A4 landscape',
                },
              }}
            >
              <WithdrawPrintCard ref={componentRef} {...printProps} />
            </Box>

            <form>
              <Box minH="calc(100vh - 170px)" pb="s60">
                <FormSection templateColumns={2}>
                  <GridItem colSpan={2}>
                    <FormMemberSelect isRequired name="memberId" label="Member" isDisabled />
                  </GridItem>

                  <FormAccountSelect
                    isRequired
                    name="accountId"
                    label="Account"
                    memberId={memberId}
                    isDisabled
                  />

                  <FormSelect
                    isRequired
                    name="count"
                    label="Total no of withdraw slip"
                    options={totalNumberOptions}
                    isDisabled
                  />

                  {to && from && (
                    <GridItem colSpan={2}>
                      <Alert
                        status="info"
                        title={`Withdraw Slip from ${from} to ${to} will be printed.`}
                        hideCloseIcon
                      />
                    </GridItem>
                  )}

                  {count && !(from && to) && (
                    <GridItem colSpan={2}>
                      <Alert
                        status="error"
                        title="All Withdraw Slips have been printed."
                        hideCloseIcon
                      />
                    </GridItem>
                  )}

                  {count && from && to && (
                    <GridItem colSpan={2}>
                      <Alert
                        status="warning"
                        title="Withdraw Slip Print Preference"
                        subtitle={`Withdraw Slip of Width ${slipWidth} inch and height ${slipHeight} inch will be printed`}
                        bottomButtonlabel="Configure"
                        bottomButtonHandler={() => {
                          router.push(ROUTES.SETTINGS_GENERAL_PRINT_PREFERENCE);
                        }}
                        hideCloseIcon
                      />
                    </GridItem>
                  )}
                </FormSection>

                {count && from && to && (
                  <FormSection header="Print Preview" templateColumns={1} divider={false}>
                    <WithdrawSlipBookPrintPreviewCard {...printProps} />
                  </FormSection>
                )}
              </Box>
            </form>
          </FormProvider>
        </Box>
      </Container>

      <Box position="relative" margin="0px auto">
        <Box bottom="0" position="fixed" width="100%" bg="gray.100" zIndex={10}>
          <Container minW="container.xl" height="fit-content">
            <FormFooter
              mainButtonLabel="Print"
              mainButtonHandler={handleSave}
              isMainButtonDisabled={!(from && to)}
              draftButton={
                <Button variant="ghost" shade="danger" onClick={() => router.back()}>
                  Cancel
                </Button>
              }
            />
          </Container>
        </Box>
      </Box>
    </>
  );
};
