type ComponentType<P extends Record<string, unknown>> = (
  props: P
) => JSX.Element;

export function bindProps<
  P extends Record<string, unknown>,
  B extends Partial<P>
>(Component: ComponentType<P>, boundProps: B) {
  function NewComponent(props: Omit<P, keyof B>): JSX.Element {
    const newProps = { ...props, ...boundProps } as P;
    return <Component {...newProps} />;
  }
  NewComponent.displayName = Component.name;

  return NewComponent;
}
