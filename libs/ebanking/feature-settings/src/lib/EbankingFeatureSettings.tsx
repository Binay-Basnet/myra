import { IconType } from 'react-icons';
import { IoIosArrowDown, IoIosArrowForward } from 'react-icons/io';
import { IoCheckmark } from 'react-icons/io5';
import {
  MdLanguage,
  MdLogout,
  MdNotificationsNone,
  MdOutlineRealEstateAgent,
  MdOutlineSecurity,
  MdOutlineSupportAgent,
} from 'react-icons/md';
import { useRouter } from 'next/router';

import {
  Accordion,
  AccordionButton,
  AccordionItem,
  AccordionPanel,
  Box,
  Divider,
  Icon,
  Text,
  TextFields,
} from '@coop/shared/ui';

import { SettingsHeader } from '../components/SettingsHeader';

export const EbankingFeatureSettings = () => {
  const router = useRouter();

  return (
    <Box display="flex" flexDir="column" gap="s16">
      <SettingsHeader />
      <Divider />
      <Box bg="white" borderRadius="br2">
        <Accordion allowMultiple allowToggle>
          <AccordionItem border="none">
            {({ isExpanded }) => (
              <SettingsButton
                icon={MdOutlineRealEstateAgent}
                title="Merchant Register"
                isExpanded={isExpanded}
              />
            )}
          </AccordionItem>
          <Divider />
          <AccordionItem border="none">
            {({ isExpanded }) => (
              <>
                <SettingsButton icon={MdOutlineSecurity} title="Security" isExpanded={isExpanded} />
                <AccordionPanel
                  p={0}
                  borderTop="1px"
                  borderColor="border.layout"
                  borderBottomRadius="br2"
                >
                  <Box
                    w="100%"
                    px="52px"
                    py="s16"
                    cursor="pointer"
                    _hover={{ bg: 'highlight.500' }}
                  >
                    <TextFields variant="formInput">Change Login Password</TextFields>
                  </Box>
                  <Box
                    borderTop="1px"
                    borderColor="border.layout"
                    w="100%"
                    px="52px"
                    py="s16"
                    cursor="pointer"
                    _hover={{ bg: 'highlight.500' }}
                  >
                    <TextFields variant="formInput">Change Transaction Pin</TextFields>
                  </Box>
                  <Box
                    borderTop="1px"
                    borderColor="border.layout"
                    w="100%"
                    px="52px"
                    py="s16"
                    cursor="pointer"
                    _hover={{ bg: 'highlight.500' }}
                  >
                    <TextFields variant="formInput">Change COOP Login Pin</TextFields>
                  </Box>
                </AccordionPanel>
              </>
            )}
          </AccordionItem>

          <Divider />

          <AccordionItem border="none">
            {({ isExpanded }) => (
              <SettingsButton
                onClick={() => router.push('/home')}
                icon={MdNotificationsNone}
                title="Notifications"
                isExpanded={isExpanded}
              />
            )}
          </AccordionItem>

          <Divider />

          <AccordionItem border="none">
            {({ isExpanded }) => (
              <>
                <SettingsButton
                  button={
                    <Text fontSize="r1" color="gray.500" whiteSpace="nowrap">
                      {router.locale === 'en' ? 'English (EN)' : 'Nepali (ने)'}{' '}
                    </Text>
                  }
                  icon={MdLanguage}
                  title="Language"
                  isExpanded={isExpanded}
                />

                <AccordionPanel
                  p={0}
                  borderTop="1px"
                  borderColor="border.layout"
                  borderBottomRadius="br2"
                >
                  <Box
                    w="100%"
                    pl="52px"
                    pr="s16"
                    py="s16"
                    cursor="pointer"
                    _hover={{ bg: 'highlight.500' }}
                    display="flex"
                    alignItems="center"
                    justifyContent="space-between"
                    onClick={() =>
                      router.push(`/${router.asPath}`, undefined, {
                        locale: 'en',
                      })
                    }
                  >
                    <TextFields variant="formInput">English (EN)</TextFields>
                    {router.locale === 'en' && <Icon as={IoCheckmark} color="primary.500" />}
                  </Box>
                  <Box
                    borderTop="1px"
                    borderColor="border.layout"
                    w="100%"
                    pl="52px"
                    pr="s16"
                    py="s16"
                    cursor="pointer"
                    _hover={{ bg: 'highlight.500' }}
                    display="flex"
                    alignItems="center"
                    justifyContent="space-between"
                    onClick={() =>
                      router.push(`/${router.asPath}`, undefined, {
                        locale: 'ne',
                      })
                    }
                  >
                    <TextFields variant="formInput">Nepali (ने)</TextFields>
                    {router.locale === 'ne' && <Icon as={IoCheckmark} color="primary.500" />}
                  </Box>
                </AccordionPanel>
              </>
            )}
          </AccordionItem>

          <Divider />

          <AccordionItem border="none">
            {({ isExpanded }) => (
              <>
                <SettingsButton
                  icon={MdOutlineSupportAgent}
                  title="Support"
                  isExpanded={isExpanded}
                />

                <AccordionPanel
                  p={0}
                  borderTop="1px"
                  borderColor="border.layout"
                  borderBottomRadius="br2"
                >
                  <Box
                    w="100%"
                    px="52px"
                    py="s16"
                    cursor="pointer"
                    _hover={{ bg: 'highlight.500' }}
                  >
                    <TextFields variant="formInput">FAQs</TextFields>
                  </Box>
                  <Box
                    borderTop="1px"
                    borderColor="border.layout"
                    w="100%"
                    px="52px"
                    py="s16"
                    cursor="pointer"
                    _hover={{ bg: 'highlight.500' }}
                  >
                    <TextFields variant="formInput">Support Ticket</TextFields>
                  </Box>
                  <Box
                    borderTop="1px"
                    borderColor="border.layout"
                    w="100%"
                    px="52px"
                    py="s16"
                    cursor="pointer"
                    _hover={{ bg: 'highlight.500' }}
                  >
                    <TextFields variant="formInput">About Myra</TextFields>
                  </Box>
                </AccordionPanel>
              </>
            )}
          </AccordionItem>

          <Divider />

          <AccordionItem border="none">
            {({ isExpanded }) => (
              <SettingsButton hideArrow icon={MdLogout} title="Log Out" isExpanded={isExpanded} />
            )}
          </AccordionItem>
        </Accordion>
      </Box>
    </Box>
  );
};

export default EbankingFeatureSettings;

interface ISettingsButtonProps {
  icon: IconType;
  title: string;
  isExpanded: boolean;

  button?: React.ReactNode;
  hideArrow?: boolean;
  onClick?: () => void;
}

export const SettingsButton = ({
  icon,
  title,
  isExpanded,
  button,
  hideArrow = false,
  onClick,
}: ISettingsButtonProps) => (
  <Box onClick={onClick}>
    <AccordionButton
      p="s16"
      _hover={{ bg: 'highlight.500' }}
      _expanded={{ bg: 'highlight.500', borderBottomRadius: 'none' }}
    >
      <Box display="flex" alignItems="center" w="100%" justifyContent="space-between">
        <Box display="flex" alignItems="center" gap="s16" w="100%">
          <Icon as={icon} color="primary.500" />
          <Text fontSize="r1" color="gray.900" fontWeight={500}>
            {title}
          </Text>
        </Box>
        {hideArrow
          ? null
          : button ?? (
              <Icon
                as={!isExpanded || onClick ? IoIosArrowForward : IoIosArrowDown}
                color="gray.500"
              />
            )}
      </Box>
    </AccordionButton>
  </Box>
);
