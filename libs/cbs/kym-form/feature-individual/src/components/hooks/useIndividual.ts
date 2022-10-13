import { useEffect } from 'react';
import { UseFormReturn } from 'react-hook-form';
import { useDeepCompareEffect } from 'react-use';
import { useRouter } from 'next/router';
import { pickBy } from 'lodash';
import debounce from 'lodash/debounce';

import {
  addIndividualError,
  FormFieldSearchTerm,
  GetIndividualKymEditDataQuery,
  KymIndMemberInput,
  RootState,
  setIndividualFormDirty,
  useAppDispatch,
  useAppSelector,
  useGetIndividualKymEditDataQuery,
  useGetIndividualKymOptionsQuery,
  useSetMemberDataMutation,
} from '@coop/cbs/data-access';

interface IIndividualHookProps {
  methods: UseFormReturn<KymIndMemberInput>;
}

const getIndividualData = (data: GetIndividualKymEditDataQuery | undefined) => {
  if (!data) {
    return {};
  }

  const editValueData = data?.members?.individual?.formState?.data?.formData;

  if (!editValueData) {
    return null;
  }

  return {
    ...editValueData?.basicInformation,
    firstName: editValueData?.basicInformation?.firstName?.local,
    middleName: editValueData?.basicInformation?.middleName?.local,
    lastName: editValueData?.basicInformation?.lastName?.local,
    ...editValueData?.contactDetails,
    permanentAddress: {
      ...editValueData?.permanentAddress,
      locality: editValueData?.permanentAddress?.locality?.local,
    },
    temporaryAddress: {
      ...editValueData?.temporaryAddress?.address,
      locality: editValueData?.temporaryAddress?.address?.locality?.local,
    },
    sameTempAsPermanentAddress: editValueData?.temporaryAddress?.sameTempAsPermanentAddress,
    ...editValueData?.rentedHouse,
    landlordName: editValueData?.rentedHouse?.landlordName?.local,
    maritalStatusId: editValueData?.maritalStatusId,
    ...editValueData?.estimatedTransactions,
    estimatedAnnualTransactionFrequencyId:
      editValueData?.estimatedTransactions?.estimatedAnnualTransactionFrequencyId ?? '',
  };
};

export const useIndividual = ({ methods }: IIndividualHookProps) => {
  const router = useRouter();
  const dispatch = useAppDispatch();

  const { errors } = useAppSelector((state) => state.individual.basic);
  const hasPressedNext = useAppSelector((state) => state.individual.hasPressedNext);

  const id = router.query['id'] as string;
  const { watch, reset, setError, clearErrors } = methods;

  const { data: nationalityFields } = useGetIndividualKymOptionsQuery({
    searchTerm: FormFieldSearchTerm.Nationality,
  });

  const {
    data: editValues,
    isLoading: editLoading,
    refetch,
    isFetching,
  } = useGetIndividualKymEditDataQuery(
    {
      id,
      hasPressedNext,
    },
    {
      enabled: !!id,
      onSuccess: (response) => {
        const errorObj = response?.members?.individual?.formState?.sectionStatus?.errors;

        if (errorObj) {
          dispatch(addIndividualError(errorObj));
        } else {
          dispatch(addIndividualError({}));
        }
      },
    }
  );

  const { mutateAsync } = useSetMemberDataMutation({
    onSuccess: async () => {
      await refetch();
      dispatch(setIndividualFormDirty(true));
    },
  });

  // Get Back The Initial Data when page reloads or user edits
  useDeepCompareEffect(() => {
    if (editValues) {
      const filteredData = getIndividualData(editValues);
      if (filteredData) {
        dispatch(setIndividualFormDirty(true));
        reset({
          ...pickBy(
            {
              ...filteredData,
              nationalityId: nationalityFields?.form?.options?.predefined?.data?.[0]?.id,
            } ?? {},
            (v) => v !== null
          ),
        });
      }
    }
  }, [editLoading, editValues]);

  useEffect(() => {
    const subscription = watch(
      debounce(async (data) => {
        if (id) {
          await mutateAsync({ id, data });
        }
      }, 800)
    );
    return () => subscription.unsubscribe();
  }, [watch, id]);

  // refetch data when calendar preference is updated
  const preference = useAppSelector((state: RootState) => state?.auth?.preference);

  useEffect(() => {
    refetch();
  }, [preference?.date]);

  // Trigger Validations When Change In Redux Error Object is Detected
  useDeepCompareEffect(() => {
    // Cleanup Previous Errors
    clearErrors();
    Object.entries(errors ?? {}).forEach((value) => {
      setError(value[0] as keyof KymIndMemberInput, {
        type: value[1][0].includes('required') ? 'required' : 'value',
        message: value[1][0],
      });
    });
  }, [errors, isFetching]);
};
