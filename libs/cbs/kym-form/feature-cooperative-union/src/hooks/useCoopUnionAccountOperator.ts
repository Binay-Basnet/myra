import { useEffect } from 'react';
import { UseFormReturn } from 'react-hook-form';
import { useDeepCompareEffect } from 'react-use';
import { useRouter } from 'next/router';
import debounce from 'lodash/debounce';
import omit from 'lodash/omit';

import {
  addAccountError,
  addError,
  CooperativeUnionPersonnelSection,
  CoopUnionPersonnelInput,
  RootState,
  useAppDispatch,
  useAppSelector,
  useGetAccountOperatorDetailsListQuery,
  useSetPersonnelDetailsMutation,
} from '@coop/cbs/data-access';

interface IUseCoopUnionBodProps {
  methods: UseFormReturn<CoopUnionPersonnelInput>;
  accountOpId: string;
}

export const useCoopUnionAccountOperator = ({ methods, accountOpId }: IUseCoopUnionBodProps) => {
  const router = useRouter();
  const id = router.query['id'] as string;
  const dispatch = useAppDispatch();

  const bodErrors = useAppSelector((state) => state.coopUnion.accountOperator.operator);
  const hasPressedNext = useAppSelector((state) => state.coopUnion.hasPressedNext);

  const { watch, reset, setError, clearErrors } = methods;

  const {
    data: editValues,
    refetch: refetchEdit,
    isLoading: editLoading,
  } = useGetAccountOperatorDetailsListQuery(
    { id, includeRequiredErrors: hasPressedNext },
    {
      enabled: !!id,
      onSuccess: (response) => {
        const errorArr =
          response?.members?.cooperativeUnion?.formState?.formData?.accountOperatorsDetails
            ?.sectionStatus;

        // Add Error If New Error Is Detected
        if (errorArr) {
          const errors = errorArr.map((errorObj, index) => ({
            operatorId: String(index),
            errors: errorObj.errors,
          }));

          dispatch(addAccountError(errors));
        } else {
          dispatch(addError(null));
        }
      },
    }
  );

  const accountOperatorDetail =
    editValues?.members?.cooperativeUnion?.formState?.formData?.accountOperatorsDetails?.data?.personnelDetails?.find(
      (bod) => bod?.id === accountOpId
    );

  // Mutation To Set Data
  const { mutateAsync: setData } = useSetPersonnelDetailsMutation({
    onSuccess: async () => {
      await refetchEdit();
    },
  });

  // refetch data when calendar preference is updated
  const preference = useAppSelector((state: RootState) => state?.auth?.preference);

  useEffect(() => {
    refetchEdit();
  }, [preference?.date]);

  // Get Back The Initial Data when page reloads or user edits
  useEffect(() => {
    if (accountOperatorDetail) {
      reset({
        ...omit(accountOperatorDetail, ['id', 'cooperativeUnionId']),
        permanentAddress: {
          ...accountOperatorDetail?.permanentAddress,
          locality: accountOperatorDetail?.permanentAddress?.locality?.local,
        },
        temporaryAddress: {
          ...accountOperatorDetail?.temporaryAddress,
          locality: accountOperatorDetail?.temporaryAddress?.locality?.local,
        },
      });
    }
  }, [editLoading, accountOperatorDetail]);

  // Call The Mutation To Add Data on Each Form Change
  useEffect(() => {
    const subscription = watch(
      debounce(async (data) => {
        if (id) {
          await setData({
            id,
            personnelId: accountOpId,
            sectionType: CooperativeUnionPersonnelSection.AccountOperators,
            data,
          });
        }
      }, 800)
    );

    return () => subscription.unsubscribe();
  }, [watch, accountOperatorDetail]);

  // Trigger Validations When Change In Redux Error Object is Detected
  useDeepCompareEffect(() => {
    // Cleanup Previous Errors
    clearErrors();

    bodErrors.forEach((error) => {
      const foundIndex =
        editValues?.members?.cooperativeUnion?.formState?.formData?.accountOperatorsDetails?.data?.personnelDetails?.findIndex(
          (bod) => bod?.id === accountOpId
        );

      if (error.operatorId === String(foundIndex)) {
        Object.entries(error.errors ?? {}).forEach((value) => {
          setError(value[0] as keyof CoopUnionPersonnelInput, {
            type: value[1][0].includes('required') ? 'required' : 'value',
            message: value[1][0],
          });
        });
      }
    });
  }, [bodErrors]);
};
