import { Dispatch, SetStateAction, useMemo } from 'react';
import { useFormContext } from 'react-hook-form';
import { AiOutlinePlus } from 'react-icons/ai';
import { useRouter } from 'next/router';

import { asyncToast, Box, Button, Grid, Icon } from '@myra-ui';

import { InfoCard } from '@coop/ebanking/cards';
import { EbankingFormField } from '@coop/ebanking/components';
import { useListNeaOfficeQuery, useUseUtilityMutation, Utility } from '@coop/ebanking/data-access';
import { CardContent } from '@coop/ebanking/ui-layout';

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

export const InternetPaymentForm = ({
  currentSequence,
  setCurrentSequence,
  schema,
  response,
  setResponse,
  setPaymentStatus,
  setIsLoading,
}: InternetPaymentFormProps) => {
  const router = useRouter();

  const methods = useFormContext();

  // const [isActionDisabled, setIsActionDisabled] = useState(true);

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
          totalProcessingSequence: schema?.totalProcessingSequence,
          processSeq: String(currentSequence),
          sourceAccount: values?.['sourceAccount'],
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
        // setPaymentStatus('form');
      },
      onError: () => {
        setIsLoading(false);
        // setPaymentStatus('form');
      },
    });
  };

  // useEffect(() => {
  //   const subscription = watch((data) => {
  //     let temp = false;

  //     currentSequenceObj?.requiredFields?.forEach((field) => {
  //       if (!data?.[field?.fieldName as string]) {
  //         temp = true;
  //       }
  //     });

  //     setIsActionDisabled(temp);
  //   });

  //   return () => subscription.unsubscribe();
  // }, [watch, currentSequenceObj]);

  const { data: neaOfficeData } = useListNeaOfficeQuery();

  const neaOfficeList = useMemo(
    () =>
      neaOfficeData?.eBanking?.utility?.getNeaOffice?.map((office) => ({
        label: office?.office as string,
        value: office?.officeCode as string,
      })) ?? [],
    [neaOfficeData]
  );

  return (
    <InfoCard
      title={router?.asPath?.includes('electricity') ? 'Electricity' : 'Internet Payment'}
      btn={
        <Button variant="ghost" gap="s4">
          <Icon as={AiOutlinePlus} color="priamry.500" />
          Schedule for later
        </Button>
      }
    >
      <Box p="s16" display="flex" flexDir="column" gap="s32">
        <Grid templateColumns="repeat(3, 1fr)" gap="s16">
          {currentSequenceInfo?.map(
            (info) =>
              typeof info.value === 'string' && (
                <CardContent title={info.label} subtitle={info.value} />
              )
          )}
        </Grid>

        {currentSequenceObj?.requiredFields?.map((field) => {
          if (!field?.fieldLabel) return null;

          const options: { label: string; value: string }[] = [];

          if (field?.fieldType === 'OPTION') {
            const prevField = schema?.sequence?.[currentSequence - 2]?.responseFieldMapping?.find(
              (prev) => prev?.mapField === field?.fieldName
            );

            const responseOptions =
              response?.[currentSequence - 1]?.[prevField?.fieldName as string] || [];

            (responseOptions as unknown as [])?.forEach((opt) => {
              options?.push({
                label: opt?.[prevField?.options?.value as string],
                value: opt?.[prevField?.options?.key as string],
              });
            });
          }

          return (
            <EbankingFormField
              {...field}
              options={field?.fieldName === 'officeCode' ? neaOfficeList : options}
              schema={schema}
              currentSequence={currentSequence}
              response={response}
            />
          );
        })}

        <Box display="flex" gap="s16">
          <Button
            w="100px"
            type="submit"
            onClick={handleSubmit(
              currentSequence === Number(schema?.totalProcessingSequence)
                ? () => setPaymentStatus('review')
                : handleProceed
            )}
            // isDisabled={isActionDisabled}
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
              methods.reset();
            }}
          >
            Clear
          </Button>
        </Box>
      </Box>
    </InfoCard>
  );
};
