import React, { useEffect, useState } from 'react';
import { FormProvider, useFieldArray, useForm } from 'react-hook-form';
import { AiOutlinePlus } from 'react-icons/ai';
import { useRouter } from 'next/router';
import { CloseIcon } from '@chakra-ui/icons';
import debounce from 'lodash/debounce';

import {
  DynamicBoxContainer,
  DynamicBoxGroupContainer,
  GroupContainer,
} from '@coop/cbs/kym-form/ui-containers';
import {
  KymInsSisterConcernInput,
  useDeleteSisterConcernsMutation,
  useGetInstitutionSisterDetailsEditListQuery,
  useGetNewIdMutation,
  useSetSisterConcernsMutation,
} from '@coop/shared/data-access';
import { FormInput } from '@coop/shared/form';
// import { KymIndMemberInput } from '@coop/shared/data-access';
import { Box, Button, Grid, Icon, Text } from '@coop/shared/ui';
import { getKymSectionInstitution, useTranslation } from '@coop/shared/utils';

interface IAddSisterConcern {
  removeSister: (sisterId: string) => void;
  setKymCurrentSection: (section?: {
    section: string;
    subSection: string;
  }) => void;
  sisterId: string;
}

const AddSister = ({
  removeSister,
  setKymCurrentSection,
  sisterId,
}: IAddSisterConcern) => {
  const { t } = useTranslation();
  const methods = useForm();

  const { watch, reset } = methods;

  const router = useRouter();

  const id = String(router?.query?.['id']);

  const { mutate } = useSetSisterConcernsMutation();

  const { data: editValues } = useGetInstitutionSisterDetailsEditListQuery({
    id: id,
  });

  useEffect(() => {
    if (editValues) {
      const editValueData =
        editValues?.members?.institution?.listSisterConcerns?.data;

      const familyMemberDetail = editValueData?.find(
        (data) => data?.id === sisterId
      );

      if (familyMemberDetail) {
        reset({
          name: familyMemberDetail?.name,
          natureOfBusiness: familyMemberDetail?.natureOfBusiness,
          address: familyMemberDetail?.address,
          phoneNo: familyMemberDetail?.phoneNo,
        });
      }
    }
  }, [editValues]);
  useEffect(() => {
    const subscription = watch(
      debounce((data) => {
        mutate({
          id,
          sis: sisterId,
          data: { institutionId: id, ...data },
        });
      }, 800)
    );

    return () => subscription.unsubscribe();
  }, [watch, router.isReady]);
  return (
    <FormProvider {...methods}>
      <form
        onFocus={(e) => {
          const kymSection = getKymSectionInstitution(e.target.id);
          setKymCurrentSection(kymSection);
        }}
      >
        <DynamicBoxContainer>
          <CloseIcon
            cursor="pointer"
            onClick={() => {
              removeSister(sisterId);
            }}
            color="gray.500"
            _hover={{
              color: 'gray.900',
            }}
            aria-label="close"
            alignSelf="flex-end"
          />
          <Grid templateColumns={'repeat(2, 1fr)'} gap="s20">
            <FormInput
              type="text"
              bg="white"
              name={'name'}
              label={t['kymInsNameofSisterConcern']}
              placeholder={t['kymInsEnterNameofSisterConcern']}
            />
            <FormInput
              type="text"
              bg="white"
              name={`natureOfBusiness`}
              label={t['kymInsNatureofBusiness']}
              placeholder={t['kymInsNatureofBusiness']}
            />
            <FormInput
              type="text"
              bg="white"
              name={`address`}
              label={t['kymInsAddress']}
              placeholder={t['kymInsAddress']}
            />
            <FormInput
              type="text"
              bg="white"
              name={`phone`}
              label={t['kymInsPhoneNo']}
              placeholder={t['kymInsEnterPhoneNumber']}
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

export const InstitutionKYMSisterConcernDetails = (props: IProps) => {
  const { t } = useTranslation();
  const methods = useForm<KymInsSisterConcernInput>({
    defaultValues: {},
  });
  const { setSection } = props;

  const router = useRouter();
  const id = String(router?.query?.['id']);

  const { control, handleSubmit, getValues, watch, setError } = methods;

  const [sisterIds, setSisterIds] = useState<string[]>([]);

  const { data: editValues } = useGetInstitutionSisterDetailsEditListQuery(
    {
      id: String(id),
    },
    { enabled: !!id }
  );

  useEffect(() => {
    if (editValues) {
      const editValueData =
        editValues?.members?.institution?.listSisterConcerns?.data;

      setSisterIds(
        editValueData?.reduce(
          (prevVal, curVal) => (curVal ? [...prevVal, curVal.id] : prevVal),
          [] as string[]
        ) ?? []
      );
    }
  }, [editValues]);

  const { mutate: newIdMutate } = useGetNewIdMutation({
    onSuccess: (res) => {
      setSisterIds([...sisterIds, res.newId]);
    },
  });

  const { mutate: deleteMutate } = useDeleteSisterConcernsMutation({
    onSuccess: (res) => {
      const deletedId = String(
        res?.members?.institution?.sisterConcern?.Delete?.recordId
      );

      const tempSisterIds = [...sisterIds];

      tempSisterIds.splice(tempSisterIds.indexOf(deletedId), 1);

      setSisterIds([...tempSisterIds]);
    },
  });

  const addSister = () => {
    newIdMutate({});
  };
  const removeSister = (sisterId: string) => {
    deleteMutate({ insId: id, sis: sisterId });
  };

  return (
    <FormProvider {...methods}>
      <form
        onFocus={(e) => {
          const kymSection = getKymSectionInstitution(e.target.id);
          setSection(kymSection);
        }}
      >
        <GroupContainer
          id="kymInsDetailsofsisterconcern"
          scrollMarginTop={'200px'}
        >
          <Text fontSize="r1" fontWeight="SemiBold">
            {t['kymInsDetailsofsisterconcern']}
          </Text>

          <div>
            <DynamicBoxGroupContainer>
              {sisterIds.map((id) => {
                return (
                  <Box key={id}>
                    <AddSister
                      removeSister={removeSister}
                      setKymCurrentSection={setSection}
                      sisterId={id}
                    />
                  </Box>
                );
              })}
              <Button
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
            </DynamicBoxGroupContainer>
          </div>
        </GroupContainer>
      </form>
    </FormProvider>
  );
};
