import { useEffect, useState } from 'react';
import { FormProvider, useForm, UseFormReturn } from 'react-hook-form';
import { AiOutlinePlus } from 'react-icons/ai';
import { useDeepCompareEffect } from 'react-use';
import { useRouter } from 'next/router';
import { CloseButton } from '@chakra-ui/react';
import debounce from 'lodash/debounce';
import omit from 'lodash/omit';

import {
  addInstitutionError,
  addSisterError,
  KymInsSisterConcernInput,
  RootState,
  useAppDispatch,
  useAppSelector,
  useDeleteSisterConcernsMutation,
  useGetInstitutionSisterDetailsEditListQuery,
  useGetNewIdMutation,
  useSetSisterConcernsMutation,
} from '@coop/cbs/data-access';
import { DynamicBoxContainer } from '@coop/cbs/kym-form/ui-containers';
import { FormInput } from '@coop/shared/form';
import { Box, Button, FormSection, Grid, GridItem, Icon, IconButton } from '@myra-ui';
import { getKymSectionInstitution, useTranslation } from '@coop/shared/utils';

interface IAddSisterConcern {
  removeSister: (sisterId: string) => void;
  setKymCurrentSection: (section?: { section: string; subSection: string }) => void;
  sisterId: string;
}

export const useSisterConcernInstitution = ({
  methods,
  sisterId,
}: {
  sisterId: string;
  methods: UseFormReturn<KymInsSisterConcernInput>;
}) => {
  const router = useRouter();
  const id = router.query['id'] as string;
  const dispatch = useAppDispatch();

  const sisterErrors = useAppSelector((state) => state.institution.sister);
  const { watch, reset, setError, clearErrors } = methods;

  const hasPressedNext = useAppSelector((state) => state.institution.hasPressedNext);

  const {
    data: editValues,
    refetch: refetchEdit,
    isLoading: editLoading,
  } = useGetInstitutionSisterDetailsEditListQuery(
    {
      id,
      includeRequiredErrors: hasPressedNext,
    },
    {
      enabled: !!id,
      onSuccess: (response) => {
        const errorArr = response.members?.institution?.listSisterConcerns?.sectionStatus;

        // Add Error If New Error Is Detected
        if (errorArr) {
          const errors = errorArr.map((errorObj, index) => ({
            sisterId: String(index),
            errors: errorObj?.errors ?? {},
          }));

          dispatch(addSisterError(errors));
        } else {
          dispatch(addInstitutionError({}));
        }
      },
    }
  );

  const sisterDetail = editValues?.members?.institution?.listSisterConcerns?.data?.find(
    (sister) => sister?.id === sisterId
  );

  // Mutation To Set Data
  const { mutateAsync: setData } = useSetSisterConcernsMutation({
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
    if (sisterDetail) {
      reset(omit(sisterDetail, ['id']));
    }
  }, [editLoading, editValues]);

  // Call The Mutation To Add Data on Each Form Change
  useEffect(() => {
    const subscription = watch(
      debounce(async (data) => {
        if (id) {
          await setData({
            id,
            sis: sisterId,
            data: { institutionId: id, ...data },
          });
        }
      }, 800)
    );

    return () => subscription.unsubscribe();
  }, [watch, sisterDetail]);

  // Trigger Validations When Change In Redux Error Object is Detected
  useDeepCompareEffect(() => {
    // Cleanup Previous Errors
    clearErrors();

    sisterErrors.forEach((error) => {
      const foundIndex = editValues?.members?.institution?.listSisterConcerns?.data?.findIndex(
        (sister) => sister?.id === sisterId
      );

      if (error.sisterId === String(foundIndex)) {
        Object.entries(error?.errors ?? {}).forEach((value) => {
          setError(value[0] as keyof KymInsSisterConcernInput, {
            type: value[1][0].includes('required') ? 'required' : 'value',
            message: value[1][0],
          });
        });
      }
    });
  }, [sisterErrors]);
};

