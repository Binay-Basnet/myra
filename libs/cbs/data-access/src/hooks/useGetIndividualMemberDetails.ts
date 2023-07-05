import { useMemo } from 'react';

import {
  KymIndFormData,
  Member,
  // useGetIndividualKymIdentificationListQuery,
  // useGetKymDocumentsListQuery,
  // useGetIndividualKymIdentificationListQuery,
  // useGetKymDocumentsListQuery,
  useGetMemberIndividualDataQuery,
} from '@coop/cbs/data-access';
import { formatAddress } from '@coop/cbs/utils';

interface IUseGetIndividualMemberDetailsProps {
  memberId: string;
}

type MemberDetailData = Omit<Member, 'profile'> & {
  profile: { data: KymIndFormData };
};

export const useGetIndividualMemberDetails = ({
  memberId,
}: IUseGetIndividualMemberDetailsProps) => {
  const { data: memberDetailQueryData, isFetching: memberDetailsLoading } =
    useGetMemberIndividualDataQuery(
      { id: memberId },
      { enabled: !!memberId && memberId !== 'undefined' }
    );

  const memberDetailData = useMemo(() => {
    if (!memberDetailQueryData?.members?.details?.data || !memberId) {
      return undefined;
    }

    const memberData = memberDetailQueryData?.members?.details?.data as MemberDetailData;

    return {
      id: memberData.id,
      code: memberData.code,
      type: memberData?.type,
      name: memberData.name?.local,
      contact: memberData.contact,
      email: memberData.profile?.data?.email,
      gender: memberData.profile?.data?.gender?.local,
      address: formatAddress(memberData.address),
      age: memberData.profile?.data?.age,
      maritalStatus: memberData.profile?.data?.maritalStatusId,
      dateJoined: memberData.dateJoined,
      citizenship: memberData?.citizenship,
      profilePicUrl: memberData?.profilePicUrl,
      memberSignatureUrl: memberData?.signaturePicUrl,
      memberCitizenshipUrl: memberData?.citizenshipPicUrl,
    };
  }, [memberDetailQueryData, memberId]);

  const memberSignatureUrl = memberDetailData?.memberSignatureUrl;
  const memberCitizenshipUrl = memberDetailData?.memberCitizenshipUrl;

  const memberLoading = memberDetailsLoading;

  return { memberDetailData, memberSignatureUrl, memberCitizenshipUrl, memberLoading };
};
