"use client";

import { useRef, useEffect } from 'react';
import { useFormState } from 'react-dom';
import { useRouter } from 'next/navigation';
import useCategoryStore from "@/store/useCategoryStore";
import { toast } from "sonner";
import FormSubmitButton from "./form-submit-button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

const initialState = { message: null, errors: {} };

const CategoryForm = () => {
  const formRef = useRef<HTMLFormElement>(null);
  const router = useRouter();
  const addCategory = useCategoryStore((state) => state.addCategory);

  const handleCreateCategory = async (prevState: any, formData: FormData) => {
    const name = formData.get("name");
    if (typeof name !== "string" || !name.trim()) {
      return { message: "error", errors: { name: ["Invalid category name"] } };
    }

    try {
      await addCategory(name);
      return { message: "success" };
    } catch (error) {
      return { message: "error", errors: { _form: ["Failed to create category"] } };
    }
  };

  const [state, formAction] = useFormState(handleCreateCategory, initialState as any);

  useEffect(() => {
    if (state?.message === "success") {
      toast.success("Category created successfully!");
      formRef.current?.reset();
      router.push('/seller/dashboard');
    } else if (state?.message === "error") {
      toast.error(state.errors?._form?.[0] || "Failed to create category.");
    }
  }, [state, router]);

  return (
    <form
      ref={formRef}
      action={formAction}
      className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-6"
    >
      <div className="flex flex-1 flex-col gap-4 p-4 md:p-6 md:gap-8">
        <div className="flex items-center">
          <h1 className="font-semibold text-lg md:text-2xl">Create Category</h1>
        </div>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          <div className="flex flex-col gap-2">
            <Label htmlFor="name">Category Name</Label>
            <Input id="name" name="name" placeholder="Enter category name" required />
            {state?.errors?.name && (
              <p className="text-red-500 text-sm">{state.errors.name[0]}</p>
            )}
          </div>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" type="button" onClick={() => router.back()}>
            Cancel
          </Button>
          <FormSubmitButton />
        </div>
      </div>
    </form>
  );
};

export default CategoryForm;