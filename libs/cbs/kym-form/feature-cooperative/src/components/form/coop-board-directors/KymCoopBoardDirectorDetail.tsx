import React, { useEffect, useState } from 'react';
import { AiOutlinePlus } from 'react-icons/ai';
import { useRouter } from 'next/router';

import {
  useDeleteCooPdirectorDataMutation,
  useGetCoOperativeDirectorEditDataQuery,
  useGetNewIdMutation,
} from '@coop/cbs/data-access';
import { Button, FormSection, GridItem, Icon } from '@coop/shared/ui';
import { useTranslation } from '@coop/shared/utils';

import { AddDirector } from '../../accordion-component/KymCoopDirectorAccordion';

interface IProps {
  setSection: (section: { section: string; subSection: string }) => void;
}

export const KymCoopBoardDirectorDetail = (props: IProps) => {
  const { t } = useTranslation();
  const { setSection } = props;

  const router = useRouter();
  const id = String(router?.query?.['id']);

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
    <FormSection
      gridLayout={true}
      id="kymCoopAccBoardOfDirectorDetails"
      header="kymCoopBoardofdirectordetails"
    >
      {coopDirectorIds.map((id) => {
        return (
          <GridItem key={id} colSpan={3}>
            <AddDirector
              setSection={setSection}
              directorId={id}
              removeDirector={removeDirector}
            />
          </GridItem>
        );
      })}

      <GridItem colSpan={2}>
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
      </GridItem>
    </FormSection>
  );
};
