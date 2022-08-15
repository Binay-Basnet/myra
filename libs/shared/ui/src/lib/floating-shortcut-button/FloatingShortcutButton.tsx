import { useState } from 'react';
import {
  AiOutlineBug,
  AiOutlineExclamation,
  AiOutlineStar,
} from 'react-icons/ai';
import {
  BsBook,
  BsFacebook,
  BsHeart,
  BsInstagram,
  BsQuestionLg,
  BsTwitter,
} from 'react-icons/bs';
import { TbMessageDots } from 'react-icons/tb';
import {
  Box,
  Divider,
  Icon,
  IconButton,
  Popover,
  PopoverBody,
  PopoverContent,
  PopoverTrigger,
  Text,
} from '@chakra-ui/react';

import {
  Grid,
  ListItem,
  Modal,
  ShortcutTab,
  UnorderedList,
} from '@coop/shared/ui';
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
      'All 4 type of members can be added and seen in member list.',
      'Deposit product can be created and seen in deposit list.',
      'Deposit Settings (TDS/IRO Setup) can be done.',
      'Loan product can be created and seen in deposit list.',
      'New branch can be added and seen in branch list',
      'User Authentication is done',
      'All 4 Kym settings can be mended which reflects in actual Kym form.',
      'Share can be purchased and returned which is reflected in Share balance, share register',
      'As per the deposit product created new account can be opened for individual members and is reflected in account list',
      'On the opened account transactions like withdraw and deposit can be carried out ( Most efficient with Voluntary/Optional Product)',
      'Report list can be seen and share statement report can be viewed',
    ],
  },
  bugsSquashed: {
    title: 'Bug Squashed',
    data: [
      'UI fixes',
      'Active state bugs on navigation tabs',
      'Frequency input field right item alignment',
      'File document upload',
    ],
  },
  knownBugs: {
    title: 'Known Bugs',
    data: [
      'Drop down list might not be relevant.',
      'Validation not applicable at any where.',
      'Multiple upload on edit not applicable.',
      'Map ui issue',
      'All kym form fields cannot be updated in kym setting however new can be added and reflected.',
      'Some input contains zero value as default.',
      'Find members in kym form individuals is not working.',
      'All fields in deposit/loan product must be filled for the product to be created',
      'Remaining 2 kym form coop and coop union might contain bugs.',
    ],
  },
};

