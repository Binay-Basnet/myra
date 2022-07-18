import { useRef, useState } from 'react';
import { BsBook, BsHeart, BsQuestionLg } from 'react-icons/bs';
import { TbMessageDots } from 'react-icons/tb';
import { AddIcon } from '@chakra-ui/icons';
import {
  Box,
  Button,
  Icon,
  IconButton,
  Popover,
  PopoverBody,
  PopoverContent,
  PopoverTrigger,
  Text,
} from '@chakra-ui/react';

import { Grid, GridItem, Modal, ShortcutTab } from '@coop/shared/ui';
import { useTranslation } from '@coop/shared/utils';

/* eslint-disable-next-line */
export interface FloatingShortcutButtonProps {}

export function FloatingShortcutButton(props: FloatingShortcutButtonProps) {
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

  const handleModalOpen = () => {
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };
  return (
    <>
      <Popover placement="top-start" gutter={3}>
        <PopoverTrigger>
          <IconButton
            mt="400px"
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

              <Text fontSize="s3" fontWeight="500" cursor="pointer">
                {' '}
                What's New?
              </Text>

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
    </>
  );
}

export default FloatingShortcutButton;
