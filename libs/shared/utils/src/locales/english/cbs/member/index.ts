import { cooperativeEn } from './cooperative';
import { cooperativeUnionEn } from './cooperative-union';
import { individualEn } from './individual';
import { institutionEn } from './institution';

export const memberEn: Record<string, string> = {
  // member page
  activeMembers: 'Active Members',
  inactiveMembers: 'Inactive Members',
  minorMembers: 'Minor Members',
  membersAddNewMembers: 'Add New Members',
  memberList: 'Members',
  balanceReport: 'Member Reports',
  memberDetails: 'Member Details',
  memberSettings: 'Member Settings',
  newIndividual: 'New Individual',
  newInstitution: 'New Institution',
  newCooperative: 'New Cooperative',
  newCooperativeUnion: 'New Cooperative Union',

  // member list table
  memberListTableMemberId: 'Member Id',
  memberListTableActiveDate: 'Active Date',
  memberListTableMemberCode: 'Member Code',
  memberListTableName: 'Name',
  memberListTableAddress: 'Address',
  memberListTablePhoneNo: 'Phone No.',
  memberListTableServiceCenter: 'Service Center',
  memberListTableViewMemberProfile: 'View Member Profile',
  memberListTableEditMember: 'Edit Member',
  memberListTableMakeInactive: 'Make Inactive',
  memberListTableMakeDormant: 'Make Dormant',
  memberListTableMakeActive: 'Make Active',
  memberListDateJoined: 'Date Joined',
  memberListActiveDate: 'Active Date',
  memberListDeleteMember: 'Delete member',
  memberListDeleteConfirm: 'Are you sure you want to delete this member?',
  memberListEditDormancy: 'Edit Dormancy',

  navMemberList: 'Member List',
  memberNavActive: 'Active',
  memberNavInactive: 'Submitted',
  memberNavWip: 'WIP',
  memberNavDraft: 'Draft',
  memberNavDormant: 'Dormant',
  searchMembers: 'Search Members',

  // member add form page
  membersFormAddNewMembers: 'Add New Member',
  membersFormUpdateMembers: 'Update Member',
  membersFormAddingMembers: 'Adding Member',
  membersFormEditingMembers: 'Editing Member',
  memberAddedSuccessfull: 'Member Added Successfully',
  memberEditedSuccessfull: 'Member Edited Successfully',

  memberPersonalInformation: 'Personal Information',
  memberFirstName: 'First Name',
  memberMiddleName: 'Middle Name',
  memberLastName: 'Last Name',
  memberGender: 'Gender',
  memberTitle: 'Title',
  memberDateOfBirth: 'Date of Birth',
  memberNationality: 'Nationality',
  memberCitizenshipNo: 'Citizenship No.',
  memberPlaceOfIssue: 'Place of Issue',
  memberCitizenshipIssueDate: 'Citizenship Issue Date',
  memberOccupation: 'Occupation',
  memberPanNumber: 'PAN Number',

  memberFamilyInformation: 'Family Information',
  memberFatherName: 'Father Name',
  memberMotherName: 'Mother Name',
  memberGrandfatherName: 'Grandfather Name',
  memberGrandmotherName: 'Grandmother Name',
  memberSpouseName: 'Spouse Name',

  memberPermanentAddress: 'Permanent Address',
  memberState: 'Province',
  memberDistrict: 'District',
  memberVdcMuncipality: 'VDC Muncipality',
  memberWardNo: 'Ward No.',
  memberLocality: 'Locality',

  memberContactInformation: 'Contact Information',
  memberOfficeNo: 'Office No.',
  memberResidenceNo: 'Residence No.',
  memberMobileNo: 'Mobile No.',

  memberNomineeInformation: 'Nominee Information',
  memberRelation: 'Relation',
  memberContactNumber: 'Contact Number',

  memberPhoto: 'Photo',
  memberPhotoUpload: 'Member Photo',
  memberSignature: 'Member Signature',
  memberDropOrClickToUploadPhoto: 'Drop or Click to upload photo',
  saveMember: 'Save Member',

  ...individualEn,
  ...institutionEn,
  ...cooperativeEn,
  ...cooperativeUnionEn,
};
