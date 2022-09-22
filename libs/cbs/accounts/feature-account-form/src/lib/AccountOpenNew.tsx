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
  useSetAccountDocumentDataMutation,
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
import { featureCode, useGetIndividualMemberDetails, useTranslation } from '@coop/shared/utils';

import {
  Agent,
  DepositFrequency,
  FeesAndCharge,
  Interest,
  RequiredDocuments,
  Tenure,
} from '../component/form';
import { AccordianComponent } from '../component/form/NewAccountOpen/AccordianComponent';
import { CriteriaCard } from '../component/form/NewAccountOpen/CriteriaCard';
import { ProductCard } from '../component/form/NewAccountOpen/ProductDetailsCard';

type OptionType = { label: string; value: string };

type FileList =
  | 'signature'
  | 'nominee'
  | 'photo'
  | 'fingerPrintPhoto'
  | 'decisionDocuments'
  | 'registeredPhotos'
  | 'InsSignature'
  | 'taxClearance';

type FileListType = {
  signature: string[];
  nominee: string[];
  photo: string[];
  fingerPrintPhoto: string[];
  decisionDocuments: string[];
  registeredPhotos: string[];
  InsSignature: string[];
  taxClearance: string[];
};

export const AccountOpenNew = () => {
  const [fileList, setFileList] = useState<FileListType>({
    signature: [],
    fingerPrintPhoto: [],
    photo: [],
    nominee: [],
    decisionDocuments: [],
    registeredPhotos: [],
    InsSignature: [],
    taxClearance: [],
  });
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
  const { mutate: mutateDocs } = useSetAccountDocumentDataMutation();

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
  const minorOptions = minorDetails?.map((item) => ({
    label: item?.fullName?.local as string,
    value: item?.familyMemberId as string,
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
      id: 'account-open-id',
      msgs: {
        success: 'New Account Opened',
        loading: 'Opening new Account',
      },
      onSuccess: () => router.push('/accounts/list'),
      promise: mutateAsync({ id, data: updatedData }),
    });

    Object.keys(fileList).forEach((fieldName) => {
      if (fileList[fieldName as FileList]) {
        mutateDocs({
          subscriptionId: id,
          fieldId: fieldName,
          identifiers: fileList[fieldName as FileList],
        });
      }
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
        <FormHeader title={`${t['newAccountOpen']} - ${featureCode?.newAccountOpen}`} />
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
                    bottomButtonlabel="View All Criteria"
                    bottomButtonHandler={() => setShowCriteria((prev) => !prev)}
                    hideCloseIcon
                  >
                    <Box pt="s8">
                      <ul>
                        {errors?.error?.map((item) => (
                          <li key={item}>
                            {' '}
                            <Text fontWeight="400" fontSize="s2">
                              {item}
                            </Text>
                          </li>
                        ))}
                      </ul>
                    </Box>
                  </Alert>
                )}
                {showCriteria && (
                  <Box border="1px solid" borderColor="border.layout" borderRadius="br2" p="s16">
                    <CriteriaCard productId={productID} />
                  </Box>
                )}
                {memberId && productID && !errors && (
                  <Box display="flex" flexDirection="column" gap="s32" w="100%">
                    <FormInput name="accountName" label="Account Name" />
                    {ProductData?.isForMinors && (
                      <FormSelect name="minor" label="Minor" options={minorOptions} />
                    )}
                    {productType !== NatureOfDepositProduct?.Current &&
                      productType !== NatureOfDepositProduct?.Saving && <Tenure />}
                    <Divider />
                    <Interest />
                    <DepositFrequency />
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
                    <Agent />
                    <FeesAndCharge />
                  </Box>
                )}
              </Box>
            </form>
          </FormProvider>
          {memberId && productID && !errors && (
            <RequiredDocuments
              setFileList={setFileList}
              id={id}
              productId={productID}
              memberId={memberId}
            />
          )}
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
            <Box p="s16">{productID && <ProductCard productId={productID} />}</Box>
            {productID && (
              <Box p="s16">
                <AccordianComponent productId={productID} />
              </Box>
            )}
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
