import { fetchProperties } from '@/utils/actions';
import { PropertyCardProps } from '@/utils/types';
import React from 'react';
import EmptyList from '@/components/home/EmptyList';
import PropertiesList from './PropertiesList';

async function PropertiesContainer({ category, search }: { category?: string; search?: string }) {
  const properties: PropertyCardProps[] = await fetchProperties({ category, search });

  if (properties.length === 0) {
    return (
      <EmptyList
        heading="No results"
        message="Try changing or removing some of your filters."
        btnText="Clear Filters"
      />
    );
  }

  return <PropertiesList properties={properties} />;
}

export default PropertiesContainer;