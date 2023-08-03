import React from 'react';
import { BiCube } from 'react-icons/bi';
import { FiUserCheck } from 'react-icons/fi';

import { Error, MainLayoutContainer, TabMenu, TopLevelHeader } from '@myra-ui';

import { ROUTES } from '@coop/cbs/utils';
import { checkModuleAccess } from '@coop/shared/utils';

export interface HRModuleLayoutProps {
  children: React.ReactNode;
}

export const MicrofinanceLayout = (props: HRModuleLayoutProps) => {
  const { children } = props;

  const moduleAccess = checkModuleAccess('MICROFINANCE');

  return (
    <MainLayoutContainer>
      <TopLevelHeader />
      {moduleAccess ? (
        <>
          <TabMenu
            module="MICROFINANCE"
            tabs={[
              {
                title: 'Groups',
                icon: BiCube,
                link: ROUTES.MICRO_FINANCE_GROUPS_LIST,
                match: ['groups'],
                aclKey: 'CBS_MEMBERS_MEMBER',
                navMenu: 'GROUPS',
              },
              {
                title: 'Savings',
                icon: FiUserCheck,
                link: ROUTES.MICRO_FINANCE_SAVING_ACCOUNTS_LIST,
                match: ['savings'],
                aclKey: 'CBS_MEMBERS_MEMBER',
                navMenu: 'SAVINGS',
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

export default MicrofinanceLayout;
