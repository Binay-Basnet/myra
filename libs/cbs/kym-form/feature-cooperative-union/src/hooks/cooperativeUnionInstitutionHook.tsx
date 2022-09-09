import { useEffect } from 'react';
import { UseFormReturn } from 'react-hook-form';
import { useRouter } from 'next/router';
import { pickBy } from 'lodash';
import debounce from 'lodash/debounce';
import isEqual from 'lodash/isEqual';

import {
  GetCooperativeUnionKymEditDataQuery,
  useGetCooperativeUnionKymEditDataQuery,
  useSetCooperativeUnionInstitutionDataMutation,
} from '@coop/cbs/data-access';
import { isDeepEmpty } from '@coop/shared/utils';

interface ICooperativeUnionHookProps {
  methods: UseFormReturn<any>;
  validate?: 'all' | 'current';
}

const getInstiutionData = (
  data: GetCooperativeUnionKymEditDataQuery | undefined
) => {
  if (!data) {
    return {};
  }

  const editValueData =
    data?.members?.cooperativeUnion?.formState?.formData?.institutionInformation
      ?.data;

  return {
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
};

export const useCooperativeUnionInstitution = ({
  methods,
  validate = 'current',
}: ICooperativeUnionHookProps) => {
  const router = useRouter();
  const id = router?.query?.['id'];
  const { watch, reset, setError, clearErrors } = methods;
  const { mutateAsync } = useSetCooperativeUnionInstitutionDataMutation();

  const {
    data: editValues,
    isLoading: editLoading,
    refetch,
  } = useGetCooperativeUnionKymEditDataQuery(
    {
      id: String(id),
    },
    {
      enabled: !!id,
      onSuccess: (response) => {
        if (validate === 'current') {
          const errorObj =
            response?.members?.cooperativeUnion?.formState?.formData
              ?.institutionInformation?.sectionStatus?.errors;

          if (errorObj) {
            clearErrors();
            Object.entries(errorObj).forEach((value) => {
              setError(value[0], {
                message: value[1][0],
              });
            });
          } else {
            clearErrors();
          }
        } else {
          const errorObj =
            response?.members?.cooperativeUnion?.formState?.sectionStatus
              .institutionInformation.errors;

          if (errorObj) {
            clearErrors();
            Object.entries(errorObj).forEach((value) => {
              setError(value[0], {
                message: value[1][0],
              });
            });
          }
        }
      },
    }
  );

  const sectionStatus = {};

  useEffect(() => {
    if (editValues) {
      const filteredData = getInstiutionData(editValues);

      reset({
        ...pickBy(filteredData ?? {}, (v) => v !== null),
      });
    }
  }, [editLoading]);

  useEffect(() => {
    const subscription = watch(
      debounce((data) => {
        const institutionData = getInstiutionData(editValues);

        if (
          id &&
          data &&
          !isDeepEmpty(data) &&
          !isEqual(institutionData, data)
        ) {
          mutateAsync({ id: String(id), data }).then(() => refetch());
          // refetch();
        }
      }, 800)
    );

    return () => subscription.unsubscribe();
  }, [watch, router.isReady]);

  useEffect(() => {
    if (id) {
      refetch();
    }
  }, [id]);
  return { sectionStatus };
};
