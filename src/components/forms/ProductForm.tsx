import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import type { Product } from "@prisma/client";
import { productSchema } from "../../schemas/product.schema";
import Form from "../Form";
import TextInput from "../TextInput";
import NumericInput from "../NumericInput";
import Textarea from "../Textarea";
import FileInput from "../FileInput";
import Button from "../Button";
import { api } from "../../utils/api";

export type ProductFormProps = {
  onSubmit?: (data: Product) => void;
  product?: Product;
};

type FormValues = {
  id?: string;
  name: string;
  description: string;
  price: number | null;
  image: string | null;
};

const ProductForm: React.FC<ProductFormProps> = ({
  onSubmit: submitHandler,
  product,
}) => {
  const trpcUtils = api.useContext();
  const { mutateAsync: addProduct } = api.products.add.useMutation({
    onSuccess() {
      void trpcUtils.products.getPaged.invalidate();
    },
  });
  const { mutateAsync: editProduct } = api.products.edit.useMutation({
    onSuccess(data) {
      void trpcUtils.products.get.invalidate(data.id);
      void trpcUtils.products.getPaged.invalidate();
    },
  });

  const { control, handleSubmit } = useForm<FormValues>({
    defaultValues: {
      id: product?.id,
      name: product?.name ?? "",
      description: product?.description ?? "",
      price: product?.price ?? null,
      image: product?.image ?? null,
    },
    resolver: zodResolver(productSchema),
  });

  const onSubmit = handleSubmit(async (data) => {
    console.log(data);
    const mutate = product ? editProduct : addProduct;
    const result = await mutate(data as Product);
    submitHandler?.(result);
  });

  return (
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

      <Button type="submit">{product ? "Edit product" : "Add product"}</Button>
    </Form>
  );
};

export default ProductForm;
