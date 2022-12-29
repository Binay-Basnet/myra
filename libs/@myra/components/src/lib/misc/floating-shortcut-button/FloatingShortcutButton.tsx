import { useState } from 'react';
import {
  AiOutlineBug,
  AiOutlineExclamation,
  AiOutlineQuestionCircle,
  AiOutlineStar,
} from 'react-icons/ai';
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
      'Transactions print',
      'Headoffice information to be filled from neosys portal and subsequent head office will be created automatically * added in required fields',
      'COA - (Holding Account) Detail Page',
      'All Transaction Detail Page',
      'No validation with calendar date for day end (user will be able to close day anytime and multiple times',
      'Branch Readiness implemented for each branch and Day End for all branch only through Head Branch',
      'COA Account List',
      'Completed Reports:',
      '1. Mobile Banking Registration',
      '2. Mobile Banking Expiry',
      '3. Service Center List',
      '4. Member Classification',
      '5. Interest Tax',
      '6. Interest Statement',
      '7. General Ledger',
      '8. Saving Statement',
      '9. Share Statement',
      '10. Loan Statement',
      '11. Active/Inactive Member',
      '12. KYM Status Report',
      '13. Trial Balance',
      '14. Mobile App Transaction',
      '15. User List',
      '16. Account Closing Report',
      '17. Account Opening Report',
      '18. Cash Book / Cash Register',
      '19. Teller Report',
      '20. Saving Balance',
      '21. Loan Balance',
      '22. Member Register',
      '23. Share Transactions',
      '24. Share Return / Purchase Register',
      '25. Bank GL Statement',
      '26. Vault Balance',
      '27. Share Balance Report',
      '28. Loan Ageing Report',
      '29. Daybook Report',
      '30. Pl Report',
      '31. Balance Sheet',
    ],
  },
  bugsSquashed: {
    title: 'Bug Squashed',
    data: [
      'loan individual statement report interest fine to be mapped.',
      'member details with value parameters of the service center are mapped.',
      'Banks are added in the Bank GL statement.',
      'nationality in kym appears in the form.',
      'add balance in the member detail page in the share section.',
      'share trans. report  filters are mapped.',
      'member recent transactions are amount values are fixed with amount power.',
      'Remove the loan account from search, if all the loans are paid.',
      'Change validation message in withdraw and deposit section.',
      'Error popup issue in Loan Repayment.',
      'account name in loan application ( member name - product name).',
      'negative sign remove from all reports',
    ],
  },
  knownBugs: {
    title: 'Known Bugs',
    data: [
      'Share transaction report filters have some issues in filters.',
      'Member register report table fields are not properly populated.',
      'Saving statement service filter and amount range not working.',
      'Interest reports with filters, TTR reports filters might not work.',
      'Vault balance filter, bank GL filter, ledger report filter are not working in the reports.',
      'Mobile banking channel transaction report,userlist reports are not working.',
      'Other sections are not fully workable as share dividend posting, profit to fund management with UI only.',
      'In the accounting section, bank accounts do not reflect the amount of transactions paid by the bank.',
      'kym member selection placement should be fixed ',
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
          <Text fontSize="r2">Version 1.1.2</Text>
          <Text fontSize="s3">December 29, 2022</Text>
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
        {!isEmpty(whatsNewData?.knownBugs?.data) && (
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
        )}
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
