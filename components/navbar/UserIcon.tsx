import React from 'react';
import { LuUser2 } from 'react-icons/lu';
import { fetchProfileImage } from '@/utils/actions';
import Image from 'next/image';

async function UserIcon() {
  const profileImage = await fetchProfileImage();

  if (profileImage && typeof profileImage === 'string') {
    return (
      <Image
        width={24}
        height={24}
        src={profileImage}
        alt="Profile Image"
        className="h-6 w-6 rounded-full object-cover"
      />
    );
  }
  return <LuUser2 className="h-6 w-6 bg-primary rounded-full text-white" />;
}

export default UserIcon;
