import { useEffect } from 'react';
import { UseFormReturn } from 'react-hook-form';
import { useRouter } from 'next/router';
import { pickBy } from 'lodash';
import debounce from 'lodash/debounce';

import {
  KymCooperativeFormInput,
  RootState,
  useAppSelector,
  useGetCoOperativeKymEditDataQuery,
  useSetCooperativeDataMutation,
} from '@coop/cbs/data-access';

interface IInstitutionHookProps {
  methods: UseFormReturn<KymCooperativeFormInput>;
}

export const useCooperative = ({ methods }: IInstitutionHookProps) => {
  const router = useRouter();
  const id = router?.query?.['id'] as string;
  const { watch, reset } = methods;

  const {
    data: editValues,
    isLoading: editLoading,
    refetch,
  } = useGetCoOperativeKymEditDataQuery(
    {
      id,
    },
    { enabled: id !== 'undefined' }
  );

  const { mutateAsync } = useSetCooperativeDataMutation({
    onSuccess: async () => {
      await refetch();
    },
  });

  useEffect(() => {
    const subscription = watch(
      debounce(async (data) => {
        if (id) {
          await mutateAsync({
            id: router.query['id'] as string,
            data: pickBy(data, (v) => v !== 0 && v !== '' && v !== null && v !== undefined),
          });
        }
      }, 800)
    );

    return () => subscription.unsubscribe();
  }, [watch, id, mutateAsync]);

  const editLastValues = editValues?.members?.cooperative?.formState?.data?.formData;

  useEffect(() => {
    if (editLastValues) {
      const editTruthyData = pickBy(editLastValues, (v) => v !== 0 && v !== '' && v !== null);
      const registeredAddressLocality = editLastValues?.registeredAddress?.locality?.local;

      const operatingAddressLocality = editLastValues?.operatingAddress?.locality?.local;
      const permanentAdrressLocality =
        editLastValues?.permanentRepresentativeAddress?.locality?.local;
      const temporaryAddressLocality =
        editLastValues?.temporaryRepresentativeAddress?.locality?.local;
      reset({
        ...editTruthyData,
        registeredAddress: {
          ...editLastValues?.registeredAddress,
          locality: registeredAddressLocality,
        },
        operatingAddress: {
          ...editLastValues?.operatingAddress,
          locality: operatingAddressLocality,
        },
        permanentRepresentativeAddress: {
          ...editLastValues?.permanentRepresentativeAddress,
          locality: permanentAdrressLocality,
        },
        temporaryRepresentativeAddress: {
          ...editLastValues?.temporaryRepresentativeAddress,
          locality: temporaryAddressLocality,
        },
      });
    }
  }, [editLoading]);

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
