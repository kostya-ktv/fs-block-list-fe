"use client";
import { Spinner } from "@/components/ui";
import { useSession } from "@/hooks";
import { ROUTES } from "@/lib/routes";
import { redirect } from "next/navigation";

type WithAuthProps = {};

export const withSession = <P extends WithAuthProps>(
  WrappedComponent: React.FC<P>,
): React.FC<P> => {
  return (props) => {
    const { isError, isLoading } = useSession();
    if (isLoading) {
      return <Spinner />;
    }
    if (isError) {
      redirect(ROUTES.signIn);
    }

    return <WrappedComponent {...props} />;
  };
};
