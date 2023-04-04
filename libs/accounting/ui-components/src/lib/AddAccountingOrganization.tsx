import { useEffect, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useRouter } from 'next/router';
import { useQueryClient } from '@tanstack/react-query';
import pickBy from 'lodash/pickBy';

import {
  asyncToast,
  Box,
  Container,
  FormFooter,
  FormHeader,
  FormSection,
  GridItem,
} from '@myra-ui';

import {
  InvestmentAccountInput,
  useGetAccountingOrganizationFormStateDataQuery,
  useGetNewIdMutation,
  useSetAccountingOrganizationDataMutation,
} from '@coop/cbs/data-access';
import { ROUTES } from '@coop/cbs/utils';
import { FormAddress, FormInput, FormTextArea } from '@coop/shared/form';

export const AddAccountingOrganization = () => {
  const queryClient = useQueryClient();

  const router = useRouter();

  const id = router.query?.['id'];

  const methods = useForm<InvestmentAccountInput>();

  const { getValues, reset } = methods;

  const { data: accountFormStateQueryData } = useGetAccountingOrganizationFormStateDataQuery(
    { id: String(id) },
    { enabled: !!id }
  );

  const accountEditData = accountFormStateQueryData?.accounting?.organization?.formState?.data;

  useEffect(() => {
    if (accountEditData) {
      reset({
        ...pickBy(
          {
            ...accountEditData,
            address: {
              ...accountEditData?.address,
              locality: accountEditData?.address?.locality?.local,
            },
          } ?? {},
          (v) => v !== null
        ),
      });
    }
  }, [accountEditData]);

  const { mutateAsync: setAccountingOrganization } = useSetAccountingOrganizationDataMutation();

  const [newId, setNewId] = useState('');

  const { mutateAsync: getId } = useGetNewIdMutation();
  useEffect(() => {
    getId({}).then((res) => setNewId(res?.newId as string));
  }, []);

  const handleSubmit = () => {
    asyncToast({
      id: 'save-accounting-investment-organization',
      promise: setAccountingOrganization({ id: id ? String(id) : newId, data: getValues() }),
      msgs: {
        loading: 'Saving organization',
        success: 'Organization saved',
      },
      onSuccess: () => {
        queryClient.invalidateQueries(['getAccountingOrganiztionList']);
        router.push(ROUTES.ACCOUNTING_INVESTMENT_ORGANIZTION_LIST);
      },
    });
  };

  return (
    <>
      <Container minW="container.xl" height="fit-content">
        <Box position="sticky" top="0" bg="gray.100" width="100%" zIndex="10">
          <FormHeader
            title="New Organization"
            closeLink={
              router?.asPath?.includes('investment')
                ? ROUTES.ACCOUNTING_INVESTMENT_ORGANIZTION_LIST
                : ROUTES.ACCOUNTING_EXTERNAL_LOAN_ORGANIZTION_LIST
            }
          />
        </Box>

        <Box bg="white">
          <FormProvider {...methods}>
            <form>
              <Box minH="calc(100vh - 170px)">
                <FormSection>
                  <GridItem colSpan={2}>
                    <FormInput name="name" label="Name" />
                  </GridItem>

                  {/* <FormSelect name="type" label="Type" options={investmentTypeOptions} /> */}
                </FormSection>

                <FormAddress name="address" sectionId="address" sectionHeader="Address" />

                <FormSection templateColumns={1}>
                  <FormTextArea name="note" label="Note" rows={5} />
                </FormSection>
              </Box>
            </form>
          </FormProvider>
        </Box>
      </Container>

      <Box position="relative" margin="0px auto">
        <Box bottom="0" position="fixed" width="100%" bg="gray.100" zIndex={10}>
          <Container minW="container.xl" height="fit-content">
            <FormFooter mainButtonLabel="Save" mainButtonHandler={handleSubmit} />
          </Container>
        </Box>
      </Box>
    </>
  );
};
