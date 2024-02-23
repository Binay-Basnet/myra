import { cooperativeNp } from './cooperative';
import { cooperativeUnionNp } from './cooperative-union';
import { individualNp } from './individual';
import { institutionNp } from './institution';

export const memberNp: Record<string, string> = {
  // member page
  activeMembers: 'सकृय सदस्य',
  inactiveMembers: 'निष्क्रिय सदस्य',
  minorMembers: 'बाल बचतकर्ता',
  membersAddNewMembers: 'नयाँ सदस्य थप्नुहोस्',
  memberList: 'सदस्य',
  balanceReport: 'सदस्य प्रतिवेदन',
  memberDetails: 'सदस्य विवरण',
  memberSettings: 'सदस्य सेटिङहरू',
  newIndividual: 'नयाँ व्यक्तिगत',
  newInstitution: 'नयाँ संस्थागत',
  newCooperative: 'नयाँ सहकारी',
  newCooperativeUnion: 'नयाँ सहकारी संघ',

  // member list table
  memberListTableMemberId: 'सदस्य नं',
  memberListTableActiveDate: 'सकृय मिति',
  memberListTableMemberCode: 'सदस्य कोड',
  memberListTableName: 'नाम',
  memberListTableAddress: 'ठेगाना',
  memberListTablePhoneNo: 'फोन नं',
  memberListTableServiceCenter: 'सेवा केन्द्र',
  memberListTableEditMember: ' सदस्य सच्याउने',
  memberListTableMakeInactive: ' सदस्य निश्क्रिय बनाउने',
  memberListTableMakeDormant: 'सदस्य कारोबार रोक्का',
  memberListTableMakeActive: 'सदस्य सक्रीय बनाउने',
  memberListDeleteMember: 'सदस्य हटाउने',
  memberListDeleteConfirm: 'तपाईं यो सदस्य हटाउन चाहनुहुन्छ ?',
  memberListDateJoined: 'आवद्ध मिति',
  memberListActiveDate: 'सकृय मिति',
  memberListEditDormancy: 'कारोबार रोक्का संशोधन',
  memberListTableViewMemberProfile: 'सदस्य विवरण हेर्नुहोस',

  navMemberList: 'सदस्य सूची',
  memberNavActive: 'सकृय',
  memberNavInactive: 'निष्क्रिय',
  memberNavWip: 'काम हुँदै',
  memberNavDraft: 'मस्यौदा',
  memberNavDormant: 'कारोबार रोक्का',
  searchMembers: 'सदस्यहरू खोज्नुहोस्',

  // member add form page
  membersFormAddNewMembers: 'नयाँ सदस्य थप्नुहोस',
  membersFormUpdateMembers: ' सदस्य अद्यावधिक',
  membersFormAddingMembers: 'सदस्य थप गर्ने',
  membersFormEditingMembers: 'सदस्य सच्याउने',
  memberAddedSuccessfull: 'सदस्यता सफल भयो',
  memberEditedSuccessfull: 'सदस्यता सच्याउन सफल भयो',

  memberPersonalInformation: 'ब्यक्तिगत जानकारी',
  memberFirstName: 'नाम',
  memberMiddleName: 'बीचको नाम',
  memberLastName: 'थर',
  memberGender: 'लिङ्ग',
  memberTitle: 'शीर्षक',
  memberDateOfBirth: 'जन्म मिति',
  memberNationality: 'राष्ट्रियता',
  memberCitizenshipNo: 'नागरिकता नं',
  memberPlaceOfIssue: 'मुद्दा को स्थान',
  memberCitizenshipIssueDate: 'नागरिकता जारी मिति',
  memberOccupation: 'पेशा',
  memberPanNumber: 'प्यान नम्बर',

  memberFamilyInformation: 'पारिवारिक जानकारी',
  memberFatherName: 'बुबाको नाम',
  memberMotherName: 'आमाको नाम',
  memberGrandfatherName: 'हजुरबुबाको नाम',
  memberGrandmotherName: 'हजुरआमाको नाम',
  memberSpouseName: 'दम्पतिको नाम',

  memberPermanentAddress: 'स्थाई ठेगाना',
  memberState: 'राज्य',
  memberDistrict: 'जिल्ला',
  memberVdcMuncipality: 'गाविस पालिका',
  memberWardNo: 'वडा नं.',
  memberLocality: 'इलाका',

  memberContactInformation: 'सम्पर्क जानकारी',
  memberOfficeNo: 'कार्यालय नं',
  memberResidenceNo: 'बसोबास नं',
  memberMobileNo: 'मोबाइल नम्बर',

  memberNomineeInformation: 'मनोनीत जानकारी',
  memberRelation: 'सम्बन्ध',
  memberContactNumber: 'सम्पर्क नम्बर',

  memberPhoto: 'तस्बिर',
  memberPhotoUpload: 'सदस्य तस्बिर',
  memberSignature: 'सदस्यको हस्ताक्षर',
  memberDropOrClickToUploadPhoto: 'तस्बिर अपलोड गर्न ड्रप वा क्लिक गर्नुहोस्',
  saveMember: 'सदस्य दर्ता गर्नुहोस्',

  ...individualNp,
  ...institutionNp,
  ...cooperativeNp,
  ...cooperativeUnionNp,
};
