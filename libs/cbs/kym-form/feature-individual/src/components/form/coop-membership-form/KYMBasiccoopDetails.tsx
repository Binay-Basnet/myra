import { useEffect, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { AiOutlineSearch } from 'react-icons/ai';
import { useRouter } from 'next/router';
import { isEqual } from 'lodash';
import debounce from 'lodash/debounce';

import {
  FormFieldSearchTerm,
  Id_Type,
  useDeleteMemberFamilyDetailsMutation,
  useGetIndividualKymEditDataQuery,
  useGetIndividualKymFamilyMembersListQuery,
  useGetIndividualKymOptionsQuery,
  useGetMemberListQuery,
  useGetNewIdMutation,
  useSetMemberDataMutation,
} from '@coop/cbs/data-access';
import { InputGroupContainer } from '@coop/cbs/kym-form/ui-containers';
import { FormInput, FormSelect, FormSwitchTab } from '@coop/shared/form';
import { Box, Button, FormMemberSelect, FormSection, GridItem, Icon } from '@coop/shared/ui';
import { getKymSection, getRouterQuery, isDeepEmpty, useTranslation } from '@coop/shared/utils';

import { FamilyMember } from './FamilyMember';
import { getFieldOption } from '../../../utils/getFieldOption';

const booleanList = [
  {
    label: 'Yes',
    value: true,
  },
  {
    label: 'No',
    value: false,
  },
];

interface IKYMBasiccoopDetailsFamilyMemberProps {
  setKymCurrentSection: (section?: { section: string; subSection: string }) => void;
}

const KYMBasiccoopDetailsFamilyMember = ({
  setKymCurrentSection,
}: IKYMBasiccoopDetailsFamilyMemberProps) => {
  // const [showFamilyDetailCard, setShowFamilyDetailCard] = useState(false);
  const [selectedFamilyMember, setSelectedFamilyMember] = useState('');

  const { t } = useTranslation();

  const router = useRouter();

  const id = router?.query?.['id'];

  const methods = useForm();

  const { watch, reset } = methods;

  const formMethods = useForm({
    // defaultValues: {
    //   isFamilyAMember: false,
    //   isMemberOfAnotherCooperative: false,
    // },
  });

  const { reset: formReset } = formMethods;

  // const { data: familyRelationShipData, isLoading: familyRelationshipLoading } =
  //   useGetIndividualKymOptionsQuery({
  //     searchTerm: FormFieldSearchTerm.Relationship,
  //   });

  const isFamilyAMember = watch('isFamilyAMember');

  const { data: editValues } = useGetIndividualKymEditDataQuery(
    {
      id: String(id),
    },
    { enabled: !!id }
  );

  useEffect(() => {
    if (editValues) {
      const editValueData = editValues?.members?.individual?.formState?.data?.formData;

      reset({
        isFamilyAMember: editValueData?.isFamilyAMember,
      });
    }
  }, [editValues]);

  const { mutate } = useSetMemberDataMutation();

  useEffect(() => {
    const subscription = watch(
      debounce((data) => {
        const editValueData = editValues?.members?.individual?.formState?.data?.formData;
        if (id && !isDeepEmpty(data) && !isEqual(data, editValueData)) {
          mutate({ id: String(id), data });
        }
      }, 800)
    );

    return () => subscription.unsubscribe();
  }, [watch, router.isReady]);

  const { data: memberListData } = useGetMemberListQuery({
    pagination: getRouterQuery({ type: ['PAGINATION'] }),
  });

  const memberSelectOption = memberListData?.members?.list?.edges?.map((item) => ({
    value: item?.node?.id ?? '',
    label: `${item?.node?.id ?? ''}-${item?.node?.name?.local ?? ''}`,
  }));

  // const selectedMemberDetails = memberListData?.members?.list?.edges?.filter(
  //   (item) => item?.node?.id === selectedFamilyMember
  // );

  const [familyMemberMutationIds, setFamilyMemberMutationIds] = useState<string[]>([]);

  const [familyMemberIds, setFamilyMemberIds] = useState<string[]>([]);

  const { data: familyMemberListQueryData, refetch } = useGetIndividualKymFamilyMembersListQuery(
    {
      id: String(id),
    },
    { enabled: !!id }
  );

  useEffect(() => {
    if (familyMemberListQueryData) {
      const editValueData =
        familyMemberListQueryData?.members?.individual?.listFamilyMember?.data?.filter(
          (familyMember) => !!familyMember?.familyMemberId
        );

      setFamilyMemberMutationIds(
        editValueData?.reduce(
          (prevVal, curVal) => (curVal ? [...prevVal, curVal.id] : prevVal),
          [] as string[]
        ) ?? []
      );

      setFamilyMemberIds(
        editValueData?.reduce(
          (prevVal, curVal) => (curVal ? [...prevVal, curVal.familyMemberId as string] : prevVal),
          [] as string[]
        ) ?? []
      );
    }
  }, [familyMemberListQueryData]);

  const { mutate: newIDMutate } = useGetNewIdMutation({
    onSuccess: (res) => {
      setFamilyMemberMutationIds([...familyMemberMutationIds, res.newId]);
      formReset({ memberName: '', memberId: '' });
    },
  });

  const { mutate: deleteMutate } = useDeleteMemberFamilyDetailsMutation({
    onSuccess: (res) => {
      // refetch();
      const deletedId = String(res?.members?.individual?.familyMember?.delete?.recordId);

      const tempFamilyMemberMutationIds = [...familyMemberMutationIds];

      tempFamilyMemberMutationIds.splice(tempFamilyMemberMutationIds.indexOf(deletedId), 1);

      setFamilyMemberMutationIds([...tempFamilyMemberMutationIds]);

      const tempFamilyMemberIds = [...familyMemberIds];

      setFamilyMemberIds([...familyMemberIds.splice(tempFamilyMemberIds.indexOf(deletedId), 1)]);
    },
  });

  const appendFamilyMember = () => {
    setFamilyMemberIds([...familyMemberIds, selectedFamilyMember]);
    newIDMutate({ idType: Id_Type.Kymindividualfamilymembers });
  };

  const removeFamilyMember = (mutationId: string) => {
    deleteMutate({ memberId: String(id), id: mutationId });
  };

  useEffect(() => {
    if (id) {
      refetch();
    }
  }, [id]);

  return (
    <FormSection id="kymAccIndFamilyMemberinthisinstitution">
      <GridItem colSpan={3}>
        <FormProvider {...methods}>
          <form
            onFocus={(e) => {
              const kymSection = getKymSection(e.target.id);
              setKymCurrentSection(kymSection);
            }}
          >
            <FormSwitchTab
              label={t['kynIndFamilyMemberinthisinstitution']}
              options={booleanList}
              name="isFamilyAMember"
              id="familyMemberInThisInstitution"
            />
          </form>
        </FormProvider>
      </GridItem>

      {isFamilyAMember && (
        <GridItem colSpan={3}>
          {familyMemberMutationIds.map((mutationId, index) => (
            <FamilyMember
              mutationId={mutationId}
              familyMemberId={familyMemberIds[index]}
              memberId={id as string}
              removeFamilyMember={removeFamilyMember}
            />
          ))}

          <FormProvider {...formMethods}>
            <form>
              <InputGroupContainer>
                <FormInput
                  name="memberName"
                  mt={1}
                  type="text"
                  flexGrow="1"
                  id="familyMemberInThisCooperative.0.memberId"
                  __placeholder={t['kynIndFirstName']}
                  bg="white"
                />
                <FormSelect
                  name="memberId"
                  __placeholder={t['kynIndEnterMemberID']}
                  options={memberSelectOption}
                  onChange={(e: { label: string; value: string }) =>
                    setSelectedFamilyMember(e.value)
                  }
                />
                <Button
                  id="findmemberButton"
                  variant="outline"
                  leftIcon={<Icon size="md" as={AiOutlineSearch} />}
                  onClick={() => appendFamilyMember()}
                >
                  {t['kynIndFindMember']}
                </Button>
              </InputGroupContainer>
            </form>
          </FormProvider>
        </GridItem>
      )}
    </FormSection>
  );
};

interface IKYMBasiccoopDetailsBasicProps {
  setKymCurrentSection: (section?: { section: string; subSection: string }) => void;
}

const KYMBasiccoopDetailsBasic = ({ setKymCurrentSection }: IKYMBasiccoopDetailsBasicProps) => {
  const { t } = useTranslation();

  const router = useRouter();

  const id = router?.query?.['id'];

  const methods = useForm();

  const { watch, reset } = methods;

  const { data: purposeData, isLoading: purposeLoading } = useGetIndividualKymOptionsQuery({
    searchTerm: FormFieldSearchTerm.Purpose,
  });

  const isMemberOfAnotherCooperative = watch('isMemberOfAnotherCooperative');

  const { data: editValues, refetch } = useGetIndividualKymEditDataQuery(
    {
      id: String(id),
    },
    { enabled: !!id }
  );

  useEffect(() => {
    if (editValues) {
      const editValueData = editValues?.members?.individual?.formState?.data?.formData;

      reset({
        ...editValueData?.membershipDetails,
        otherCoopName: editValueData?.membershipDetails?.otherCoopName?.local,
      });
    }
  }, [editValues]);

  const { mutate } = useSetMemberDataMutation({ onSuccess: () => refetch() });

  useEffect(() => {
    const subscription = watch(
      debounce((data) => {
        if (id) {
          mutate({ id: String(id), data });
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
        <FormSection templateColumns={2} id="kymAccIndMainPurposeofBecomingMember">
          <FormSelect
            name="purposeId"
            label={t['kynIndMainpurposeofbecomingmember']}
            __placeholder={t['kynIndSelectpurposeofbecomingmember']}
            isLoading={purposeLoading}
            options={getFieldOption(purposeData)}
          />
        </FormSection>

        <FormSection>
          <GridItem colSpan={3}>
            <FormSwitchTab
              label={t['kynIndMemberofAnothercooperative']}
              options={booleanList}
              name="isMemberOfAnotherCooperative"
            />
          </GridItem>
          {isMemberOfAnotherCooperative && (
            <>
              <FormInput
                type="text"
                name="otherCoopName"
                label={t['kymIndCooperativeName']}
                __placeholder={t['kymIndCooperativeName']}
              />

              <FormInput
                name="otherCoopBranchId"
                label={t['kymIndCooperativeServiceCenter']}
                __placeholder={t['kymIndCooperativeEnterServiceCenter']}
              />

              <FormInput
                type="text"
                name="otherCoopMemberId"
                label={t['kymIndCooperativeMemberID']}
                __placeholder={t['kymIndCooperativeMemberID']}
              />
            </>
          )}
        </FormSection>
        {/* {otherCooperative?.members?.individual?.options?.list?.data?.[0]?.options?.map(
                    (option, optionIndex) => {
                      register(
                        `otherMembershipDetails.options.${optionIndex}.id`,
                        {
                          value: option.id,
                        }
                      );

                      return (
                        <FormInputWithType
                          key={optionIndex}
                          formType={option?.fieldType}
                          name={`otherMembershipDetails.options.${optionIndex}.value`}
                          label={option?.name?.local}
                          __placeholder={option?.name?.local}
                        />
                      );
                    }
                  )} */}
      </form>
    </FormProvider>
  );
};

interface IKYMBasiccoopDetailsIntroducerProps {
  setKymCurrentSection: (section?: { section: string; subSection: string }) => void;
}

const KYMBasiccoopDetailsIntroducer = ({
  setKymCurrentSection,
}: IKYMBasiccoopDetailsIntroducerProps) => {
  const { t } = useTranslation();

  const router = useRouter();

  const id = router?.query?.['id'];

  const methods = useForm();

  const { watch, reset } = methods;

  const { data: editValues } = useGetIndividualKymEditDataQuery(
    {
      id: String(id),
    },
    { enabled: !!id }
  );

  useEffect(() => {
    if (editValues) {
      const editValueData = editValues?.members?.individual?.formState?.data?.formData;

      reset({
        ...editValueData?.introducers,
      });
    }
  }, [editValues]);

  const { mutate } = useSetMemberDataMutation();

  useEffect(() => {
    const subscription = watch(
      debounce((data) => {
        if (id) {
          mutate({ id: String(id), data });
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
        <FormSection header="kymIndIntroducers" templateColumns={2}>
          <FormMemberSelect name="firstIntroducerId" label={t['kymIndFirstIntroducer']} />

          <FormMemberSelect name="secondIntroducerId" label={t['kymIndSecondIntroducer']} />
        </FormSection>
      </form>
    </FormProvider>
  );
};

interface IKYMBasiccoopDetailsProps {
  setKymCurrentSection: (section?: { section: string; subSection: string }) => void;
}

export const KYMBasiccoopDetails = ({ setKymCurrentSection }: IKYMBasiccoopDetailsProps) => (
  <Box display="flex" flexDirection="column" id="kymAccIndIncomeSourceDetails">
    <KYMBasiccoopDetailsBasic setKymCurrentSection={setKymCurrentSection} />

    <KYMBasiccoopDetailsIntroducer setKymCurrentSection={setKymCurrentSection} />

    <KYMBasiccoopDetailsFamilyMember setKymCurrentSection={setKymCurrentSection} />
  </Box>
);

// export const FamilyMember = ({ control, index }: any) => {
//   const { t } = useTranslation();
//   return (
//     <Grid templateColumns="repeat(4, 1fr)" gap="s16">
//       <GridItem colSpan={1}>
//         <Text fontSize={'s3'} fontWeight="Medium" color="gray.700">
//           {t['kynIndFirstName']}
//         </Text>
//         <Controller
//           control={control}
//           name={`familyMemberInThisCooperative.${index}.memberId`}
//           render={({ field: { onChange } }) => (
//             <Input
//               type="text"
//               id={`familyMemberInThisCooperative.${index}.memberId`}
//               __placeholder={t['kynIndFirstName']}
//               onChange={onChange}
//               bg="white"
//             />
//           )}
//         />
//       </GridItem>
//       <GridItem colSpan={1}>
//         <Text fontSize={'s3'} fontWeight="Medium" color="gray.700">
//           {t['kynIndCitizenshipNo']}
//         </Text>
//         <Controller
//           control={control}
//           name={`familyMemberInThisCooperative.${index}.memberId`}
//           render={({ field: { onChange } }) => (
//             <Input
//               type="text"
//               __placeholder={t['kynIndEnterCitizenshipNo']}
//               id={`familyMemberInThisCooperative.${index}.memberId`}
//               onChange={onChange}
//               bg="white"
//             />
//           )}
//         />
//       </GridItem>
//       <GridItem colSpan={1}>
//         <Text fontSize={'s3'} fontWeight="Medium" color="gray.700">
//           {t['kynIndMemberID']}
//         </Text>
//         <Controller
//           control={control}
//           name={`familyMemberInThisCooperative.${index}.memberId`}
//           render={({ field: { onChange } }) => (
//             <Input
//               type="text"
//               __placeholder={t['kynIndEnterMemberID']}
//               id={`familyMemberInThisCooperative.${index}.memberId`}
//               onChange={onChange}
//               bg="white"
//             />
//           )}
//         />
//       </GridItem>
//       <Button
//         id="findmemberButton"
//         mt="23px"
//         variant="outline"
//         leftIcon={<Icon size="md" as={AiOutlineSearch} />}
//       >
//         {t['kynIndFindMember']}
//       </Button>
//     </Grid>
//   );
// };
