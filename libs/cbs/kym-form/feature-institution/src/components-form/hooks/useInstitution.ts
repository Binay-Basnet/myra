import { useEffect } from 'react';
import { UseFormReturn } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { useDeepCompareEffect } from 'react-use';
import { useRouter } from 'next/router';
import { pickBy } from 'lodash';
import debounce from 'lodash/debounce';
import omit from 'lodash/omit';

import {
  addInstitutionError,
  GetInstitutionKymEditDataQuery,
  KymInsInput,
  setInstitutionFormDirty,
  useAppSelector,
  useGetInstitutionKymEditDataQuery,
  useSetInstitutionDataMutation,
} from '@coop/cbs/data-access';

interface IInstitutionHookProps {
  methods: UseFormReturn<KymInsInput>;
}

const getInstitutionData = (data: GetInstitutionKymEditDataQuery | undefined) => {
  if (!data) {
    return {};
  }
  const editValueData = data?.members?.institution?.formState?.data?.formData;

  if (!editValueData) {
    return null;
  }
  const registeredAddressLocality = editValueData?.registeredAddress?.locality?.local;
  const operatingAddressLocality = editValueData?.operatingOfficeAddress?.locality?.local;
  const branchOfficeAddress = editValueData?.branchOfficeAddress?.locality?.local;
  const accountHoldersAddress = editValueData?.accountHolderAddress?.locality?.local;

  return {
    ...editValueData,
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
  };
};

export const useInstitution = ({ methods }: IInstitutionHookProps) => {
  const router = useRouter();
  const dispatch = useDispatch();

  const { errors } = useAppSelector((state) => state.institution.basic);
  const hasPressedNext = useAppSelector((state) => state.institution.hasPressedNext);

  const id = router?.query?.['id'] as string;
  const { setError, watch, reset, clearErrors } = methods;

  const {
    data: editValues,
    isLoading: editLoading,
    isFetching,
    refetch,
  } = useGetInstitutionKymEditDataQuery(
    {
      id,
      hasPressedNext,
    },
    {
      enabled: !!id,
      onSuccess: (response) => {
        const errorObj = response?.members?.institution?.formState?.data?.sectionStatus?.errors;

        if (errorObj) {
          dispatch(addInstitutionError(errorObj));
        } else {
          dispatch(addInstitutionError({}));
        }
      },
    }
  );

  const { mutateAsync } = useSetInstitutionDataMutation({
    onSuccess: async () => {
      await refetch();
      dispatch(setInstitutionFormDirty(true));
    },
  });

  // Get Back The Initial Data when page reloads or user edits
  useEffect(() => {
    if (editValues) {
      const filteredData = getInstitutionData(editValues);

      if (filteredData) {
        dispatch(setInstitutionFormDirty(true));

        reset({
          ...pickBy(filteredData ?? {}, (v) => v !== undefined && v !== null),
        });
      }
    }
  }, [editLoading]);

  useEffect(() => {
    const subscription = watch(
      debounce(async (data) => {
        if (id) {
          await mutateAsync({
            id,
            data: {
              ...omit({ ...data }, 'declarationAgreement'),
              accountType: data?.accountType === '' ? null : data?.accountType,
            },
          });
        }
      }, 800)
    );

    return () => subscription.unsubscribe();
  }, [watch, id, mutateAsync]);

  // Trigger Validations When Change In Redux Error Object is Detected
  useDeepCompareEffect(() => {
    // Cleanup Previous Errors
    clearErrors();
    Object.entries(errors ?? {}).forEach((value) => {
      setError(value[0] as keyof KymInsInput, {
        type: value[1][0].includes('required') ? 'required' : 'value',
        message: value[1][0],
      });
    });
  }, [errors, isFetching]);
};
