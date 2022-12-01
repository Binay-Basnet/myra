import { useEffect } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { Box, Button, MemberCard } from '@myra-ui';
import debounce from 'lodash/debounce';

import {
  FormFieldSearchTerm,
  useGetIndividualKymFamilyMembersListQuery,
  useGetIndividualKymOptionsQuery,
  useGetIndividualMemberDetails,
  useSetMemberFamilyDetailsMutation,
} from '@coop/cbs/data-access';
import { InputGroupContainer } from '@coop/cbs/settings/ui-containers';
import { FormSelect } from '@coop/shared/form';
import { useTranslation } from '@coop/shared/utils';

import { getFieldOption } from '../../../utils/getFieldOption';

interface IFamilyMemberProps {
  mutationId: string;
  familyMemberId: string | undefined | null;
  memberId: string;
  removeFamilyMember: (id: string) => void;
}

export const FamilyMember = ({
  mutationId,
  familyMemberId,
  memberId,
  removeFamilyMember,
}: IFamilyMemberProps) => {
  const { t } = useTranslation();

  const methods = useForm();

  const { watch, reset } = methods;

  const { memberDetailData, memberCitizenshipUrl, memberSignatureUrl } =
    useGetIndividualMemberDetails({
      memberId: familyMemberId as string,
    });

  const { data: familyRelationShipData, isLoading: familyRelationshipLoading } =
    useGetIndividualKymOptionsQuery({
      searchTerm: FormFieldSearchTerm.Relationship,
    });

  const { data: familyMemberListQueryData } = useGetIndividualKymFamilyMembersListQuery(
    {
      id: String(memberId),
    },
    { enabled: !!memberId }
  );

  useEffect(() => {
    const familyMemberData =
      familyMemberListQueryData?.members?.individual?.listFamilyMember?.data?.find(
        (member) => member?.id === mutationId
      );

    if (familyMemberData) {
      reset({ relationshipId: familyMemberData?.relationshipId });
    }
  }, [familyMemberListQueryData, mutationId]);

  const { mutate } = useSetMemberFamilyDetailsMutation();

  useEffect(() => {
    const subscription = watch(
      debounce((data) => {
        mutate({
          id: memberId,
          data: {
            id: mutationId,
            relationshipId: data.relationshipId,
            familyMemberId,
          },
        });
      }, 800)
    );

    return () => subscription.unsubscribe();
  }, [watch]);

  return (
    <Box display="flex" flexDirection="column" gap="s4">
      <Box
        borderRadius="br2"
        border="1px solid"
        borderColor="border.layout"
        display="flex"
        flexDirection="column"
      >
        <Box borderBottom="1px solid" borderColor="border.layout">
          <MemberCard
            isInline
            memberDetails={{
              name: memberDetailData?.name,
              avatar: memberDetailData?.profilePicUrl ?? '',
              memberID: memberDetailData?.id,
              gender: memberDetailData?.gender,
              age: memberDetailData?.age,
              maritalStatus: memberDetailData?.maritalStatus,
              dateJoined: memberDetailData?.dateJoined,
              phoneNo: memberDetailData?.contact,
              email: memberDetailData?.email,
              address: memberDetailData?.address,
            }}
            signaturePath={memberSignatureUrl}
            citizenshipPath={memberCitizenshipUrl}
          />
        </Box>

        <Box p="s16" borderBottom="1px solid" borderColor="border.layout">
          <FormProvider {...methods}>
            <form>
              <InputGroupContainer>
                <FormSelect
                  name="relationshipId"
                  id="familyMemberInThisCooperative"
                  label={t['kymIndRelationship']}
                  isLoading={familyRelationshipLoading}
                  options={getFieldOption(familyRelationShipData)}
                />
              </InputGroupContainer>
            </form>
          </FormProvider>
        </Box>

        <Box p="s16" display="flex" justifyContent="flex-end">
          <Button variant="ghost" shade="danger" onClick={() => removeFamilyMember(mutationId)}>
            Remove
          </Button>
        </Box>
      </Box>
    </Box>
  );
};
