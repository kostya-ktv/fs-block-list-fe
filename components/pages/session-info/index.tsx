"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui";
import { useAccount, useSession } from "@/hooks";

export default function SessionInfoPage() {
  const { data, status } = useSession();
  const { data: sessionData } = useAccount();
  return (
    <Card className="flex flex-col ">
      <CardHeader>
        <CardTitle>Session info</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col">
        <span> Status: {status}</span>
        <span>
          Account blocking:
          {sessionData?.isBlockingEnabled ? " enabled" : " disabled"}
        </span>
        {Object.entries(data || {}).map((entry, i) => {
          const key = entry[0].toUpperCase();
          let val = entry[1];

          return (
            <div className="grid grid-cols-[100px_200px]" key={i}>
              <span>{key}</span>
              <span className="text-[14px]">{val}</span>
            </div>
          );
        })}
      </CardContent>
    </Card>
  );
}
