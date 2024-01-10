import {
  MenubarItem,
  MenubarRadioGroup,
  MenubarRadioItem,
  MenubarSub,
  MenubarSubContent,
  MenubarSubTrigger,
} from "@/components/ui";
import { useAccount } from "@/hooks";
import { accountControllerPatchAccount } from "@/lib/api/generated";
import { QueryKeys } from "@/providers/query.provider";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const AccountSubMenu: React.FC<{ disabled?: boolean }> = ({
  disabled,
}) => {
  const { data } = useAccount();
  const queryClient = useQueryClient();

  const blockAccountMutation = useMutation({
    mutationFn: accountControllerPatchAccount,
    onSuccess: async (data) =>
      await queryClient.setQueryData([QueryKeys.account], data),
  });

  return disabled ? (
    <MenubarItem disabled>Account</MenubarItem>
  ) : (
    <MenubarSub>
      <MenubarSubTrigger>Firewall</MenubarSubTrigger>
      <MenubarSubContent>
        <MenubarRadioGroup value={data?.isBlockingEnabled ? "on" : "off"}>
          <MenubarRadioItem
            onClick={() =>
              blockAccountMutation.mutate({ isBlockingEnabled: true })
            }
            value="on"
          >
            Enabled
          </MenubarRadioItem>
          <MenubarRadioItem
            onClick={() =>
              blockAccountMutation.mutate({ isBlockingEnabled: false })
            }
            value="off"
          >
            Disabled
          </MenubarRadioItem>
        </MenubarRadioGroup>
      </MenubarSubContent>
    </MenubarSub>
  );
};
