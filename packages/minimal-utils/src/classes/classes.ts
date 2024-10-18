export const stateClass = {
  open: '--open',
  active: '--active',
  disabled: '--disabled',
  error: '--error',
  checked: '--checked',
  focused: '--focused',
  expanded: '--expanded',
  readOnly: '--readOnly',
  required: '--required',
  selected: '--selected',
  completed: '--completed',
};

export type StateProps = {
  [K in keyof typeof stateClass]?: boolean;
};

export function mergeClasses(className?: string | (string | undefined)[], state?: StateProps) {
  const classList = Array.isArray(className) ? className : [className];

  const stateClassesArray = Object.keys(stateClass)
    .filter((key) => state?.[key as keyof StateProps])
    .map((key) => stateClass[key as keyof typeof stateClass]);

  return [...classList.filter(Boolean), ...stateClassesArray].join(' ');
}
