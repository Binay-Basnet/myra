import { IoChevronForwardOutline } from 'react-icons/io5';
import { VscChromeClose } from 'react-icons/vsc';
import { useRouter } from 'next/router';
import { Popover, PopoverBody, PopoverContent, PopoverTrigger, Text } from '@chakra-ui/react';

import { GridItem } from '@myra-ui/components';
import { Box, Button, Grid, Icon, IconButton } from '@myra-ui/foundations';

// const optionsMemberHeader = [
//   {
//     label: 'Edit KYM',
//   },
//   {
//     label: 'Change Branch',
//   },
// ];

export interface DetailPageHeaderProps {
  title: string;
  member: {
    name: string;
  };
  closeLink?: string;
  backLink?: string;
  options?: { label: string; handler: () => void }[];
}

const OptionsIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="17" height="18" viewBox="0 0 17 18" fill="none">
    <path
      d="M8.89961 10.5187C9.73839 10.5187 10.4184 9.83874 10.4184 8.99995C10.4184 8.16117 9.73839 7.4812 8.89961 7.4812C8.06083 7.4812 7.38086 8.16117 7.38086 8.99995C7.38086 9.83874 8.06083 10.5187 8.89961 10.5187Z"
      fill="#91979F"
    />
    <path
      d="M13.9621 10.5187C14.8009 10.5187 15.4809 9.83874 15.4809 8.99995C15.4809 8.16117 14.8009 7.4812 13.9621 7.4812C13.1233 7.4812 12.4434 8.16117 12.4434 8.99995C12.4434 9.83874 13.1233 10.5187 13.9621 10.5187Z"
      fill="#91979F"
    />
    <path
      d="M3.83711 10.5187C4.67589 10.5187 5.35586 9.83874 5.35586 8.99995C5.35586 8.16117 4.67589 7.4812 3.83711 7.4812C2.99833 7.4812 2.31836 8.16117 2.31836 8.99995C2.31836 9.83874 2.99833 10.5187 3.83711 10.5187Z"
      fill="#91979F"
    />
  </svg>
);

export const DetailPageHeader = ({
  title,
  member,
  closeLink,
  backLink,
  options,
}: DetailPageHeaderProps) => {
  const router = useRouter();

  return (
    <Box
      h="50px"
      bg="white"
      zIndex="10"
      w="100%"
      borderBottom="1px solid "
      borderColor="border.layout"
      px="s16"
      display="flex"
      alignItems="center"
      justifyContent="space-between"
    >
      <Box display="flex" alignItems="center" gap="s10">
        <Text
          fontSize="r2"
          fontWeight="500"
          color="gray.700"
          px="s8"
          py="s4"
          _hover={{
            cursor: 'pointer',
            backgroundColor: 'highlight.500',
            borderRadius: 'br2',
          }}
          cursor={backLink ? 'pointer' : 'default'}
          onClick={() => {
            if (closeLink) {
              router.push(closeLink);
            } else {
              router.back();
            }
          }}
        >
          {title}
        </Text>
        <Icon as={IoChevronForwardOutline} size="md" />

        <Text fontSize="r2" fontWeight="500" color="gray.700">
          {member.name}
        </Text>
      </Box>

      <Box display="flex" gap="s32">
        {options?.length ? (
          <Popover placement="bottom-end">
            <PopoverTrigger>
              <Box display="flex" alignItems="center" justifyContent="center">
                <Button
                  variant="ghost"
                  colorScheme="gray"
                  color="gray.600"
                  fontSize="r1"
                  display="flex"
                  alignItems="center"
                  gap="s8"
                >
                  <Icon as={OptionsIcon} size="sm" />
                  <span>Options</span>
                </Button>
              </Box>
            </PopoverTrigger>
            <PopoverContent minWidth="180px" w="180px" color="white" boxShadow="E2">
              <PopoverBody px="0" py="0">
                <Grid>
                  {options.map(({ label, handler }) => (
                    <GridItem
                      px="s16"
                      py="s8"
                      _hover={{ bg: 'gray.100' }}
                      cursor="pointer"
                      onClick={handler}
                    >
                      <Text fontSize="s3" color="neutralColorLight.Gray-80">
                        {label}
                      </Text>
                    </GridItem>
                  ))}
                </Grid>
              </PopoverBody>
            </PopoverContent>
          </Popover>
        ) : null}

        <IconButton
          colorScheme="gray"
          variant="ghost"
          aria-label="close"
          color="gray.700"
          icon={<Icon as={VscChromeClose} size="lg" />}
          onClick={() => {
            if (closeLink) {
              router.push(closeLink);
            } else {
              router.back();
            }
          }}
        />
      </Box>
    </Box>
  );
};
