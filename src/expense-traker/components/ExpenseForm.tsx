import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { categories } from "../category";

interface Props {
  onSubmit: (data: ExpenseFormData) => void;
}

// zod with validation
const schema = z.object({
  description: z
    .string()
    .min(3, { message: "Description should be at least 3 character." })
    .max(50),
  amount: z
    .number({ invalid_type_error: "Amount is required." })
    .min(0.001)
    .max(1000_00),
  category: z.enum(categories, {
    errorMap: () => ({ message: "Category is required." }),
  }),
});
type ExpenseFormData = z.infer<typeof schema>;
// finish zod validation

const ExpenseForm = ({ onSubmit }: Props) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ExpenseFormData>({ resolver: zodResolver(schema) });

  return (
    <form
      action=""
      onSubmit={handleSubmit((data: any) => {
        onSubmit(data);
        reset();
      })}
    >
      <div className="mb-3">
        <label htmlFor="description" className="form-label">
          Description
        </label>
        <input
          {...register("description")}
          id="description"
          type="text"
          className="form-control"
        />
        {errors.description && (
          <p className="text-danger">{errors.description.message}</p>
        )}
      </div>
      <div className="mb-3">
        <label htmlFor="amount" className="form-label">
          Amount
        </label>
        <input
          {...register("amount", { valueAsNumber: true })}
          id="amount"
          type="number"
          className="form-control"
        />
        {errors.amount && (
          <p className="text-danger">{errors.amount.message}</p>
        )}
      </div>
      <div className="mb-3">
        <label htmlFor="category" className="form-label">
          Category
        </label>
        <select {...register("category")} name="" id="" className="form-select">
          {categories.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>
        {errors.category && (
          <p className="text-danger">{errors.category.message}</p>
        )}
      </div>
      <button className="btn btn-primary" type="submit">
        submit
      </button>
    </form>
  );
};

export default ExpenseForm;
