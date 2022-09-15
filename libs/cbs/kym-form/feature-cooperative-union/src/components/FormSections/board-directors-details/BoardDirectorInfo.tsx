import React, { useEffect, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { AiOutlineDelete, AiOutlinePlus } from 'react-icons/ai';
import { IoChevronDownOutline, IoChevronUpOutline } from 'react-icons/io5';
import { useRouter } from 'next/router';
import { CloseIcon } from '@chakra-ui/icons';

import {
  CoopUnionPersonnelInput,
  useDeletePersonnelDetailsMutation,
  useGetBoardOfDirectorsDetailsListQuery,
  useGetNewIdMutation,
} from '@coop/cbs/data-access';
import { KYMDocumentField } from '@coop/cbs/kym-form/formElements';
import {
  DynamicBoxGroupContainer,
  InputGroupContainer,
  SectionContainer,
} from '@coop/cbs/kym-form/ui-containers';
import {
  FormAddress,
  FormEmailInput,
  FormInput,
  FormSwitch,
} from '@coop/shared/form';
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
} from '@coop/shared/ui';
import {
  getKymSectionCoOperativeUnion,
  useTranslation,
} from '@coop/shared/utils';

import { BoardOfDirectorRelatedTraining } from './TrainingRelatedToCooperatives';
import { useCoopUnionBod } from '../../../hooks/useCoopUnionBod';

interface IAddDirectorProps {
  removeDirector: (directorId: string) => void;
  index: number;
  directorId: string;
  setSection: (section?: { section: string; subSection: string }) => void;
}

const AddDirector = ({
  removeDirector,
  index,
  directorId,
  setSection,
}: IAddDirectorProps) => {
  const { t } = useTranslation();

  const [isOpen, setIsOpen] = React.useState(true);
  const methods = useForm<CoopUnionPersonnelInput>();
  const { watch, control } = methods;

  useCoopUnionBod({ methods, directorId });

  const isPermanentAndTemporaryAddressSame = watch(
    `isPermanentAndTemporaryAddressSame`
  );

  return (
    <>
      <Box display="flex" alignItems="center">
        <Box
          flex={1}
          px={'s12'}
          py={3}
          bg="gray.200"
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          cursor={'pointer'}
          onClick={() => setIsOpen(!isOpen)}
          h="60px"
        >
          <Text fontSize="r1">{`Director ${index + 1}`}</Text>
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
            onClick={() => removeDirector(directorId)}
          />
        )}
      </Box>

      {/* <DynamicBoxGroupContainer> */}
      <Collapse in={isOpen} style={{ marginTop: '0px' }}>
        <DynamicBoxGroupContainer
          border="1px solid"
          p="s20"
          borderColor="border.layout"
        >
          <SectionContainer>
            <FormProvider {...methods}>
              <form
                onFocus={(e) => {
                  const kymSection = getKymSectionCoOperativeUnion(e.target.id);

                  setSection(kymSection);
                }}
              >
                <Box display="flex" flexDirection="column" gap="s32">
                  <Box display="flex" flexDirection="column" gap="s16">
                    <InputGroupContainer>
                      <FormInput
                        type="text"
                        name={`fullName`}
                        id="boardOfDirectors.fullName"
                        label={t['kymCoopUnionFullName']}
                      />
                      <FormInput
                        type="text"
                        name={`designationEn`}
                        id="boardOfDirectors.designationEn"
                        label={t['kymCoopUnionDesignation']}
                      />
                    </InputGroupContainer>

                    <Text fontSize="r1" fontWeight="SemiBold">
                      {t['kymCoopUnionPermanentAddress']}
                    </Text>

                    <InputGroupContainer>
                      <FormAddress name="permanentAddress" />
                    </InputGroupContainer>
                  </Box>

                  <Box display="flex" flexDirection="column" gap="s16">
                    <Box
                      id="Temporary Address"
                      gap="s16"
                      display={'flex'}
                      flexDirection="column"
                      scrollMarginTop={'200px'}
                    >
                      <Text fontSize="r1" fontWeight="SemiBold">
                        {t['kymCoopUnionTemporaryAddress']}
                      </Text>

                      <FormSwitch
                        control={control}
                        id="boardOfDirectors.isPermanentAndTemporaryAddressSame"
                        name={`isPermanentAndTemporaryAddressSame`}
                        label={t['kymCoopUnionTemporaryAddressPermanent']}
                      />
                      {!isPermanentAndTemporaryAddressSame && (
                        <InputGroupContainer>
                          <FormAddress name="temporaryAddress" />
                        </InputGroupContainer>
                      )}

                      <Box />
                    </Box>
                    <InputGroupContainer>
                      <FormInput
                        type="date"
                        name={`dateOfMembership`}
                        id="boardOfDirectors.dateOfMembership"
                        label={t['kymCoopUnionDateOfMembership']}
                      />
                      <FormInput
                        type="text"
                        name={`highestQualification`}
                        id="boardOfDirectors.highestQualification"
                        label={t['kymCoopUnionHighestQualification']}
                      />
                      <FormInput
                        type="number"
                        name={`mobileNumber`}
                        id="boardOfDirectors.mobileNumber"
                        label={t['kymCoopUnionMobileNo']}
                      />
                      <FormEmailInput
                        type="text"
                        name={`email`}
                        id="boardOfDirectors.email"
                        label={t['kymCoopUnionEmail']}
                      />
                      <FormInput
                        type="string"
                        name={`citizenshipNo`}
                        id="boardOfDirectors.citizenshipNo"
                        label={
                          t['kymCoopUnionCitizenshipPassportDrivingLicenseNo']
                        }
                      />
                      <FormInput
                        type="string"
                        name={`panNo`}
                        id="boardOfDirectors.panNo"
                        label={t['kymCoopUnionPANNo']}
                      />
                    </InputGroupContainer>
                  </Box>
                  <BoardOfDirectorRelatedTraining />
                </Box>
              </form>
            </FormProvider>

            <Grid
              templateColumns="repeat(2, 1fr)"
              mt="s32"
              rowGap="s32"
              columnGap="s20"
            >
              <KYMDocumentField
                mutationId={directorId}
                label={t['kymCoopUnionPhotograph']}
                name={`photograph`}
                setKymCurrentSection={setSection}
                getKymSection={getKymSectionCoOperativeUnion}
              />
              <KYMDocumentField
                mutationId={directorId}
                label={t['kymCoopUnionPhotographOfIdentityProofDocument']}
                name={`identityDocumentPhoto`}
                setKymCurrentSection={setSection}
                getKymSection={getKymSectionCoOperativeUnion}
              />
            </Grid>
          </SectionContainer>
        </DynamicBoxGroupContainer>

        <Box
          display="flex"
          justifyContent="flex-end"
          border="1px solid"
          borderColor="border.layout"
          alignItems={'center'}
          h="60px"
          px="s20"
        >
          <Button
            variant="outline"
            shade="danger"
            leftIcon={<AiOutlineDelete height="11px" />}
            onClick={() => removeDirector(directorId)}
          >
            {t['kymInsDelete']}
          </Button>
        </Box>
      </Collapse>
    </>
  );
};

