import { renderHook } from '@testing-library/react';

import { useIsClient } from './use-is-client';
import { highlightText } from '../../../tests/highlight-text';

// ----------------------------------------------------------------------

describe('useIsClient', () => {
  it(`1. Should initialize with ${highlightText.value('false')}`, () => {
    const { result } = renderHook(() => useIsClient());
    expect(result.current).toBe(false);
  });

  it(`2. Should update to ${highlightText.value('true')} after useEffect runs`, () => {
    const { result } = renderHook(() => useIsClient());
    expect(result.current).toBe(true);
  });
});
