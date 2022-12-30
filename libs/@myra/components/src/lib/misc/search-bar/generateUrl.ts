const APP_CODES: Record<string, string> = {
  '1': 'cbs',
  '2': 'accounting',
  '9': 'settings',
};

// type AppCodeType = keyof typeof APP_CODES;
// type AppNameType = typeof APP_CODES[AppCodeType];
// type AppType = `${AppCodeType}-${AppNameType}`;

const CBS_MENU_CODES: Record<string, string> = {
  '00': 'members',
  '01': 'share',
  '02': 'savings',
  '03': 'loan',
  '04': 'transactions',
  '05': 'transfers',
  '06': 'requests',
  '07': 'withdraw',
  '08': 'reports',
  '09': 'others',
};

const SETTINGS_MENU_CODES: Record<string, string> = {
  '00': 'general',
};

const CODES: Record<string, Record<string, Record<string, string>>> = {
  '1': {
    '00': {
      '01': 'individual',
      '02': 'institution',
      '03': 'coop',
      '04': 'coop_union',
    },
    '01': {
      '01': 'issue',
      '02': 'return',
      '03': 'balance',
      '04': 'register',
    },
    '02': {
      '01': 'account-open',
      '02': 'account-close',
      '03': 'accounts',
      '04': 'products',
    },
    '03': {
      '01': 'applications',
      '02': 'repayments',
      '03': 'accounts',
      '04': 'repayments',
      '05': 'products',
      '06': 'declined',
    },
    '04': {
      '01': 'deposit',
      '02': 'withdraw',
      '03': 'account-transfer',
      '04': 'market-representative-transaction',
      '05': 'journal-vouchers',
      '06': 'market-representative',
      '07': 'all-transaction',
    },
    '05': {
      '01': 'vault-transfer',
      '02': 'teller-transfer',
      '03': 'branch-transfer',
    },
    '06': {
      '01': 'member',
      '02': 'withdraw-via-collector',
      '03': 'loan',
    },
    '07': {
      '01': 'withdraw-slip',
      '02': 'block-withdraw-slip-requests',
    },
    '08': {
      '01': 'cbs',
      '02': 'saved',
    },
    '09': {
      '01': 'fund-management',
      '02': 'share-dividend-posting',
    },
  },

  '9': {
    '00': {
      '02': 'charts-of-accounts',
      '07': 'deposit-products',
      '09': 'loan-products',
    },
  },
};

const ACTIONS_CODES: Record<string, string> = {
  '0': 'list',
  '1': 'add', // Rename Add to New
  '2': 'details',
};

// const pages = [
//   100011, 100021, 100031, 100041, 100000, 101011, 101021, 101030, 101040, 102011, 102021, 102030,
//   102040, 102020, 103011, 103021, 103010, 103030, 103020, 103050, 103060, 104011, 104021, 104031,
//   104041, 104051, 104010, 104020, 104030, 104040, 104060, 104050, 104070, 105011, 105021, 105010,
//   105020, 105030, 106010, 106020, 106030, 107011, 107021, 107010, 107020, 107020, 108010, 108020,
//   109011, 109021, 109010, 109020, 100002, 102002, 103032, 900022, 900072, 900092,
// ];
//
// console.log(pages);

export const getPageUrl = (code: string) => {
  // console.log(code);
  const appCode = code[0];
  const menuCode = `${code[1]}${code[2]}`;
  const pageCode = `${code[3]}${code[4]}`;
  const actionCode = code[5];

  if (parseInt(appCode, 10) === 1) {
    const menuLink = CODES[appCode][menuCode][pageCode];

    if (menuLink) {
      return `/${CBS_MENU_CODES[menuCode]}/${menuLink}/${ACTIONS_CODES[actionCode]}`;
    }
    return `/${CBS_MENU_CODES[menuCode]}/${ACTIONS_CODES[actionCode]}`;
  }
  if (parseInt(appCode, 10) === 9) {
    const menuLink = CODES[appCode][menuCode][pageCode];

    if (menuLink) {
      return `/${APP_CODES[appCode]}/${SETTINGS_MENU_CODES[menuCode]}/${menuLink}/${ACTIONS_CODES[actionCode]}`;
    }
    return `/${APP_CODES[appCode]}/${SETTINGS_MENU_CODES[menuCode]}/${ACTIONS_CODES[actionCode]}`;
  }

  return '';
};

// console.log(pages.map((page) => getPageUrl(String(page))));
// console.log(getPageUrl('102002'));
// 100000 => Member list
// 100011 - 100041 => Member Adds
// 101011 - 101021 => Share Issue / Share Return
