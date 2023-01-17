import { useRouter } from "next/router";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Button from "../../components/Button";
import Form from "../../components/Form";
import TextInput from "../../components/TextInput";
import { withAuth } from "../../utils/with-auth";
import Textarea from "../../components/Textarea";
import NumericInput from "../../components/NumericInput";
import { productSchema } from "../../schemas/product.schema";
import FileInput from "../../components/FileInput";

export const AdminAddProductPage: React.FC = () => {
  const router = useRouter();

  const { control, handleSubmit } = useForm({
    defaultValues: {
      name: "",
      description: "",
      price: null,
      image: null,
    },
    resolver: zodResolver(productSchema),
  });

  const onSubmit = handleSubmit((data) => {
    console.log(data);
  });

  function goToProductsOverview() {
    void router.push("/admin/products");
  }

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="flex w-full flex-row justify-end">
        <Button onClick={goToProductsOverview}>Go back</Button>
      </div>

      <Form onSubmit={() => void onSubmit()}>
        <Controller
          name="name"
          control={control}
          render={({ field, fieldState: { error } }) => (
            <TextInput label="Name" {...field} error={error} />
          )}
        />
        <Controller
          name="price"
          control={control}
          render={({ field, fieldState: { error } }) => (
            <NumericInput label="Price" {...field} error={error} />
          )}
        />
        <Controller
          name="description"
          control={control}
          render={({ field, fieldState: { error } }) => (
            <Textarea label="Description" {...field} error={error} />
          )}
        />
        <Controller
          name="image"
          control={control}
          render={({ field: { name, onChange }, fieldState: { error } }) => (
            <FileInput
              label="Image"
              name={name}
              error={error}
              onChangeData={(files) => onChange(files?.[0] ?? null)}
            />
          )}
        />

        <Button type="submit">Add product</Button>
      </Form>
    </div>
  );
};

export default withAuth(AdminAddProductPage, ["ADMIN"]);
