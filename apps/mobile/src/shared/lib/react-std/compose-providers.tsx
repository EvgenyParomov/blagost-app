import { ReactNode } from "react";

type RenderProvider = (children: JSX.Element) => JSX.Element;
type Props = { providers: RenderProvider[]; children: ReactNode };

export const ComposeProviders = ({ providers, children }: Props) => {
  return providers.reduceRight((c, renderComponent) => {
    return renderComponent(c);
  }, children as JSX.Element);
};
