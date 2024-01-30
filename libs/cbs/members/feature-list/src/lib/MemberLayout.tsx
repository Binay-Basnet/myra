import React from 'react';

import { AppSidebar, MenuContainer, PageContainer } from '@myra-ui/templates';

import { Id_Type, useGetGeneralMemberSettingsDataQuery } from '@coop/cbs/data-access';
import { AclKey, Can, ROUTES, RouteValue } from '@coop/cbs/utils';

interface IMemberPagesLayoutProps {
  children: React.ReactNode;
}

export type Page = {
  label: string;
  aclKey: AclKey;
  route: RouteValue;
  idType?: Id_Type;
};

export const forms: Record<string, Page> = {
  individual: {
    label: 'newIndividual',
    aclKey: 'CBS_MEMBERS_MEMBER',
    route: ROUTES.CBS_MEMBER_IND_ADD,
    idType: Id_Type.Kymindividual,
  },
  institution: {
    label: 'newInstitution',
    aclKey: 'CBS_MEMBERS_MEMBER',
    route: ROUTES.CBS_MEMBER_INS_ADD,
    idType: Id_Type.Kyminstitutions,
  },
  cooperative: {
    label: 'newCooperative',
    aclKey: 'CBS_MEMBERS_MEMBER',
    route: ROUTES.CBS_MEMBER_COOP_ADD,
    idType: Id_Type.Kymcooperative,
  },
  cooperativeUnion: {
    label: 'newCooperativeUnion',
    aclKey: 'CBS_MEMBERS_MEMBER',
    route: ROUTES.CBS_MEMBER_COOP_UNION_ADD,
    idType: Id_Type.Kymcooperativeunion,
  },
};

export const MemberPagesLayout = ({ children }: IMemberPagesLayoutProps) => {
  const { data: memberTypeData } = useGetGeneralMemberSettingsDataQuery();
  const isMemberCodeSetup =
    memberTypeData?.settings?.general?.KYM?.general?.generalMember?.record?.isCodeSetup;

  const memberTypes =
    memberTypeData?.settings?.general?.KYM?.general?.generalMember?.record?.memberType;

  const memberForms = Object.keys(memberTypes || {})
    ?.map((memberType) => {
      if (memberType && memberTypes?.[memberType as keyof typeof memberTypes]) {
        return forms[memberType];
      }
      return false;
    })
    ?.filter(Boolean) as Page[];

  const alteredMemberForms = isMemberCodeSetup
    ? memberForms
    : memberForms?.map((item) => ({ ...item, route: ROUTES.CBS_NO_MEMBER_CODE }));

  return (
    <Can I="SHOW_IN_MENU" a="CBS_MEMBERS_MEMBER" showError isErrorCentered>
      <MenuContainer>
        <AppSidebar forms={alteredMemberForms} menu="MEMBERS" />
        <PageContainer>{children}</PageContainer>
      </MenuContainer>
    </Can>
  );
};
