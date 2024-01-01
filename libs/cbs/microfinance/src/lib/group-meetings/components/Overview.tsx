import { IoIosArrowDown } from 'react-icons/io';
import { useRouter } from 'next/router';
import { PopoverContent, Portal } from '@chakra-ui/react';
import { ApprovalStatusItem } from 'libs/cbs/requests/feature-lists/src/components/ApprovalStatusItem';

import { Alert, Box, DetailPageQuickLinks, Icon, Popover, PopoverTrigger } from '@myra-ui';

import { MfDecisions, MfMeetingOverview, MfMeetingStatus } from '@coop/cbs/data-access';
import { readableTimeParser, ROUTES } from '@coop/cbs/utils';
import {
  DetailsKeyValueCard,
  DetailsKeyValueCards,
  DetailsPageHeaderBox,
} from '@coop/shared/components';

import PopoverItem from './sub-components/PopoverItem';

const popOverItemData = [
  {
    itemColor: 'yellow.500',
    itemText: 'Pending',
  },
  {
    itemColor: 'green.300',
    itemText: 'Completed',
  },
];

export const Overview = (props: { data: MfMeetingOverview; decision: MfDecisions }) => {
  const { data, decision } = props;
  const router = useRouter();

  const links = [
    { title: 'Add MF Group Meetings', link: ROUTES?.CBS_MICRO_FINANCE_GROUP_MEETINGS_ADD },
    {
      title: 'Add Attendance',
      link: `${ROUTES?.CBS_MICRO_FINANCE_GROUP_METTINGS_DETAILS}?id=${router?.query?.['id']}&tab=attendance`,
    },
  ];

  return (
    <>
      <DetailsPageHeaderBox title="Overview">
        <Box display="flex" alignItems="center" gap="s8">
          <ApprovalStatusItem status={data?.status as MfMeetingStatus} />

          <Popover isLazy placement="bottom-start" colorScheme="primary">
            {({ onClose }) => (
              <>
                <PopoverTrigger>
                  <Box as="button" display="flex" alignItems="center">
                    <Icon size="sm" as={IoIosArrowDown} />
                  </Box>
                </PopoverTrigger>
                <Portal>
                  <PopoverContent w="100%" boxShadow="E2" border="none" borderRadius="br2">
                    {popOverItemData?.map((item) => (
                      <PopoverItem
                        itemColor={item?.itemColor}
                        itemText={item?.itemText}
                        id={router?.query?.['id'] as string}
                        onClose={onClose}
                      />
                    ))}
                  </PopoverContent>
                </Portal>
              </>
            )}
          </Popover>
        </Box>
      </DetailsPageHeaderBox>
      <Box px="s24">
        {' '}
        <DetailPageQuickLinks links={links} />
      </Box>
      {!decision?.note && (
        <Box px="s24">
          <Alert
            status="warning"
            title="Alert"
            subtitle="The decision for this meeting has not been added yet."
            bottomButtonlabel="Add Decision"
            bottomButtonHandler={() =>
              router.push(
                `${ROUTES?.CBS_MICRO_FINANCE_GROUP_METTINGS_DETAILS}?id=${router?.query?.['id']}&tab=decision`
              )
            }
          />
        </Box>
      )}

      <DetailsKeyValueCards
        keyValueList={[
          { label: 'Member Invited', value: data?.membersInvited },
          { label: 'No of Attendees', value: data?.presentMembers },
        ]}
      />
      <DetailsKeyValueCard
        title="General Information"
        keyValueList={[
          { label: 'MF Group', value: data?.groupName },
          { label: 'Agenda', value: data?.agenda },
          { label: 'Date', value: data?.date?.local },
          { label: 'Start Time', value: readableTimeParser(data?.startTime) },
          { label: 'End time', value: readableTimeParser(data?.endTime) },
        ]}
      />
    </>
  );
};

export default Overview;
