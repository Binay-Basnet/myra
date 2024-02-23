import { Dispatch, SetStateAction, useMemo } from 'react';
import { useFormContext } from 'react-hook-form';
import { AiOutlinePlus } from 'react-icons/ai';

import { asyncToast, Box, Button, Column, Grid, GridItem, Icon, Table, Text } from '@myra-ui';

import { InfoCard } from '@coop/ebanking/cards';
import { GoBack } from '@coop/ebanking/components';
import { useUseUtilityMutation, Utility } from '@coop/ebanking/data-access';
import { CardContent } from '@coop/ebanking/ui-layout';
import { FormAmountInput } from '@coop/shared/form';
import { amountConverter } from '@coop/shared/utils';

type PaymentStatus = 'form' | 'review' | 'success' | 'failure' | 'pending';

interface InternetPaymentFormProps {
  currentSequence: number;
  setCurrentSequence: React.Dispatch<React.SetStateAction<number>>;
  schema: Utility;
  response: Record<number, Record<string, string> | null | undefined>;
  setResponse: Dispatch<SetStateAction<Record<number, Record<string, string> | null | undefined>>>;
  setPaymentStatus: React.Dispatch<React.SetStateAction<PaymentStatus>>;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
}

type BILL = { billAmount: string; dueBillOf: string; payableAmount: string };

export const ElectricityBill = ({
  currentSequence,
  setCurrentSequence,
  schema,
  response,
  setResponse,
  setPaymentStatus,
  setIsLoading,
}: InternetPaymentFormProps) => {
  const methods = useFormContext();

  const { handleSubmit } = methods;

  const currentSequenceObj = schema?.sequence?.find(
    (seq) => Number(seq.processSeq) === currentSequence
  );

  const currentSequenceInfo = useMemo(() => {
    const prevSequence = currentSequence - 1;

    if (prevSequence < 1) return null;

    const temp: { label: string; value: string }[] = [];

    if (!response?.[prevSequence]) return null;

    const prevSequenceObj = schema?.sequence?.find(
      (seq) => Number(seq.processSeq) === prevSequence
    );

    prevSequenceObj?.responseFieldMapping?.forEach((field) => {
      if (!field?.mapField && field?.fieldName !== 'message') {
        temp.push({
          label: field?.fieldLabel as string,
          value: response[prevSequence]?.[field?.fieldName as string] as string,
        });
      }
    });

    return temp;
  }, [currentSequence, response, schema?.sequence]);

  const { mutateAsync: utilityProceed } = useUseUtilityMutation({
    onMutate: () => setIsLoading(true),
  });

  const handleProceed = async () => {
    const values = methods.getValues();

    const inputDataObj: Record<string, string> = {};

    currentSequenceObj?.requiredFields?.forEach((field) => {
      inputDataObj[field?.fieldName as string] = values?.[field?.fieldName as string] as string;
    });

    asyncToast({
      id: 'utility-internet-payment-process',
      msgs: {
        loading: 'Proccessing',
        success: 'Proceed',
      },
      promise: utilityProceed({
        input: {
          slug: values?.['slug'],
          processSeq: String(currentSequence),
          inputData: inputDataObj,
        },
      }),
      onSuccess: (res) => {
        const responseData = res?.eBanking?.utility?.useUtility?.data;

        setResponse((val) => ({ ...val, [currentSequence]: responseData }));
        const responseMapObj: Record<string, string> = {};

        currentSequenceObj?.responseFieldMapping?.forEach((field) => {
          if (
            field?.mapField &&
            responseData?.[field?.fieldName as string] !== undefined &&
            !field?.options
          ) {
            responseMapObj[field?.mapField as string] = responseData[field?.fieldName as string];
          }
        });

        methods.reset({ ...values, ...responseMapObj });

        setCurrentSequence((val) => val + 1);

        setIsLoading(false);
      },
      onError: () => {
        setIsLoading(false);
      },
    });
  };

  const { dueBills, totalBillAmount, totalPayableAmount } = useMemo(() => {
    const bills: BILL[] =
      (currentSequenceInfo?.find((seq) => seq?.label === 'BillDetail')
        ?.value as unknown as BILL[]) ?? [];

    const tempBill =
      bills?.reduce(
        (accumulator, current) => accumulator + Number(current.billAmount),
        0 as number
      ) ?? 0;

    const tempPayable =
      bills?.reduce(
        (accumulator, current) => accumulator + Number(current.payableAmount),
        0 as number
      ) ?? 0;
    return { dueBills: bills, totalBillAmount: tempBill, totalPayableAmount: tempPayable };
  }, [currentSequenceInfo]);

  const columns = useMemo<Column<typeof dueBills[0]>[]>(
    () => [
      {
        header: 'Due Bill Of',
        accessorKey: 'dueBillOf',
        footer: () => 'Total',
      },
      {
        header: 'Bill Amount',
        accessorKey: 'billAmount',
        footer: () => amountConverter(totalBillAmount),
      },
      {
        header: 'Payable Amount',
        accessorKey: 'payableAmount',
        footer: () => amountConverter(totalPayableAmount),
      },
    ],
    []
  );

  const handleBack = () => {
    methods.setValue('amount', '');
    setCurrentSequence((seq) => seq - 1);
  };

  return (
    <InfoCard
      title="Electricity Payment"
      btn={
        <Button variant="ghost" gap="s4">
          <Icon as={AiOutlinePlus} color="priamry.500" />
          Schedule for later
        </Button>
      }
    >
      <GoBack handleGoBack={handleBack} />

      <Box p="s16" display="flex" flexDir="column" gap="s32">
        <Grid templateColumns="repeat(3, 1fr)" gap="s16">
          {currentSequenceInfo?.map(
            (info) =>
              typeof info.value === 'string' && (
                <CardContent title={info.label} subtitle={info.value} />
              )
          )}

          <GridItem colSpan={3} gap="s8">
            <Text fontSize="s3" fontWeight={500} color="gray.800">
              Bill Detail
            </Text>
            <Table isStatic showFooter data={dueBills} columns={columns} noDataTitle="Due Bills" />
          </GridItem>

          <GridItem
            colSpan={3}
            display="flex"
            gap="s8"
            fontSize="s3"
            color="gray.800"
            fontWeight={500}
          >
            <Text>Total Payable Amount:</Text>
            <Text>{amountConverter(response?.['1']?.['totalPayable'] || 0)}</Text>
          </GridItem>

          <FormAmountInput
            name="amount"
            label="Amount"
            isRequired
            rules={{ required: 'Amount is required' }}
          />
        </Grid>

        <Box display="flex" gap="s16">
          <Button
            w="100px"
            type="submit"
            onClick={handleSubmit(
              currentSequence === Number(schema?.totalProcessingSequence)
                ? () => setPaymentStatus('review')
                : handleProceed
            )}
          >
            Proceed
          </Button>
          <Button
            type="reset"
            variant="outline"
            colorScheme="gray"
            w="100px"
            cursor="pointer"
            onClick={() => {
              methods.setValue('amount', '');
            }}
          >
            Clear
          </Button>
        </Box>
      </Box>
    </InfoCard>
  );
};
