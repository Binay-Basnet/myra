import React from 'react';
import { AiOutlineDatabase, AiOutlineShoppingCart } from 'react-icons/ai';
import { BsListTask } from 'react-icons/bs';

import { Error, MainLayoutContainer, TabMenu, TopLevelHeader } from '@myra-ui';

import { ROUTES } from '@coop/cbs/utils';
import { checkModuleAccess } from '@coop/shared/utils';

export interface FamModuleLayoutProps {
  children: React.ReactNode;
}

export const FamLayout = (props: FamModuleLayoutProps) => {
  const { children } = props;

  const moduleAccess = checkModuleAccess('FAM');

  return (
    <MainLayoutContainer>
      <TopLevelHeader />
      {moduleAccess ? (
        <>
          <TabMenu
            module="FAM"
            tabs={[
              {
                title: 'Assets',
                icon: AiOutlineDatabase,
                link: ROUTES.FAM_ASSETS_LIST,
                match: ['assets'],
                aclKey: 'CBS_MEMBERS_MEMBER',
                navMenu: 'ASSETS',
              },
              {
                title: 'Operations',
                icon: BsListTask,
                link: ROUTES.FAM_ASSETS_TRANSFER_LIST,
                match: ['operations'],
                aclKey: 'CBS_MEMBERS_MEMBER',
                navMenu: 'OPERATIONS',
              },
              {
                title: 'Purchase',
                icon: AiOutlineShoppingCart,
                link: ROUTES.FAM_PURCHASE_ENTRY_LIST,
                match: ['purchase'],
                aclKey: 'CBS_MEMBERS_MEMBER',
                navMenu: 'PURCHASE',
              },
            ]}
            routeIndex={2}
          />
          {children}
        </>
      ) : (
        <Error
          errorCode={401}
          // errorTitle="Forbidden Resource"
          // errorMessage="You do not have permissions to access this resource."
          // errorMessageSubTitle=" If you need assistance, please contact branch admin or website administrator."
          isCentered
        />
      )}
    </MainLayoutContainer>
  );
};

export default FamLayout;
