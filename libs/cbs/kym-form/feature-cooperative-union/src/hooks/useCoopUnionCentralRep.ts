import { useEffect, useState } from 'react';
import { UseFormReturn } from 'react-hook-form';
import { useDeepCompareEffect } from 'react-use';
import { useRouter } from 'next/router';
import debounce from 'lodash/debounce';
import omit from 'lodash/omit';
import pickBy from 'lodash/pickBy';

import {
  addCentralRepError,
  CooperativeUnionPersonnelSection,
  CoopUnionPersonnelInput,
  RootState,
  useAppDispatch,
  useAppSelector,
  useGetCentralRepresentativeDetailsQuery,
  useSetPersonnelDetailsMutation,
} from '@coop/cbs/data-access';
import { isDeepEmpty } from '@coop/shared/utils';

interface IUseCoopUnionCentralRep {
  methods: UseFormReturn<CoopUnionPersonnelInput>;
}

export const useCoopUnionCentralRep = ({ methods }: IUseCoopUnionCentralRep) => {
  const [notAmongDirectors, setNotAmongDirectors] = useState<boolean>(false);
  const [crId, setCRId] = useState<string>('');

  const dispatch = useAppDispatch();

  const router = useRouter();
  const id = String(router?.query?.['id']);

  const { reset, watch, clearErrors, setError } = methods;
  const { errors } = useAppSelector((state) => state.coopUnion.centralRepresentative);
  const hasPressedNext = useAppSelector((state) => state.coopUnion.hasPressedNext);

  const { mutate } = useSetPersonnelDetailsMutation({
    onSuccess: () => refetch(),
  });

  useEffect(() => {
    const subscription = watch(
      debounce((data) => {
        if (id && data && !isDeepEmpty(data)) {
          if (!data?.notAmongDirectors) {
            mutate({
              id,
              personnelId: null,
              sectionType: CooperativeUnionPersonnelSection.CentralRepresentative,
              data,
            });
          }

          if (data?.notAmongDirectors && crId) {
            mutate({
              id,
              personnelId: crId,
              sectionType: CooperativeUnionPersonnelSection.CentralRepresentative,
              data: omit(data, ['centralRepID']),
            });
          }
        }
      }, 800)
    );

    return () => subscription.unsubscribe();
  }, [watch, router.isReady, crId]);

  const { data: crDetailsEditData, refetch } = useGetCentralRepresentativeDetailsQuery(
    {
      id: String(id),
      includeRequiredErrors: hasPressedNext,
    },
    {
      enabled: !!id,
      onSuccess: (response) => {
        const errorObj =
          response?.members?.cooperativeUnion?.formState?.formData?.centralRepresentativeDetails
            ?.sectionStatus?.errors;

        // Add Error If New Error Is Detected
        if (errorObj) {
          dispatch(addCentralRepError(errorObj));
        } else {
          dispatch(addCentralRepError(null));
        }
      },
    }
  );

  // refetch data when calendar preference is updated
  const preference = useAppSelector((state: RootState) => state?.auth?.preference);

  useEffect(() => {
    refetch();
  }, [preference?.date]);

  useDeepCompareEffect(() => {
    if (crDetailsEditData) {
      const crDetail =
        crDetailsEditData?.members?.cooperativeUnion?.formState?.formData
          ?.centralRepresentativeDetails?.data;

      if (crDetail) {
        reset({
          ...omit(
            pickBy(crDetail, (v) => v !== undefined && v !== null),
            ['id']
          ),
        });

        if (crDetail?.id) {
          setCRId(crDetail?.id);
        }

        setNotAmongDirectors(crDetail.notAmongDirectors ?? false);
      }
    }
  }, [crDetailsEditData]);

  useDeepCompareEffect(() => {
    // Cleanup Previous Errors
    clearErrors();
    Object.entries(errors ?? {}).forEach((value) => {
      setError(value[0] as keyof CoopUnionPersonnelInput, {
        type: value[1][0].includes('required') ? 'required' : 'value',
        message: value[1][0],
      });
    });
  }, [errors]);

  return { notAmongDirectors, crId, setCRId };
};
