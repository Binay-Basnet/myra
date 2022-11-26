import { Meta, Story } from '@storybook/react';

import { MemberCard, MemberCardProps } from './MemberCard';

export default {
  component: MemberCard,
  title: 'Old Dump /MemberCard',
} as Meta;

const Template: Story<MemberCardProps> = (args) => <MemberCard {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  isInline: true,
  memberDetails: {
    name: 'Ram Kumar Pandey',
    avatar: 'https://bit.ly/dan-abramov',
    memberID: '23524364456',
    gender: 'Male',
    age: '43',
    maritalStatus: 'Unmarried',
    dateJoined: '2077/04/03',
    branch: 'Basantapur',
    phoneNo: '9841045567',
    email: 'ajitkumar.345@gmail.com',
    address: 'Basantapur',
  },
  notice: 'KYM needs to be updated',
  signaturePath: '/signature.jpg',
  citizenshipPath: '/citizenship.jpeg',
  accountInfo: {
    name: 'Kopila Karnadhar Saving',
    type: 'Mandatory Saving',
    ID: '100300010001324',
    currentBalance: '1,04,000.45',
    minimumBalance: '1000',
    guaranteeBalance: '1000',
    overdrawnBalance: '0',
    fine: '500',
    branch: 'Kumaripati',
    openDate: '2022-04-03',
    expiryDate: '2022-04-03',
    lastTransactionDate: '2022-04-03',
  },
};
