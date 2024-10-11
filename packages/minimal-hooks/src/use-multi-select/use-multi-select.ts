import type { Dispatch, SetStateAction } from 'react';

import { useMemo, useState, useCallback } from 'react';

// ----------------------------------------------------------------------

/**
 * Custom hook to manage the selection state of a list of items.
 *
 * @param {string[]} itemIds - The list of item IDs to manage.
 * @param {string[]} [defaultSelected=[]] - The list of default selected item IDs.
 *
 * @returns {UseMultiSelectReturn} - An object containing:
 * - `values`: The current list of selected item IDs.
 * - `status`: The current selection status ('checked', 'unchecked', 'indeterminate').
 * - `setValues`: A function to manually set the selected item IDs.
 * - `onSelectAllItems`: A function to select all items.
 * - `onDeSelectAllItems`: A function to deselect all items.
 * - `onToggleSelectItem`: A function to toggle the selection of a specific item.
 *
 * @example
 * const { values, status, onSelectAllItems, onDeSelectAllItems, onToggleSelectItem } = useMultiSelect(['item1', 'item2', 'item3'], ['item1']);
 *
 * return (
 *   <div>
 *     <button onClick={onSelectAllItems}>Select All</button>
 *     <button onClick={onDeSelectAllItems}>Deselect All</button>
 *     {itemIds.map(itemId => (
 *       <div key={itemId}>
 *         <input
 *           type="checkbox"
 *           checked={values.includes(itemId)}
 *           onChange={() => onToggleSelectItem(itemId)}
 *         />
 *         {itemId}
 *       </div>
 *     ))}
 *   </div>
 * );
 */

export type UseMultiSelectReturn = {
  values: string[];
  status: 'checked' | 'unchecked' | 'indeterminate';
  setValues: Dispatch<SetStateAction<string[]>>;
  onSelectAllItems: () => void;
  onDeSelectAllItems: () => void;
  onToggleSelectItem: (inputValue: string) => void;
};

export function useMultiSelect(
  listItems: string[],
  defaultSelectedItems?: string[]
): UseMultiSelectReturn {
  const [values, setValues] = useState<string[]>(defaultSelectedItems ?? []);

  const onToggleSelectItem = useCallback((newItem: string) => {
    setValues((prevSelectedItems) => updateSelectedItems(prevSelectedItems, newItem));
  }, []);

  const onSelectAllItems = useCallback(() => {
    setValues((prevSelectedItems) =>
      prevSelectedItems.length === listItems.length ? [] : listItems
    );
  }, [listItems]);

  const onDeSelectAllItems = useCallback(() => {
    setValues([]);
  }, []);

  const status = useMemo(() => {
    if (values.length === 0) return 'unchecked';
    if (values.length === listItems.length) return 'checked';
    return 'indeterminate';
  }, [listItems.length, values.length]);

  return {
    values,
    status,
    setValues,
    onSelectAllItems,
    onDeSelectAllItems,
    onToggleSelectItem,
  };
}

// ----------------------------------------------------------------------

/**
 * Updates the selected items list by adding or removing the specified item.
 *
 * @param {string[]} selectedItems - The current list of selected items.
 * @param {string} newItem - The item to add or remove.
 * @returns {string[]} - The updated list of selected items.
 */

export function updateSelectedItems(selectedItems: string[], newItem: string): string[] {
  return selectedItems.includes(newItem)
    ? selectedItems.filter((existingItem) => existingItem !== newItem)
    : [...selectedItems, newItem];
}
