import { useState } from "react";
import useCategoryStore from "@/lib/store/useCategoryStore";
import { createCategory } from "@/lib/actions/create-category";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

const CategoryForm = () => {
  const [name, setName] = useState<string>("");
  const addCategory = useCategoryStore((state) => state.addCategory);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      const category = await createCategory({ name });
      addCategory(category);
      toast.success("Category created successfully !");
      setName("");
    } catch (error) {
      toast.error("Failed to create category.");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col justify-evenly
      gap-4 p-4 max-w-sm mx-auto bg-card h-[400px] rounded-sm "
    >
      <div className="flex items-center pt-5">
        <h1 className="font-semibold text-lg md:text-2xl">Create Category</h1>
      </div>
      <div className="flex flex-col gap-4">
        <label className="block text-sm font-medium text-gray-700">
          Category Name
        </label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="p-2 border rounded"
          required
        />
      </div>
      <div className="flex justify-end gap-2">
        <Button variant="outline">Cancel</Button>
        <Button type="submit">Save Category</Button>
      </div>
    </form>
  );
};

export default CategoryForm;
