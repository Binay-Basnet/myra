import { useEffect } from 'react';
import { UseFormReturn } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { useDeepCompareEffect } from 'react-use';
import { useRouter } from 'next/router';
import { isEqual } from 'lodash';
import debounce from 'lodash/debounce';
import pickBy from 'lodash/pickBy';

import {
  addCooperativeDirectorError,
  addCooperativeError,
  KymCoopDirectorDetailsFormInput,
  useAppSelector,
  useGetCoOperativeDirectorEditDataQuery,
  useSetCooPdirectorDataMutation,
} from '@coop/cbs/data-access';

interface IUseCooperativeBODProps {
  methods: UseFormReturn<KymCoopDirectorDetailsFormInput>;
  directorId: string;
}

export const useCooperativeBOD = ({ methods, directorId }: IUseCooperativeBODProps) => {
  const { watch, reset, clearErrors, setError } = methods;

  const dispatch = useDispatch();

  const router = useRouter();

  const id = String(router?.query?.['id']);

  const bodErrors = useAppSelector((state) => state.cooperative?.directorDetails?.director);
  const hasPressedNext = useAppSelector((state) => state.cooperative?.hasPressedNext);

  const { mutate } = useSetCooPdirectorDataMutation({
    onSuccess: async () => {
      await refetch();
    },
  });

  const { data: editValues, refetch } = useGetCoOperativeDirectorEditDataQuery(
    {
      id,
      hasPressedNext,
    },
    {
      enabled: id !== 'undefined',
      onSuccess: (response) => {
        const errorArr = response?.members?.cooperative?.listDirectors?.sectionStatus;

        // Add Error If New Error Is Detected
        if (errorArr) {
          const errors = errorArr.map((errorObj, index) => ({
            directorId: String(index),
            errors: errorObj?.errors ?? {},
          }));

          dispatch(addCooperativeDirectorError(errors));
        } else {
          dispatch(addCooperativeError({}));
        }
      },
    }
  );

  useEffect(() => {
    if (editValues) {
      const editValueData = editValues?.members?.cooperative?.listDirectors?.data;

      const directorDetails = editValueData?.find((data) => data?.id === directorId);

      if (directorDetails) {
        reset({
          nameEn: directorDetails?.fullName,

          designation: directorDetails?.designation,
          permanentAddress: {
            ...directorDetails?.permanentAddress,
            locality: directorDetails?.permanentAddress?.locality?.local,
          },
          isPermanentAndTemporaryAddressSame: directorDetails?.isPermanentAndTemporaryAddressSame,
          temporaryAddress: {
            ...directorDetails?.temporaryAddress,
            locality: directorDetails?.temporaryAddress?.locality?.local,
          },
          dateOfMembership: directorDetails?.dateOfMembership,
          highestQualification: directorDetails?.highestQualification,
          contactNumber: directorDetails?.contactNumber,
          email: directorDetails?.email,
          citizenshipNo: directorDetails?.citizenshipNo,
          panNo: directorDetails?.panNo,
        });
      }
    }
  }, [editValues]);

  useEffect(() => {
    const subscription = watch(
      debounce((data) => {
        const editValueData = editValues?.members?.cooperative?.listDirectors?.data;

        const directorDetails = editValueData?.find((detail) => detail?.id === directorId);

        if (id && directorId && !isEqual(data, directorDetails)) {
          mutate({
            id,
            dirId: directorId,
            data: {
              cooperativeId: id,
              ...pickBy(data, (v) => v !== null && v !== undefined),
            },
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
      const foundIndex = editValues?.members?.cooperative?.listDirectors?.data?.findIndex(
        (director) => director?.id === directorId
      );

      if (error.directorId === String(foundIndex)) {
        Object.entries(error.errors ?? {}).forEach((value) => {
          setError(value[0] as keyof KymCoopDirectorDetailsFormInput, {
            type: value[1][0].includes('required') ? 'required' : 'value',
            message: value[1][0],
          });
        });
      }
    });
  }, [bodErrors]);
};