const AddSister = ({ removeSister, setKymCurrentSection, sisterId }: IAddSisterConcern) => {
  const { t } = useTranslation();
  const methods = useForm();

  useSisterConcernInstitution({ sisterId, methods });

  return (
    <FormProvider {...methods}>
      <form
        onFocus={(e) => {
          const kymSection = getKymSectionInstitution(e.target.id);
          setKymCurrentSection(kymSection);
        }}
      >
        <DynamicBoxContainer>
          <Box display="flex" justifyContent="space-between">
            <Box />
            <Box pb="s12">
              <IconButton
                aria-label="close"
                variant="ghost"
                size="sm"
                icon={<CloseButton />}
                onClick={() => {
                  removeSister(sisterId);
                }}
                id="removeSpouseOccupationButton"
              />
            </Box>
          </Box>
          <Grid templateColumns="repeat(2, 1fr)" gap="s20">
            <FormInput
              id="sisterConcernsDetails"
              type="text"
              bg="white"
              name="name"
              label={t['kymInsNameofSisterConcern']}
            />
            <FormInput
              id="sisterConcernsDetails"
              type="text"
              bg="white"
              name="natureOfBusiness"
              label={t['kymInsNatureofBusiness']}
            />
            <FormInput
              id="sisterConcernsDetails"
              type="text"
              bg="white"
              name="address"
              label={t['kymInsAddress']}
            />
            <FormInput
              id="sisterConcernsDetails"
              type="text"
              bg="white"
              name="phone"
              label={t['kymInsPhoneNo']}
            />
          </Grid>
        </DynamicBoxContainer>
      </form>
    </FormProvider>
  );
};

interface IProps {
  setSection: (section?: { section: string; subSection: string }) => void;
}

export const InstitutionKYMSisterConcernDetails = ({ setSection }: IProps) => {
  const { t } = useTranslation();
  const router = useRouter();
  const id = router?.query?.['id'];

  const [sisterIds, setSisterIds] = useState<string[]>([]);

  const { data: editValues, refetch: refetchEdit } = useGetInstitutionSisterDetailsEditListQuery(
    {
      id: String(id),
    },
    { enabled: !!id }
  );

  useEffect(() => {
    if (editValues) {
      const editValueData = editValues?.members?.institution?.listSisterConcerns?.data;

      setSisterIds(
        editValueData?.reduce(
          (prevVal, curVal) => (curVal?.id ? [...prevVal, curVal.id] : prevVal),
          [] as string[]
        ) ?? []
      );
    }
  }, [editValues]);

  // refetch data when calendar preference is updated
  const preference = useAppSelector((state: RootState) => state?.auth?.preference);

  useEffect(() => {
    refetchEdit();
  }, [preference?.date]);

  const { mutate: newIdMutate } = useGetNewIdMutation({
    onSuccess: (res) => {
      setSisterIds([...sisterIds, res.newId]);
    },
  });

  const { mutate: deleteMutate } = useDeleteSisterConcernsMutation({
    onSuccess: (res) => {
      const deletedId = String(res?.members?.institution?.sisterConcern?.Delete?.recordId);
      const tempSisterIds = [...sisterIds];
      tempSisterIds.splice(tempSisterIds.indexOf(deletedId), 1);
      setSisterIds([...tempSisterIds]);
    },
  });

  const addSister = () => {
    newIdMutate({});
  };
  const removeSister = (sisterId: string) => {
    deleteMutate({ sis: sisterId, insId: String(id) });
  };

  return (
    <FormSection id="kymInsDetailsofsisterconcern" header="kymInsDetailsofsisterconcern">
      <GridItem colSpan={3}>
        <Grid gap="s16">
          {sisterIds.map((sisterId) => (
            <Box key={sisterId}>
              <AddSister
                removeSister={removeSister}
                setKymCurrentSection={setSection}
                sisterId={sisterId}
              />
            </Box>
          ))}
        </Grid>
        <Button
          mt="s16"
          id="sisterConcernButton"
          alignSelf="start"
          leftIcon={<Icon size="md" as={AiOutlinePlus} />}
          variant="outline"
          onClick={() => {
            addSister();
          }}
        >
          {t['kymInsNewDetail']}
        </Button>
      </GridItem>
    </FormSection>
  );
};
