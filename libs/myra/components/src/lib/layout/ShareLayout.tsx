import React, { useState } from 'react';
import { AiOutlineSetting } from 'react-icons/ai';
import { BiDownArrowCircle, BiUpArrowCircle } from 'react-icons/bi';
import { AddIcon } from '@chakra-ui/icons';
import { Box, Button, Divider, Icon, Modal, Text } from '@coop/myra/ui';
import { useRouter } from 'next/router';

import { TabColumn } from '../tab/TabforMemberPage';

interface IMemberPageLayout {
  children: React.ReactNode;
}

const shareColumns = [
  {
    title: 'shareBalance',
    link: '/share/balance',
  },
  {
    title: 'shareRegister',
    link: '/share/register',
  },
  {
    title: 'shareReport',
    link: '/share/report',
  },
];

export const SharePageLayout = ({ children }: IMemberPageLayout) => {
  const router = useRouter();
  const [openModal, setOpenModal] = useState(false);

  const onOpenModal = () => {
    setOpenModal(true);
  };

  const onCloseModal = () => {
    setOpenModal(false);
  };

  return (
    <Box display="flex">
      <Box width="275px" p="s24" flexShrink={0}>
        <Text fontSize="l1" fontWeight="600" color="gray.800">
          Share
        </Text>
        <Divider my="s16" />

        <Button
          width="full"
          size="lg"
          justifyContent="start"
          leftIcon={<AddIcon h="11px" />}
          onClick={() => {
            onOpenModal();
          }}
        >
          New Share
        </Button>

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
              Select Share Type
            </Text>
          }
        >
          <Box display="flex" justifyContent="space-around">
            <Box
              p="s24"
              w="300px"
              h="150px"
              border="1px solid"
              borderColor="border.element"
              borderRadius="br3"
              display="flex"
              flexDirection="column"
              justifyContent="center"
              cursor="pointer"
              onClick={() => router.push('/share/share-purchase')}
            >
              <Icon
                mb="10px"
                alignSelf="center"
                w="30px"
                h="30px"
                color="neutralColorLight.Gray-60"
                as={BiDownArrowCircle}
              />
              <Text
                alignSelf="center"
                fontSize="r2"
                color="neutralColorLight.Gray-80"
                fontWeight="Medium"
              >
                Share Purchase
              </Text>
            </Box>
            <Box
              p="s24"
              w="300px"
              h="150px"
              border="1px solid"
              borderColor="border.element"
              borderRadius="br3"
              display="flex"
              flexDirection="column"
              justifyContent="center"
              cursor="pointer"
              onClick={() => router.push('/share/share-return')}
            >
              <Icon
                mb="10px"
                alignSelf="center"
                w="30px"
                h="30px"
                color="neutralColorLight.Gray-60"
                as={BiUpArrowCircle}
              />
              <Text
                alignSelf="center"
                fontSize="r2"
                color="neutralColorLight.Gray-80"
                fontWeight="Medium"
              >
                Share Return
              </Text>
            </Box>
          </Box>
        </Modal>

        <Divider my="s16" />
        <TabColumn list={shareColumns} />
        <Divider my="s16" />
        <Button
          onClick={() => router.push('/members/settings')}
          variant="ghost"
          color="#37474F"
          height="s48"
          width="full"
          justifyContent="start"
          leftIcon={
            <Icon as={AiOutlineSetting} size="md" color="primary.500" />
          }
        >
          Share Settings
        </Button>
      </Box>
      <Box p="s16" width="100%" borderRadius="br3">
        <Box bg="white" borderRadius="br3">
          {children}
        </Box>
      </Box>
    </Box>
  );
};
