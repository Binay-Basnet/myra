import { useEffect, useState } from 'react';
import { UseFormReturn } from 'react-hook-form';
import { useRouter } from 'next/router';
import { identity, pickBy } from 'lodash';
import debounce from 'lodash/debounce';

import {
  useGetCooperativeUnionKymEditDataQuery,
  useSetCooperativeUnionInstitutionDataMutation,
} from '@coop/shared/data-access';
import { KymInsInput } from '@coop/shared/data-access';
import { isDeepEmpty } from '@coop/shared/utils';

interface ICooperativeUnionHookProps {
  methods: UseFormReturn<KymInsInput>;
}

export const useCooperativeUnionInstitution = ({
  methods,
}: ICooperativeUnionHookProps) => {
  const router = useRouter();
  const id = String(router?.query?.['id']);
  const { setError, watch, reset } = methods;
  const { mutate } = useSetCooperativeUnionInstitutionDataMutation();

  const {
    data: editValues,
    isLoading: editLoading,
    refetch,
  } = useGetCooperativeUnionKymEditDataQuery(
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
          ?.institutionInformation;

      const filteredData = {
        ...editValueData,
        regdAddress: {
          ...editValueData?.regdAddress,
          locality: editValueData?.regdAddress?.locality?.local,
        },
        operatingOfficeAddress: {
          ...editValueData?.operatingOfficeAddress,
          locality: editValueData?.operatingOfficeAddress?.locality?.local,
        },
        branchOfficeAddress: {
          ...editValueData?.branchOfficeAddress,
          locality: editValueData?.branchOfficeAddress?.locality?.local,
        },
        applicantPermanentAddress: {
          ...editValueData?.applicantPermanentAddress,
          locality: editValueData?.applicantPermanentAddress?.locality?.local,
        },
        applicantTemporaryAddress: {
          ...editValueData?.applicantTemporaryAddress,
          locality: editValueData?.applicantTemporaryAddress?.locality?.local,
        },
      };

      reset({
        ...pickBy(filteredData ?? {}, (v) => v !== null),
      });
    }
  }, [editLoading]);
};