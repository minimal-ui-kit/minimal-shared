import { isActiveLink } from './active-link';

// ----------------------------------------------------------------------

type TestCase = [
  description: string,
  currentPathname: string,
  targetPath: string,
  deep: boolean,
  expected: boolean,
];

function runTests(cases: TestCase[]) {
  test.each(cases.map((testCase, index) => [index + 1, ...testCase]))(
    '%i. %s',
    (_index, _desc, current, target, deep, expected) => {
      expect(isActiveLink(current, target, deep)).toBe(expected);
    }
  );
}

describe('isActiveLink', () => {
  describe('Without deep check', () => {
    const cases: TestCase[] = [
      ['Should return true for exact match', '/dashboard/user', '/dashboard/user', false, true],
      [
        'Should return false for non-matching paths',
        '/dashboard/user',
        '/dashboard/admin',
        false,
        false,
      ],
      [
        'Should return false for partial match',
        '/dashboard/user/list',
        '/dashboard/user',
        false,
        false,
      ],
      [
        'Should return true for trailing slash match',
        '/dashboard/user/',
        '/dashboard/user',
        false,
        true,
      ],
      ['Should return true for root path match', '/', '/', false, true],
      [
        'Should return false for case-sensitive mismatch',
        '/Dashboard/User',
        '/dashboard/user',
        false,
        false,
      ],
    ];

    runTests(cases);
  });

  describe('With deep check', () => {
    const cases: TestCase[] = [
      [
        'Should return true for parent-child match',
        '/dashboard/user/list',
        '/dashboard/user',
        true,
        true,
      ],
      [
        'Should return false for unrelated paths',
        '/dashboard/user-test/list',
        '/dashboard/user',
        true,
        false,
      ],
      [
        'Should return true for match with query params',
        '/dashboard/test',
        '/dashboard/test?id=123',
        true,
        true,
      ],
      [
        'Should return true for nested path with query params',
        '/dashboard/test/list',
        '/dashboard/test?id=123',
        true,
        true,
      ],
      ['Should return false for hash path', '/dashboard/user', '#section', true, false],
      [
        'Should return false for external link',
        '/dashboard/user',
        'https://external.com',
        true,
        false,
      ],
      [
        'Should return true for different query values',
        '/dashboard/test',
        '/dashboard/test?id=999',
        true,
        true,
      ],
      [
        'Should return true for trailing slash match',
        '/dashboard/user/',
        '/dashboard/user',
        true,
        true,
      ],
      [
        'Should return false for similar prefix (not nested)',
        '/dashboard/usersettings',
        '/dashboard/user',
        true,
        false,
      ],
      ['Should return false for empty itemPath', '/dashboard', '', true, false],
      [
        'Should return false for undefined itemPath',
        '/dashboard',
        undefined as unknown as string,
        true,
        false,
      ],
    ];

    runTests(cases);
  });
});
