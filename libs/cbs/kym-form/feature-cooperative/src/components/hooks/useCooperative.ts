import { useEffect } from 'react';
import { UseFormReturn } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { useDeepCompareEffect } from 'react-use';
import { useRouter } from 'next/router';
import { pickBy } from 'lodash';
import debounce from 'lodash/debounce';

import {
  addCooperativeError,
  GetCoOperativeKymEditDataQuery,
  KymCooperativeFormInput,
  RootState,
  setCooperativeFormDirty,
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
    registeredAddress: {
      ...editValueData?.registeredAddress,
      locality: registeredAddressLocality,
    },
    operatingAddress: {
      ...editValueData?.operatingAddress,
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
  const { setError, watch, reset, clearErrors } = methods;

  const {
    data: editValues,
    isLoading: editLoading,
    isFetching,

    refetch,
  } = useGetCoOperativeKymEditDataQuery(
    {
      id,
      hasPressedNext,
    },
    {
      enabled: id !== 'undefined',
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
    },
  });

  useEffect(() => {
    const subscription = watch(
      debounce(async (data) => {
        if (id) {
          await mutateAsync({
            id: router.query['id'] as string,
            data: pickBy(data, (v) => v !== null && v !== undefined),
          });
        }
      }, 800)
    );

    return () => subscription.unsubscribe();
  }, [watch, id, mutateAsync]);

  useEffect(() => {
    if (editValues) {
      const filteredData = getCooperativeData(editValues);

      if (filteredData) {
        dispatch(setCooperativeFormDirty(true));

        reset({
          ...pickBy(filteredData ?? {}, (v) => v !== undefined && v !== null),
        });
      }
    }
  }, [editLoading]);

  // refetch data when calendar preference is updated
  const preference = useAppSelector((state: RootState) => state?.auth?.preference);

  useEffect(() => {
    refetch();
  }, [preference?.date]);

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
