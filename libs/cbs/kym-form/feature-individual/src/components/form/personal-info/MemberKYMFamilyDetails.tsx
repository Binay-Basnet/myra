import React, { useEffect, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { AiOutlinePlus } from 'react-icons/ai';
import { useRouter } from 'next/router';
import { CloseButton } from '@chakra-ui/react';
import debounce from 'lodash/debounce';

import { InputGroupContainer } from '@coop/accounting/ui-components';
import {
  FormFieldSearchTerm,
  KymIndMemberInput,
  useDeleteMemberFamilyDetailsMutation,
  useGetIndividualKymEditDataQuery,
  useGetIndividualKymFamilyMembersListQuery,
  useGetIndividualKymOptionsQuery,
  useGetNewIdMutation,
  useSetMemberDataMutation,
  useSetMemberFamilyDetailsMutation,
} from '@coop/cbs/data-access';
import {
  DynamicBoxContainer,
  DynamicBoxGroupContainer,
} from '@coop/cbs/kym-form/ui-containers';
import { FormInput, FormSelect } from '@coop/shared/form';
import { Box, Button, FormSection, Icon, IconButton } from '@coop/shared/ui';
import { getKymSection, useTranslation } from '@coop/shared/utils';

import { getFieldOption } from '../../../utils/getFieldOption';

interface IAddFamilyMember {
  removeFamilyMember: (familyMemberId: string) => void;
  setKymCurrentSection: (section?: {
    section: string;
    subSection: string;
  }) => void;
  familyMemberId: string;
}

// interface DynamicInputProps {
//   fieldIndex: number;
//   optionIndex: number;
//   option: Partial<KymOption>;
// }

// const FamilyMemberInput = ({
//   fieldIndex,
//   optionIndex,
//   option,
// }: DynamicInputProps) => {
//   const { register, unregister } = useFormContext();

//   useEffect(() => {
//     register(`familyDetails.${fieldIndex}.options.${optionIndex}.id`, {
//       value: option.id,
//     });
//   }, []);
//   return (
//     <FormInputWithType
//       formType={option?.fieldType}
//       name={`familyDetails.${fieldIndex}.options.${optionIndex}.value`}
//       label={option?.name?.local}
//       placeholder={option?.name?.local}
//     />
//   );
// };

const AddFamilyMember = ({
  removeFamilyMember,
  setKymCurrentSection,
  familyMemberId,
}: IAddFamilyMember) => {
  const { t } = useTranslation();

  const methods = useForm();

  const { watch, reset } = methods;

  const router = useRouter();

  const id = String(router?.query?.['id']);

  const { data: relationshipData } = useGetIndividualKymOptionsQuery({
    searchTerm: FormFieldSearchTerm.Relationship,
  });

  const { data: editValues } = useGetIndividualKymFamilyMembersListQuery({
    id: id,
  });

  useEffect(() => {
    if (editValues) {
      const editValueData =
        editValues?.members?.individual?.listFamilyMember?.data;

      const familyMemberDetail = editValueData?.find(
        (data) => data?.id === familyMemberId
      );

      if (familyMemberDetail) {
        reset({
          relationshipId: familyMemberDetail?.relationshipId,
          fullName: familyMemberDetail?.fullName?.local,
          dateOfBirth: familyMemberDetail?.dateOfBirth,
        });
      }
    }
  }, [editValues]);

  const { mutate } = useSetMemberFamilyDetailsMutation();

  useEffect(() => {
    const subscription = watch(
      debounce((data) => {
        mutate({ id, data: { id: familyMemberId, ...data } });
      }, 800)
    );

    return () => subscription.unsubscribe();
  }, [watch, router.isReady]);

  return (
    <DynamicBoxContainer>
      <Box display="flex" justifyContent="flex-end">
        <IconButton
          aria-label="close"
          variant="ghost"
          size="sm"
          icon={<CloseButton />}
          onClick={() => {
            removeFamilyMember(familyMemberId);
          }}
        />
      </Box>

      <FormProvider {...methods}>
        <form
          onFocus={(e) => {
            const kymSection = getKymSection(e.target.id);
            setKymCurrentSection(kymSection);
          }}
        >
          <InputGroupContainer>
            <FormSelect
              name="relationshipId"
              label={t['kymIndRelationship']}
              placeholder={t['kymIndSelectRelationship']}
              options={getFieldOption(relationshipData)}
            />

            <FormInput
              type="text"
              name="fullName"
              label={t['kymIndFullName']}
              placeholder={t['kymIndEnterFullName']}
            />

            <FormInput
              type="date"
              name="dateOfBirth"
              id="familyDetailsDateOfBirth"
              label={t['kymIndDateofBirthBS']}
            />
          </InputGroupContainer>
        </form>
      </FormProvider>
    </DynamicBoxContainer>
  );
};

interface IMemberMaritalStatusProps {
  setKymCurrentSection: (section?: {
    section: string;
    subSection: string;
  }) => void;
}

const MemberMaritalStatus = ({
  setKymCurrentSection,
}: IMemberMaritalStatusProps) => {
  const { t } = useTranslation();

  const methods = useForm<KymIndMemberInput>();

  const { watch, reset } = methods;

  const router = useRouter();

  const id = router?.query?.['id'];

  const { data: maritalStatusData, isLoading: maritalStatusLoading } =
    useGetIndividualKymOptionsQuery({
      searchTerm: FormFieldSearchTerm.MaritalStatus,
    });

  const { data: editValues, refetch } = useGetIndividualKymEditDataQuery(
    {
      id: String(id),
    },
    { enabled: !!id }
  );

  useEffect(() => {
    if (editValues) {
      const editValueData =
        editValues?.members?.individual?.formState?.data?.formData;

      reset({
        maritalStatusId: editValueData?.maritalStatusId,
      });
    }
  }, [editValues]);

  const { mutate } = useSetMemberDataMutation();

  useEffect(() => {
    const subscription = watch(
      debounce((data) => {
        if (id) {
          mutate({ id: String(id), data }, { onSuccess: () => refetch() });
        }
      }, 800)
    );

    return () => subscription.unsubscribe();
  }, [watch, router.isReady]);

  return (
    <FormProvider {...methods}>
      <form
        onFocus={(e) => {
          const kymSection = getKymSection(e.target.id);
          setKymCurrentSection(kymSection);
        }}
      >
        <FormSection gridLayout={true} header="kymIndFAMILYDETAILS">
          <FormSelect
            name={'maritalStatusId'}
            label={t['kymIndMartialStatus']}
            placeholder={t['kymIndSelectMartialStatus']}
            isLoading={maritalStatusLoading}
            options={getFieldOption(maritalStatusData)}
          />
        </FormSection>
      </form>
    </FormProvider>
  );
};

interface IMemberFamilyDetailsProps {
  setKymCurrentSection: (section?: {
    section: string;
    subSection: string;
  }) => void;
}

const MemberFamilyDetails = ({
  setKymCurrentSection,
}: IMemberFamilyDetailsProps) => {
  const { t } = useTranslation();

  const router = useRouter();

  const id = router?.query?.['id'];

  // const {
  //   fields: familyFields,
  //   append: familyAppend,
  //   remove: familyRemove,
  // } = useFieldArray({ control, name: 'familyDetails' });

  const [familyMemberIds, setFamilyMemberIds] = useState<string[]>([]);

  const { data: editValues } = useGetIndividualKymFamilyMembersListQuery(
    {
      id: String(id),
    },
    { enabled: !!id }
  );

  useEffect(() => {
    if (editValues) {
      const editValueData =
        editValues?.members?.individual?.listFamilyMember?.data?.filter(
          (familyMember) => !familyMember?.familyMemberId
        );

      setFamilyMemberIds(
        editValueData?.reduce(
          (prevVal, curVal) => (curVal ? [...prevVal, curVal.id] : prevVal),
          [] as string[]
        ) ?? []
      );
    }
  }, [editValues]);

  const { mutate: newIDMutate } = useGetNewIdMutation({
    onSuccess: (res) => {
      setFamilyMemberIds([...familyMemberIds, res.newId]);
    },
  });

  const { mutate: deleteMutate } = useDeleteMemberFamilyDetailsMutation({
    onSuccess: (res) => {
      // refetch();
      const deletedId = String(
        res?.members?.individual?.familyMember?.delete?.recordId
      );

      const tempFamilyMemberIds = [...familyMemberIds];

      tempFamilyMemberIds.splice(tempFamilyMemberIds.indexOf(deletedId), 1);

      setFamilyMemberIds([...tempFamilyMemberIds]);
    },
  });

  const appendFamilyMember = () => {
    newIDMutate({});
  };

  const removeFamilyMember = (familyMemberId: string) => {
    deleteMutate({ memberId: String(id), id: familyMemberId });
  };

  return (
    <FormSection
      gridLayout={true}
      templateColumns={1}
      header="kymIndFamilymembers"
    >
      <DynamicBoxGroupContainer>
        {familyMemberIds.map((id) => {
          return (
            <Box key={id}>
              <AddFamilyMember
                removeFamilyMember={removeFamilyMember}
                setKymCurrentSection={setKymCurrentSection}
                familyMemberId={id}
              />
            </Box>
          );
        })}
        <Button
          id="addFamilyMemberButton"
          alignSelf="start"
          leftIcon={<Icon size="md" as={AiOutlinePlus} />}
          variant="outline"
          onClick={() => {
            appendFamilyMember();
          }}
        >
          {t['kymIndAddFamilyMember']}
        </Button>
      </DynamicBoxGroupContainer>
    </FormSection>
  );
};

interface IMemberKYMFamilyDetailsProps {
  setKymCurrentSection: (section?: {
    section: string;
    subSection: string;
  }) => void;
}

export const MemberKYMFamilyDetails = ({
  setKymCurrentSection,
}: IMemberKYMFamilyDetailsProps) => {
  return (
    <Box id="kymAccIndFamilyDetails" scrollMarginTop={'200px'}>
      <MemberMaritalStatus setKymCurrentSection={setKymCurrentSection} />

      <MemberFamilyDetails setKymCurrentSection={setKymCurrentSection} />
    </Box>
  );
};
