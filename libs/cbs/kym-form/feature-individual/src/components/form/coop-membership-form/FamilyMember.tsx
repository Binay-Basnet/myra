import { Box, Button, MemberCard } from '@myra-ui';

import {
  FormFieldSearchTerm,
  useGetIndividualKymOptionsQuery,
  useGetIndividualMemberDetails,
} from '@coop/cbs/data-access';
import { InputGroupContainer } from '@coop/cbs/settings/ui-containers';
import { FormSelect } from '@coop/shared/form';
import { useTranslation } from '@coop/shared/utils';

import { getFieldOption } from '../../../utils/getFieldOption';

interface IFamilyMemberProps {
  index: number;
  familyMemberId: string | undefined | null;
  removeFamilyMember: () => void;
}

export const FamilyMember = ({ familyMemberId, removeFamilyMember, index }: IFamilyMemberProps) => {
  const { t } = useTranslation();

  const { memberDetailData, memberCitizenshipUrl, memberSignatureUrl } =
    useGetIndividualMemberDetails({
      memberId: familyMemberId as string,
    });

  const { data: familyRelationShipData, isLoading: familyRelationshipLoading } =
    useGetIndividualKymOptionsQuery({
      searchTerm: FormFieldSearchTerm.Relationship,
    });

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
          <InputGroupContainer>
            <FormSelect
              name={`familyCoopMembers.${index}.relationshipId`}
              id="familyMemberInThisCooperative"
              label={t['kymIndRelationship']}
              isLoading={familyRelationshipLoading}
              options={getFieldOption(familyRelationShipData)}
            />
          </InputGroupContainer>
        </Box>

        <Box p="s16" display="flex" justifyContent="flex-end">
          <Button variant="ghost" shade="danger" onClick={removeFamilyMember}>
            Remove
          </Button>
        </Box>
      </Box>
    </Box>
  );
};
