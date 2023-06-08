import { useCallback, useEffect } from 'react';
import { UseFormReturn } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { useDeepCompareEffect } from 'react-use';
import { useRouter } from 'next/router';
import { omit, pickBy } from 'lodash';
import debounce from 'lodash/debounce';

import {
  addCooperativeError,
  GetCoOperativeKymEditDataQuery,
  KymCooperativeFormInput,
  setCooperativeFormDirty,
  setCooperativeFormLoading,
  useAppSelector,
  useGetCoOperativeKymEditDataQuery,
  useSetCooperativeDataMutation,
} from '@coop/cbs/data-access';

interface IInstitutionHookProps {
  methods: UseFormReturn<KymCooperativeFormInput>;
}

const getCooperativeData = (data: GetCoOperativeKymEditDataQuery | undefined) => {
  if (!data) {
    return {};
  }
  const editValueData = data?.members?.cooperative?.formState?.data?.formData;
  if (!editValueData) {
    return null;
  }
  const registeredAddressLocality = editValueData?.registeredAddress?.locality?.local;

  const operatingAddressLocality = editValueData?.operatingAddress?.locality?.local;
  const permanentAdrressLocality = editValueData?.permanentRepresentativeAddress?.locality?.local;
  const temporaryAddressLocality = editValueData?.temporaryRepresentativeAddress?.locality?.local;
  return {
    ...editValueData,
    noOfMaleEmployee: Number(editValueData.noOfMaleEmployee),
    noOfFemaleEmployee: Number(editValueData.noOfFemaleEmployee),

    registeredAddress: {
      ...editValueData?.registeredAddress,
      localGovernmentId: editValueData?.registeredAddress?.localGovernmentId || null,
      locality: registeredAddressLocality,
    },
    operatingAddress: {
      ...editValueData?.operatingAddress,
      localGovernmentId: editValueData?.operatingAddress?.localGovernmentId || null,

      locality: operatingAddressLocality,
    },
    permanentRepresentativeAddress: {
      ...editValueData?.permanentRepresentativeAddress,
      locality: permanentAdrressLocality,
    },
    temporaryRepresentativeAddress: {
      ...editValueData?.temporaryRepresentativeAddress,
      locality: temporaryAddressLocality,
    },
  };
};

export const useCooperative = ({ methods }: IInstitutionHookProps) => {
  const router = useRouter();
  const dispatch = useDispatch();

  const { errors } = useAppSelector((state) => state.cooperative?.basic);
  const hasPressedNext = useAppSelector((state) => state.cooperative?.hasPressedNext);
  const id = router?.query?.['id'] as string;
  const {
    setError,
    watch,
    reset,
    clearErrors,
    formState: { dirtyFields },
  } = methods;

  const dirtyFieldsLength = Object.keys(dirtyFields).length;

  const {
    data: editValues,
    isFetching,
    isLoading: editLoading,
    refetch,
  } = useGetCoOperativeKymEditDataQuery(
    {
      id,
      hasPressedNext,
    },
    {
      enabled: !!id,
      onSuccess: (response) => {
        const errorObj = response?.members?.cooperative?.formState?.data?.sectionStatus?.errors;

        if (errorObj) {
          dispatch(addCooperativeError(errorObj));
        } else {
          dispatch(addCooperativeError({}));
        }
      },
    }
  );

  const { mutateAsync } = useSetCooperativeDataMutation({
    onSuccess: async () => {
      await refetch();
      dispatch(setCooperativeFormDirty(true));
      dispatch(setCooperativeFormLoading(false));
    },
    onMutate: async () => {
      dispatch(setCooperativeFormLoading(true));
    },
    onError: async () => {
      dispatch(setCooperativeFormLoading(false));
    },
  });

  const saveData = useCallback(
    debounce(async (data: KymCooperativeFormInput) => {
      await mutateAsync({
        id,
        data,
      });
    }, 2000),
    []
  );

  useEffect(() => {
    const subscription = watch(async (data) => {
      const tempData = pickBy(omit(data, ['hasTCAccepted']), (v) => v !== null && v !== undefined);

      if (id && dirtyFieldsLength) {
        dispatch(setCooperativeFormLoading(true));

        saveData(tempData as KymCooperativeFormInput);
      }
    });

    return () => subscription.unsubscribe();
  }, [watch, id, dirtyFieldsLength]);

  useEffect(() => {
    if (editValues) {
      const filteredData = getCooperativeData(editValues);

      if (filteredData) {
        dispatch(setCooperativeFormDirty(true));

        reset({
          ...pickBy(filteredData ?? {}, (v) => v !== undefined && v !== null && v !== 0),
        });
      }
    }
  }, [editLoading]);

  useDeepCompareEffect(() => {
    // Cleanup Previous Errors
    clearErrors();
    Object.entries(errors ?? {}).forEach((value) => {
      setError(value[0] as keyof KymCooperativeFormInput, {
        type: value[1][0].includes('required') ? 'required' : 'value',
        message: value[1][0],
      });
    });
  }, [errors, isFetching]);
};
