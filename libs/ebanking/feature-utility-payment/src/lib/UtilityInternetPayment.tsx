import { useEffect, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';

import { Box } from '@myra-ui';

import { EbankingPathBar, LoaderOverlay } from '@coop/ebanking/components';
import {
  useAppSelector,
  useGetUtilityQuery,
  useMakePaymentMutation,
  Utility,
  UtilityInput,
} from '@coop/ebanking/data-access';

import {
  InternetPayment,
  InternetPaymentForm,
  InternetPaymentResult,
  InternetPaymentReview,
} from '../components';

type PaymentStatus = 'form' | 'review' | 'success' | 'failure' | 'pending';

export const UtilityInternetPayment = () => {
  const [currentSequence, setCurrentSequence] = useState(0);

  const [isLoading, setIsLoading] = useState(false);

  const [schema, setSchema] = useState<Utility | null>();

  const [response, setResponse] = useState<
    Record<number, Record<string, string> | null | undefined>
  >({});

  const sourceAccount = useAppSelector(
    (state) => state?.auth?.cooperative?.user?.defaultAccount
  ) as string;
  const [paymentStatus, setPaymentStatus] = useState<PaymentStatus>('form');

  const [transactionCode, setTransactionCode] = useState<string>('');
  const [mutationMsg, setMutationMsg] = useState<string>('');

  const methods = useForm<UtilityInput & Record<string, string>>({
    defaultValues: {
      sourceAccount,
    },
  });

  const { watch } = methods;

  const slug = watch('slug');

  const { refetch } = useGetUtilityQuery(
    {
      slug: slug as unknown as string,
    },
    {
      enabled: !!slug,
      onSuccess: (utilityData) => {
        setSchema(utilityData?.eBanking?.utility?.getUtility?.utility);
      },
    }
  );

  useEffect(() => {
    if (slug) {
      refetch();
    }
  }, [slug]);

  const { mutateAsync: utilitySubmit } = useMakePaymentMutation({
    onMutate: () => setIsLoading(true),
  });

  const currentSequenceObj = schema?.sequence?.find(
    (seq) => Number(seq.processSeq) === currentSequence
  );

  const handlePayment = async () => {
    const values = methods.getValues();

    const inputDataObj: Record<string, string> = {};

    currentSequenceObj?.requiredFields?.forEach((field) => {
      inputDataObj[field?.fieldName as string] = values?.[field?.fieldName as string] as string;
    });

    const submitResponse = await utilitySubmit({
      input: {
        slug: values?.['slug'],
        totalProcessingSequence: schema?.totalProcessingSequence as string,
        processSeq: String(currentSequence),
        sourceAccount: values?.['sourceAccount'],
        inputData: inputDataObj,
        txnPin: values?.['txnPin'],
      },
    });

    setIsLoading(false);

    if (
      !submitResponse?.eBanking?.utility?.makePayment?.error &&
      submitResponse?.eBanking?.utility?.makePayment?.data?.transactionId
    ) {
      // queryClient.invalidateQueries(['getAccountList']);
      // queryClient.invalidateQueries(['getTransactionLists']);
      setTransactionCode(
        submitResponse?.eBanking?.utility?.makePayment?.data?.transactionId as string
      );
      setMutationMsg(submitResponse?.eBanking?.utility?.makePayment?.data?.message);

      if (submitResponse?.eBanking?.utility?.makePayment?.status === 'SUCCESS') {
        setPaymentStatus('success');
      }
      if (submitResponse?.eBanking?.utility?.makePayment?.status === 'PENDING') {
        setPaymentStatus('pending');
      }
    } else {
      const error = submitResponse?.eBanking?.utility?.makePayment?.error;
      const errMsg =
        (error?.__typename === 'BadRequestError' && error?.badRequestErrorMessage) ||
        submitResponse?.eBanking?.utility?.makePayment?.data?.message;
      setMutationMsg(errMsg as string);
      setPaymentStatus('failure');
      // if (errMsg) {
      //   // methods.setError('mobileNumber', { message: errMsg });
      //   setPaymentStatus('form');
      // } else {
      //   setPaymentStatus('failure');
      // }
    }
  };

  return (
    <FormProvider {...methods}>
      <Box display="flex" flexDir="column" gap="s16">
        <EbankingPathBar
          paths={[
            { label: 'Utility Payments', link: '/utility-payments' },
            { label: 'Internet Payment' },
          ]}
        />

        <Box display={paymentStatus === 'form' && currentSequence === 0 ? 'block' : 'none'}>
          <InternetPayment setCurrentSequence={setCurrentSequence} />
        </Box>

        {currentSequence !== 0 && paymentStatus === 'form' && (
          <Box>
            <InternetPaymentForm
              currentSequence={currentSequence}
              setCurrentSequence={setCurrentSequence}
              schema={schema as Utility}
              setResponse={setResponse}
              response={response}
              setPaymentStatus={setPaymentStatus}
              setIsLoading={setIsLoading}
            />
          </Box>
        )}

        {paymentStatus === 'review' && (
          <InternetPaymentReview
            setPaymentStatus={setPaymentStatus}
            handleMakePayment={handlePayment}
            schema={schema as Utility}
            currentSequence={currentSequence}
            response={response}
          />
        )}

        {paymentStatus === 'success' ||
        paymentStatus === 'failure' ||
        paymentStatus === 'pending' ? (
          <InternetPaymentResult
            paymentStatus={paymentStatus}
            setPaymentStatus={setPaymentStatus}
            mutationMsg={mutationMsg}
            handleMakePayment={handlePayment}
            schema={schema as Utility}
            currentSequence={currentSequence}
            response={response}
            transactionCode={transactionCode}
          />
        ) : null}

        {isLoading && <LoaderOverlay />}
      </Box>
    </FormProvider>
  );
};
