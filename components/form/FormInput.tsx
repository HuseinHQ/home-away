import React, { InputHTMLAttributes } from 'react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';

type FormInputProps = {
  name: string;
  type?: InputHTMLAttributes<HTMLInputElement>['type'];
  label?: string;
  defaultValue?: string;
  placeholder?: string;
};

function FormInput({ name, type, label, defaultValue, placeholder }: FormInputProps) {
  return (
    <div className="mb-2">
      <Label htmlFor={name} className="capitalize">
        {label || name}
      </Label>
      <Input
        id={name}
        name={name}
        type={type || 'text'}
        defaultValue={defaultValue}
        placeholder={placeholder}
        required
      />
    </div>
  );
}

export default FormInput;