interface IBoardDirectorInfoProps {
  setSection: (section?: { section: string; subSection: string }) => void;
}

export const BoardDirectorInfo = ({ setSection }: IBoardDirectorInfoProps) => {
  const { t } = useTranslation();

  const router = useRouter();

  const id = router?.query?.['id'];

  const [directorIds, setDirectorIds] = useState<string[]>([]);

  const { data: bodEditValues } = useGetBoardOfDirectorsDetailsListQuery(
    {
      id: String(id),
    },
    {
      enabled: !!id,
    }
  );

  useEffect(() => {
    if (bodEditValues) {
      const editValueData =
        bodEditValues?.members?.cooperativeUnion?.formState?.formData
          ?.boardOfDirectorsDetails?.data?.personnelDetails;

      setDirectorIds(
        editValueData?.reduce(
          (prevVal, curVal) => (curVal?.id ? [...prevVal, curVal.id] : prevVal),
          [] as string[]
        ) ?? []
      );
    }
  }, [bodEditValues]);

  const { mutate: newIdMutate } = useGetNewIdMutation({
    onSuccess: (res) => {
      setDirectorIds([...directorIds, res.newId]);
    },
  });

  const { mutate: deleteMutation } = useDeletePersonnelDetailsMutation({
    onSuccess: (res) => {
      const deletedId = String(
        res?.members?.cooperativeUnion?.deletePersonnel?.recordId
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
    deleteMutation({ personnelId: directorId });
  };

  return (
    <FormSection
      id="kymCoopUnionAccDetailsofProprietor"
      header="kymCoopUnionBoardOfDirectorDetails"
    >
      <GridItem colSpan={3}>
        <Grid gap="s16">
          {directorIds.map((directorId, index) => {
            return (
              <Box
                key={directorId}
                display="flex"
                flexDirection={'column'}
                id="Details of Proprietor, Partners, Directors."
                scrollMarginTop={'200px'}
              >
                <AddDirector
                  index={index}
                  directorId={directorId}
                  removeDirector={removeDirector}
                  setSection={setSection}
                />
              </Box>
            );
          })}
          <GridItem colSpan={1}>
            <Button
              id="boardOfDirectors.directordetailsButton"
              alignSelf="start"
              leftIcon={<Icon size="md" as={AiOutlinePlus} />}
              variant="outline"
              onClick={addDirector}
            >
              {t['kymCoopUnionAddDirector']}
            </Button>
          </GridItem>
        </Grid>
      </GridItem>
    </FormSection>
  );
};