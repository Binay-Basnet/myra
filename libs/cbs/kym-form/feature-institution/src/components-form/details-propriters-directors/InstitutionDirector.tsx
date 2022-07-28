import React, { useEffect, useMemo, useState } from 'react';
import {
  FormProvider,
  useFieldArray,
  useForm,
  useFormContext,
} from 'react-hook-form';
import { AiOutlineDelete, AiOutlinePlus } from 'react-icons/ai';
import { FaMap } from 'react-icons/fa';
import { GrRotateRight } from 'react-icons/gr';
import { IoChevronDownOutline, IoChevronUpOutline } from 'react-icons/io5';
import { useRouter } from 'next/router';
import { CloseIcon } from '@chakra-ui/icons';
import debounce from 'lodash/debounce';

import {
  GroupContainer,
  InputGroupContainer,
  SectionContainer,
} from '@coop/cbs/kym-form/ui-containers';
import {
  KymInsDirectorInput,
  useAllAdministrationQuery,
  useDeleteDirectorInstitutionMutation,
  useGetInsBoardDirectorEditListQuery,
  useGetNewIdMutation,
  useSetAddDirectorInstitutionMutation,
} from '@coop/shared/data-access';
import {
  FormFileInput,
  FormInput,
  FormMap,
  FormSelect,
  FormSwitch,
} from '@coop/shared/form';
import {
  Box,
  Button,
  Collapse,
  Grid,
  Icon,
  IconButton,
  Text,
} from '@coop/shared/ui';
import { getKymSectionInstitution, useTranslation } from '@coop/shared/utils';

import {
  DirectorsWithAffliation,
  DirectorTopPart,
  DocumentComponent,
} from './AccordianComponents';
interface IAddDirector {
  removeDirector: (directorId: string) => void;
  setKymCurrentSection: (section?: {
    section: string;
    subSection: string;
  }) => void;
  directorId: string;
}

const AddDirector = ({
  removeDirector,
  setKymCurrentSection,
  directorId,
}: IAddDirector) => {
  const { t } = useTranslation();
  const methods = useForm();

  const { watch } = methods;

  const router = useRouter();

  const id = String(router?.query?.['id']);

  const { mutate } = useSetAddDirectorInstitutionMutation();

  useEffect(() => {
    const subscription = watch(
      debounce((data) => {
        mutate({ id, dir: directorId, data: { ...data } });
      }, 800)
    );

    return () => subscription.unsubscribe();
  }, [watch, router.isReady]);

  const { data } = useAllAdministrationQuery();

  const { getValues, reset } = useFormContext();

  const [isOpen, setIsOpen] = React.useState(true);

  return (
    <FormProvider {...methods}>
      <form
        onFocus={(e) => {
          const kymSection = getKymSectionInstitution(e.target.id);
          setKymCurrentSection(kymSection);
        }}
      >
        <Box display="flex" alignItems="center">
          <Box
            flex={1}
            px={'s16'}
            h="60px"
            bg="gray.200"
            display="flex"
            justifyContent={'space-between'}
            alignItems="center"
            cursor={'pointer'}
            onClick={() => setIsOpen(!isOpen)}
          >
            <Text fontSize="r1">{`Director`}</Text>
            <Box>
              {isOpen ? (
                <IconButton
                  size="xs"
                  variant={'ghost'}
                  aria-label="close"
                  icon={<Icon as={IoChevronUpOutline} />}
                />
              ) : (
                <IconButton
                  size="xs"
                  variant={'ghost'}
                  aria-label="close"
                  icon={<Icon as={IoChevronDownOutline} />}
                />
              )}
            </Box>
          </Box>
          {!isOpen && (
            <IconButton
              size="sm"
              variant={'ghost'}
              aria-label="close"
              icon={<CloseIcon />}
              ml="s16"
              onClick={() => {
                removeDirector(directorId);
              }}
            />
          )}
        </Box>

        {/* <DynamicBoxGroupContainer> */}
        <Collapse in={isOpen} style={{ marginTop: '0px' }}>
          <SectionContainer
            pt="s16"
            mt="0"
            border={'1px solid'}
            borderColor="border.layout"
            borderRadius={'4px'}
            gap="s32"
            px="s20"
            pb="s20"
          >
            <DirectorTopPart
              removeDirector={removeDirector}
              directorId={directorId}
              setKymCurrentSection={setKymCurrentSection}
            />
            <DocumentComponent setSection={setKymCurrentSection} />
            <DirectorsWithAffliation
              directorId={directorId}
              removeDirector={removeDirector}
              setKymCurrentSection={setKymCurrentSection}
            />
          </SectionContainer>

          <Box
            display="flex"
            justifyContent="space-between"
            border="1px solid"
            borderColor="border.layout"
            alignItems={'center'}
            h="60px"
            px="s20"
          >
            <Button
              variant="ghost"
              leftIcon={<GrRotateRight />}
              // onClick={resetDirectorForm}
            >
              {t['kymInsReset']}
            </Button>
            <Button
              variant="outline"
              shade="danger"
              leftIcon={<AiOutlineDelete height="11px" />}
              onClick={() => {
                removeDirector(directorId);
              }}
            >
              {t['kymInsDelete']}
            </Button>
          </Box>

          {/* </AccordianContainer> */}
        </Collapse>
        {/* </DynamicBoxGroupContainer> */}
      </form>
    </FormProvider>
  );
};

