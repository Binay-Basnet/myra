import React, { useEffect, useState } from 'react';
import { FormProvider, useFieldArray, useForm } from 'react-hook-form';
import { AiOutlinePlus } from 'react-icons/ai';
import { useRouter } from 'next/router';
import { CloseIcon } from '@chakra-ui/icons';
import debounce from 'lodash/debounce';

import {
  DynamicBoxContainer,
  DynamicBoxGroupContainer,
  GroupContainer,
} from '@coop/cbs/kym-form/ui-containers';
import {
  KymInsInput,
  useGetNewIdMutation,
  useSetInstitutionDataMutation,
} from '@coop/shared/data-access';
import { FormInput } from '@coop/shared/form';
// import { KymIndMemberInput } from '@coop/shared/data-access';
import { Box, Button, Grid, Icon, Text } from '@coop/shared/ui';
import { getKymSectionInstitution, useTranslation } from '@coop/shared/utils';

interface IAddSisterConcern {
  index: number;
  removeSister: () => void;
}

const AddSister = ({ index, removeSister }: IAddSisterConcern) => {
  const { t } = useTranslation();
  return (
    <DynamicBoxContainer>
      <CloseIcon
        cursor="pointer"
        onClick={removeSister}
        color="gray.500"
        _hover={{
          color: 'gray.900',
        }}
        aria-label="close"
        alignSelf="flex-end"
      />
      <Grid templateColumns={'repeat(2, 1fr)'} gap="s20">
        <FormInput
          type="text"
          bg="white"
          name={`sisterConcernDetails.${index}.name`}
          label={t['kymInsNameofSisterConcern']}
          placeholder={t['kymInsEnterNameofSisterConcern']}
        />
        <FormInput
          type="text"
          bg="white"
          name={`sisterConcernDetails.${index}.natureOfBusiness`}
          label={t['kymInsNatureofBusiness']}
          placeholder={t['kymInsNatureofBusiness']}
        />
        <FormInput
          type="text"
          bg="white"
          name={`sisterConcernDetails.${index}.address`}
          label={t['kymInsAddress']}
          placeholder={t['kymInsAddress']}
        />
        <FormInput
          type="text"
          bg="white"
          name={`sisterConcernDetails.${index}.phoneNo`}
          label={t['kymInsPhoneNo']}
          placeholder={t['kymInsEnterPhoneNumber']}
        />
      </Grid>
    </DynamicBoxContainer>
  );
};

interface IProps {
  setSection: (section?: { section: string; subSection: string }) => void;
}

export const InstitutionKYMSisterConcernDetails = (props: IProps) => {
  const { t } = useTranslation();
  const methods = useForm<KymInsInput>({
    defaultValues: {},
  });
  const { setSection } = props;

  const router = useRouter();

  const { control, handleSubmit, getValues, watch, setError } = methods;
  const { mutate } = useSetInstitutionDataMutation({
    onSuccess: (res) => {
      setError('institutionName', {
        type: 'custom',
        message:
          res?.members?.institution?.add?.error?.error?.['institutionName'][0],
      });
    },
    onError: () => {
      setError('institutionName', {
        type: 'custom',
        message: 'it is what it is',
      });
    },
  });
  useEffect(() => {
    const subscription = watch(
      debounce((data) => {
        // console.log(editValues);
        // if (editValues && data) {
        mutate({ id: router.query['id'] as string, data });
        //   refetch();
        // }
      }, 800)
    );

    return () => subscription.unsubscribe();
  }, [watch, router.isReady]);
  const {
    fields: sisterFields,
    append: sisterAppend,
    remove: sisterRemove,
  } = useFieldArray<any>({ control, name: 'sisterConcernDetails' });

  const [sisterIds, setSisterIds] = useState<string[]>([]);

  const { mutate: newIdMutate } = useGetNewIdMutation({
    onSuccess: (res) => {
      setSisterIds([...sisterIds, 'asdasdas']);
    },
  });

  const addSister = () => {
    newIdMutate({});
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
          id="kymInsDetailsofsisterconcern"
          scrollMarginTop={'200px'}
        >
          <Text fontSize="r1" fontWeight="SemiBold">
            {t['kymInsDetailsofsisterconcern']}
          </Text>

          <div>
            <DynamicBoxGroupContainer>
              {sisterFields.map((item, index) => {
                return (
                  <Box key={item.id}>
                    <AddSister
                      index={index}
                      removeSister={() => sisterRemove(index)}
                    />
                  </Box>
                );
              })}
              <Button
                id="sisterConcernButton"
                alignSelf="start"
                leftIcon={<Icon size="md" as={AiOutlinePlus} />}
                variant="outline"
                onClick={() => {
                  sisterAppend({});
                }}
              >
                {t['kymInsNewDetail']}
              </Button>
            </DynamicBoxGroupContainer>
          </div>
        </GroupContainer>
      </form>
    </FormProvider>
  );
};
