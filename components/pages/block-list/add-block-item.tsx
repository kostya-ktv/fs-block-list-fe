import {
  Button,
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
  Spinner,
  Textarea,
} from "@/components/ui";
import { useAddBlocklistItem } from "@/hooks";
import { BlockItemType } from "@/lib/api/generated";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

const FormSchema = z.object({
  type: z.string({
    required_error: "Please select type.",
  }),
  data: z.string({
    required_error: "Please select data.",
  }),
});
export const AddBlockItem = () => {
  const { mutation } = useAddBlocklistItem();
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });

  const onSubmit = async (data: z.infer<typeof FormSchema>) => {
    await mutation.mutateAsync({
      data: data.data,
      type: data.type as BlockItemType,
    });
    form.reset({ data: "", type: "" });
  };
  const isLoading = form.formState.isLoading || form.formState.isValidating;
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="w-2/3 space-y-6 border p-3 rounded-[8px]"
      >
        <FormField
          control={form.control}
          name="type"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Block item type</FormLabel>
              <Select
                required
                onValueChange={field.onChange}
                value={field.value}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a type" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {Object.entries(BlockItemType).map((el) => (
                    <SelectItem key={el[1]} value={el[1]}>
                      {el[0]}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="data"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Provide additional data</FormLabel>
              <Textarea
                {...field}
                placeholder="Data"
                required
                className="resize-none"
              />
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex gap-x-3">
          <Button disabled={isLoading} type="submit">
            Add new item
          </Button>
          {isLoading && <Spinner />}
        </div>
      </form>
    </Form>
  );
};
