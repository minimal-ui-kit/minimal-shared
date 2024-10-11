import { act, renderHook } from '@testing-library/react';

import { useMultiSelect, updateSelectedItems } from './use-multi-select';

// ----------------------------------------------------------------------

describe('useMultiSelect()', () => {
  it(`1. Should initialize with default selected items`, () => {
    const { result } = renderHook(() => useMultiSelect(['item1', 'item2', 'item3'], ['item1']));
    expect(result.current.values).toEqual(['item1']);
    expect(result.current.status).toBe('indeterminate');
  });

  it(`2. Should toggle select item`, () => {
    const { result } = renderHook(() => useMultiSelect(['item1', 'item2', 'item3'], ['item1']));

    act(() => {
      result.current.onToggleSelectItem('item2');
    });

    expect(result.current.values).toEqual(['item1', 'item2']);
    expect(result.current.status).toBe('indeterminate');

    act(() => {
      result.current.onToggleSelectItem('item1');
    });

    expect(result.current.values).toEqual(['item2']);
    expect(result.current.status).toBe('indeterminate');
  });

  it(`3. Should select all items`, () => {
    const { result } = renderHook(() => useMultiSelect(['item1', 'item2', 'item3']));

    act(() => {
      result.current.onSelectAllItems();
    });

    expect(result.current.values).toEqual(['item1', 'item2', 'item3']);
    expect(result.current.status).toBe('checked');

    act(() => {
      result.current.onSelectAllItems();
    });

    expect(result.current.values).toEqual([]);
    expect(result.current.status).toBe('unchecked');
  });

  it(`4. Should deselect all items`, () => {
    const { result } = renderHook(() =>
      useMultiSelect(['item1', 'item2', 'item3'], ['item1', 'item2'])
    );

    act(() => {
      result.current.onDeSelectAllItems();
    });

    expect(result.current.values).toEqual([]);
    expect(result.current.status).toBe('unchecked');
  });

  it(`5. Should update status correctly`, () => {
    const { result } = renderHook(() => useMultiSelect(['item1', 'item2', 'item3'], ['item1']));

    expect(result.current.status).toBe('indeterminate');

    act(() => {
      result.current.onToggleSelectItem('item2');
    });

    expect(result.current.status).toBe('indeterminate');

    act(() => {
      result.current.onToggleSelectItem('item3');
    });

    expect(result.current.status).toBe('checked');

    act(() => {
      result.current.onToggleSelectItem('item1');
    });

    expect(result.current.status).toBe('indeterminate');

    act(() => {
      result.current.onDeSelectAllItems();
    });

    expect(result.current.status).toBe('unchecked');
  });
});

// ----------------------------------------------------------------------

describe('updateSelectedItems', () => {
  it(`1. Should add item if not present`, () => {
    const result = updateSelectedItems(['item1', 'item2'], 'item3');
    expect(result).toEqual(['item1', 'item2', 'item3']);
  });

  it(`2. Should remove item if present`, () => {
    const result = updateSelectedItems(['item1', 'item2', 'item3'], 'item2');
    expect(result).toEqual(['item1', 'item3']);
  });
});
