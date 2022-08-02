import { useEffect, useState } from 'react';
import { UseFormReturn } from 'react-hook-form';
import { useRouter } from 'next/router';
import { identity, pickBy } from 'lodash';
import debounce from 'lodash/debounce';

import {
  useGetCoOperativeKymEditDataQuery,
  useSetCooperativeDataMutation,
} from '@coop/shared/data-access';
import { KymCooperativeFormInput } from '@coop/shared/data-access';

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
        console.log(editValues);
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
      console.log('pick', pickBy);
      const editTruthyData = pickBy(
        editLastValues,
        (v) => v !== 0 && v !== '' && v !== null
      );
      console.log('truthy', editTruthyData);
      reset({
        ...editTruthyData,
      });
    }
  }, [editLoading]);

  // useEffect(() => {
  //   if (id) {
  //     refetch();
  //     console.log({ id });
  //   }
  // }, [id]);
};
