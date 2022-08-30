import { useEffect } from 'react';
import { UseFormReturn } from 'react-hook-form';
import { useRouter } from 'next/router';
import { pickBy } from 'lodash';
import debounce from 'lodash/debounce';
import isEqual from 'lodash/isEqual';

import {
  CoopUnionEconomicDetailsInput,
  useGetEconimicDetailsEditDataQuery,
  useSetEconomicDetailsDataMutation,
} from '@coop/cbs/data-access';
import { isDeepEmpty } from '@coop/shared/utils';

interface ICooperativeUnionEconomicDetailsHookProps {
  methods: UseFormReturn<CoopUnionEconomicDetailsInput>;
}

export const useCooperativeUnionEconomicDetails = ({
  methods,
}: ICooperativeUnionEconomicDetailsHookProps) => {
  const router = useRouter();
  const id = String(router?.query?.['id']);
  const { watch, reset } = methods;
  const { mutate } = useSetEconomicDetailsDataMutation();

  const { data: editValues, refetch } = useGetEconimicDetailsEditDataQuery(
    {
      id: id,
    },
    { enabled: id !== 'undefined' }
  );

  useEffect(() => {
    const subscription = watch(
      debounce((data) => {
        const economicDetail = {
          ...pickBy(
            editValues?.members?.cooperativeUnion?.formState?.formData
              ?.economicDetails?.data ?? {},
            (v) => v !== null
          ),
        };

        if (
          id &&
          data &&
          !isDeepEmpty(data) &&
          !isEqual(economicDetail, data)
        ) {
          mutate({ id, data });
        }
      }, 800)
    );

    return () => subscription.unsubscribe();
  }, [watch, router.isReady]);

  useEffect(() => {
    if (editValues) {
      const editValueData =
        editValues?.members?.cooperativeUnion?.formState?.formData
          ?.economicDetails?.data;
      reset({
        ...pickBy(editValueData ?? {}, (v) => v !== null),
      });
    }
  }, [editValues]);

  useEffect(() => {
    if (id) {
      refetch();
    }
  }, [id]);
};
