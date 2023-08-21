import { useQueryClient } from '@tanstack/react-query';

import { asyncToast, Box, Text } from '@myra-ui';

import { StatusOfTask, useChangeStatusMutation } from '@coop/cbs/data-access';

const PopoverItem = (props: {
  itemText: string;
  itemColor: string;
  taskId: string;
  onClose: () => void;
}) => {
  const queryClient = useQueryClient();
  const { itemText, itemColor, taskId, onClose } = props;

  const { mutateAsync } = useChangeStatusMutation();

  const status: Record<typeof itemText, StatusOfTask> = {
    Assigned: StatusOfTask?.Assigned,
    Completed: StatusOfTask?.Completed,
    Pending: StatusOfTask?.Pending,
    Started: StatusOfTask?.Started,
  };

  const onItemClick = () => {
    asyncToast({
      id: 'edit-task',
      msgs: {
        success: `status changed to ${itemText}`,
        loading: 'changing status',
      },
      onSuccess: () => {
        queryClient.invalidateQueries(['getTaskList']);
        onClose();
      },
      promise: mutateAsync({
        id: taskId,
        status: status[itemText] as StatusOfTask,
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
