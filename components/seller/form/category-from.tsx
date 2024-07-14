"use client";

import { useRef, useEffect, useState } from 'react';
import { useFormState } from 'react-dom';
import { useRouter } from 'next/navigation';
import useCategoryStore from "@/store/useCategoryStore";
import { toast } from "sonner";
import FormSubmitButton from "./form-submit-button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { ShoppingBag, Shirt, Smartphone, Home } from "lucide-react";

const initialState = { message: null, errors: {} };

const iconOptions = [
  { value: "ShoppingBag", icon: ShoppingBag },
  { value: "Shirt", icon: Shirt },
  { value: "Smartphone", icon: Smartphone },
  { value: "Home", icon: Home },
];

const CategoryForm = () => {
  const formRef = useRef<HTMLFormElement>(null);
  const router = useRouter();
  const addCategory = useCategoryStore((state) => state.addCategory);
  const [categoryIcon, setCategoryIcon] = useState("ShoppingBag");

  const handleCreateCategory = async (prevState: any, formData: FormData) => {
    const name = formData.get("name");
    const description = formData.get("description");
    const icon = formData.get("icon");

    if (typeof name !== "string" || !name.trim()) {
      return { message: "error", errors: { name: ["Invalid category name"] } };
    }
    try {
      await addCategory(name);
      return { message: "success" };
    } catch (error) {
      console.error("Error creating category:", error);
      return { message: "error", errors: { _form: ["Failed to create category"] } };
    }
  };

  const [state, formAction] = useFormState(handleCreateCategory, initialState as any);

  useEffect(() => {
    if (state?.message === "success") {
      toast.success("Category created successfully!");
      formRef.current?.reset();
      router.push('/dashboard/categories');
    } else if (state?.message === "error") {
      toast.error(state.errors?._form?.[0] || "Failed to create category.");
    }
  }, [state, router]);

  const SelectedIcon = iconOptions.find(option => option.value === categoryIcon)?.icon || ShoppingBag;

  return (
    <Card className="max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>Create New Category</CardTitle>
      </CardHeader>
      <CardContent>
        <form
          ref={formRef}
          action={formAction}
          className="space-y-8"
        >
          <div className="grid grid-cols-2 gap-8">
            <div className="space-y-4">
              <div>
                <Label htmlFor="name">Category Name</Label>
                <Input id="name" name="name" placeholder="Enter category name" required />
                {state?.errors?.name && (
                  <p className="text-red-500 text-sm">{state.errors.name[0]}</p>
                )}
              </div>
              <div>
                <Label htmlFor="description">Description</Label>
                <Textarea id="description" name="description" placeholder="Enter category description" rows={4} />
              </div>
              <div>
                <Label htmlFor="icon">Category Icon</Label>
                <select
                  id="icon"
                  name="icon"
                  className="w-full p-2 border rounded"
                  value={categoryIcon}
                  aria-label="Select Category Icon"
                  onChange={(e) => setCategoryIcon(e.target.value)}
                >
                  {iconOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.value}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div className="flex flex-col items-center justify-center border rounded-lg p-8">
              <div className="text-6xl mb-4">
                <SelectedIcon size={64} />
              </div>
              <p className="text-sm text-gray-500">Category Icon Preview</p>
            </div>
          </div>
          <div className="flex justify-end space-x-4">
            <Button variant="outline" type="button" onClick={() => router.back()}>
              Cancel
            </Button>
            <FormSubmitButton />
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default CategoryForm;