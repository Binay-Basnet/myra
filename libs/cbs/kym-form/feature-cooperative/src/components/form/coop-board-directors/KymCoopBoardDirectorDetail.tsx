import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { AiOutlinePlus } from 'react-icons/ai';
import { useRouter } from 'next/router';

import {
  KymCooperativeFormInput,
  useDeleteCooPdirectorDataMutation,
  useGetCoOperativeDirectorEditDataQuery,
  useGetNewIdMutation,
} from '@coop/cbs/data-access';
import { GroupContainer } from '@coop/cbs/kym-form/ui-containers';
import { Box, Button, Icon, Text } from '@coop/shared/ui';
import { useTranslation } from '@coop/shared/utils';

import { AddDirector } from '../../accordion-component/KymCoopDirectorAccordion';

interface IProps {
  setSection: (section?: { section: string; subSection: string }) => void;
}

export const KymCoopBoardDirectorDetail = (props: IProps) => {
  const { t } = useTranslation();
  const { setSection } = props;
  const methods = useForm<KymCooperativeFormInput>({
    defaultValues: {},
  });

  const router = useRouter();
  const id = String(router?.query?.['id']);

  const { control, handleSubmit, getValues, watch, setError } = methods;
  const [coopDirectorIds, setCoopDirectorIds] = useState<string[]>([]);

  const { data: editValues, refetch } = useGetCoOperativeDirectorEditDataQuery(
    {
      id: String(id),
    },
    { enabled: !!id }
  );

  useEffect(() => {
    if (editValues) {
      const editValueData =
        editValues?.members?.cooperative?.listDirectors?.data;

      setCoopDirectorIds(
        editValueData?.reduce(
          (prevVal, curVal) => (curVal ? [...prevVal, curVal.id] : prevVal),
          [] as string[]
        ) ?? []
      );
    }
  }, [editValues]);
  useEffect(() => {
    if (id) {
      refetch();
    }
  }, [id]);

  const { mutate: newIdMutate } = useGetNewIdMutation({
    onSuccess: (res) => {
      setCoopDirectorIds([...coopDirectorIds, res.newId]);
    },
  });
  const { mutate: deleteMutate } = useDeleteCooPdirectorDataMutation({
    onSuccess: (res) => {
      const deletedId = String(
        res?.members?.cooperative?.directorDetails?.Delete?.recordId
      );

      const tempDirectorIds = [...coopDirectorIds];

      tempDirectorIds.splice(tempDirectorIds.indexOf(deletedId), 1);

      setCoopDirectorIds([...tempDirectorIds]);
    },
  });
  const addCoopDirector = () => {
    newIdMutate({});
  };

  const removeDirector = (directorId: string) => {
    deleteMutate({ id: id, dirId: directorId });
  };

  return (
    <GroupContainer
      id="kymCoopAccBoardOfDirectorDetails"
      scrollMarginTop={'200px'}
    >
      <Text fontSize="r1" fontWeight="SemiBold">
        {t['kymCoopBoardofdirectordetails']}
      </Text>
      {coopDirectorIds.map((id, index) => {
        return (
          <Box key={id} display="flex" flexDirection={'column'}>
            <AddDirector
              setSection={setSection}
              directorId={id}
              removeDirector={removeDirector}
            />
          </Box>
        );
      })}
      <Button
        id="directorButton"
        alignSelf="start"
        leftIcon={<Icon size="md" as={AiOutlinePlus} />}
        variant="outline"
        onClick={() => {
          addCoopDirector();
        }}
      >
        {t['kymCoopAddDirector']}
      </Button>
    </GroupContainer>
  );
};
