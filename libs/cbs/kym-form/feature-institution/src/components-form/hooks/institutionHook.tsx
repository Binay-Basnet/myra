import { useEffect, useState } from 'react';
import { UseFormReturn } from 'react-hook-form';
import { useRouter } from 'next/router';
import { identity, pickBy } from 'lodash';
import debounce from 'lodash/debounce';

import {
  useGetInstitutionKymEditDataQuery,
  useSetInstitutionDataMutation,
} from '@coop/shared/data-access';
import { KymInsInput } from '@coop/shared/data-access';

interface IInstitutionHookProps {
  methods: UseFormReturn<KymInsInput>;
}

export const useInstitution = ({ methods }: IInstitutionHookProps) => {
  const router = useRouter();
  const id = String(router?.query?.['id']);
  const { setError, watch, reset } = methods;
  const { mutate } = useSetInstitutionDataMutation({
    onSuccess: (res) => {
      setError('institutionName', {
        type: 'custom',
        message:
          res?.members?.institution?.add?.error?.error?.['institutionName'][0],
      });
    },
    onError: () => {
      setError('institutionName', {
        type: 'custom',
        message: 'it is what it is',
      });
    },
  });

  const {
    data: editValues,
    isLoading: editLoading,
    refetch,
  } = useGetInstitutionKymEditDataQuery(
    {
      id: id,
    },
    { enabled: id !== 'undefined' }
  );

  useEffect(() => {
    const subscription = watch(
      debounce((data) => {
        console.log(editValues);
        if (editValues && data) {
          mutate({ id: router.query['id'] as string, data });
          refetch();
        }
      }, 800)
    );

    return () => subscription.unsubscribe();
  }, [watch, router.isReady, editValues]);

  useEffect(() => {
    if (editValues) {
      console.log(
        pickBy(
          editValues?.members?.institution?.formState?.data?.formData ?? {},
          (v) => v !== null
        )
      );
      console.log('pick', pickBy);
      const editValueData =
        editValues?.members?.institution?.formState?.data?.formData;
      const registeredAddressLocality =
        editValueData?.registeredAddress?.locality?.local;
      const operatingAddressLocality =
        editValueData?.operatingOfficeAddress?.locality?.local;
      console.log('edit value', editValueData);
      const branchOfficeAddress =
        editValueData?.branchOfficeAddress?.locality?.local;
      const accountHoldersAddress =
        editValueData?.accountHolderAddress?.locality?.local;

      reset({
        ...pickBy(
          editValues?.members?.institution?.formState?.data?.formData ?? {},
          (v) => v !== null
        ),
        registeredAddress: {
          ...editValueData?.registeredAddress,
          locality: registeredAddressLocality,
        },
        operatingOfficeAddress: {
          ...editValueData?.operatingOfficeAddress,
          locality: operatingAddressLocality,
        },
        branchOfficeAddress: {
          ...editValueData?.branchOfficeAddress,
          locality: branchOfficeAddress,
        },
        accountHolderAddress: {
          ...editValueData?.accountHolderAddress,
          locality: accountHoldersAddress,
        },
      });
    }
  }, [editLoading]);
};
