import { FormProvider, useForm } from 'react-hook-form';

import { KymCooperativeFormInput } from '@coop/cbs/data-access';
import { FormAddress } from '@coop/shared/form';
import { getKymCoopSection } from '@coop/shared/utils';

import { useCooperative } from '../../hooks/useCooperative';

interface IProps {
  setSection: (section?: { section: string; subSection: string }) => void;
}

export const KymCoopRegdAddress = (props: IProps) => {
  const { setSection } = props;
  const methods = useForm<KymCooperativeFormInput>({
    defaultValues: {},
  });
  useCooperative({ methods });
  // const router = useRouter();
  // const id = String(router?.query?.['id']);

  // const { mutate } = useSetCooperativeDataMutation();
  // useCooperative({ methods });
  // const {
  //   data: editValues,
  //   isLoading: editLoading,
  //   refetch,
  // } = useGetCoOperativeKymEditDataQuery(
  //   {
  //     id: id,
  //   },
  //   { enabled: id !== 'undefined' }
  // );

  // useEffect(() => {
  //   const subscription = watch(
  //     debounce((data) => {
  //       if (editValues && data) {
  //         mutate({ id: router.query['id'] as string, data });
  //         refetch();
  //       }
  //     }, 800)
  //   );

  //   return () => subscription.unsubscribe();
  // }, [watch, router.isReady, editValues]);

  // useEffect(() => {
  //   if (editValues) {
  //     const editValueData =
  //       editValues?.members?.cooperative?.formState?.data?.formData;

  //     reset({
  //       ...pickBy(
  //         editValues?.members?.cooperative?.formState?.data?.formData ?? {},
  //         (v) => v !== null
  //       ),
  //     });
  //   }
  // }, [editLoading]);

  // useEffect(() => {
  //   if (id) {
  //     refetch();
  //
  //   }
  // }, [id]);
  return (
    <FormProvider {...methods}>
      <form
        onFocus={(e) => {
          const kymSection = getKymCoopSection(e.target.id);
          setSection(kymSection);
        }}
      >
        <FormAddress
          sectionId="kymCoopAccRegisteredAddress"
          sectionHeader="kymCoopRegisteredAddress"
          name="registeredAddress"
        />
      </form>
    </FormProvider>
  );
};
