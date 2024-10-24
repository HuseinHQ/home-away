import React, { Suspense } from 'react';
import CategoriesList from '@/components/home/CategoriesList';
import PropertiesContainer from '@/components/home/PropertiesContainer';
import LoadingCards from '@/components/card/LoadingCards';

function HomePage({ searchParams }: { searchParams: { category?: string; search?: string } }) {
  return (
    <section>
      <CategoriesList category={searchParams.category} search={searchParams.search} />
      <Suspense fallback={<LoadingCards />}>
        <PropertiesContainer category={searchParams.category} search={searchParams.search} />
      </Suspense>
    </section>
  );
}

export default HomePage;
