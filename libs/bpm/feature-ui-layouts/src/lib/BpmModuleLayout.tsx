import React from 'react';
import { BiCoinStack } from 'react-icons/bi';
import { BsBagCheck } from 'react-icons/bs';
import { FiPieChart } from 'react-icons/fi';
import { IoAlbums } from 'react-icons/io5';

import { Error, MainLayoutContainer, TabMenu, TopLevelHeader } from '@myra-ui';

import { ROUTES } from '@coop/cbs/utils';
import { checkModuleAccess } from '@coop/shared/utils';

export interface BPMLAyoutProps {
  children: React.ReactNode;
}

export const BPMLayout = (props: BPMLAyoutProps) => {
  const { children } = props;

  const moduleAccess = checkModuleAccess('BPM');

  return (
    <MainLayoutContainer>
      <TopLevelHeader />
      {moduleAccess ? (
        <>
          <TabMenu
            module="BPM"
            tabs={[
              {
                title: 'Tasks',
                icon: FiPieChart,
                link: ROUTES.BPM_TASKS_LISTS,
                match: ['tasks'],
                aclKey: 'CBS_MEMBERS_MEMBER',
                navMenu: 'TASKS',
              },
              {
                title: 'Programs',
                icon: BsBagCheck,
                link: ROUTES.BPM_PROGRAMS_EVENTS_LIST,
                match: ['programs'],
                aclKey: 'CBS_MEMBERS_MEMBER',
                navMenu: 'PROGRAMS',
              },
              {
                title: 'Operations',
                icon: IoAlbums,
                link: ROUTES.BPM_OPERATIONS_MINOR_ADDITION_LIST,
                // link: ROUTES.HR_RECRUITMENT_STAFF_PLANNING_LIST,
                match: ['operations'],
                aclKey: 'CBS_MEMBERS_MEMBER',
                navMenu: 'OPERATIONS',
              },
              {
                title: 'Requests',
                icon: BiCoinStack,
                link: ROUTES.HR_PAYROLL_ENTRY_LIST,
                match: ['requests'],
                aclKey: 'CBS_MEMBERS_MEMBER',
                navMenu: 'REQUESTS',
              },

              // {
              //   title: 'Policy',
              //   icon: TbScale,

              //   link: '/hr/policy/list',
              //   match: ['policy'],
              //   aclKey: 'CBS_MEMBERS_MEMBER',
              //   navMenu: 'POLICY',
              // },

              //   {
              //     title: 'reports',
              //     icon: FiFileText,
              //     link: ROUTES.HR_REPORTS,
              //     match: ['reports'],
              //     aclKey: 'CBS_MEMBERS_MEMBER',
              //     navMenu: 'REPORTS',
              //   },
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

export default BPMLayout;
