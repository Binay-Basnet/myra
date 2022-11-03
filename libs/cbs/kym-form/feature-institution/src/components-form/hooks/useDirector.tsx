import { useEffect } from 'react';
import { UseFormReturn } from 'react-hook-form';
import { useDeepCompareEffect } from 'react-use';
import { useRouter } from 'next/router';
import debounce from 'lodash/debounce';
import omit from 'lodash/omit';

import {
  addInstitutionDirectorError,
  addInstitutionError,
  CoopUnionPersonnelInput,
  RootState,
  useAppDispatch,
  useAppSelector,
  useGetInsBoardDirectorEditListQuery,
  useSetAddDirectorInstitutionMutation,
} from '@coop/cbs/data-access';

interface IUseCoopUnionBodProps {
  methods: UseFormReturn<CoopUnionPersonnelInput>;
  directorId: string;
}

export const useDirector = ({ methods, directorId }: IUseCoopUnionBodProps) => {
  const router = useRouter();
  const id = router.query['id'] as string;
  const dispatch = useAppDispatch();

  const bodErrors = useAppSelector((state) => state.institution.directorDetails.director);
  const hasPressedNext = useAppSelector((state) => state.institution.hasPressedNext);

  const { watch, reset, setError, clearErrors } = methods;

  const {
    data: editValues,
    refetch: refetchEdit,
    isLoading: editLoading,
  } = useGetInsBoardDirectorEditListQuery(
    { id, hasRequiredErrors: hasPressedNext },
    {
      enabled: !!id,
      staleTime: 0,
      onSuccess: (response) => {
        const errorArr = response?.members?.institution?.listDirectors?.sectionStatus;

        // Add Error If New Error Is Detected
        if (errorArr) {
          const errors = errorArr.map((errorObj, index) => ({
            directorId: String(index),
            errors: errorObj?.errors ?? {},
          }));

          dispatch(addInstitutionDirectorError(errors));
        } else {
          dispatch(addInstitutionError({}));
        }
      },
    }
  );

  const directorDetail = editValues?.members?.institution?.listDirectors?.data?.find(
    (director) => director?.id === directorId
  );

  // Mutation To Set Data
  const { mutateAsync: setData } = useSetAddDirectorInstitutionMutation({
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
    if (directorDetail) {
      reset({
        ...omit(directorDetail, ['id']),
        permanentAddress: {
          ...directorDetail?.permanentAddress,
          locality: directorDetail?.permanentAddress?.locality?.local,
        },
        temporaryAddress: {
          ...directorDetail?.temporaryAddress,
          locality: directorDetail?.temporaryAddress?.locality?.local,
        },
      });
    }
  }, [editLoading]);

  // Call The Mutation To Add Data on Each Form Change
  useEffect(() => {
    const subscription = watch(
      debounce(async (data) => {
        if (id) {
          await setData({
            id,
            dir: directorId,
            data,
          });
        }
      }, 800)
    );

    return () => subscription.unsubscribe();
  }, [watch, directorDetail]);

  // Trigger Validations When Change In Redux Error Object is Detected
  useDeepCompareEffect(() => {
    // Cleanup Previous Errors
    clearErrors();

    bodErrors.forEach((error) => {
      const foundIndex = editValues?.members?.institution?.listDirectors?.data?.findIndex(
        (director) => director?.id === directorId
      );

      if (error.directorId === String(foundIndex)) {
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
