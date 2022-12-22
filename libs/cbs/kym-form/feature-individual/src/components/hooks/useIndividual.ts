import { useEffect } from 'react';
import { UseFormReturn } from 'react-hook-form';
import { useDeepCompareEffect } from 'react-use';
import { useRouter } from 'next/router';
import { useQueryClient } from '@tanstack/react-query';
import { pickBy } from 'lodash';
import debounce from 'lodash/debounce';

import {
  addIndividualError,
  FormFieldSearchTerm,
  GetIndividualKymEditDataQuery,
  KymIndMemberInput,
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

  const queryClient = useQueryClient();

  const { errors } = useAppSelector((state) => state.individual.basic);
  const hasPressedNext = useAppSelector((state) => state.individual.hasPressedNext);

  const id = router.query['id'] as string;
  const { watch, reset, setError, clearErrors, setValue } = methods;

  const { data: nationalityFields } = useGetIndividualKymOptionsQuery(
    {
      searchTerm: FormFieldSearchTerm.Nationality,
    },
    {
      onSuccess: (res) => {
        setValue('nationalityId', res?.form?.options?.predefined?.data?.[0]?.id);
      },
    }
  );

  const {
    data: editValues,
    isLoading: editLoading,
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
      await queryClient.invalidateQueries(['getIndividualKymEditData']);
      dispatch(setIndividualFormDirty(true));
    },
  });

  // Get Back The Initial Data when page reloads or user edits
  useEffect(() => {
    if (editValues) {
      const filteredData = getIndividualData(editValues);
      if (filteredData) {
        dispatch(setIndividualFormDirty(true));

        // console.log({ nationalityFields });

        reset({
          ...pickBy(
            {
              ...filteredData,
              nationalityId: nationalityFields?.form?.options?.predefined?.data?.[0]?.id,
            } ?? {},
            (v) => v !== undefined && v !== null
          ),
        });
      }
    }
  }, [editLoading]);

  useEffect(() => {
    const { unsubscribe } = watch(
      debounce(async (data) => {
        if (id) {
          await mutateAsync({ id, data });
        }
      }, 800)
    );
    return () => unsubscribe();
  }, [watch, id]);

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
