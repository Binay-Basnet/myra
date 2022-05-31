import UsersLayout from '../../../components/SettingsLayout/UsersLayout';
const Users = () => {
  return <> Users</>;
};

export default Users;
Users.getLayout = function getLayout(page) {
  return <UsersLayout>{page}</UsersLayout>;
};
