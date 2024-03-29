import React from 'react';
import { BiBookBookmark, BiUserPin } from 'react-icons/bi';
import { FiBriefcase, FiDollarSign, FiFileText, FiUserCheck } from 'react-icons/fi';

import { Error, MainLayoutContainer, TabMenu, TopLevelHeader } from '@myra-ui';

import { ROUTES } from '@coop/cbs/utils';
import { checkModuleAccess } from '@coop/shared/utils';

export interface HRModuleLayoutProps {
  children: React.ReactNode;
}

export const HRLayout = (props: HRModuleLayoutProps) => {
  const { children } = props;

  const moduleAccess = checkModuleAccess('HCM');

  return (
    <MainLayoutContainer>
      <TopLevelHeader />
      {moduleAccess ? (
        <>
          <TabMenu
            module="HRMODULE"
            tabs={[
              {
                title: 'Employee',
                icon: BiUserPin,
                link: ROUTES.HRMODULE_EMPLOYEES_LIST,
                match: ['employee'],
                aclKey: 'CBS_MEMBERS_MEMBER',
                navMenu: 'EMPLOYEE',
              },
              {
                title: 'Employee Lifecycle',
                icon: FiUserCheck,
                link: ROUTES.HR_LIFECYCLE_EMPLOYEE_ONBOAORDING_LIST,
                match: ['lifecycle'],
                aclKey: 'CBS_MEMBERS_MEMBER',
                navMenu: 'EMPLOYEE_LIFECYCLE',
              },
              {
                title: 'Recruitment',
                icon: FiBriefcase,
                link: ROUTES.HR_LIFECYCLE_EMPLOYEE_ONBOAORDING_LIST,
                // link: ROUTES.HR_RECRUITMENT_STAFF_PLANNING_LIST,
                match: ['recruitment'],
                aclKey: 'CBS_MEMBERS_MEMBER',
                navMenu: 'RECRUITMENT',
              },
              {
                title: 'Payroll',
                icon: FiDollarSign,
                link: ROUTES.HR_PAYROLL_ENTRY_LIST,
                match: ['payroll'],
                aclKey: 'CBS_MEMBERS_MEMBER',
                navMenu: 'PAYROLL',
              },
              {
                title: 'Training',
                icon: BiBookBookmark,
                link: ROUTES.HR_TRAINING_COURSES_LIST,
                match: ['training'],
                aclKey: 'CBS_MEMBERS_MEMBER',
                navMenu: 'TRAINING',
              },

              // {
              //   title: 'Policy',
              //   icon: TbScale,

              //   link: '/hr/policy/list',
              //   match: ['policy'],
              //   aclKey: 'CBS_MEMBERS_MEMBER',
              //   navMenu: 'POLICY',
              // },

              {
                title: 'reports',
                icon: FiFileText,
                link: ROUTES.HR_REPORTS,
                match: ['reports'],
                aclKey: 'CBS_MEMBERS_MEMBER',
                navMenu: 'REPORTS',
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

export default HRLayout;
