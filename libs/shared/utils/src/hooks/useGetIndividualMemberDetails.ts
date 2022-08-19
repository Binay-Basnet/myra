import { useMemo } from 'react';

import {
  KymIndFormState,
  KymIndIdentification,
  Member,
  useGetIndividualKymIdentificationListQuery,
  useGetKymDocumentsListQuery,
  useGetMemberIndividualDataQuery,
} from '@coop/cbs/data-access';
import { formatAddress } from '@coop/cbs/utils';

interface IUseGetIndividualMemberDetailsProps {
  memberId: string;
}

type MemberDetailData = Omit<Member, 'profile'> & {
  profile: { data: KymIndFormState };
};

export const useGetIndividualMemberDetails = ({
  memberId,
}: IUseGetIndividualMemberDetailsProps) => {
  const { data: memberDetailQueryData } = useGetMemberIndividualDataQuery(
    { id: memberId },
    { enabled: !!memberId }
  );

  const { data: identificationListData } =
    useGetIndividualKymIdentificationListQuery(
      {
        id: String(memberId),
      },
      { enabled: !!memberId }
    );

  const memberDetailData = useMemo(() => {
    if (!memberDetailQueryData?.members?.details?.data) {
      return;
    }

    const memberData = memberDetailQueryData?.members?.details
      ?.data as MemberDetailData;

    const citizenshipData = identificationListData
      ? identificationListData?.members?.individual?.listIdentification?.data?.find(
          (identification: KymIndIdentification | null) =>
            identification?.idType === 'citizenship'
        )
      : null;

    return {
      id: memberData.id,
      name: memberData.name?.local,
      contact: memberData.contact,
      email: memberData.profile?.data?.formData?.contactDetails?.email,
      gender:
        memberData.profile?.data?.formData?.basicInformation?.gender?.local,
      address: formatAddress(memberData.address),
      age: memberData.profile?.data?.formData?.basicInformation?.age,
      maritalStatus: memberData.profile?.data?.formData?.maritalStatus?.local,
      dateJoined: memberData.dateJoined,
      citizenship: citizenshipData,
    };
  }, [memberDetailQueryData, identificationListData]);

  const { data: documentListQueryData } = useGetKymDocumentsListQuery(
    {
      memberId: memberId,
    },
    { enabled: !!memberId }
  );

  const memberSignatureUrl = useMemo(() => {
    if (!documentListQueryData) {
      return;
    }

    const kymDocumentsList =
      documentListQueryData?.document?.listKYMDocuments?.data;

    return kymDocumentsList?.find((doc) => doc?.fieldId === 'signaturePhoto')
      ?.docData[0]?.url;
  }, [documentListQueryData]);

  const memberCitizenshipUrl = useMemo(() => {
    if (!documentListQueryData) {
      return;
    }

    const kymDocumentsList =
      documentListQueryData?.document?.listKYMDocuments?.data;

    return kymDocumentsList?.find((doc) => doc?.fieldId === 'citizenshipPhoto')
      ?.docData[0]?.url;
  }, [documentListQueryData]);

  return { memberDetailData, memberSignatureUrl, memberCitizenshipUrl };
};
