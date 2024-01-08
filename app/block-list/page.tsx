"use client";
import { withSession } from "@/components/HOC";
import { BlockListPage } from "@/components/pages";

function Page() {
  return <BlockListPage />;
}
export default withSession(Page);
