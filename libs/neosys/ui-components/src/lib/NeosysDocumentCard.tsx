import { useState } from 'react';
import { AiOutlineEye } from 'react-icons/ai';
import Image from 'next/image';

import { Box, Icon, Modal, Text } from '@myra-ui';

export interface INeosysDocumentCardProps {
  img: string;
  title: string;
}

export const NeosysDocumentCard = ({ img, title }: INeosysDocumentCardProps) => {
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
        <Image height={36} width={36} src={img} alt={title} />
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
        isCentered
        title={
          <Text fontSize="r2" color="neutralColorLight.Gray-80" fontWeight="SemiBold">
            {title}
          </Text>
        }
      >
        <Image height={400} width={550} src={img} alt={title} />
      </Modal>
    </Box>
  );
};
