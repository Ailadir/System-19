import { useState } from 'react';

export interface UseFormModalConfig<TFormData, TItem> {
  item: TItem | null;
  initialData: (item: TItem | null) => TFormData;
  validationRules: (data: TFormData) => Record<string, string>;
  transformToItem: (data: TFormData, existingItem?: TItem) => TItem;
  onSave: (item: TItem) => void;
  onClose: () => void;
}

export function useFormModal<TFormData, TItem>({
  item,
  initialData,
  validationRules,
  transformToItem,
  onSave,
}: UseFormModalConfig<TFormData, TItem>) {
  const [formData, setFormData] = useState<TFormData>(() => initialData(item));
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = (): boolean => {
    const newErrors = validationRules(formData);
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (validate()) {
      const itemData = transformToItem(formData, item || undefined);
      onSave(itemData);
    }
  };

  const updateFormData = (updates: Partial<TFormData>) => {
    setFormData((prev) => ({ ...prev, ...updates }));
  };

  return {
    formData,
    setFormData,
    updateFormData,
    errors,
    validate,
    handleSubmit,
  };
}
