import { useState } from 'react';
import { DragDropContext, Draggable, Droppable, DropResult } from 'react-beautiful-dnd';
import { AiOutlineUnorderedList } from 'react-icons/ai';
import { BsArrowLeftRight, BsFileText } from 'react-icons/bs';
import { ImStack } from 'react-icons/im';
import { IoMdPersonAdd } from 'react-icons/io';
import { IoCubeOutline } from 'react-icons/io5';
import { useRouter } from 'next/router';

import { Box, Grid, GridItem, Modal, QuickLinks, Text } from '@myra-ui';

import { Id_Type, useGetNewIdMutation } from '@coop/cbs/data-access';
import { ROUTES } from '@coop/cbs/utils';
import { useTranslation } from '@coop/shared/utils';

export const QuickLinksComponent = () => {
  const { t } = useTranslation();
  const router = useRouter();
  const newId = useGetNewIdMutation();

  const quickLinksList = [
    {
      id: 'a',
      text: 'Add New Member',
      icon: IoMdPersonAdd,
      onclick: () =>
        newId
          .mutateAsync({ idType: Id_Type.Kymindividual })
          .then((res) => router.push(`${ROUTES.CBS_MEMBER_IND_ADD}/${res?.newId}`)),
    },
    {
      id: 'b',
      text: 'Add New Deposit',
      icon: ImStack,
      onclick: () => router.push(ROUTES.CBS_TRANS_DEPOSIT_ADD),
    },
    {
      id: 'c',
      text: 'Add New Withdraw',
      icon: BsArrowLeftRight,
      onclick: () => router.push(ROUTES.CBS_TRANS_WITHDRAW_ADD),
    },
    {
      id: 'd',
      text: 'Add Journal Voucher',
      icon: AiOutlineUnorderedList,
      onclick: () => router.push(ROUTES.CBS_TRANS_JOURNAL_VOUCHER_ADD),
    },
    {
      id: 'e',
      text: 'New Share Issue',
      icon: IoCubeOutline,
      onclick: () => router.push(ROUTES.CBS_SHARE_ISSUE_ADD),
    },
    {
      id: 'f',
      text: 'Share Return',
      icon: IoCubeOutline,
      onclick: () => router.push(ROUTES.CBS_SHARE_RETURN_ADD),
    },
    {
      id: 'g',
      text: 'New Saving Account',
      icon: ImStack,
      onclick: () => router.push(ROUTES.CBS_ACCOUNT_OPEN_ADD),
    },
    {
      id: 'h',
      text: 'New Loan Account',
      icon: BsArrowLeftRight,
      onclick: () => router.push(ROUTES.CBS_LOAN_APPLICATIONS_ADD),
    },
    {
      id: 'i',
      text: 'Reports',
      icon: BsFileText,
      onclick: () => router.push(ROUTES.CBS_REPORT_LIST),
    },
  ];

  const [openModal, setOpenModal] = useState(false);
  const [characters, setCharacters] = useState(quickLinksList);

  // const onOpenModal = () => {
  //   setOpenModal(true);
  // };

  const onCloseModal = () => {
    setOpenModal(false);
  };

  const handleOnDragEnd = async (result: DropResult) => {
    const items = Array.from(characters);
    const [reorderedItem] = items.splice(result.source.index, 1);

    if (result.destination) {
      items.splice(result.destination.index, 0, reorderedItem);
      setCharacters(items);
    }
  };

  return (
    <Box display="flex" flexDir="column" gap="s8">
      <Box display="flex" justifyContent="space-between">
        <Text fontSize="s3" color="gray.600" fontWeight="SemiBold" textTransform="uppercase">
          {t['quickLinks']}
        </Text>
        {/*  <Text
          pb="0"
          fontSize="s3"
          fontWeight="semibold"
          textTransform="uppercase"
          _hover={{
            textDecor: 'underline',
            cursor: 'pointer',
          }}
          color="gray.600"
          onClick={() => {
            onOpenModal();
          }}
        >
          {t['editLinks']}
        </Text> */}
      </Box>

      <Grid templateColumns="repeat(3,1fr)" columnGap="s16" rowGap="s16">
        {quickLinksList?.map((item) => (
          <GridItem key={item?.text}>
            <QuickLinks icon={item.icon} text={item.text} onclick={item.onclick} />
          </GridItem>
        ))}
      </Grid>

      <Modal
        open={openModal}
        onClose={onCloseModal}
        isCentered
        title="editQuickLink"
        primaryButtonLabel="save"
        secondaryButtonLabel="cancel"
        width="container.lg"
      >
        <DragDropContext onDragEnd={handleOnDragEnd}>
          <Droppable droppableId="characters">
            {(provided) => (
              <Grid
                templateColumns="repeat(3,1fr)"
                py="s16"
                columnGap="s16"
                rowGap="s8"
                {...provided.droppableProps}
                ref={provided.innerRef}
              >
                {characters?.map((item, index) => (
                  <Draggable key={item?.id} draggableId={item?.id} index={index}>
                    {(provide) => (
                      <Box
                        ref={provide.innerRef}
                        {...provide.draggableProps}
                        {...provide.dragHandleProps}
                      >
                        <QuickLinks
                          // key={index}
                          editable
                          icon={item.icon}
                          text={item.text}
                          onclick={item.onclick}
                          editLinks
                        />
                      </Box>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </Grid>
            )}
          </Droppable>
        </DragDropContext>
      </Modal>
    </Box>
  );
};
