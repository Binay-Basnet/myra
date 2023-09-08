import { useState } from 'react';
import { AiOutlineBug, AiOutlineQuestionCircle, AiOutlineStar } from 'react-icons/ai';
import { BsBook, BsFacebook, BsHeart, BsInstagram, BsTwitter } from 'react-icons/bs';
import { CgShortcut } from 'react-icons/cg';
import { TbMessageDots } from 'react-icons/tb';
import { useRouter } from 'next/router';
import { ListItem, UnorderedList } from '@chakra-ui/react';
import isEmpty from 'lodash/isEmpty';

import {
  Modal,
  Popover,
  PopoverBody,
  PopoverContent,
  PopoverTrigger,
  ShortcutTab,
} from '@myra-ui/components';
import { Box, Divider, Grid, Icon, IconButton, Text } from '@myra-ui/foundations';

import { useTranslation } from '@coop/shared/utils';

/* eslint-disable-next-line */
export interface FloatingShortcutButtonProps {}

interface WhatsNewModalProps {
  whatsNewModalOpen: boolean;
  handleWhatsNewModalClose: () => void;
}

const whatsNewData = {
  features: {
    title: 'New Features',
    data: [
      'Loan lock reason',
      'Loan lock status report',
      'Loan disbursement report',
      'Two copies in account close print',
      'Multi account select in MR member assign',
      'Total collected amount shown in UI',
    ],
  },
  bugsSquashed: {
    title: 'Fixes',
    data: [
      'Fixed member transfer issue.',
      'Fixed withdraw restriction issues.',
      'FIxed JV and IBT ledger amount issue.',
      'Withdraw penalty restriction issue in product account.',
      'Remaining amount charges, principal, interest tax are added in the success and print page of closed account.',
      'MR total added in the mr transaction report.',
      'Minor search issue fixed.',
      'Loan repayment schedule reseed.',
    ],
  },
};
const WhatsNewModal = (props: WhatsNewModalProps) => {
  const { whatsNewModalOpen, handleWhatsNewModalClose } = props;
  // const appVersion = process?.env['NX_APP_VERSION_PROD'] || process?.env['NX_APP_VERSION'];
  return (
    <Modal
      open={whatsNewModalOpen}
      onClose={handleWhatsNewModalClose}
      isCentered
      title={
        <Text fontSize="r2" color="neutralColorLight.Gray-80" fontWeight="SemiBold">
          What&apos;s New
        </Text>
      }
      width="2xl"
      scrollBehavior="inside"
      footer={
        <Box
          p={3}
          w="100%"
          display="flex"
          gap={2}
          justifyContent="space-between"
          alignItems="center"
        >
          <Box display="flex" gap={3}>
            <BsFacebook size={21} />
            <BsInstagram size={21} />
            <BsTwitter size={21} />
          </Box>
          <Text>Follow us for more update!</Text>
        </Box>
      }
    >
      <Box p={3} w="100%" display="flex" flexDirection="column" gap={5}>
        <Box display="flex" justifyContent="space-between">
          <Text fontSize="r2">Version 1.0.92</Text>
          <Text fontSize="s3">September 8, 2023</Text>
        </Box>
        {!isEmpty(whatsNewData.features.data) && (
          <Box>
            <Box display="flex" alignItems="center" gap={2}>
              <AiOutlineStar size={18} />
              <Text fontSize="r2" fontWeight="medium">
                {whatsNewData.features.title}
              </Text>
            </Box>
            <UnorderedList>
              {whatsNewData.features.data.map((item) => (
                <ListItem key={item} fontSize="s3">
                  {item}
                </ListItem>
              ))}
            </UnorderedList>
          </Box>
        )}
        {!isEmpty(whatsNewData.bugsSquashed.data) && (
          <Box>
            <Box display="flex" alignItems="center" gap={2}>
              <AiOutlineBug size={18} />
              <Text fontSize="r2" fontWeight="medium">
                {whatsNewData?.bugsSquashed?.title}
              </Text>
            </Box>

            <UnorderedList>
              {whatsNewData.bugsSquashed.data.map((item) => (
                <ListItem key={item} fontSize="s3">
                  {item}
                </ListItem>
              ))}
            </UnorderedList>
          </Box>
        )}
        {/* {!isEmpty(whatsNewData?.knownBugs?.data) && (
          <Box>
            <Box display="flex" alignItems="center" gap={2}>
              <AiOutlineExclamation size={18} />
              <Text fontSize="r2" fontWeight="medium">
                Known Bugs
              </Text>
            </Box>
            <UnorderedList>
              {whatsNewData?.knownBugs?.data.map((item) => (
                <ListItem key={item} fontSize="s3">
                  {item}
                </ListItem>
              ))}
            </UnorderedList>
          </Box>
        )} */}
      </Box>
      <Divider />
    </Modal>
  );
};

