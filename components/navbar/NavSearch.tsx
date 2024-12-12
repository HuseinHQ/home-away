'use client';

import React, { useState, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { useSearchParams, useRouter } from 'next/navigation';
import { useDebounce } from '@uidotdev/usehooks';

function NavSearch() {
  const searchParams = useSearchParams();
  const { replace } = useRouter();

  const [search, setSearch] = useState(searchParams.get('search')?.toString() || '');
  const searchDebounce = useDebounce(search, 500);

  const handleSearch = (value: string) => {
    const params = new URLSearchParams(searchParams);
    if (value) {
      params.set('search', value);
    } else {
      params.delete('search');
    }
    replace(`/?${params.toString()}`);
  };

  useEffect(() => {
    handleSearch(searchDebounce);
  }, [searchDebounce]);

  useEffect(() => setSearch(searchParams.get('search') || ''), [searchParams.get('search')]);

  return (
    <Input
      type="text"
      placeholder="find a property..."
      className="max-w-xs dark:bg-muted"
      onChange={(e) => setSearch(e.target.value)}
      value={search}
    />
  );
}

export default NavSearch;
