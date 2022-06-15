import React, { useState } from 'react';
import Image from 'next/image';
import { AiOutlineEye } from 'react-icons/ai';
import { Box, Icon, Text, Modal } from '@coop/shared/ui';

export const DocumentCard = ({ img, title }) => {
  const [openModal, setOpenModal] = useState(false);

  const onOpenModal = () => {
    setOpenModal(true);
  };

  const onCloseModal = () => {
    setOpenModal(false);
  };
  return (
    <Box
      px="s8"
      py="s12"
      display="flex"
      justifyContent="space-between"
      border="1px solid"
      borderColor="border.layout"
      borderRadius="br3"
    >
      <Box borderRadius="br2" display="flex">
        <Image height="36px" width="36px" src={img} alt={title} />
        <Text
          ml="s8"
          alignSelf="center"
          fontSize="r1"
          fontWeight="Medium"
          color="neutralColorLight.Gray-80"
        >
          {title}
        </Text>
      </Box>

      <Icon
        alignSelf="center"
        size="lg"
        as={AiOutlineEye}
        onClick={() => {
          onOpenModal();
        }}
        cursor="pointer"
        color="neutralColorLight.Gray-60"
      />

      <Modal
        open={openModal}
        onClose={onCloseModal}
        isCentered={true}
        title={
          <Text
            fontSize="r2"
            color="neutralColorLight.Gray-80"
            fontWeight="SemiBold"
          >
            Citizenship Document
          </Text>
        }
      >
        <Image height={400} width={550} src={img} alt={title} />
      </Modal>
    </Box>
  );
};
