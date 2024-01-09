"use client";
import { withSession } from "@/components/HOC";
import { SessionInfoPage } from "@/components/pages";

function Page() {
  return <SessionInfoPage />;
}
export default withSession(Page);
