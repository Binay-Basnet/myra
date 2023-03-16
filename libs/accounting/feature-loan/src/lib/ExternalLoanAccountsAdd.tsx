import { useMemo } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { BiSave } from 'react-icons/bi';
import { useRouter } from 'next/router';

import {
  asyncToast,
  Box,
  Button,
  Container,
  FormFooter,
  FormHeader,
  FormSection,
  GridItem,
  Icon,
  Text,
} from '@myra-ui';

import {
  ExternalLoanAccountMutation,
  useAllAdministrationQuery,
  useSetExternalAccountMutation,
} from '@coop/cbs/data-access';
import { FormInput, FormMap, FormSelect, FormTextArea } from '@coop/shared/form';
import { useTranslation } from '@coop/shared/utils';

/* eslint-disable-next-line */
export interface ExternalLoanAccountsProps {}

export const ExternalLoanAccountsAdd = () => {
  const { t } = useTranslation();
  const router = useRouter();
  const methods = useForm();
  // const id = String(router?.query?.['id']);

  const { watch, getValues } = methods;

  const provinceId = watch(`address.provinceId`);
  const districtId = watch(`address.districtId`);
  const localityId = watch(`address.localGovernmentId`);

  const { mutateAsync } = useSetExternalAccountMutation();
  const { data } = useAllAdministrationQuery();

  const province = useMemo(
    () =>
      data?.administration?.all?.map((d) => ({
        label: d.name,
        value: d.id,
      })) ?? [],
    [data?.administration?.all]
  );

  const districtList = useMemo(
    () => data?.administration.all.find((d) => d.id === provinceId)?.districts ?? [],
    [provinceId]
  );

  const localityList = useMemo(
    () => districtList.find((d) => d.id === districtId)?.municipalities ?? [],
    [districtId]
  );

  const wardList = useMemo(
    () => localityList.find((d) => d.id === localityId)?.wards ?? [],
    [localityId]
  );

  const submitForm = () => {
    const values = getValues();

    asyncToast({
      id: 'external-loan-accounts-id',
      msgs: {
        success: 'New External Loan Accounts Added',
        loading: 'Adding External Loan Accounts',
      },
      onSuccess: () => router.push('/accounting/loan/external-loan-accounts/list'),
      promise: mutateAsync({ data: values }),
      onError: (error) => {
        if (error.__typename === 'ValidationError') {
          Object.keys(error.validationErrorMsg).map((key) =>
            methods.setError(key as keyof ExternalLoanAccountMutation, {
              message: error.validationErrorMsg[key][0] as string,
            })
          );
        }
      },
    });
  };

  return (
    <>
      <Container minW="container.lg" height="fit-content" pb="s60">
        <FormHeader title="New External Loan Account" />

        <FormProvider {...methods}>
          <form>
            <Box bg="white" minH="calc(100vh - 220px)">
              <FormSection>
                <GridItem colSpan={3}>
                  <FormInput name="name" type="text" label="Name" />
                </GridItem>
              </FormSection>

              <FormSection header="Address">
                <FormSelect name="address.provinceId" label="Province" options={province} />
                <FormSelect
                  name="address.districtId"
                  label="District"
                  options={districtList.map((d) => ({
                    label: d.name,
                    value: d.id,
                  }))}
                />
                <FormSelect
                  name="address.localGovernmentId"
                  label="Local Government"
                  options={localityList.map((d) => ({
                    label: d.name,
                    value: d.id,
                  }))}
                />

                <FormSelect
                  name="address.wardNo"
                  label="Ward No"
                  options={wardList?.map((d) => ({
                    label: d,
                    value: d,
                  }))}
                />
                <FormInput name="address.locality" label="Locality" />
                <FormInput name="address.houseNo" type="text" label="House No" />

                <GridItem colSpan={2}>
                  <FormMap name="address.coordinates" />
                </GridItem>
              </FormSection>

              <FormSection divider={false}>
                <GridItem colSpan={2}>
                  <FormTextArea name="notes" label="Notes" />
                </GridItem>
              </FormSection>
            </Box>
          </form>
        </FormProvider>
      </Container>
      <Box bottom="0" position="fixed" width="100%" bg="gray.100">
        <Container minW="container.lg" height="fit-content">
          <FormFooter
            status={
              <Box display="flex" gap="s8">
                <Text as="i" fontSize="r1">
                  {t['formDetails']}
                </Text>
              </Box>
            }
            draftButton={
              <Button type="submit" variant="ghost" shade="neutral">
                <Icon as={BiSave} />
                <Text alignSelf="center" fontWeight="Medium" fontSize="s2" ml="5px">
                  {t['saveDraft']}
                </Text>
              </Button>
            }
            mainButtonLabel={t['save']}
            mainButtonHandler={submitForm}
          />
        </Container>
      </Box>
    </>
  );
};
