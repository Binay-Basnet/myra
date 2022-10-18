import { useEffect } from 'react';
import { UseFormReturn } from 'react-hook-form';
import { useRouter } from 'next/router';
import { pickBy } from 'lodash';
import debounce from 'lodash/debounce';

import {
  KymInsInput,
  RootState,
  useAppSelector,
  useGetInstitutionKymEditDataQuery,
  useSetInstitutionDataMutation,
} from '@coop/cbs/data-access';

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
        message: res?.members?.institution?.add?.error?.error?.['institutionName'][0],
      });
    },
    onError: () => {
      setError('institutionName', {
        type: 'custom',
        message: 'mutation error',
      });
    },
  });

  const {
    data: editValues,
    isLoading: editLoading,
    refetch,
  } = useGetInstitutionKymEditDataQuery(
    {
      id,
    },
    { enabled: id !== 'undefined' }
  );

  useEffect(() => {
    const subscription = watch(
      debounce((data) => {
        if (data && id !== 'undefined') {
          mutate(
            {
              id: router.query['id'] as string,
              data: {
                ...data,
                accountType: data?.accountType === '' ? null : data?.accountType,
              },
            },
            { onSuccess: () => refetch() }
          );
          // refetch();
        }
      }, 800)
    );

    return () => subscription.unsubscribe();
  }, [watch, router.isReady, editValues]);

  const lastEditValues = editValues?.members?.institution?.formState?.data?.formData;

  useEffect(() => {
    if (lastEditValues) {
      const truthyEditValue = pickBy(lastEditValues ?? {}, (v) => v !== null);
      const editValueData = editValues?.members?.institution?.formState?.data?.formData;
      const registeredAddressLocality = editValueData?.registeredAddress?.locality?.local;
      const operatingAddressLocality = editValueData?.operatingOfficeAddress?.locality?.local;
      const branchOfficeAddress = editValueData?.branchOfficeAddress?.locality?.local;
      const accountHoldersAddress = editValueData?.accountHolderAddress?.locality?.local;

      reset({
        ...truthyEditValue,
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
  }, [editLoading, lastEditValues]);

  // refetch data when calendar preference is updated
  const preference = useAppSelector((state: RootState) => state?.auth?.preference);

  useEffect(() => {
    refetch();
  }, [preference?.date]);

  useEffect(() => {
    if (id) {
      refetch();
    }
  }, [id]);
};
