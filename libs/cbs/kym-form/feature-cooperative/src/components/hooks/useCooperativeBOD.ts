import { useCallback, useEffect } from 'react';
import { UseFormReturn } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { useDeepCompareEffect } from 'react-use';
import { useRouter } from 'next/router';
import { omit } from 'lodash';
import debounce from 'lodash/debounce';
import pickBy from 'lodash/pickBy';

import {
  addCooperativeDirectorError,
  addCooperativeError,
  KymCoopDirectorDetailsFormInput,
  setCooperativeFormLoading,
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

  const { mutateAsync } = useSetCooPdirectorDataMutation({
    onSuccess: async () => {
      await refetch();
      dispatch(setCooperativeFormLoading(false));
    },
    onMutate: async () => {
      dispatch(setCooperativeFormLoading(true));
    },
    onError: async () => {
      dispatch(setCooperativeFormLoading(false));
    },
  });

  const {
    data: editValues,
    isLoading: editLoading,
    refetch,
  } = useGetCoOperativeDirectorEditDataQuery(
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
  }, [editLoading]);

  useEffect(() => {
    const subscription = watch((data) => {
      if (id && directorId) {
        dispatch(setCooperativeFormLoading(true));
        saveData(data as KymCoopDirectorDetailsFormInput, id, directorId);
      }
    });

    return () => subscription.unsubscribe();
  }, [watch, id, directorId]);

  const saveData = useCallback(
    debounce(
      async (data: KymCoopDirectorDetailsFormInput, formId: string, formdirectorId: string) => {
        await mutateAsync({
          id: formId,
          dirId: formdirectorId,
          data: pickBy(omit(data, ['hasTCAccepted']), (v) => v !== null && v !== undefined),
        });
      },
      2000
    ),
    []
  );

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
