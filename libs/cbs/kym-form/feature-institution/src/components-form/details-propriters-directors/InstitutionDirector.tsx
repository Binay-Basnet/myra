import React from 'react';
import { useFieldArray, useFormContext } from 'react-hook-form';
import { AiOutlineDelete, AiOutlinePlus } from 'react-icons/ai';
import { IoChevronDownOutline, IoChevronUpOutline } from 'react-icons/io5';
import { CloseIcon } from '@chakra-ui/icons';

import {
  Box,
  Button,
  Collapse,
  FormSection,
  Grid,
  GridItem,
  Icon,
  IconButton,
  Text,
} from '@myra-ui';

import { KymInsInput } from '@coop/cbs/data-access';
import { SectionContainer } from '@coop/cbs/kym-form/ui-containers';
import { useTranslation } from '@coop/shared/utils';

import { DirectorsWithAffliation, DirectorTopPart, DocumentComponent } from './AccordianComponents';

interface IAddDirector {
  removeDirector: () => void;
  index: number;
}

const AddDirector = ({ removeDirector, index }: IAddDirector) => {
  const { t } = useTranslation();

  const [isOpen, setIsOpen] = React.useState(true);

  return (
    <>
      <Box display="flex" alignItems="center">
        <Box
          flex={1}
          px="s16"
          h="60px"
          bg="gray.200"
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          cursor="pointer"
          onClick={() => setIsOpen(!isOpen)}
        >
          <Text fontSize="r1">{`Director${index + 1}`}</Text>
          <Box>
            {isOpen ? (
              <IconButton
                size="xs"
                variant="ghost"
                aria-label="close"
                icon={<Icon as={IoChevronUpOutline} />}
              />
            ) : (
              <IconButton
                size="xs"
                variant="ghost"
                aria-label="close"
                icon={<Icon as={IoChevronDownOutline} />}
              />
            )}
          </Box>
        </Box>
        {!isOpen && (
          <IconButton
            size="sm"
            variant="ghost"
            aria-label="close"
            icon={<CloseIcon />}
            ml="s16"
            onClick={() => {
              removeDirector();
            }}
          />
        )}
      </Box>

      {/* <DynamicBoxGroupContainer> */}
      <Collapse in={isOpen} style={{ marginTop: '0px' }}>
        <SectionContainer
          pt="s16"
          mt="0"
          border="1px solid"
          borderColor="border.layout"
          borderBottom={0}
          borderRadius="4px"
          borderBottomRadius={0}
        >
          <DirectorTopPart index={index} />
          <DocumentComponent index={index} />
          <DirectorsWithAffliation index={index} />
        </SectionContainer>

        <Box
          display="flex"
          justifyContent="flex-end"
          border="1px solid"
          borderTop="none"
          borderColor="border.layout"
          alignItems="center"
          h="60px"
          px="s20"
        >
          {/* <Button
              variant="ghost"
              leftIcon={<GrRotateRight />}
              // onClick={resetDirectorForm}
            >
              {t['kymInsReset']}
            </Button> */}
          <Button
            variant="outline"
            shade="danger"
            leftIcon={<AiOutlineDelete height="11px" />}
            onClick={() => {
              removeDirector();
            }}
          >
            {t['kymInsDelete']}
          </Button>
        </Box>

        {/* </AccordianContainer> */}
      </Collapse>
      {/* </DynamicBoxGroupContainer> */}
    </>
  );
};

export const BoardDirectorInfo = () => {
  const { t } = useTranslation();

  // const { data: editValues } = useGetInsBoardDirectorEditListQuery(
  //   {
  //     id: String(id),
  //   },
  //   { enabled: !!id }
  // );
  // useEffect(() => {
  //   if (editValues) {
  //     const editValueData = editValues?.members?.institution?.listDirectors?.data;

  //     setDirectorIds(
  //       editValueData?.reduce(
  //         (prevVal, curVal) => (curVal?.id ? [...prevVal, curVal.id] : prevVal),
  //         [] as string[]
  //       ) ?? []
  //     );
  //   }
  // }, [editValues]);

  // const { mutate: deleteMutate } = useDeleteDirectorInstitutionMutation({
  //   onSuccess: (res) => {
  //     const deletedId = String(res?.members?.institution?.director?.Delete?.recordId);
  //     const tempDirectorIds = [...directorIds];
  //     tempDirectorIds.splice(tempDirectorIds.indexOf(deletedId), 1);
  //     setDirectorIds([...tempDirectorIds]);
  //   },
  // });

  const { control } = useFormContext<KymInsInput>();

  const { append, fields, remove } = useFieldArray({
    control,
    name: 'director',
  });

  return (
    <FormSection
      id="kymInsDetailsofProprietorPartnersDirectors"
      header="kymInsDetailsofProprietorPartnersDirectors"
    >
      <GridItem colSpan={3}>
        <Grid gap="s16">
          {fields.map((field, index) => (
            <Box key={field.id} display="flex" flexDirection="column">
              <AddDirector removeDirector={() => remove(index)} index={index} />
            </Box>
          ))}
          <GridItem colSpan={1}>
            <Button
              id="addDirectorButton"
              alignSelf="start"
              leftIcon={<Icon size="md" as={AiOutlinePlus} />}
              variant="outline"
              onClick={() => {
                append({
                  documents: [
                    {
                      fieldId: 'photograph',
                      identifiers: [],
                    },
                    {
                      fieldId: 'documentPhotograph',
                      identifiers: [],
                    },
                  ],
                });
              }}
            >
              {t['kymInsAddDirector']}
            </Button>
          </GridItem>
        </Grid>
      </GridItem>
    </FormSection>
  );
};
