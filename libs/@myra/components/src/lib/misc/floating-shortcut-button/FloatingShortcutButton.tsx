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
      'TV payment feature added in utility payments.',
      'Default interest rate added in the saving product general update section.',
      'Default interest rate added in the loan product general update section.',
      "MR cannot create other MR's today list.",
      'Interest posting to be allowed in dormant account.',
      'Interest breakdown section added in the saving and loan product details section.',
    ],
  },
  bugsSquashed: {
    title: 'Fixes',
    data: [
      'Dormant accounts list in Saving accounts section of Member overview page.',
      'Account number if payment mode is "account transfer" in loan repayment success card.',
      'Interest Posting frequency in saving product dashboard page.',
      'In loan statement account report , account name are added with visible format.',
      'Dormant accounts are listed in the nominee search while in account open.',
      'Added no of account selected and select all account feature in bulk transfer.',
      'Search issue fixed in the bulk transfer section.',
      'Share return issue(membership fee is unpaid) fix.',
      'Deposit date (in payment mode) to always be required.',
      'Remove loan statement report from loan reports list.(shifted to others report section).',
      'Installment amount to be shown in the table.(MR)',
      'effective interest rate added  in the member overview page.( saving and loan accounts)',
      'In loan statement account report , total added in the report section.',
      'Loan application and account interest rate mismatch if account premium is edited after application has already been saved',
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
          <Text fontSize="r2">Version 1.0.104</Text>
          <Text fontSize="s3">Jan 10, 2024</Text>
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
