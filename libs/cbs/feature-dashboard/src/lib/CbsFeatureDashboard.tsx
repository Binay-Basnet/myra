import { Box } from '@myra-ui';

import {
  DashboardCharts,
  DashboardTable,
  MyBranch,
  MyCoop,
  MyDay,
  QuickLinksComponent,
} from '../component';

/* eslint-disable-next-line */
export interface CbsFeatureDashboardProps {}

export const CbsFeatureDashboard = () => (
  <Box
    // minWidth="container.sm"
    maxW="container.xl"
    width="100%"
    display="flex"
    flexDirection="column"
    gap="s32"
    p="0"
    pb="55px"
  >
    <QuickLinksComponent />
    <MyDay />
    <DashboardTable />
    <MyBranch />
    <MyCoop />
    <DashboardCharts />
  </Box>
);

export default CbsFeatureDashboard;