const WhatsNewModal = (props: WhatsNewModalProps) => {
  const { whatsNewModalOpen, handleWhatsNewModalClose } = props;
  return (
    <Modal
      open={whatsNewModalOpen}
      onClose={handleWhatsNewModalClose}
      isCentered={true}
      title={
        <Text
          fontSize="r2"
          color="neutralColorLight.Gray-80"
          fontWeight="SemiBold"
        >
          What's New
        </Text>
      }
      modalContentProps={{ minW: '60vw' }}
      footerPrimary1Props={
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
          <Text fontSize="r2">Version 1.0.0</Text>
          <Text fontSize="s3">Aug 15, 2022</Text>
        </Box>
        <Box>
          <Box display="flex" alignItems="center" gap={2}>
            <AiOutlineStar size={18} />
            <Text fontSize="r2" fontWeight="medium">
              {whatsNewData.features.title}
            </Text>
          </Box>
          <UnorderedList>
            {whatsNewData.features.data.map((item, index) => (
              <ListItem key={index} fontSize="s3">
                {item}
              </ListItem>
            ))}
          </UnorderedList>
        </Box>
        <Box>
          <Box display="flex" alignItems="center" gap={2}>
            <AiOutlineBug size={18} />
            <Text fontSize="r2" fontWeight="medium">
              {whatsNewData?.bugsSquashed?.title}
            </Text>
          </Box>

          <UnorderedList>
            {whatsNewData.bugsSquashed.data.map((item, index) => (
              <ListItem key={index} fontSize="s3">
                {item}
              </ListItem>
            ))}
          </UnorderedList>
        </Box>
        <Box>
          <Box display="flex" alignItems="center" gap={2}>
            <AiOutlineExclamation size={18} />
            <Text fontSize="r2" fontWeight="medium">
              Known Bugs
            </Text>
          </Box>
          <UnorderedList>
            {whatsNewData?.knownBugs?.data.map((item, index) => (
              <ListItem key={index} fontSize="s3">
                {item}
              </ListItem>
            ))}
          </UnorderedList>
        </Box>
      </Box>
      <Divider />
    </Modal>
  );
};

export function FloatingShortcutButton() {
  const { t } = useTranslation();
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
            aria-label="button"
            boxShadow={' 0px 4px 10px rgba(52, 60, 70, 0.1)'}
            icon={<BsQuestionLg color="black" />}
            borderRadius="50%"
            colorScheme={'whiteAlpha'}
          />
        </PopoverTrigger>

        <PopoverContent
          // bg="gray.0"
          p={0}
          _focus={{ boxShadow: 'none' }}
          width="200px"
        >
          <PopoverBody p={0}>
            <Box
              display="flex"
              flexDirection={'column'}
              gap="s16"
              px="s12"
              py="s16"
            >
              <Box
                display={'flex'}
                flexDirection="row"
                gap="s8"
                cursor="pointer"
                alignItems={'center'}
              >
                <Icon as={BsBook} />
                <Text fontSize="s3" fontWeight="500">
                  {' '}
                  Help & support guide
                </Text>
              </Box>
              <Box
                display={'flex'}
                flexDirection="row"
                gap="s8"
                cursor="pointer"
                alignItems={'center'}
              >
                <Icon as={TbMessageDots} />
                <Text fontSize="s3" fontWeight="500">
                  {' '}
                  Send us a message
                </Text>
              </Box>
              <Box
                display={'flex'}
                flexDirection="row"
                gap="s8"
                cursor="pointer"
                alignItems={'center'}
              >
                <Icon as={BsHeart} />
                <Text fontSize="s3" fontWeight="500">
                  {' '}
                  Give Feedback
                </Text>
              </Box>
              <Box
                display={'flex'}
                flexDirection="row"
                justifyContent={'space-between'}
                cursor="pointer"
                onClick={handleModalOpen}
                alignItems={'center'}
              >
                <Text fontSize="s3" fontWeight="700">
                  {' '}
                  Keyboard shortcuts
                </Text>
                <Text fontSize="s3" fontWeight="500">
                  {' '}
                  Alt + l
                </Text>
              </Box>
              <Box
                display={'flex'}
                flexDirection="row"
                justifyContent={'space-between'}
                cursor="pointer"
                onClick={handleWhatsNewModalOpen}
                alignItems={'center'}
              >
                <Text fontSize="s3" fontWeight="500" cursor="pointer">
                  {' '}
                  What's New?
                </Text>
              </Box>

              <Text fontSize="s3" fontWeight="500" cursor="pointer">
                {' '}
                Terms & Privacy
              </Text>
            </Box>
          </PopoverBody>
        </PopoverContent>
      </Popover>

      <Modal
        open={isModalOpen}
        onClose={handleModalClose}
        isCentered={true}
        title={
          <Text
            fontSize="r2"
            color="neutralColorLight.Gray-80"
            fontWeight="SemiBold"
          >
            {t['shortcutsModalAll']}
          </Text>
        }
        modalContentProps={{ minW: '60vw' }}
      >
        <Grid
          templateColumns="repeat(2, 1fr)"
          rowGap="s48"
          columnGap="80px"
          mx="-s8"
          py="s8"
        >
          {helpOptions.map(({ title, shortcuts }, index) => (
            <Box display="flex" flexDirection="column" gap="s16" key={index}>
              <Text fontSize="r2" fontWeight={500} color="black">
                {title}
              </Text>

              {shortcuts.map(({ title, shortcutKeys }, index) => (
                <Box
                  key={index}
                  display="flex"
                  justifyContent="space-between"
                  alignItems="center"
                >
                  <Text
                    color="neutralColorLight.Gray-70"
                    fontSize="r1"
                    fontWeight={400}
                  >
                    {title}
                  </Text>

                  <Box display="flex" gap="s12">
                    {shortcutKeys.map((key, index) => (
                      <ShortcutTab shortcut={key} key={index} />
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
}

export default FloatingShortcutButton;
