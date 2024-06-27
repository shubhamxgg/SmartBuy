import useCategoryStore from "@/store/useCategoryStore";
import { createCategory } from "@/lib/actions/create-category";
import { toast } from "sonner";
import FormSumbitButton from "./form-submit-button";
import { useFormState } from "react-dom";
import { useEffect } from "react";

const CategoryForm = () => {
  // useEffect(() => {
  //   if (!state) {
  //     return;
  //   }
  //   if (state.status === "error") {
  //     toast.error("Failed to create category.");
  //   }

  //   if (state.status === "success") {
  //     toast.success("Category created successfully!");
  //   }
  // }, [state]);
  const addCategory = useCategoryStore((state) => state.addCategory);

  async function fromAction(formData: FormData) {
    try {
      const name = formData.get("name");
      if (typeof name === "string") {
        const category = await createCategory({ name });
        addCategory(category);
        toast.success("Category created successfully!");
      } else {
        throw new Error("Invalid category name");
      }
    } catch {
      toast.error("Failed to create category.");
    }
  }

  return (
    <div className="flex items-center justify-center sm:max-w-md mx-auto w-full sm:rounded-sm bg-card">
      <form
        action={fromAction}
        className="flex flex-col justify-evenly
      gap-4 p-4 h-[400px] w-full max-w-sm mx-auto"
      >
        <div className="flex items-center pt-5">
          <h1 className="font-semibold text-lg md:text-2xl">Create Category</h1>
        </div>
        <div className="flex flex-col gap-4">
          <label className="block text-sm font-medium text-gray-700">
            Category Name
          </label>
          <input type="text" name="name" className="p-2 border rounded" />
          {/* <p className="text-red-500 text-sm">{state?.error}</p> */}
        </div>
        <FormSumbitButton />
      </form>
    </div>
  );
};

export default CategoryForm;
