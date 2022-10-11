import { FormProvider, useForm } from 'react-hook-form';
import { useQueryClient } from 'react-query';
import { useRouter } from 'next/router';

import { OrganizationClientInput, useAddNewClientMutation } from '@coop/neosys-admin/data-access';
import { asyncToast, Box, Container, FormFooter, FormHeader } from '@coop/shared/ui';
import { useTranslation } from '@coop/shared/utils';

import { NeosysClientForm } from '../form/NeosysClientForm';

/* eslint-disable-next-line */
export interface NeosysFeatureClientsAddProps {}

export const NeosysFeatureClientsAdd = () => {
  const router = useRouter();
  const queryClient = useQueryClient();

  const { t } = useTranslation();
  const methods = useForm<
    Omit<OrganizationClientInput, 'organizationLogo' | 'documents'> & {
      organizationLogo: string[];
      documents: {
        agmOrBodDocument?: string[];
        latestAuditReport?: string[];
        logo?: string[];
        minuteOfCentralRep?: string[];
        moaOrAoa?: string[];
        panCertificate?: string[];
        registeredCertificate?: string[];
        taxClearance?: string[];
      };
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
          status="Form details saved to draft 09:41 AM"
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
                queryClient.invalidateQueries('getClientsList');
              },
              promise: mutateAsync({
                data: {
                  ...formValues,
                  organizationLogo: formValues.organizationLogo[0],
                  documents: {
                    agmOrBodDocument: formValues?.documents?.agmOrBodDocument?.[0],
                    latestAuditReport: formValues?.documents?.latestAuditReport?.[0],
                    logo: formValues?.documents?.logo?.[0],
                    minuteOfCentralRep: formValues?.documents?.minuteOfCentralRep?.[0],
                    moaOrAoa: formValues?.documents?.moaOrAoa?.[0],
                    panCertificate: formValues?.documents?.panCertificate?.[0],
                    registeredCertificate: formValues?.documents?.registeredCertificate?.[0],
                    taxClearance: formValues?.documents?.taxClearance?.[0],
                  },
                },
              }),
            });
          }}
        />
      </Box>
    </Container>
  );
};
