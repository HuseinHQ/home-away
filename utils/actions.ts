'use server';

import { profileSchema, validateWithZodSchema } from './schemas';
import db from './db';
import { auth, clerkClient, currentUser } from '@clerk/nextjs/server';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

const getAuthUser = async () => {
  const user = await currentUser();
  if (!user) {
    throw new Error('You must be logged in to access this page');
  }
  if (!user.privateMetadata.hasProfile) {
    redirect('/profile/create');
  }
  return user;
};

const renderError = (error: unknown): { message: string } => {
  return { message: error instanceof Error ? error.message : 'An error occurred' };
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const createProfileAction = async (prevState: any, formData: FormData) => {
  try {
    const user = await currentUser();
    if (!user) {
      throw new Error('Please login to create a profile');
    }

    const rawData = Object.fromEntries(formData.entries());
    const validatedFields = validateWithZodSchema(profileSchema, rawData);

    await db.profile.create({
      data: {
        clerkId: user.id,
        email: user.emailAddresses[0].emailAddress,
        profileImage: user.imageUrl ?? '',
        ...validatedFields,
      },
    });

    await clerkClient.users.updateUserMetadata(user.id, { privateMetadata: { hasProfile: true } });
  } catch (error) {
    return renderError(error);
  }

  redirect('/');
};

export const fetchProfileImage = async () => {
  try {
    const user = await currentUser();
    if (!user) return null;

    const profile = await db.profile.findUnique({ where: { clerkId: user.id }, select: { profileImage: true } });

    return profile?.profileImage;
  } catch (error) {
    return renderError(error);
  }
};

export const fetchProfile = async () => {
  const user = await getAuthUser();
  const profile = await db.profile.findUnique({ where: { clerkId: user.id } });
  if (!profile) redirect('/profile/create');
  return profile;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const updateProfileAction = async (prevState: any, formData: FormData): Promise<{ message: string }> => {
  const user = await getAuthUser();
  try {
    const rawData = Object.fromEntries(formData.entries());
    const validatedFields = validateWithZodSchema(profileSchema, rawData);

    await db.profile.update({ where: { clerkId: user.id }, data: validatedFields });

    revalidatePath('/profile');
    return { message: 'Profile updated successfully' };
  } catch (error) {
    return renderError(error);
  }
};
