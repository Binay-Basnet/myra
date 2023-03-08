import {
  GeneralInformationUsers,
  RolesTable,
  ServiceCenterTable,
  TabHeader,
  UserStatistics,
} from '../components';

export const Overview = () => (
  <>
    <TabHeader heading="Overview" />
    <UserStatistics />
    <GeneralInformationUsers />
    <RolesTable />
    <ServiceCenterTable />
  </>
);
