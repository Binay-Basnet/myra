import { IoAddOutline } from 'react-icons/io5';
import { useDisclosure } from '@chakra-ui/react';

import { Box, Grid, Icon, Text } from '@myra-ui';

import { AddMinutesModal } from '../components/AddMinutesModal';
import { MimutesFiles } from '../components/MinutesFiles';
import { MinutesNotes } from '../components/NotesMinutes';

export const Minutes = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      {' '}
      <Box display="flex" flexDirection="column" gap="s16">
        <Text fontSize="r3" fontWeight="600">
          Minutes
        </Text>
        <Grid templateColumns="repeat(3,1fr)" gap="s20">
          <Box
            display="flex"
            justifyContent="flex-start"
            alignItems="center"
            bg="white"
            borderRadius="br2"
            gap="s12"
            h="58px"
            pl="s16"
            cursor="pointer"
            boxShadow="E0"
            onClick={() => onOpen()}
          >
            <Icon color="primary.500" as={IoAddOutline} />

            <Text fontWeight="500" fontSize="s3">
              Add Minutes
            </Text>
          </Box>
        </Grid>

        <MimutesFiles />
        <MinutesNotes />
      </Box>
      <AddMinutesModal isOpen={isOpen} onClose={onClose} />
    </>
  );
};
