import { GridKeyValuePair } from '@hr/common';

import { Divider, Drawer, FileViewer, Grid, GridItem } from '@myra-ui';

import { useGetEmployeeSeparationDetailsQuery } from '@coop/cbs/data-access';

export const SeperationDetailsDrawer = (props: {
  isDrawerOpen: boolean;
  handleCloseDrawer: () => void;
  selectedEmployeeSeperationId: string;
}) => {
  const { isDrawerOpen, handleCloseDrawer, selectedEmployeeSeperationId } = props;

  const { data } = useGetEmployeeSeparationDetailsQuery(
    { employeeSeparationId: selectedEmployeeSeperationId },
    { enabled: !!selectedEmployeeSeperationId }
  );

  const seperationDetails =
    data?.hr?.employeelifecycle?.employeeSeparation?.getEmployeeSeparationDetails?.data;

  const seperationDetailsArray = [
    {
      itemKey: 'Employee',
      itemValue: seperationDetails?.employeeName,
      color: 'red.500',
    },
    {
      itemKey: 'Designation',
      itemValue: seperationDetails?.designation,
    },

    {
      itemKey: 'Joining Date',
      itemValue: seperationDetails?.joiningDate?.local,
    },

    {
      itemKey: 'Seperation Type',
      itemValue: seperationDetails?.separationType,
    },

    {
      itemKey: 'Resignation Letter Date',
      itemValue: seperationDetails?.resignationLetterDate?.local,
    },
  ];

  const documentUrl = seperationDetails?.documents?.[0]?.docData[0]?.url;

  return (
    <Drawer title="Transfer History" open={isDrawerOpen} onClose={handleCloseDrawer}>
      <Grid templateColumns="repeat(2,1fr)" gap="s16">
        {seperationDetailsArray?.map((item) => (
          <GridKeyValuePair
            itemKey={item?.itemKey}
            itemValue={item?.itemValue as string}
            colorOfValue={item?.color}
          />
        ))}
        {documentUrl && (
          <GridItem colSpan={2}>
            <FileViewer fileUrl={documentUrl} fileName={documentUrl} />
          </GridItem>
        )}
      </Grid>
      <Divider mt="s16" />
    </Drawer>
  );
};
