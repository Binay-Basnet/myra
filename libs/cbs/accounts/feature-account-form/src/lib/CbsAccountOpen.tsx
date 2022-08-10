import React from 'react';
import { useEffect, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useRouter } from 'next/router';

import {
  DepositLoanAccountInput,
  useSetAccountOpenDataMutation,
} from '@coop/cbs/data-access';
import {
  NatureOfDepositProduct,
  useGetAccountOpenEditDataQuery,
  useGetAccountOpenProductDetailsQuery,
  useSetAccountDocumentDataMutation,
} from '@coop/cbs/data-access';
import { Box, Container, FormFooter, FormHeader, Text } from '@coop/shared/ui';
import { useTranslation } from '@coop/shared/utils';

import {
  Agent,
  Atm,
  DepositFrequency,
  FeesAndCharge,
  Interest,
  Member,
  Product,
  RequiredDocuments,
  Tenure,
} from '../component/form';

type FileList = 'signature' | 'nominee' | 'photo' | 'fingerPrintPhoto';

export type FileListType = {
  signature: string[];
  nominee: string[];
  photo: string[];
  fingerPrintPhoto: string[];
};

export function CbsAccountOpen() {
  const [fileList, setFileList] = useState<FileListType>({
    signature: [],
    fingerPrintPhoto: [],
    photo: [],
    nominee: [],
  });
  const { t } = useTranslation();
  const router = useRouter();
  const id = String(router?.query?.['id']);

  const methods = useForm<DepositLoanAccountInput>();

  const { mutate } = useSetAccountOpenDataMutation();
  const { mutate: mutateDocs } = useSetAccountDocumentDataMutation();

  const { getValues, watch, reset } = methods;

  const [triggerQuery, setTriggerQuery] = useState(false);

  const products = watch('productId');

  const poductDetails = useGetAccountOpenProductDetailsQuery(
    { id: products },
    {
      enabled: triggerQuery,
    }
  );

  const ProductData =
    poductDetails?.data?.settings?.general?.depositProduct?.formState?.data;

  const ProductType = ProductData?.nature;
  useEffect(() => {
    if (products) {
      setTriggerQuery(true);
    }
  }, [products]);

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
    mutate(
      { id, data: updatedData },
      {
        onSuccess: () => router.push('/accounts/list'),
      }
    );

    Object.keys(fileList).map((fieldName) => {
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
    <>
      <Container minW="container.xl" height="fit-content" pb="60px">
        <FormProvider {...methods}>
          <form>
            <Box
              position="sticky"
              top="110px"
              bg="gray.100"
              width="100%"
              zIndex="10"
            >
              <FormHeader title={t['newAccountOpen']} />
            </Box>

            <Member />

            <Product />

            {ProductType !== NatureOfDepositProduct?.VoluntaryOrOptional && (
              <Tenure />
            )}

            <Interest />

            {ProductType !== NatureOfDepositProduct?.VoluntaryOrOptional && (
              <DepositFrequency />
            )}

            {ProductType === NatureOfDepositProduct?.VoluntaryOrOptional && (
              <Atm />
            )}

            <FeesAndCharge />

            <Agent />
          </form>
        </FormProvider>
        <RequiredDocuments setFileList={setFileList} id={id} />
      </Container>
      <Box bottom="0" position="fixed" width="100%" bg="gray.100">
        <Container minW="container.xl" height="fit-content">
          <FormFooter
            status={
              <Box display="flex" gap="s8">
                <Text
                  color="neutralColorLight.Gray-60"
                  fontWeight="Regular"
                  as="i"
                  fontSize="r1"
                >
                  Press Submit to save form
                </Text>
              </Box>
            }
            mainButtonLabel={t['submit']}
            mainButtonHandler={() => submitForm()}
          />
        </Container>
      </Box>
    </>
  );
}
