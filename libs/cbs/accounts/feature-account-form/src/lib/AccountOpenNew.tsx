import React from 'react';
import { useEffect, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useRouter } from 'next/router';

import {
  DepositLoanAccountInput,
  NatureOfDepositProduct,
  useGetAccountOpenEditDataQuery,
  useGetAccountOpenProductDetailsQuery,
  useGetProductListQuery,
  useSetAccountDocumentDataMutation,
  useSetAccountOpenDataMutation,
} from '@coop/cbs/data-access';
import { FormCheckbox, FormSelect } from '@coop/shared/form';
import { FormInput } from '@coop/shared/form';
import {
  Alert,
  asyncToast,
  Box,
  Button,
  Container,
  FormFooter,
  FormHeader,
  FormMemberSelect,
  Grid,
  MemberCard,
  Text,
} from '@coop/shared/ui';
import { useGetIndividualMemberDetails } from '@coop/shared/utils';
import { useTranslation } from '@coop/shared/utils';

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

export type FileListType = {
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
      (prevVal, curVal) => {
        return [
          ...prevVal,
          {
            label: curVal?.productName as string,
            value: curVal?.id as string,
          },
        ];
      },
      [] as OptionType[]
    ) ?? []),
    ...(data?.settings?.general?.depositProduct?.getProductList?.notAllowed?.reduce(
      (prevVal, curVal) => {
        return [
          ...prevVal,
          {
            label: curVal?.data?.productName as string,
            value: curVal?.data?.id as string,
          },
        ];
      },
      [] as OptionType[]
    ) ?? []),
  ];
  const newLog =
    data?.settings?.general?.depositProduct?.getProductList?.notAllowed;

  const productID = watch('productId');

  const errors = newLog?.find((d) => d?.data?.id === productID);

  const poductDetails = useGetAccountOpenProductDetailsQuery(
    { id: productID },
    {
      enabled: triggerProductQuery,
    }
  );

  const ProductData =
    poductDetails?.data?.settings?.general?.depositProduct?.formState?.data;
  const productType = ProductData?.nature;

  useEffect(() => {
    if (productID) {
      setTriggerProductQuery(true);
    }
  }, [productID]);
  const mainButtonHandlermode0 = () => {
    if (memberId) {
      setMode('1');
    }
  };
  const previousButtonHandler = () => {
    setMode('0');
  };

  const submitForm = () => {
    const values = getValues();
    const updatedData = {
      ...values,
      tenure: values?.tenure ? values?.tenure : null,
      depositFrequencyMonthly: values?.depositFrequencyMonthly
        ? values?.depositFrequencyMonthly
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
        <FormHeader title={t['newAccountOpen']} />
      </Box>
      <Box
        display={mode === '0' ? 'flex' : 'none'}
        flexDirection="row"
        minH="calc(100vh - 230px)"
      >
        <Box
          display={'flex'}
          flexDirection="column"
          w="100%"
          borderRight={'1px solid'}
          borderColor="border.layout"
        >
          {' '}
          <FormProvider {...methods}>
            {' '}
            <form>
              <Box
                display={'flex'}
                flexDirection={'column'}
                gap="s32"
                p="s20"
                w="100%"
              >
                {errors && (
                  <Alert status="error">
                    <Box p="s20">
                      <ul>
                        {errors?.error?.map((item, index) => {
                          return <li key={index}> {item}</li>;
                        })}
                      </ul>
                    </Box>
                  </Alert>
                )}
                <FormMemberSelect name="memberId" label="Member" />
                <FormSelect
                  name="productId"
                  label={t['accProductName']}
                  __placeholder={t['accSelectProduct']}
                  isLoading={isFetching}
                  options={productOptions}
                />
                {productType !== NatureOfDepositProduct?.Mandatory && (
                  <Box
                    border={'1px solid'}
                    borderColor="border.layout"
                    borderRadius={'br2'}
                    p="s16"
                  >
                    <CriteriaCard productId={productID} />
                  </Box>
                )}
                <FormInput name="accountName" label="Account Name" />
                {productType !== NatureOfDepositProduct?.VoluntaryOrOptional &&
                  productType !== NatureOfDepositProduct?.Mandatory && (
                    <Tenure />
                  )}
                <Interest />
                <DepositFrequency />
                {(ProductData?.alternativeChannels ||
                  ProductData?.atmFacility) && (
                  <Box display={'flex'} flexDirection="column" gap="s16">
                    <Text fontWeight={'600'} fontSize="r1">
                      Other Services
                    </Text>
                    <Box display="flex" flexDirection={'column'} gap="s8">
                      {ProductData?.alternativeChannels && (
                        <Box display="flex" flexDirection={'column'} gap="s8">
                          <FormCheckbox
                            name="mobileBankig"
                            label="Mobile Banking"
                          />
                          <FormCheckbox name="eBanking" label="eBanking" />
                        </Box>
                      )}
                      {ProductData?.atmFacility && (
                        <FormCheckbox name="atmFacility" label="ATM Facility" />
                      )}
                    </Box>
                  </Box>
                )}
                <Grid templateColumns={'repeat(3,1fr'} gap="s16">
                  <FormInput
                    name="initialDepositAmount"
                    label="Initial Deposit Amount"
                    type={'number'}
                  />
                </Grid>
                <Agent />
                <FeesAndCharge />
              </Box>
            </form>
          </FormProvider>
          <RequiredDocuments
            setFileList={setFileList}
            id={id}
            productId={productID}
            memberId={memberId}
          />
        </Box>

        {memberId && (
          <Box position={'sticky'} top="170px" right={'0'} w="320px">
            <Box display={'flex'} flexDirection="column" gap="s16">
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
            <Box p="s16">
              {productID && <ProductCard productId={productID} />}
            </Box>
            <Box p="s16">
              <AccordianComponent productId={productID} />
            </Box>
          </Box>
        )}
      </Box>
      <Box position={'sticky'} bottom={0}>
        <Box>
          {mode === '0' && (
            <FormFooter
              mainButtonLabel="Proceed to Payment"
              mainButtonHandler={mainButtonHandlermode0}
            />
          )}{' '}
          {mode === '1' && (
            <FormFooter
              status={
                <Button onClick={previousButtonHandler}> Previous</Button>
              }
              mainButtonLabel="Confirm Payment"
              mainButtonHandler={submitForm}
            />
          )}
        </Box>
      </Box>
    </Container>
  );
};
