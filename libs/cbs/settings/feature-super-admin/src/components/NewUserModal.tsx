import { FormProvider, useForm } from 'react-hook-form';
import { useRouter } from 'next/router';

import { asyncToast, Box, Grid, Modal } from '@myra-ui';

import {
  Id_Type,
  MyraUserInput,
  setAddUserData,
  useAppDispatch,
  useGetNewIdMutation,
  useGetUserRolesQuery,
  UserGender,
  useSetSettingsUserDataMutation,
} from '@coop/cbs/data-access';
import { ROUTES } from '@coop/cbs/utils';
import {
  FormBranchSelect,
  FormDatePicker,
  FormEmailInput,
  FormInput,
  FormPhoneNumber,
  FormSelect,
  FormSwitch,
} from '@coop/shared/form';

interface INewUserModalProps {
  isOpen: boolean;
  onClose: () => void;
  refetchUserList: () => void;
}

const genderOptions = [
  { label: 'Male', value: UserGender.Male },
  { label: 'Female', value: UserGender.Female },
  { label: 'Other', value: UserGender.Other },
];

type UserForm = Omit<MyraUserInput, 'branch' | 'role'> & {
  branch: { label: string; value: string }[];
  role: { label: string; value: string }[];
};

export const NewUserModal = ({ isOpen, onClose, refetchUserList }: INewUserModalProps) => {
  const router = useRouter();

  const methods = useForm<UserForm>({ defaultValues: { isCoreEmployee: false } });
  const { getValues, reset } = methods;

  const dispatch = useAppDispatch();

  const { mutateAsync: getNewId } = useGetNewIdMutation();
  const { mutateAsync: sendUserInvitation } = useSetSettingsUserDataMutation();
  const { data: userRoles } = useGetUserRolesQuery();

  const handleSendInvitation = () => {
    // console.log({ values: getValues() });
    getNewId({ idType: Id_Type.Myrauser }).then((res) => {
      asyncToast({
        id: 'create-new-user-modal',
        msgs: {
          success: 'New User Created',
          loading: 'Creating New User',
        },
        onSuccess: () => {
          refetchUserList();
          handleModalClose();
        },
        promise: sendUserInvitation({
          id: res.newId,
          data: {
            ...getValues(),
            role: getValues().role.map((r) => r.value),
            branch: getValues().branch.map((r) => r.value),
          },
        }),
      });
    });
  };

  const handleAddMoreDetails = () => {
    const formData = getValues();
    dispatch(
      setAddUserData({
        userData: { ...formData },
      })
    );

    getNewId({ idType: Id_Type.Myrauser }).then((res) => {
      router.push(`${ROUTES.SETTINGS_USERS_ADD}?id=${res.newId}`);
    });

    handleModalClose();
  };

  const handleModalClose = () => {
    reset({});
    onClose();
  };

  return (
    <Modal
      open={isOpen}
      onClose={handleModalClose}
      width="xl"
      title="Add User"
      linkButtonLabel="Add more details"
      linkButtonHandler={handleAddMoreDetails}
      primaryButtonLabel="Send Invitation"
      primaryButtonHandler={handleSendInvitation}
    >
      <FormProvider {...methods}>
        <form>
          <Box px="s12" py="s8" display="flex" flexDirection="column" gap="s24">
            <FormSwitch name="isCoreEmployee" label="This user is a core employee" />
            <FormInput isRequired type="text" name="name" label="Name" />
            <FormInput type="text" name="empCode" label="Employee Code" />
            <Grid templateColumns="repeat(2, 1fr)" rowGap="s24" columnGap="s20">
              <FormSelect isRequired name="gender" label="Gender" options={genderOptions} />
              <FormDatePicker isRequired name="dob" label="Date of Birth" maxToday />
              <FormPhoneNumber isRequired name="contactNo" label="Mobile No" />
              <FormEmailInput isRequired name="email" label="Email" />
            </Grid>
            <FormSelect
              isMulti
              isRequired
              menuPosition="fixed"
              name="role"
              label="Role"
              options={userRoles?.settings?.allRoles?.map((userRole) => ({
                label: userRole?.name as string,
                value: userRole?.id as string,
              }))}
            />
            <FormBranchSelect menuPosition="fixed" isMulti name="branch" label="Service Center" />
          </Box>
        </form>
      </FormProvider>
    </Modal>
  );
};