export const FloatingShortcutButton = () => {
  const { t } = useTranslation();
  const router = useRouter();
  const helpOptions = [
    {
      title: t['shortcutsModalGeneral'],
      shortcuts: [
        { title: t['shortcutsModalFocusOut'], shortcutKeys: ['Esc'] },
        { title: t['shortcutModalSearch'], shortcutKeys: ['Ctrl', '/'] },
        { title: t['shortcutModalHistory'], shortcutKeys: ['Alt', '/'] },
        { title: t['shortcutModalAppSwitcher'], shortcutKeys: ['Alt', 'O'] },
        { title: t['shortcutModalHelp'], shortcutKeys: ['Alt', 'I'] },
      ],
    },
    {
      title: t['shortcutModalAppHeader'],
      shortcuts: [
        { title: t['shortcutModalAppMenu'], shortcutKeys: ['Alt', 'M'] },
        { title: t['shortcutModalDirectMenuOpen'], shortcutKeys: ['1'] },
      ],
    },
    {
      title: t['shortcutModalForms'],
      shortcuts: [
        { title: t['shortcutModalSave'], shortcutKeys: ['Ctrl or Shift', 'S'] },
        { title: t['shortcutModalNavigateBtnFields'], shortcutKeys: ['Tab'] },
        { title: t['shortcutModalCancel'], shortcutKeys: ['Ctrl', 'X'] },
      ],
    },
    {
      title: t['shortcutModalObject'],
      shortcuts: [
        { title: t['shortcutModalNewOpen'], shortcutKeys: ['Shift', 'N'] },
        { title: t['shortcutModalObjectMenu'], shortcutKeys: ['.', '.'] },
        { title: t['shortcutModalSwitchTabs'], shortcutKeys: ['<', '>'] },
      ],
    },
  ];

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [whatsNewModalOpen, setWhatsNewModalOpen] = useState(false);

  const handleModalOpen = () => {
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  const handleWhatsNewModalOpen = () => {
    setWhatsNewModalOpen(true);
  };

  const handleWhatsNewModalClose = () => {
    setWhatsNewModalOpen(false);
  };

  return (
    <>
      <Popover placement="top-start" gutter={3}>
        <PopoverTrigger>
          <IconButton
            icon={<Icon size="lg" as={AiOutlineQuestionCircle} />}
            aria-label="help"
            variant="ghost"
            color="white"
            data-testid="helpButton"
            borderRadius="br1"
            _hover={{ backgroundColor: 'secondary.900' }}
          />
        </PopoverTrigger>

        <Box zIndex={15}>
          <PopoverContent
            // bg="gray.0"
            p={0}
            _focus={{ boxShadow: 'none' }}
            width="300px"
          >
            <PopoverBody boxShadow="E1" p={0}>
              <Box display="flex" flexDirection="column" gap="" px="s8" py="s8">
                <Box
                  h="40px"
                  _hover={{ backgroundColor: 'highlight.500', borderRadius: 'br2' }}
                  display="flex"
                  flexDirection="row"
                  gap="s8"
                  px="s8"
                  cursor="pointer"
                  alignItems="center"
                  data-testid="support-guide"
                  onClick={() => router.push('https://docs.migration.myraerp.com/')}
                >
                  <Icon as={BsBook} />
                  <Text fontSize="s3" fontWeight="500" color="gray.600">
                    {' '}
                    Support guide
                  </Text>
                </Box>

                <Box
                  display="flex"
                  h="40px"
                  px="s8"
                  _hover={{ backgroundColor: 'highlight.500', borderRadius: 'br2' }}
                  flexDirection="row"
                  justifyContent="space-between"
                  cursor="pointer"
                  onClick={handleWhatsNewModalOpen}
                  data-testid="whatsnewmodal"
                  alignItems="center"
                >
                  <Box
                    display="flex"
                    flexDirection="row"
                    gap="s8"
                    cursor="pointer"
                    alignItems="center"
                  >
                    <Icon as={AiOutlineStar} />
                    <Text fontSize="s3" fontWeight="500" cursor="pointer" color="gray.600">
                      {' '}
                      What&apos;s New?
                    </Text>
                  </Box>
                </Box>

                <Box
                  display="flex"
                  flexDirection="row"
                  h="40px"
                  px="s8"
                  _hover={{ backgroundColor: 'highlight.500', borderRadius: 'br2' }}
                  justifyContent="space-between"
                  cursor="pointer"
                  onClick={handleModalOpen}
                  data-testid="keyboard-shortcuts"
                  alignItems="center"
                >
                  <Box display="flex" gap="s8">
                    <Icon as={CgShortcut} />
                    <Text fontSize="s3" fontWeight="500" cursor="pointer" color="gray.600">
                      {' '}
                      Keyboard shortcuts
                    </Text>
                  </Box>
                  <Text fontSize="s3" fontWeight="500" color="gray.600">
                    {' '}
                    Alt + l
                  </Text>
                </Box>

                <Box
                  display="flex"
                  px="s8"
                  h="40px"
                  flexDirection="row"
                  gap="s8"
                  cursor="pointer"
                  alignItems="center"
                  _hover={{ backgroundColor: 'highlight.500', borderRadius: 'br2' }}
                >
                  <Icon as={BsHeart} />
                  <Text fontSize="s3" fontWeight="500" color="gray.600">
                    {' '}
                    Give Feedback
                  </Text>
                </Box>

                <Box
                  h="40px"
                  px="s8"
                  display="flex"
                  flexDirection="row"
                  gap="s8"
                  cursor="pointer"
                  alignItems="center"
                  _hover={{ backgroundColor: 'highlight.500', borderRadius: 'br2' }}
                >
                  <Icon as={TbMessageDots} />
                  <Text fontSize="s3" fontWeight="500" color="gray.600">
                    {' '}
                    Send us a message
                  </Text>
                </Box>
              </Box>
            </PopoverBody>
          </PopoverContent>
        </Box>
      </Popover>

      <Modal
        open={isModalOpen}
        onClose={handleModalClose}
        isCentered
        title={
          <Text fontSize="r2" color="neutralColorLight.Gray-80" fontWeight="SemiBold">
            {t['shortcutsModalAll']}
          </Text>
        }
        width="3xl"
      >
        <Grid templateColumns="repeat(2, 1fr)" rowGap="s48" columnGap="80px" py="s8">
          {helpOptions.map(({ title, shortcuts }) => (
            <Box display="flex" flexDirection="column" gap="s16" key={title}>
              <Text fontSize="r2" fontWeight={500} color="black">
                {title}
              </Text>

              {shortcuts.map(({ title: item, shortcutKeys }) => (
                <Box key={item} display="flex" justifyContent="space-between" alignItems="center">
                  <Text color="neutralColorLight.Gray-70" fontSize="r1" fontWeight={400}>
                    {item}
                  </Text>

                  <Box display="flex" gap="s12">
                    {shortcutKeys.map((key) => (
                      <ShortcutTab shortcut={key} key={JSON.stringify(key)} />
                    ))}
                  </Box>
                </Box>
              ))}
            </Box>
          ))}
        </Grid>
      </Modal>
      <WhatsNewModal
        whatsNewModalOpen={whatsNewModalOpen}
        handleWhatsNewModalClose={handleWhatsNewModalClose}
      />
    </>
  );
};

export default FloatingShortcutButton;
