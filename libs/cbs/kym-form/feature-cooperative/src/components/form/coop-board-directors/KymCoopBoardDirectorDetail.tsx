import { useEffect, useState } from 'react';
import { AiOutlinePlus } from 'react-icons/ai';
import { useRouter } from 'next/router';

import {
  RootState,
  useAppSelector,
  useDeleteCooPdirectorDataMutation,
  useGetCoOperativeDirectorEditDataQuery,
  useGetNewIdMutation,
} from '@coop/cbs/data-access';
import { Button, FormSection, GridItem, Icon } from '@myra-ui';
import { useTranslation } from '@coop/shared/utils';

import { AddDirector } from '../../accordion-component/KymCoopDirectorAccordion';

interface IProps {
  setSection: (section?: { section: string; subSection: string }) => void;
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
      const editValueData = editValues?.members?.cooperative?.listDirectors?.data;

      setCoopDirectorIds(
        editValueData?.reduce(
          (prevVal, curVal) => (curVal ? [...prevVal, curVal.id as string] : prevVal),
          [] as string[]
        ) ?? []
      );
    }
  }, [editValues]);

  // refetch data when calendar preference is updated
  const preference = useAppSelector((state: RootState) => state?.auth?.preference);

  useEffect(() => {
    refetch();
  }, [preference?.date]);

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
      const deletedId = String(res?.members?.cooperative?.directorDetails?.Delete?.recordId);

      const tempDirectorIds = [...coopDirectorIds];

      tempDirectorIds.splice(tempDirectorIds.indexOf(deletedId), 1);

      setCoopDirectorIds([...tempDirectorIds]);
    },
  });
  const addCoopDirector = () => {
    newIdMutate({});
  };

  const removeDirector = (directorId: string) => {
    deleteMutate({ id, dirId: directorId });
  };

  return (
    <FormSection id="kymCoopAccBoardOfDirectorDetails" header="kymCoopBoardofdirectordetails">
      {coopDirectorIds.map((item) => (
        <GridItem key={item} colSpan={3}>
          <AddDirector setSection={setSection} directorId={item} removeDirector={removeDirector} />
        </GridItem>
      ))}

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
