import { Dispatch, SetStateAction, useMemo } from 'react';
import { useFormContext } from 'react-hook-form';
import { AiOutlinePlus } from 'react-icons/ai';
import { useRouter } from 'next/router';

import { asyncToast, Box, Button, Grid, Icon, Text } from '@myra-ui';
import { Column, Table } from '@myra-ui/table';

import { InfoCard } from '@coop/ebanking/cards';
import { EbankingFormField, GoBack } from '@coop/ebanking/components';
import { useListNeaOfficeQuery, useUseUtilityMutation, Utility } from '@coop/ebanking/data-access';
import { CardContent } from '@coop/ebanking/ui-layout';

type PaymentStatus = 'form' | 'review' | 'success' | 'failure' | 'pending';

interface UtilityPaymentFormProps {
  currentSequence: number;
  setCurrentSequence: React.Dispatch<React.SetStateAction<number>>;
  schema: Utility;
  response: Record<number, Record<string, string> | null | undefined>;
  setResponse: Dispatch<SetStateAction<Record<number, Record<string, string> | null | undefined>>>;
  setPaymentStatus: React.Dispatch<React.SetStateAction<PaymentStatus>>;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
}

const ServiceTitle: Record<string, string> = {
  electricity: 'Electricity Payment',
  'internet-payment': 'Internet Payment',
  'tv-payment': 'TV Payment',
  'wallet-load': 'Wallet Load',
  package: 'Package',
};

export const UtilityPaymentForm = ({
  currentSequence,
  setCurrentSequence,
  schema,
  response,
  setResponse,
  setPaymentStatus,
  setIsLoading,
}: UtilityPaymentFormProps) => {
  const router = useRouter();

  const serviceName = router?.asPath?.split('/')?.[2];

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
      id: 'utility-payment-process',
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

  const { data: neaOfficeData } = useListNeaOfficeQuery(
    {},
    { enabled: router?.asPath?.includes('electricity') }
  );

  const neaOfficeList = useMemo(
    () =>
      neaOfficeData?.eBanking?.utility?.getNeaOffice?.map((office) => ({
        label: office?.office as string,
        value: office?.officeCode as string,
      })) ?? [],
    [neaOfficeData]
  );

  const clearForm = () => {
    const temp = methods.getValues();

    currentSequenceObj?.requiredFields?.forEach((f) => {
      const prevField = schema?.sequence?.[currentSequence - 2]?.responseFieldMapping?.find(
        (prev) => prev?.mapField === f?.fieldName
      );

      // only clear field if its value in not mapped from previous sequence response
      if (prevField?.mapField && !prevField?.options) {
        return;
      }

      if (f?.fieldType === 'OPTION') {
        temp[f?.fieldName as string] = null;
      } else {
        temp[f?.fieldName as string] = '';
      }
    });

    methods.reset(temp);
  };

  const fieldsToDisplay = useMemo(
    () => currentSequenceInfo?.filter((i) => typeof i.value === 'string'),
    [currentSequenceInfo]
  );

  const handleBack = () => {
    clearForm();
    setCurrentSequence((seq) => seq - 1);
  };

  return (
    <InfoCard
      title={ServiceTitle[serviceName]}
      btn={
        <Button variant="ghost" gap="s4">
          <Icon as={AiOutlinePlus} color="priamry.500" />
          Schedule for later
        </Button>
      }
    >
      <GoBack handleGoBack={handleBack} />

      <Box p="s16" display="flex" flexDir="column" gap="s32">
        {fieldsToDisplay?.length ? (
          <Grid templateColumns="repeat(3, 1fr)" gap="s16">
            {fieldsToDisplay.map((info) => (
              <CardContent title={info.label} subtitle={info.value} />
            ))}
          </Grid>
        ) : null}

        {currentSequenceInfo
          ?.filter((i) => Array.isArray(i.value))
          ?.map((info) => (
            <Box display="flex" flexDirection="column" gap="s4">
              <Text color="gray.800" fontSize="s3" fontWeight="600">
                {info.label}
              </Text>

              <CurrentSequenceArrayInfo info={info.value as unknown as Record<string, string>[]} />
            </Box>
          ))}

        {currentSequenceObj?.requiredFields?.map((field) => {
          if (!field?.fieldLabel) return null;

          const options: { label: string; value: string }[] = [];

          if (field?.fieldType === 'OPTION') {
            const prevField = schema?.sequence?.[currentSequence - 2]?.responseFieldMapping?.find(
              (prev) => prev?.mapField === field?.fieldName
            );

            const responseOptions =
              response?.[currentSequence - 1]?.[prevField?.fieldName as string] || [];

            (responseOptions as unknown as [])?.forEach((opt: Record<string, string>) => {
              options?.push({
                label: opt?.[prevField?.options?.value as string],
                value: opt?.[prevField?.options?.key as string],
                ...opt,
              });
            });
          }

          return (
            <EbankingFormField
              {...field}
              options={
                field?.fieldName === 'officeCode' && router?.asPath?.includes('electricity')
                  ? neaOfficeList
                  : options
              }
              schema={schema}
              currentSequence={currentSequence}
              key={field?.fieldName}
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
          >
            Proceed
          </Button>
          <Button
            type="reset"
            variant="outline"
            colorScheme="gray"
            w="100px"
            cursor="pointer"
            onClick={clearForm}
          >
            Clear
          </Button>
        </Box>
      </Box>
    </InfoCard>
  );
};

const CurrentSequenceArrayInfo = ({ info }: { info: Record<string, string>[] }) => {
  const columns = useMemo(() => {
    const temp: Column<typeof info[0]>[] = [];

    Object.keys(info[0])?.forEach((key) => {
      temp.push({
        header: key,
        accessorKey: key,
      });
    });

    return temp;
  }, [info]);

  return <Table data={info} columns={columns} isStatic isDetailPageTable />;
};
