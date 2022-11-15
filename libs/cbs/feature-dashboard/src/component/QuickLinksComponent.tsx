import { useState } from 'react';
import { DragDropContext, Draggable, Droppable, DropResult } from 'react-beautiful-dnd';
import {
  AiFillInfoCircle,
  AiOutlineBarcode,
  AiOutlineUnorderedList,
  AiOutlineUser,
  AiOutlineUserAdd,
} from 'react-icons/ai';
import { BsLockFill } from 'react-icons/bs';
import { FiSettings } from 'react-icons/fi';
import { IoMdPersonAdd } from 'react-icons/io';
import { RiNewspaperLine } from 'react-icons/ri';
import { useRouter } from 'next/router';

import { Id_Type, useGetNewIdMutation } from '@coop/cbs/data-access';
import { Box, ChakraModal, Grid, GridItem, QuickLinks, Text } from '@coop/shared/ui';
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
          .then((res) => router.push(`/members/individual/add/${res?.newId}`)),
    },
    {
      id: 'b',
      text: 'Ledgers',
      icon: RiNewspaperLine,
      onclick: () =>
        newId
          .mutateAsync({ idType: Id_Type.Kymindividual })
          .then((res) => router.push(`/members/individual/add/${res?.newId}`)),
    },
    {
      id: 'c',
      text: 'Applications',
      icon: AiOutlineBarcode,
      onclick: () =>
        newId
          .mutateAsync({ idType: Id_Type.Kymindividual })
          .then((res) => router.push(`/members/individual/add/${res?.newId}`)),
    },
    {
      id: 'd',
      text: 'List Pages',
      icon: AiOutlineUnorderedList,
      onclick: () =>
        newId
          .mutateAsync({ idType: Id_Type.Kymindividual })
          .then((res) => router.push(`/members/individual/add/${res?.newId}`)),
    },
    {
      id: 'e',
      text: 'Items',
      icon: BsLockFill,
      onclick: () =>
        newId
          .mutateAsync({ idType: Id_Type.Kymindividual })
          .then((res) => router.push(`/members/individual/add/${res?.newId}`)),
    },
    {
      id: 'f',
      text: 'Settings',
      icon: FiSettings,
      onclick: () =>
        newId
          .mutateAsync({ idType: Id_Type.Kymindividual })
          .then((res) => router.push(`/members/individual/add/${res?.newId}`)),
    },
    {
      id: 'g',
      text: 'Ram Krishna',
      subText: 'Member Profile',
      icon: AiOutlineUser,
      onclick: () =>
        newId
          .mutateAsync({ idType: Id_Type.Kymindividual })
          .then((res) => router.push(`/members/individual/add/${res?.newId}`)),
    },
    {
      id: 'h',
      text: 'Form Pages',
      icon: AiOutlineUserAdd,
      onclick: () =>
        newId
          .mutateAsync({ idType: Id_Type.Kymindividual })
          .then((res) => router.push(`/members/individual/add/${res?.newId}`)),
    },
    {
      id: 'i',
      text: 'Reports',
      icon: AiFillInfoCircle,
      onclick: () =>
        newId
          .mutateAsync({ idType: Id_Type.Kymindividual })
          .then((res) => router.push(`/members/individual/add/${res?.newId}`)),
    },
  ];

  const [openModal, setOpenModal] = useState(false);
  const [characters, setCharacters] = useState(quickLinksList);

  const onOpenModal = () => {
    setOpenModal(true);
  };

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
        <Text
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
        </Text>
      </Box>

      <Grid templateColumns="repeat(3,1fr)" columnGap="s16" rowGap="s16">
        {quickLinksList?.map((item) => (
          <GridItem key={item?.text}>
            <QuickLinks
              icon={item.icon}
              text={item.text}
              subText={item.subText}
              onclick={item.onclick}
            />
          </GridItem>
        ))}
      </Grid>

      <ChakraModal
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
                          subText={item.subText}
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
      </ChakraModal>
    </Box>
  );
};
