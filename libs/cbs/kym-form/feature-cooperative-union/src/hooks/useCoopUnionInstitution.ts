import { useEffect } from 'react';
import { UseFormReturn } from 'react-hook-form';
import { useDeepCompareEffect } from 'react-use';
import { useRouter } from 'next/router';
import { pickBy } from 'lodash';
import debounce from 'lodash/debounce';

import {
  CoopUnionInstitutionInformationInput,
  GetCooperativeUnionKymEditDataQuery,
  useGetCooperativeUnionKymEditDataQuery,
  useSetCooperativeUnionInstitutionDataMutation,
} from '@coop/cbs/data-access';
import {
  addError,
  setFormDirty,
  useAppDispatch,
  useAppSelector,
} from '@coop/shared/utils';

interface IUseCoopUnionInstProps {
  methods: UseFormReturn<CoopUnionInstitutionInformationInput>;
}

const getInstitutionData = (
  data: GetCooperativeUnionKymEditDataQuery | undefined
) => {
  if (!data) {
    return {};
  }

  const editValueData =
    data?.members?.cooperativeUnion?.formState?.formData?.institutionInformation
      ?.data;

  if (!editValueData) return null;

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

export const useCoopUnionInstitution = ({
  methods,
}: IUseCoopUnionInstProps) => {
  const router = useRouter();
  const id = router.query['id'] as string;
  const dispatch = useAppDispatch();
  const { errors, incomplete } = useAppSelector(
    (state) => state.coopUnion.institutionInformation
  );

  const { watch, reset, setError, clearErrors } = methods;

  // Query To Get Data
  const {
    data: editValues,
    refetch: refetchEdit,
    isLoading: editLoading,
  } = useGetCooperativeUnionKymEditDataQuery(
    {
      id,
    },
    {
      enabled: !!id,
      onSuccess: (response) => {
        const errorObj =
          response?.members?.cooperativeUnion?.formState?.formData
            ?.institutionInformation?.sectionStatus?.errors;

        // Add Error If New Error Is Detected
        if (errorObj) {
          dispatch(addError(errorObj));
        } else {
          dispatch(addError(null));
        }
      },
    }
  );

  // Mutation To Set Data
  const { mutateAsync: setData } =
    useSetCooperativeUnionInstitutionDataMutation({
      onSuccess: async () => {
        await refetchEdit();
        dispatch(setFormDirty(true));
      },
    });

  // Get Back The Initial Data when page reloads or user edits
  useEffect(() => {
    if (editValues) {
      const filteredData = getInstitutionData(editValues);
      if (filteredData) {
        dispatch(setFormDirty(true));
        reset({
          ...pickBy(filteredData ?? {}, (v) => v !== null),
        });
      }
    }
  }, [editLoading]);

  // Call The Mutation To Add Data on Each Form Change
  useEffect(() => {
    const subscription = watch(
      debounce(async (data) => {
        if (id) {
          await setData({ id, data });
        }
      }, 800)
    );

    return () => subscription.unsubscribe();
  }, [watch]);

  // Trigger Validations When Change In Redux Error Object is Detected
  useDeepCompareEffect(() => {
    // Cleanup Previous Errors
    clearErrors();
    Object.entries({ ...errors, ...incomplete }).forEach((value) => {
      setError(value[0] as keyof CoopUnionInstitutionInformationInput, {
        type: value[1][0].includes('required') ? 'required' : 'value',
        message: value[1][0],
      });
    });
  }, [errors, incomplete]);
};
