import { IoChevronDownSharp, IoChevronUpSharp } from 'react-icons/io5';

import {
  Accordion,
  AccordionButton,
  AccordionItem,
  AccordionPanel,
  Box,
  FormSection,
  Icon,
  Text,
} from '@myra-ui';

import { FormTextArea } from '@coop/shared/form';

export const ExitQuetionnare = () => (
  <FormSection flexLayout>
    <Accordion allowToggle defaultIndex={0}>
      <AccordionItem bg="transparent" border="none">
        {({ isExpanded }) => (
          <>
            <AccordionButton
              border="none"
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              // _hover={{
              //   bg: 'highlight.500',
              //   borderRadius: 'br2',
              // }}
              _expanded={{}}
              pl="s8"
              w="100%"
              pr="0"
            >
              <Text
                color="gray.800"
                fontWeight="500"
                w="fit-content"
                fontSize="r1"
                _hover={{
                  cursor: 'pointer',
                  textDecoration: 'underline',
                }}
              >
                Organization
              </Text>
              <Box
                _hover={{
                  bg: 'gray.200',
                  borderRadius: 'br2',
                }}
                p="s8"
                display="flex"
                alignItems="center"
              >
                <Icon
                  as={isExpanded ? IoChevronUpSharp : IoChevronDownSharp}
                  color="gray.800"
                  flexShrink={0}
                />
              </Box>
            </AccordionButton>

            <AccordionPanel px="s8" py="s16">
              <Box display="flex" flexDirection="column" gap="s24">
                <Box display="flex" flexDirection="column" gap="s16">
                  <Box display="flex" flexDirection="column" gap="s4">
                    <Text color="gray.800" fontWeight="600" w="fit-content" fontSize="r1">
                      Future Intentions
                    </Text>
                    <Text fontWeight="500" fontSize="s3">
                      Do you see yourself working for this organization again in the future?
                    </Text>
                  </Box>
                  <FormTextArea name="futureIntentions" noLabel placeholder="Enter Details" />
                </Box>
                <Box display="flex" flexDirection="column" gap="s16">
                  <Box display="flex" flexDirection="column" gap="s4">
                    <Text color="gray.800" fontWeight="600" w="fit-content" fontSize="r1">
                      Overall Experience{' '}
                    </Text>
                    <Text fontWeight="500" fontSize="s3">
                      What did you like the most of the organization?
                    </Text>
                  </Box>
                  <FormTextArea name="overallExp" placeholder="Enter Details" noLabel />
                </Box>
                <Box display="flex" flexDirection="column" gap="s16">
                  <Box display="flex" flexDirection="column" gap="s4">
                    <Text color="gray.800" fontWeight="600" w="fit-content" fontSize="r1">
                      Suggestions for Improvement{' '}
                    </Text>
                    <Text fontWeight="500" fontSize="s3">
                      Do you have any suggestions for how hte company or management oculd do to
                      improve staff welfare?{' '}
                    </Text>
                  </Box>
                  <FormTextArea name="suggestions" placeholder="Enter Details" noLabel />
                </Box>
                <Box display="flex" flexDirection="column" gap="s16">
                  <Box display="flex" flexDirection="column" gap="s4">
                    <Text color="gray.800" fontWeight="600" w="fit-content" fontSize="r1">
                      Others
                    </Text>
                    <Text fontWeight="500" fontSize="s3">
                      Anything you wish to share with us.
                    </Text>
                  </Box>
                  <FormTextArea name="others" placeholder="Enter Details" noLabel />
                </Box>
              </Box>
            </AccordionPanel>
          </>
        )}
      </AccordionItem>
    </Accordion>
  </FormSection>
);
