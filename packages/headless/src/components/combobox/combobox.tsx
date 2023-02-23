import {
  $,
  component$,
  createContextId,
  QwikKeyboardEvent,
  Signal,
  useContextProvider,
  useSignal,
  useStore,
} from '@builder.io/qwik';

interface ComboboxContext {
  options: Signal<HTMLElement | undefined>[];
  selectedOptions: Signal<string>;
  openDropDown: Signal<boolean>;
}

export const comboboxContext = createContextId<ComboboxContext>(
  'select.root.context'
);

const Combobox = component$(() => {
  const options = useStore([]);
  const selectedOptions = useSignal('');
  const openDropDown = useSignal(false);

  const context = {
    options,
    selectedOptions,
    openDropDown,
  };

  useContextProvider(comboboxContext, context);

  const keyUpHandler = $((e: QwikKeyboardEvent) => {
    context.openDropDown.value =
      (e.target as HTMLInputElement).value.length > 0 ? true : false;
  });

  return (
    <>
      <input onKeyUp$={(e: QwikKeyboardEvent) => keyUpHandler(e)} />
      {context.openDropDown.value && <h1>Hi</h1>}
    </>
  );
});

export { Combobox };
