import React from 'react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';

function ImageInput({ name = 'image' }: { name?: string }) {
  return (
    <div className="mb-2">
      <Label htmlFor={name} className="capitalize">
        {name}
      </Label>
      <Input id={name} name={name} type="file" required accept="image/*" className="max-w-xs" />
    </div>
  );
}

export default ImageInput;
