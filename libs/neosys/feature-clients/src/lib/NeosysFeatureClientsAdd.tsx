import { FormProvider, useForm } from 'react-hook-form';
import { useRouter } from 'next/router';
import { useQueryClient } from '@tanstack/react-query';

import { asyncToast, Box, Container, FormFooter, FormHeader } from '@myra-ui';

import { OrganizationClientInput, useAddNewClientMutation } from '@coop/neosys-admin/data-access';
import { useTranslation } from '@coop/shared/utils';

import { NeosysClientForm } from '../form/NeosysClientForm';

/* eslint-disable-next-line */
export interface NeosysFeatureClientsAddProps {}

export const NeosysFeatureClientsAdd = () => {
  const router = useRouter();
  const queryClient = useQueryClient();

  const { t } = useTranslation();
  const methods = useForm<
    Omit<OrganizationClientInput, 'organizationLogo'> & {
      organizationLogo: string[];
    }
  >({
    defaultValues: {
      registrationDetails: [
        {
          panOrVatNo: null,
          registeredAddress: null,
          registeredDate: null,
          registeredOffice: null,
          registeredNo: null,
        },
      ],
      workingArea: [
        {
          coordinates: null,
          districtId: null,
          houseNo: null,
          localGovernmentId: null,
          locality: null,
          provinceId: null,
          wardNo: null,
        },
      ],
    },
  });
  const { clearErrors } = methods;

  const { mutateAsync } = useAddNewClientMutation();

  return (
    <Container minW="container.xl" p="0" bg="white">
      <Box position="sticky" top="110px" bg="gray.100" width="100%" zIndex="10">
        <FormHeader title={t['neoClientNewUser']} />
      </Box>
      <Box display="flex" flexDirection="row" minH="calc(100vh - 230px)">
        <Box
          display="flex"
          flexDirection="column"
          w="100%"
          borderRight="1px solid"
          borderColor="border.layout"
        >
          <FormProvider {...methods}>
            <NeosysClientForm />
          </FormProvider>
        </Box>
      </Box>
      <Box position="sticky" bottom={0} zIndex="11">
        <FormFooter
          status=""
          mainButtonLabel="Submit"
          mainButtonHandler={async () => {
            const formValues = methods.getValues();

            await asyncToast({
              id: 'new-client',
              msgs: {
                loading: 'Adding New Client',
                success: 'New Client Added',
              },
              onSuccess: () => {
                router.push('/clients');
                queryClient.invalidateQueries(['getClientsList']);
              },
              promise: mutateAsync({
                data: {
                  ...formValues,
                  organizationLogo: formValues.organizationLogo[0],
                },
              }),
              onError: (error) => {
                if (error.__typename === 'ValidationError') {
                  clearErrors();
                  Object.keys(error.validationErrorMsg).map((key) =>
                    methods.setError(key as keyof OrganizationClientInput, {
                      message: error.validationErrorMsg[key][0] as string,
                    })
                  );
                }
              },
            });
          }}
        />
      </Box>
    </Container>
  );
};
