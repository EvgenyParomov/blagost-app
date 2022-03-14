import { ReactNode, createElement } from "react";

type Props = { providers: JSX.Element[]; children: ReactNode };

export function ComposeProviders({ providers, children }: Props): JSX.Element {
  return providers.reduceRight(
    (c, providerElement): ReactNode =>
      createElement(providerElement.type, providerElement.props, c),
    children
  ) as JSX.Element;
}
