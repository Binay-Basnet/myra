import React from 'react';

import { AppSidebar, MenuContainer, PageContainer, Scrollable } from '@myra-ui/templates';

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
    label: 'New Individual',
    aclKey: 'CBS_MEMBERS_MEMBER',
    route: ROUTES.CBS_MEMBER_IND_ADD,
    idType: Id_Type.Kymindividual,
  },
  institution: {
    label: 'New Institution',
    aclKey: 'CBS_MEMBERS_MEMBER',
    route: ROUTES.CBS_MEMBER_INS_ADD,
    idType: Id_Type.Kyminstitutions,
  },
  cooperative: {
    label: 'New Cooperative',
    aclKey: 'CBS_MEMBERS_MEMBER',
    route: ROUTES.CBS_MEMBER_COOP_ADD,
    idType: Id_Type.Kymcooperative,
  },
  cooperativeUnion: {
    label: 'New Cooperative Union',
    aclKey: 'CBS_MEMBERS_MEMBER',
    route: ROUTES.CBS_MEMBER_COOP_UNION_ADD,
    idType: Id_Type.Kymcooperativeunion,
  },
};
export const MemberPagesLayout = ({ children }: IMemberPagesLayoutProps) => {
  const { data: memberTypeData } = useGetGeneralMemberSettingsDataQuery();
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

  return (
    <Can I="SHOW_IN_MENU" a="CBS_MEMBERS_MEMBER" showError isErrorCentered>
      <MenuContainer>
        <AppSidebar forms={memberForms} menu="MEMBERS" />
        <PageContainer>
          <Scrollable>{children}</Scrollable>
        </PageContainer>
      </MenuContainer>
    </Can>
  );
};
