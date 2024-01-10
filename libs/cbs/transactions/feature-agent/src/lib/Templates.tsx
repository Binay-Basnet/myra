import { useState } from 'react';
import { BsThreeDotsVertical } from 'react-icons/bs';
import { IoAddOutline } from 'react-icons/io5';
import { useRouter } from 'next/router';
import { useDisclosure } from '@chakra-ui/react';
import { useQueryClient } from '@tanstack/react-query';

import {
  asyncToast,
  Box,
  Button,
  Grid,
  Icon,
  IconButton,
  Loader,
  Popover,
  PopoverBody,
  PopoverContent,
  PopoverTrigger,
  Text,
} from '@myra-ui';

import { useDeleteCollectionMutation, useListCollectionQuery } from '@coop/cbs/data-access';
import { ConfirmationDialog } from '@coop/shared/components';

import { CreateCollectionListModal } from '../components';

export const Templates = () => {
  const [selectedCollectionId, setSelectedCollectionId] = useState('');

  const router = useRouter();

  const id = router?.query?.['id'];

  const queryClient = useQueryClient();

  const {
    isOpen: isCreateListModalOpen,
    onClose: onCreateListModalClose,
    onToggle: onCreateListToggle,
  } = useDisclosure();

  const {
    isOpen: isDeleteConfirmOpen,
    onClose: onDeleteConfirmClose,
    onToggle: onDeleteConfirmToggle,
  } = useDisclosure();

  const { data: collectionListData, isFetching: isCollectionFetching } = useListCollectionQuery({
    agentID: id as string,
  });

  const collectionList = collectionListData?.collection?.listCollection?.data ?? [];

  const { mutateAsync: deleteCollection } = useDeleteCollectionMutation();

  const handleDeleteCollection = () => {
    asyncToast({
      id: 'delete-agent-collection-template',
      promise: deleteCollection({
        collectionID: selectedCollectionId,
      }),
      msgs: {
        loading: 'Deleting Collection',
        success: 'Collection Deleted Successfully',
      },
      onSuccess: () => {
        queryClient.invalidateQueries(['listCollection']);
        setSelectedCollectionId('');
        onDeleteConfirmClose();
      },
    });
  };

  return (
    <Box display="flex" flexDir="column" gap="s16" bg="background.500">
      <Text fontSize="r3" fontWeight="600" color="gray.800">
        Collection List
      </Text>

      {isCollectionFetching && <Loader />}

      {!isCollectionFetching && (
        <Box
          bg="white"
          border="1px"
          borderColor="border.layout"
          borderRadius="br3"
          p="s16"
          display="flex"
          flexDirection="column"
          gap="s16"
        >
          <Box display="flex" justifyContent="space-between" alignItems="center">
            <Text fontSize="r2" color="gray.700" fontWeight={500}>
              Collections Lists
            </Text>
            <Button
              rightIcon={<Icon color="gray.600" as={IoAddOutline} />}
              variant="outline"
              shade="neutral"
              onClick={onCreateListToggle}
            >
              New Collections
            </Button>
          </Box>

          <Grid templateColumns="repeat(2, 1fr)" gap="s16">
            {collectionList?.map((coll) => (
              <Box
                border="1px"
                borderColor="border.layout"
                borderRadius="br3"
                p="s16"
                display="flex"
                flexDirection="column"
                gap="s20"
              >
                <Box display="flex" justifyContent="space-between" alignItems="center">
                  <Text fontSize="r1" fontWeight={500} color="primary.500">
                    {coll?.collectionName}
                  </Text>

                  <Actions
                    items={[
                      {
                        title: 'Edit',
                        onClick: () => {
                          setSelectedCollectionId(coll?.collectionID as string);
                          onCreateListToggle();
                        },
                      },
                      {
                        title: 'Delete',
                        onClick: () => {
                          setSelectedCollectionId(coll?.collectionID as string);
                          onDeleteConfirmToggle();
                        },
                      },
                    ]}
                  />
                </Box>

                <Box display="flex" gap="s32">
                  <Box display="flex" flexDirection="column" gap="s4">
                    <Text fontSize="s2" fontWeight={500} color="gray.600">
                      Members
                    </Text>
                    <Text fontSize="r3" fontWeight={600} color="gray.800">
                      {coll?.memberCount}
                    </Text>
                  </Box>
                  <Box display="flex" flexDirection="column" gap="s4">
                    <Text fontSize="s2" fontWeight={500} color="gray.600">
                      Accounts
                    </Text>
                    <Text fontSize="r3" fontWeight={600} color="gray.800">
                      {coll?.accountCount}
                    </Text>
                  </Box>
                </Box>
              </Box>
            ))}
          </Grid>
        </Box>
      )}

      {isCreateListModalOpen ? (
        <CreateCollectionListModal
          isOpen={isCreateListModalOpen}
          onClose={() => {
            setSelectedCollectionId('');
            onCreateListModalClose();
          }}
          collectionId={selectedCollectionId}
        />
      ) : null}

      <ConfirmationDialog
        isOpen={isDeleteConfirmOpen}
        onClose={() => {
          setSelectedCollectionId('');
          onDeleteConfirmClose();
        }}
        handleConfirm={handleDeleteCollection}
        title="Delete Collection"
        description="This action will delete this collection list. Are you sure you want to continue?"
      />
    </Box>
  );
};

const Actions = ({
  items,
}: {
  items: {
    title: string;
    onClick?: () => void;
  }[];
}) => (
  <Popover placement="bottom-start">
    <PopoverTrigger>
      <IconButton
        onClick={(e) => e.stopPropagation()}
        variant="ghost"
        aria-label="Search database"
        icon={<BsThreeDotsVertical />}
      />
    </PopoverTrigger>
    <PopoverContent minWidth="180px" w="180px" color="white" _focus={{ boxShadow: 'none' }}>
      <PopoverBody px="0" py="s8">
        <Box display="flex" flexDirection="column" alignItems="start">
          {items.map((item) => (
            <Box
              px="s16"
              py="s10"
              width="100%"
              _hover={{ bg: 'gray.100' }}
              cursor="pointer"
              onClick={(e) => {
                e.stopPropagation();
                item?.onClick && item?.onClick();
              }}
              key={item.title}
            >
              <Text variant="bodyRegular" color="neutralColorLight.Gray-80">
                {item.title}
              </Text>
            </Box>
          ))}
        </Box>
      </PopoverBody>
    </PopoverContent>
  </Popover>
);
