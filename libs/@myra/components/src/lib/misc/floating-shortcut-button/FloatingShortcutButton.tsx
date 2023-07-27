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
      'Daily Balance Report.',
      'COA head ledger transfer to another ledger (Ledger 30 and 110 are restricted from transfer).',
      'Total row added in Mr collection list.',
      'Total loan accrued amount calculation in member detail page (current only).',
      'Total remaining balance and sanctioned amount added in the loan section of member detail page.',
      'Partial payment of LOC loan.',
    ],
  },
  bugsSquashed: {
    title: 'Fixes',
    data: [
      'Valuator validation issue fixed.',
      'Added Loan Id in loan repayment page sidebar.',
      'Difference in Member wise and Saving account report amount.',
      'Remove DR CR and text change in balance certificate.',
      'Balance sheet /Trial balance /Profit Loss report show scroll bar and fix print overlap issue and freeze first column.',
      'Balance sheet /Trial balance /Profit Loss report show Default expand first row.',
      'Pdf name in bill print repayment.',
      'Remove charkhata total as it creates confusion in total amount.',
      'Update balance certificate text.',
      'Disable drill down for Fiscal adjustment.',
      'Remove CR/DR in balance certificate.',
      'Reset password setup fixes in myra mobile banking app.',
      'Reset password setup fixes in myra e-banking app.',
      'Repayment amount difference issue in loan repayment page.',
      'Opening balance calculation fixes in share statement report.',
      'Interest rate decimal values showing fixes.',
      'Deposit success card amount fixes.',
      'Share return charge issue in success card.',
      'Denominations cash mapping fixations in teller to teller transfer.',
      'TXN Amount calculation fixes in GL transactions.',
      'VAT amount calculation In sales and purchase report.',
    ],
  },
};
const WhatsNewModal = (props: WhatsNewModalProps) => {
  const { whatsNewModalOpen, handleWhatsNewModalClose } = props;
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
          <Text fontSize="r2">Version 1.0.83</Text>
          <Text fontSize="s3">July 27, 2023</Text>
        </Box>
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
