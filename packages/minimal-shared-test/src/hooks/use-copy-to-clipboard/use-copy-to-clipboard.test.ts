import { act, renderHook } from '@testing-library/react';

import { useCopyToClipboard } from './use-copy-to-clipboard';
import { highlightText } from '../../../tests/highlight-text';

// ----------------------------------------------------------------------

describe('useCopyToClipboard()', () => {
  const mockClipboard = { writeText: vi.fn() };
  const textToCopy = 'Hello, World!';

  beforeAll(() => {
    Object.defineProperty(navigator, 'clipboard', {
      value: mockClipboard,
      writable: true,
    });
  });

  beforeEach(() => vi.clearAllMocks());

  afterEach(() => {
    Object.defineProperty(navigator, 'clipboard', {
      value: mockClipboard,
      writable: true,
    });
  });

  it(`1. Should initialize with ${highlightText.val('empty string | null')} copiedText`, () => {
    const { result } = renderHook(() => useCopyToClipboard());
    expect(result.current.copiedText === null || result.current.copiedText === '').toBe(true);
  });

  it(`2. Should copy text to clipboard and update ${highlightText.val('copiedText')}`, async () => {
    const { result } = renderHook(() => useCopyToClipboard());

    await act(async () => {
      const success = await result.current.copy(textToCopy);
      expect(success).toBe(true);
    });

    expect(navigator.clipboard.writeText).toHaveBeenCalledWith(textToCopy);
    expect(result.current.copiedText).toBe(textToCopy);
  });

  it(`3. Should handle clipboard not supported`, async () => {
    Object.defineProperty(navigator, 'clipboard', {
      value: undefined,
      writable: true,
    });

    const { result } = renderHook(() => useCopyToClipboard());

    await act(async () => {
      const success = await result.current.copy(textToCopy);
      expect(success).toBe(false);
    });

    expect(result.current.copiedText).toBe(null);
  });

  it(`4. Should handle copy failure`, async () => {
    navigator.clipboard.writeText = vi
      .fn()
      .mockRejectedValue(console.error('CopyToClipboard failed'));

    const { result } = renderHook(() => useCopyToClipboard());

    await act(async () => {
      const success = await result.current.copy(textToCopy);
      expect(success).toBe(false);
    });

    expect(result.current.copiedText).toBe(null);
  });
});
