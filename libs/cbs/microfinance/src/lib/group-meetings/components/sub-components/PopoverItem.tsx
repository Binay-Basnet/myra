import { useQueryClient } from '@tanstack/react-query';

import { asyncToast, Box, Text } from '@myra-ui';

import {
  MfMeetingStatus,
  StatusOfTask,
  useChangeMeetingStatusMutation,
} from '@coop/cbs/data-access';

const PopoverItem = (props: {
  itemText: string;
  itemColor: string;
  id: string;
  onClose: () => void;
}) => {
  const queryClient = useQueryClient();
  const { itemText, itemColor, id, onClose } = props;

  const { mutateAsync } = useChangeMeetingStatusMutation();

  const status: Record<typeof itemText, StatusOfTask> = {
    Completed: MfMeetingStatus?.Completed,
    Pending: MfMeetingStatus?.Pending,
  };

  const onItemClick = () => {
    asyncToast({
      id: 'change-mf-status',
      msgs: {
        success: `status changed to ${itemText}`,
        loading: 'changing status',
      },
      onSuccess: () => {
        queryClient.invalidateQueries(['mfMeetingsDetails']);
        onClose();
      },
      promise: mutateAsync({
        meetingID: id,
        input: status[itemText] as MfMeetingStatus,
      }),
    });
  };

  return (
    <Box
      display="flex"
      alignItems="center"
      gap="s8"
      px="s16"
      py="s10"
      width="100%"
      _hover={{ bg: 'gray.100' }}
      cursor="pointer"
      onClick={onItemClick}
    >
      <Box w="s10" h="s10" rounded="100%" bg={itemColor} />
      <Text variant="bodyRegular" color="neutralColorLight.Gray-80">
        {itemText}
      </Text>
    </Box>
  );
};

export default PopoverItem;
