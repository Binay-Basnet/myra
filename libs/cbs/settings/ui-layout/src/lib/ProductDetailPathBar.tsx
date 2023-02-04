import { IoChevronForwardOutline, IoClose } from 'react-icons/io5';
import { useRouter } from 'next/router';

import {
  Box,
  Button,
  Grid,
  GridItem,
  Icon,
  IconButton,
  OptionsIcon,
  Popover,
  PopoverBody,
  PopoverContent,
  PopoverTrigger,
  Text,
} from '@myra-ui';

export interface DetailPathBarProps {
  title: string;
  name: React.ReactNode;
  closeLink?: string;
  optionsHeader?: {
    label: string;
    link: string;
  }[];
}

export const ProductDetailPathBar = ({
  title,
  name,
  optionsHeader,
  closeLink,
}: DetailPathBarProps) => {
  const router = useRouter();

  return (
    <Box position="sticky" top="0" zIndex={10}>
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
          <Text fontSize="r2" fontWeight="500" color="gray.700">
            {title}
          </Text>
          <Icon as={IoChevronForwardOutline} size="md" />
          <Text fontSize="r2" fontWeight="Medium" color="gray.800" lineHeight="150%">
            {name}
          </Text>
          {/* <Icon as={BsPinAngle} size="md" /> */}
        </Box>

        <Box display="flex" gap="s32">
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
                  {optionsHeader?.map((item) => (
                    <GridItem px="s16" py="s8" _hover={{ bg: 'gray.100' }} cursor="pointer">
                      <Text variant="bodyRegular" color="neutralColorLight.Gray-80">
                        {item.label ?? '-'}
                      </Text>
                    </GridItem>
                  ))}
                </Grid>
              </PopoverBody>
            </PopoverContent>
          </Popover>

          <IconButton
            variant="ghost"
            aria-label="close"
            color="gray.500"
            height="40px"
            icon={<Icon as={IoClose} size="lg" />}
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
    </Box>
  );
};
