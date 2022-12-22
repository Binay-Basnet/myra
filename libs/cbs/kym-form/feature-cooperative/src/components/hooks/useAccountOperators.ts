import { useEffect } from 'react';
import { UseFormReturn } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { useDeepCompareEffect } from 'react-use';
import { useRouter } from 'next/router';
import debounce from 'lodash/debounce';
import isEqual from 'lodash/isEqual';
import pickBy from 'lodash/pickBy';

import {
  addCooperativeAccountError,
  addCooperativeError,
  KymCoopAccountOperatorDetailsFormInput,
  useAppSelector,
  useGetCoOperativeAccountOperatorEditDataQuery,
  useSetCoopAccOperatorDataMutation,
} from '@coop/cbs/data-access';

interface IUseAccountOperatorsProps {
  methods: UseFormReturn<KymCoopAccountOperatorDetailsFormInput>;
  accountId: string;
}

export const useAccountOperators = ({ accountId, methods }: IUseAccountOperatorsProps) => {
  const dispatch = useDispatch();

  const { watch, reset, clearErrors, setError } = methods;

  const router = useRouter();

  const id = String(router?.query?.['id']);

  const bodErrors = useAppSelector((state) => state.cooperative?.accountOperator?.operator);
  const hasPressedNext = useAppSelector((state) => state.cooperative?.hasPressedNext);

  const { data: editValues, refetch } = useGetCoOperativeAccountOperatorEditDataQuery(
    {
      id,
      hasPressedNext,
    },
    {
      enabled: id !== 'undefined',
      onSuccess: (response) => {
        const errorArr = response?.members?.cooperative?.listAccountOperators?.sectionStatus;

        // Add Error If New Error Is Detected
        if (errorArr) {
          const errors = errorArr.map((errorObj, index) => ({
            operatorId: String(index),
            errors: errorObj?.errors ?? {},
          }));

          dispatch(addCooperativeAccountError(errors));
        } else {
          dispatch(addCooperativeError({}));
        }
      },
    }
  );

  const { mutate } = useSetCoopAccOperatorDataMutation({
    onSuccess: async () => {
      await refetch();
    },
  });

  useEffect(() => {
    if (editValues) {
      const editValueData = editValues?.members?.cooperative?.listAccountOperators?.data;

      const familyMemberDetail = editValueData?.find((item) => item?.id === accountId);

      if (familyMemberDetail) {
        reset({
          nameEn: familyMemberDetail?.fullName,
          designation: familyMemberDetail?.designation,
          permanentAddress: {
            ...familyMemberDetail?.permanentAddress,
            locality: familyMemberDetail?.permanentAddress?.locality?.local,
          },
          isPermanentAndTemporaryAddressSame:
            familyMemberDetail?.isPermanentAndTemporaryAddressSame,
          temporaryAddress: {
            ...familyMemberDetail?.temporaryAddress,
            locality: familyMemberDetail?.temporaryAddress?.locality?.local,
          },
          dateOfMembership: familyMemberDetail?.dateOfMembership,
          highestQualification: familyMemberDetail?.highestQualification,
          contactNumber: familyMemberDetail?.contactNumber,
          email: familyMemberDetail?.email,
          citizenshipNo: familyMemberDetail?.citizenshipNo,
          panNo: familyMemberDetail?.panNo,
          coopRelatedTraining: familyMemberDetail?.coopRelatedTraining,
        });
      }
    }
  }, [editValues]);

  useEffect(() => {
    const subscription = watch(
      debounce((item) => {
        const editValueData = editValues?.members?.cooperative?.listAccountOperators?.data;

        const familyMemberDetail = editValueData?.find((family) => family?.id === accountId);

        if (id && accountId && !isEqual(item, familyMemberDetail)) {
          mutate({
            id,
            accOperatorId: accountId,
            data: { ...pickBy(item, (v) => v !== null && v !== undefined) },
          });
        }
      }, 800)
    );

    return () => subscription.unsubscribe();
  }, [watch, router.isReady, editValues]);

  // Trigger Validations When Change In Redux Error Object is Detected
  useDeepCompareEffect(() => {
    // Cleanup Previous Errors
    clearErrors();

    bodErrors?.forEach((error) => {
      const foundIndex = editValues?.members?.cooperative?.listAccountOperators?.data?.findIndex(
        (operator) => operator?.id === accountId
      );

      if (error.operatorId === String(foundIndex)) {
        Object.entries(error.errors ?? {}).forEach((value) => {
          setError(value[0] as keyof KymCoopAccountOperatorDetailsFormInput, {
            type: value[1][0].includes('required') ? 'required' : 'value',
            message: value[1][0],
          });
        });
      }
    });
  }, [bodErrors]);
};