interface IProps {
  setSection: (section?: { section: string; subSection: string }) => void;
}

export const BoardDirectorInfo = (props: IProps) => {
  const { t } = useTranslation();
  const methods = useForm<KymInsDirectorInput>({
    defaultValues: {},
  });
  const { setSection } = props;

  const router = useRouter();
  const id = String(router?.query?.['id']);

  const { control, handleSubmit, getValues, watch, setError } = methods;

  const [directorIds, setDirectorIds] = useState<string[]>([]);

  const { data: editValues } = useGetInsBoardDirectorEditListQuery(
    {
      id: String(id),
    },
    { enabled: !!id }
  );
  useEffect(() => {
    if (editValues) {
      const editValueData =
        editValues?.members?.institution?.listDirectors?.data;

      setDirectorIds(
        editValueData?.reduce(
          (prevVal, curVal) => (curVal ? [...prevVal, curVal.id] : prevVal),
          [] as string[]
        ) ?? []
      );
    }
  }, [editValues]);

  const { mutate: newIdMutate } = useGetNewIdMutation({
    onSuccess: (res) => {
      setDirectorIds([...directorIds, res.newId]);
    },
  });
  const { mutate: deleteMutate } = useDeleteDirectorInstitutionMutation({
    onSuccess: (res) => {
      const deletedId = String(
        res?.members?.institution?.director?.Delete?.recordId
      );

      const tempDirectorIds = [...directorIds];

      tempDirectorIds.splice(tempDirectorIds.indexOf(deletedId), 1);

      setDirectorIds([...tempDirectorIds]);
    },
  });
  const addDirector = () => {
    newIdMutate({});
  };

  const removeDirector = (directorId: string) => {
    deleteMutate({ insId: id, dir: directorId });
  };
  return (
    <FormProvider {...methods}>
      <form
        onFocus={(e) => {
          const kymSection = getKymSectionInstitution(e.target.id);
          setSection(kymSection);
        }}
      >
        <GroupContainer
          gap={'s16'}
          id="kymInsDetailsofProprietorPartnersDirectors"
          scrollMarginTop={'200px'}
        >
          <Text fontSize="r1" fontWeight="SemiBold">
            {t['kymInsDetailsofProprietorPartnersDirectors']}
          </Text>
          {directorIds.map((id) => {
            return (
              <Box
                key={id}
                display="flex"
                flexDirection={'column'}
                // gap="s16"
                // border="1px solid"
                // borderColor="border.layout"
              >
                <AddDirector
                  setKymCurrentSection={setSection}
                  removeDirector={removeDirector}
                  directorId={id}
                />
              </Box>
            );
          })}
          <Button
            id="addDirectorButton"
            alignSelf="start"
            leftIcon={<Icon size="md" as={AiOutlinePlus} />}
            variant="outline"
            onClick={() => {
              addDirector();
            }}
          >
            {t['kymInsAddDirector']}
          </Button>
        </GroupContainer>
      </form>
    </FormProvider>
  );
};
