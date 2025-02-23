import { renderHook } from '@testing-library/react';

import { useIsClient } from './use-is-client';
import { highlightText } from '../../../tests/highlight-text';

// ----------------------------------------------------------------------

describe('useIsClient', () => {
  it(`1. Should update to ${highlightText.val('true')} after useEffect runs`, () => {
    const { result } = renderHook(() => useIsClient());
    expect(result.current).toBe(true);
  });
});
