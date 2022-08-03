import { useEffect } from 'react';
import { UseFormReturn } from 'react-hook-form';
import { useRouter } from 'next/router';
import { pickBy } from 'lodash';
import debounce from 'lodash/debounce';

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
  const { setError, watch, reset } = methods;
  const { mutate } = useSetEconomicDetailsDataMutation();

  const {
    data: editValues,
    isLoading: editLoading,
    refetch,
  } = useGetEconimicDetailsEditDataQuery(
    {
      id: id,
    },
    { enabled: id !== 'undefined' }
  );

  useEffect(() => {
    const subscription = watch(
      debounce((data) => {
        if (id && data && !isDeepEmpty(data)) {
          mutate({ id, data });
          // refetch();
        }
      }, 800)
    );

    return () => subscription.unsubscribe();
  }, [watch, router.isReady]);

  useEffect(() => {
    if (editValues) {
      const editValueData =
        editValues?.members?.cooperativeUnion?.formState?.data?.formData
          ?.economicDetails;
      // const registeredAddressLocality =
      //   editValueData?.registeredAddress?.locality?.local;
      // console.log('edit value', editValueData);

      reset({
        ...pickBy(editValueData ?? {}, (v) => v !== null),
      });
    }
  }, [editLoading]);
};
