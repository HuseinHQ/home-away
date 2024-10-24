'use client';

import React from 'react';
import { Button } from '@/components/ui/button';
import { FaHeart } from 'react-icons/fa';
import { usePathname } from 'next/navigation';
import FormContainer from '@/components/form/FormContainer';
import { toggleFavoriteAction } from '@/utils/actions';
import { CardSubmitButton } from '@/components/form/Buttons';

type FavoriteToggleFormProps = {
  propertyId: string;
  favoriteId: string | null;
};

function FavoriteToggleForm({ favoriteId, propertyId }: FavoriteToggleFormProps) {
  const pathname = usePathname();
  const toggleAction = toggleFavoriteAction.bind(null, { propertyId, favoriteId, pathname });

  return (
    <FormContainer action={toggleAction}>
      <CardSubmitButton isFavorite={favoriteId ? true : false} />
    </FormContainer>
  );
}

export default FavoriteToggleForm;
