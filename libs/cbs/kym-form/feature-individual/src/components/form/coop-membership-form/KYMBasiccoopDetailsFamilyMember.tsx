import { useEffect, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useRouter } from 'next/router';
import { isEqual } from 'lodash';
import debounce from 'lodash/debounce';

import { Alert, Box, FormSection, GridItem, Text } from '@myra-ui';

import {
  Id_Type,
  useDeleteMemberFamilyDetailsMutation,
  useGetIndividualKymEditDataQuery,
  useGetIndividualKymFamilyMembersInCoopListQuery,
  useGetNewIdMutation,
  useSetMemberDataMutation,
  useSetMemberFamilyDetailsMutation,
} from '@coop/cbs/data-access';
import { InputGroupContainer } from '@coop/cbs/kym-form/ui-containers';
import { FormMemberSelect, FormSwitchTab } from '@coop/shared/form';
import { getKymSection, isDeepEmpty, useTranslation } from '@coop/shared/utils';

import { FamilyMember } from './FamilyMember';

interface IKYMBasiccoopDetailsFamilyMemberProps {
  setKymCurrentSection: (section?: { section: string; subSection: string }) => void;
}

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

export const KYMBasiccoopDetailsFamilyMember = ({
  setKymCurrentSection,
}: IKYMBasiccoopDetailsFamilyMemberProps) => {
  // const [showFamilyDetailCard, setShowFamilyDetailCard] = useState(false);

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

  const [newIdAdded, setNewIdAdded] = useState('');

  const { watch: formWatch, setValue: formSetValue } = formMethods;

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

  const [familyMemberMutationIds, setFamilyMemberMutationIds] = useState<string[]>([]);

  const [familyMemberIds, setFamilyMemberIds] = useState<string[]>([]);

  const {
    data: familyMemberListQueryData,
    refetch,
    isFetching,
  } = useGetIndividualKymFamilyMembersInCoopListQuery(
    {
      id: String(id),
    },
    { enabled: !!id }
  );

  const memberId = formWatch('memberId');

  useEffect(() => {
    if (memberId && !familyMemberIds.includes(memberId)) {
      // setFamilyMemberIds([memberId, ...familyMemberIds]);
      //   setFamilyMemberIds([...familyMemberIds, memberId]);
      newIDMutate({ idType: Id_Type.Kymindividualfamilymembers });
    }
  }, [memberId]);

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
  }, [familyMemberListQueryData, isFetching]);

  const { mutate: setFamilyDetails } = useSetMemberFamilyDetailsMutation({
    onSuccess: () => refetch(),
  });

  const { mutate: newIDMutate } = useGetNewIdMutation({
    onSuccess: (res) => {
      // setFamilyMemberMutationIds([res.newId, ...familyMemberMutationIds]);
      //   setFamilyMemberMutationIds([...familyMemberMutationIds, res.newId]);

      setNewIdAdded(res.newId);

      // formSetValue('memberId', '');
    },
  });

  useEffect(() => {
    if (newIdAdded && id && memberId) {
      setFamilyDetails(
        {
          id: id as string,
          data: {
            id: newIdAdded,
            familyMemberId: memberId,
          },
        },
        {
          onSuccess: () => {
            setFamilyMemberMutationIds([newIdAdded, ...familyMemberMutationIds]);
            setFamilyMemberIds([memberId, ...familyMemberIds]);

            setNewIdAdded('');
            formSetValue('memberId', '');
          },
        }
      );
    }
  }, [newIdAdded, memberId]);

  const { mutate: deleteMutate } = useDeleteMemberFamilyDetailsMutation({
    onSuccess: (res) => {
      if (res.members?.individual?.familyMember?.delete?.recordId) {
        refetch();
      }
    },
  });

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
            <Box display="flex" flexDirection="column" gap="s16">
              <FormSwitchTab
                label={t['kynIndFamilyMemberinthisinstitution']}
                options={booleanList}
                name="isFamilyAMember"
                id="familyMemberInThisInstitution"
              />
              {isFamilyAMember && (
                <Alert status="info" title="Info" hideCloseIcon>
                  <Box display="flex" gap="s4" flexDirection="column">
                    <ul>
                      <li>
                        <Text fontSize="r1" fontWeight="600">
                          Find Family Members With Name
                        </Text>
                      </li>
                      <li>
                        <Text fontSize="r1" fontWeight="SemiBold" color="neutralColorLight.Gray-80">
                          Multiple Members Can Be Selected With FInd Member Search{' '}
                        </Text>
                      </li>
                    </ul>
                  </Box>
                </Alert>
              )}
            </Box>
          </form>
        </FormProvider>
      </GridItem>

      {isFamilyAMember && (
        <>
          <GridItem colSpan={3}>
            <FormProvider {...formMethods}>
              <form>
                <InputGroupContainer alignItems="center">
                  <GridItem colSpan={2}>
                    <FormMemberSelect name="memberId" label="Member Search" forceEnableAll />
                  </GridItem>
                </InputGroupContainer>
              </form>
            </FormProvider>
          </GridItem>

          {familyMemberMutationIds.map((mutationId, index) => (
            <GridItem colSpan={3} key={mutationId}>
              <FamilyMember
                mutationId={mutationId}
                familyMemberId={familyMemberIds[index]}
                memberId={id as string}
                removeFamilyMember={removeFamilyMember}
              />
            </GridItem>
          ))}
        </>
      )}
    </FormSection>
  );
};
