import type { ReactElement, ReactNode } from "react";
import type { NextRouter } from "next/router";
import { RouterContext } from "next/dist/shared/lib/router-context.shared-runtime";

type WrapperType = (props: { children: ReactNode }) => ReactElement;

export const createMockRouter = (router: Partial<NextRouter> = {}): [NextRouter, WrapperType] => {
  const nextRouter: NextRouter = {
    basePath: "",
    pathname: "/",
    route: "/",
    query: {},
    asPath: "/",
    back: jest.fn(),
    beforePopState: jest.fn(),
    prefetch: jest.fn(),
    push: jest.fn(),
    reload: jest.fn(),
    replace: jest.fn(),
    events: {
      on: jest.fn(),
      off: jest.fn(),
      emit: jest.fn(),
    },
    isFallback: false,
    isLocaleDomain: false,
    isReady: true,
    defaultLocale: "en",
    domainLocales: [],
    isPreview: false,
    forward: jest.fn(),
    ...router,
  };

  const Wrapper: WrapperType = ({ children }) => (
    <RouterContext.Provider value={nextRouter}>{children}</RouterContext.Provider>
  );

  return [nextRouter, Wrapper];
};

export const mockRouter = () => {
  jest.mock("next/router", () => {
    const router = {
      push: jest.fn(),
      query: {},
    };
    return {
      useRouter: jest.fn().mockReturnValue(router),
    };
  });
};
