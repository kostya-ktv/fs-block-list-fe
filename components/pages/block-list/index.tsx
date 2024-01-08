import { BlockList } from "@/components/pages/block-list/block-list";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui";

export default function BlockListPage() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Block list</CardTitle>
      </CardHeader>
      <CardContent>
        <BlockList />
      </CardContent>
    </Card>
  );
}
