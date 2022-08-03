import { useEffect } from 'react';
import { UseFormReturn } from 'react-hook-form';
import { useRouter } from 'next/router';
import { pickBy } from 'lodash';
import debounce from 'lodash/debounce';

import {
  useGetCoOperativeKymEditDataQuery,
  useSetCooperativeDataMutation,
} from '@coop/cbs/data-access';
import { KymCooperativeFormInput } from '@coop/cbs/data-access';

interface IInstitutionHookProps {
  methods: UseFormReturn<KymCooperativeFormInput>;
}

export const useCooperative = ({ methods }: IInstitutionHookProps) => {
  const router = useRouter();
  const id = String(router?.query?.['id']);
  const { setError, watch, reset } = methods;
  const { mutate } = useSetCooperativeDataMutation();
  const {
    data: editValues,
    isLoading: editLoading,
    refetch,
  } = useGetCoOperativeKymEditDataQuery(
    {
      id: id,
    },
    { enabled: id !== 'undefined' }
  );

  useEffect(() => {
    const subscription = watch(
      debounce((data) => {
        if (editValues && data) {
          mutate({
            id: router.query['id'] as string,
            data: pickBy(data, (v) => v !== 0 && v !== '' && v !== null),
          });
          refetch();
        }
      }, 800)
    );

    return () => subscription.unsubscribe();
  }, [watch, router.isReady, editValues]);
  const editLastValues =
    editValues?.members?.cooperative?.formState?.data?.formData;

  useEffect(() => {
    if (editLastValues) {
      const editTruthyData = pickBy(
        editLastValues,
        (v) => v !== 0 && v !== '' && v !== null
      );

      reset({
        ...editTruthyData,
      });
    }
  }, [editLoading]);

  // useEffect(() => {
  //   if (id) {
  //     refetch();
  //
  //   }
  // }, [id]);
};
