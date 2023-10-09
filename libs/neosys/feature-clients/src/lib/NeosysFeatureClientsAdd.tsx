import { useForm } from 'react-hook-form';
import { useRouter } from 'next/router';
import { useQueryClient } from '@tanstack/react-query';

import { asyncToast } from '@myra-ui';

import { OrganizationClientInput, useAddNewClientMutation } from '@coop/neosys-admin/data-access';
import { FormLayout } from '@coop/shared/form';
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
    <FormLayout methods={methods}>
      <FormLayout.Header title={t['neoClientNewUser']} />

      <FormLayout.Content>
        <FormLayout.Form>
          <NeosysClientForm />
        </FormLayout.Form>
      </FormLayout.Content>

      <FormLayout.Footer
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
    </FormLayout>
  );
};
