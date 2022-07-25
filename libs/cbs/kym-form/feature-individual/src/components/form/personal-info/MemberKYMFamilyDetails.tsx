import React, { useEffect, useState } from 'react';
import {
  FormProvider,
  useFieldArray,
  useForm,
  useFormContext,
} from 'react-hook-form';
import { AiOutlinePlus } from 'react-icons/ai';
import { useRouter } from 'next/router';
import { CloseIcon } from '@chakra-ui/icons';
import debounce from 'lodash/debounce';

import { FormInputWithType } from '@coop/cbs/kym-form/formElements';
import {
  DynamicBoxContainer,
  DynamicBoxGroupContainer,
  GroupContainer,
  InputGroupContainer,
} from '@coop/cbs/kym-form/ui-containers';
import {
  Kym_Field_Custom_Id,
  Kym_Field_Custom_Id as KYMOptionEnum,
  Kym_Option_Field_Type,
  KymIndMemberInput,
  KymOption,
  useDeleteMemberFamilyDetailsMutation,
  useGetIndividualKymEditDataQuery,
  useGetIndividualKymFamilyMembersListQuery,
  useGetIndividualKymOptionsQuery,
  useGetNewIdMutation,
  useSetMemberDataMutation,
  useSetMemberFamilyDetailsMutation,
} from '@coop/shared/data-access';
import { FormInput, FormSelect } from '@coop/shared/form';
import { Box, Button, Icon, Text } from '@coop/shared/ui';
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
  const methods = useForm();

  const { watch, reset } = methods;

  const router = useRouter();

  const id = String(router?.query?.['id']);

  const { data: relationshipData } = useGetIndividualKymOptionsQuery({
    id,
    filter: {
      customId: Kym_Field_Custom_Id.Relationship,
    },
  });

  const { data: editValues, refetch } =
    useGetIndividualKymFamilyMembersListQuery({
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

  const { mutate } = useSetMemberFamilyDetailsMutation({
    onSuccess: () => refetch(),
  });

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
      <CloseIcon
        cursor="pointer"
        onClick={() => {
          removeFamilyMember(familyMemberId);
        }}
        color="gray.500"
        _hover={{
          color: 'gray.900',
        }}
        aria-label="close"
        alignSelf="flex-end"
      />

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
              label="Relationship"
              placeholder="Select Relationship"
              options={getFieldOption(relationshipData)}
            />

            <FormInput
              type="text"
              name="fullName"
              label="Full Name"
              placeholder="Full Name"
            />

            <FormInput
              type="date"
              name="dateOfBirth"
              label="Date of Birth (BS)"
            />

            {/* {familyDetailsFieldsData?.members?.individual?.options?.list?.data?.[0]?.options?.map(
          (option, optionIndex) => (
            <FamilyMemberInput
              key={optionIndex}
              fieldIndex={index}
              optionIndex={optionIndex}
              option={option}
            />
            //  <FormInputWithType
            //               formType={option?.fieldType}
            //               id="identificationFields"
            //               type={option?.fieldType}
            //               name={`identification.${fieldIndex}.options.${optionIndex}.value`}
            //               label={String(option?.name?.local)}
            //               placeholder={String(option?.name?.local)}
            //             />
          )
        )} */}
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

  const id = String(router?.query?.['id']);

  const { data: maritalStatusData, isLoading: maritalStatusLoading } =
    useGetIndividualKymOptionsQuery({
      id,
      filter: { customId: KYMOptionEnum.MaritalStatus },
    });

  const { data: editValues } = useGetIndividualKymEditDataQuery({
    id: id,
  });

  console.log({
    ind: 'marital status info',
    data: editValues?.members?.individual?.formState?.data?.formData
      ?.maritalStatusId,
  });

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
        mutate({ id, data });
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
        <Text fontSize="r1" fontWeight="SemiBold">
          {t['kymIndFAMILYDETAILS']}
        </Text>
        <InputGroupContainer>
          <FormSelect
            name={'maritalStatusId'}
            label={t['kymIndMartialStatus']}
            placeholder={t['kymIndSelectMartialStatus']}
            isLoading={maritalStatusLoading}
            options={getFieldOption(maritalStatusData)}
          />
        </InputGroupContainer>
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

  const id = String(router?.query?.['id']);

  // const {
  //   fields: familyFields,
  //   append: familyAppend,
  //   remove: familyRemove,
  // } = useFieldArray({ control, name: 'familyDetails' });

  const [familyMemberIds, setFamilyMemberIds] = useState<string[]>([]);

  const { data: editValues } = useGetIndividualKymFamilyMembersListQuery({
    id: id,
  });

  useEffect(() => {
    if (editValues) {
      const editValueData =
        editValues?.members?.individual?.listFamilyMember?.data;

      setFamilyMemberIds(
        editValueData?.reduce(
          (prevVal, curVal) => (curVal ? [...prevVal, curVal.id] : prevVal),
          []
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
    deleteMutate({ memberId: id, id: familyMemberId });
  };

  return (
    <Box>
      <Text fontSize="s3" mb="s4">
        {t['kymIndFamilymembers']}
      </Text>
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
    </Box>
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
    <GroupContainer id="kymAccIndFamilyDetails" scrollMarginTop={'200px'}>
      <MemberMaritalStatus setKymCurrentSection={setKymCurrentSection} />

      <MemberFamilyDetails setKymCurrentSection={setKymCurrentSection} />
    </GroupContainer>
  );
};
