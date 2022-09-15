import { useEffect, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useRouter } from 'next/router';

import {
  DepositLoanAccountInput,
  NatureOfDepositProduct,
  useGetAccountOpenEditDataQuery,
  useGetAccountOpenMinorListQuery,
  useGetAccountOpenProductDetailsQuery,
  useGetProductListQuery,
  useSetAccountOpenDataMutation,
} from '@coop/cbs/data-access';
import { FormCheckbox, FormInput, FormSelect } from '@coop/shared/form';
import {
  Alert,
  asyncToast,
  Box,
  Button,
  Container,
  Divider,
  FormFooter,
  FormHeader,
  FormMemberSelect,
  Grid,
  MemberCard,
  Text,
} from '@coop/shared/ui';
import { useGetIndividualMemberDetails, useTranslation } from '@coop/shared/utils';

type OptionType = { label: string; value: string };

export const NewLoanApplication = () => {
  const { t } = useTranslation();
  const [triggerQuery, setTriggerQuery] = useState(false);
  const [showCriteria, setShowCriteria] = useState(false);
  const [triggerProductQuery, setTriggerProductQuery] = useState(false);
  const [mode, setMode] = useState('0');

  const methods = useForm<DepositLoanAccountInput>();
  const { getValues, watch, reset } = methods;
  const memberId = watch('memberId');
  const router = useRouter();
  const id = String(router?.query?.['id']);
  const { mutateAsync } = useSetAccountOpenDataMutation();

  const { memberDetailData, memberSignatureUrl, memberCitizenshipUrl } =
    useGetIndividualMemberDetails({ memberId });
  const { data, isFetching } = useGetProductListQuery(
    {
      memberId,
    },
    { enabled: triggerQuery }
  );
  useEffect(() => {
    if (memberId) {
      setTriggerQuery(true);
    }
  }, [memberId]);
  const productOptions = [
    ...(data?.settings?.general?.depositProduct?.getProductList?.allowed?.reduce(
      (previousValue, currentValue) => [
        ...previousValue,
        {
          label: currentValue?.productName as string,
          value: currentValue?.id as string,
        },
      ],
      [] as OptionType[]
    ) ?? []),
    ...(data?.settings?.general?.depositProduct?.getProductList?.notAllowed?.reduce(
      (previousValue, currentValue) => [
        ...previousValue,
        {
          label: currentValue?.data?.productName as string,
          value: currentValue?.data?.id as string,
        },
      ],
      [] as OptionType[]
    ) ?? []),
  ];
  const newLog = data?.settings?.general?.depositProduct?.getProductList?.notAllowed;

  const productID = watch('productId');

  const errors = newLog?.find((d) => d?.data?.id === productID);

  const poductDetails = useGetAccountOpenProductDetailsQuery(
    { id: productID },
    {
      enabled: triggerProductQuery,
    }
  );

  const ProductData = poductDetails?.data?.settings?.general?.depositProduct?.formState?.data;
  const productType = ProductData?.nature;

  useEffect(() => {
    if (productID) {
      setTriggerProductQuery(true);
    }
  }, [productID]);

  const previousButtonHandler = () => {
    setMode('0');
  };
  const { data: minorData } = useGetAccountOpenMinorListQuery(
    {
      memberId,
    },
    { enabled: triggerQuery }
  );

  const minorDetails = minorData?.account?.listMinors?.data;
  const minorOptions = minorDetails?.map((data) => ({
    label: data?.fullName?.local as string,
    value: data?.familyMemberId as string,
  }));
  const submitForm = () => {
    const values = getValues();
    const updatedData = {
      ...values,
      tenure: values?.tenure ? values?.tenure : null,
      depositFrequencyMonthly: values?.depositFrequencyMonthly
        ? values?.depositFrequencyMonthly
        : null,
      depositFrequencyFrequencyDay: values?.depositFrequencyFrequencyDay
        ? values?.depositFrequencyFrequencyDay
        : null,
      depositFrequencyDayOfWeek: values?.depositFrequencyDayOfWeek
        ? values?.depositFrequencyDayOfWeek
        : null,
      depositFrequencyYearlyMonth: values?.depositFrequencyYearlyMonth
        ? values?.depositFrequencyYearlyMonth
        : null,
      depositFrequencyYearlyDay: values?.depositFrequencyYearlyDay
        ? values?.depositFrequencyYearlyDay
        : null,
      depositFrequencyWeekly: values?.depositFrequencyWeekly
        ? values?.depositFrequencyWeekly
        : null,
    };

    asyncToast({
      id: 'loan-account-open-id',
      msgs: {
        success: 'New Loan Account Opened',
        loading: 'Opening new Account',
      },
      onSuccess: () => router.push('/accounts/list'),
      promise: mutateAsync({ id, data: updatedData }),
    });
  };
  const { data: editValues, refetch } = useGetAccountOpenEditDataQuery({
    id,
  });
  useEffect(() => {
    if (editValues) {
      const editValueData = editValues?.account?.formState?.data;
      if (editValueData) {
        reset({
          ...editValueData,
        });
      }
    }
  }, [editValues, id]);

  useEffect(() => {
    if (id) {
      refetch();
    }
  }, [refetch]);
  return (
    <Container minW="container.xl" p="0" bg="white">
      {' '}
      <Box position="sticky" top="110px" bg="gray.100" width="100%" zIndex="10">
        <FormHeader title="New Loan Application" />
      </Box>
      <Box display={mode === '0' ? 'flex' : 'none'} flexDirection="row" minH="calc(100vh - 230px)">
        <Box
          display="flex"
          flexDirection="column"
          w="100%"
          borderRight="1px solid"
          borderColor="border.layout"
        >
          {' '}
          <FormProvider {...methods}>
            {' '}
            <form>
              <Box display="flex" flexDirection="column" gap="s32" p="s20" w="100%">
                <FormMemberSelect name="memberId" label="Member" />
                <FormSelect
                  name="productId"
                  label={t['accProductName']}
                  __placeholder={t['accSelectProduct']}
                  isLoading={isFetching}
                  options={productOptions}
                />
                {errors && (
                  <Alert
                    status="error"
                    title="Error"
                    bottomButtonlabel={
                      productType === NatureOfDepositProduct?.Mandatory ? '' : 'View All Criteria'
                    }
                    bottomButtonHandler={() => setShowCriteria((prev) => !prev)}
                    hideCloseIcon={true}
                  >
                    <Box pt="s8">
                      <ul>
                        {errors?.error?.map((item, index) => {
                          return (
                            <li key={index}>
                              {' '}
                              <Text fontWeight={'400'} fontSize="s2">
                                {item}
                              </Text>
                            </li>
                          );
                        })}
                      </ul>
                    </Box>
                  </Alert>
                )}
                {productType !== NatureOfDepositProduct?.Mandatory && showCriteria && (
                  <Box
                    border="1px solid"
                    borderColor="border.layout"
                    borderRadius="br2"
                    p="s16"
                  ></Box>
                )}
                {memberId && productID && !errors && (
                  <Box display="flex" flexDirection="column" gap="s32" w="100%">
                    <FormInput name="accountName" label="Account Name" />
                    {ProductData?.isForMinors && (
                      <FormSelect name="minor" label="Minor" options={minorOptions} />
                    )}

                    <Divider />

                    {(productType === NatureOfDepositProduct?.TermSavingOrFd ||
                      productType === NatureOfDepositProduct?.RecurringSaving) && (
                      <Box display="flex" flexDirection="column" gap="s16">
                        <Box display="flex" flexDirection="column" gap="s4">
                          <Text fontWeight="500" fontSize="r1">
                            {' '}
                            Default Amount Deposit Account Name
                          </Text>
                          <Text fontWeight="400" fontSize="s2">
                            {' '}
                            If the member does not specify particular account for deposit, this
                            mapped account will be set globally. Normally this is a compulsory
                            account type.
                          </Text>
                        </Box>

                        <FormSelect name="defaultAmountDepositAccountName" label="Account Type" />
                      </Box>
                    )}

                    {(ProductData?.alternativeChannels || ProductData?.atmFacility) && (
                      <Box display="flex" flexDirection="column" gap="s16">
                        <Text fontWeight="600" fontSize="r1">
                          Other Services
                        </Text>
                        <Box display="flex" flexDirection="column" gap="s8">
                          {ProductData?.alternativeChannels && (
                            <Box display="flex" flexDirection="column" gap="s8">
                              <FormCheckbox name="mobileBanking" label="Mobile Banking" />
                              <FormCheckbox name="eBanking" label="eBanking" />
                            </Box>
                          )}
                          {ProductData?.atmFacility && (
                            <FormCheckbox name="atmFacility" label="ATM Facility" />
                          )}
                        </Box>
                      </Box>
                    )}
                    <Grid templateColumns="repeat(3, 1fr)" rowGap="s16" columnGap="s20">
                      <FormInput
                        name="initialDepositAmount"
                        label="Initial Deposit Amount"
                        type="number"
                      />
                    </Grid>
                  </Box>
                )}
              </Box>
            </form>
          </FormProvider>
        </Box>

        {memberId && (
          <Box position="sticky" top="170px" right="0" w="320px">
            <Box display="flex" flexDirection="column" gap="s16">
              <MemberCard
                memberDetails={{
                  name: memberDetailData?.name,
                  avatar: 'https://bit.ly/dan-abramov',
                  memberID: memberDetailData?.id,
                  gender: memberDetailData?.gender,
                  age: memberDetailData?.age,
                  maritalStatus: memberDetailData?.maritalStatus,
                  dateJoined: memberDetailData?.dateJoined,
                  phoneNo: memberDetailData?.contact,
                  email: memberDetailData?.email,
                  address: memberDetailData?.address,
                }}
                signaturePath={memberSignatureUrl}
                showSignaturePreview={false}
                citizenshipPath={memberCitizenshipUrl}
                viewProfileHandler={() => null}
                viewAccountTransactionsHandler={() => null}
              />
            </Box>
            <Box p="s16"></Box>
            {productID && <Box p="s16"></Box>}
          </Box>
        )}
      </Box>
      <Box position="sticky" bottom={0}>
        <Box>
          {mode === '0' && (
            <FormFooter mainButtonLabel="Submit Form" mainButtonHandler={submitForm} />
          )}{' '}
          {mode === '1' && (
            <FormFooter
              status={<Button onClick={previousButtonHandler}> Previous</Button>}
              mainButtonLabel="Confirm Payment"
              mainButtonHandler={submitForm}
            />
          )}
        </Box>
      </Box>
    </Container>
  );
};