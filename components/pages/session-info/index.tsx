"use client";

import { withSession } from "@/components/HOC";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui";
import { useAccount, useSession } from "@/hooks";

const SessionInfoPage = () => {
  const { data, status } = useSession();
  const { data: sessionData } = useAccount();
  return (
    <Card className="flex flex-col ">
      <CardContent>
        <CardHeader className="text-xl font-bold">
          <CardTitle>Session info</CardTitle>
        </CardHeader>

        <CardDescription className="flex flex-col gap-y-3">
          <p>
            {" "}
            Status: {status}
            <p>
              Account blocking:
              {sessionData?.isBlockingEnabled ? "Enabled" : "Disabled"}
            </p>
          </p>
          {Object.entries(data || {}).map((entry, i) => {
            const key = entry[0].toUpperCase();
            let val = entry[1];

            return (
              <div className="grid grid-cols-[100px_200px]" key={i}>
                <p>{key}</p>
                <p className="text-[14px]">{val}</p>
              </div>
            );
          })}
        </CardDescription>
      </CardContent>
    </Card>
  );
};
export default withSession(SessionInfoPage);
