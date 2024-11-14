import { PropsWithChildren } from "react";

export const InlineWrapperStatuses = ({
  children,
}: PropsWithChildren<unknown>) => {
  return <span style={{ marginLeft: "3px" }}>{children}</span>;
};

export const InlineWrapperCalendar = ({
  children,
}: PropsWithChildren<unknown>) => {
  return <span style={{ width: "calc(100% - 200px)" }}>{children}</span>;
};
