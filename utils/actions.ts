/* eslint-disable @typescript-eslint/no-explicit-any */
'use server';

import { createReviewSchema, imageSchema, profileSchema, propertySchema, validateWithZodSchema } from './schemas';
import db from './db';
import { clerkClient, currentUser } from '@clerk/nextjs/server';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { uploadImage } from '@/utils/supabase';

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

export const updateProfileImageAction = async (prevState: any, formData: FormData): Promise<{ message: string }> => {
  const user = await getAuthUser();
  try {
    const image = formData.get('image') as File;
    const validatedFields = validateWithZodSchema(imageSchema, { image });
    const fullPath = await uploadImage(validatedFields.image);

    await db.profile.update({ where: { clerkId: user.id }, data: { profileImage: fullPath } });
    revalidatePath('/profile');

    return { message: 'Profile image updated successfully' };
  } catch (error) {
    return renderError(error);
  }
};

export const createPropertyAction = async (prevState: any, formData: FormData): Promise<{ message: string }> => {
  const user = await getAuthUser();
  try {
    const rawData = Object.fromEntries(formData.entries());
    const file = formData.get('image') as File;

    const validatedFields = validateWithZodSchema(propertySchema, rawData);
    const validatedFile = validateWithZodSchema(imageSchema, { image: file });
    const fullPath = await uploadImage(validatedFile.image);

    await db.property.create({
      data: {
        ...validatedFields,
        image: fullPath,
        profileId: user.id,
      },
    });
  } catch (error) {
    return renderError(error);
  }
  redirect('/');
};

export const fetchProperties = async ({ search = '', category = '' }: { search?: string; category?: string }) => {
  const properties = await db.property.findMany({
    where: {
      category: { contains: category, mode: 'insensitive' },
      OR: [{ name: { contains: search, mode: 'insensitive' } }, { tagline: { contains: search, mode: 'insensitive' } }],
    },
    select: {
      id: true,
      name: true,
      tagline: true,
      country: true,
      price: true,
      image: true,
    },
    orderBy: { createdAt: 'desc' },
  });
  return properties;
};

export const fetchFavoriteId = async ({ propertyId }: { propertyId: string }) => {
  const user = await getAuthUser();
  const favorite = await db.favorite.findFirst({
    where: { propertyId: propertyId, profileId: user.id },
    select: { id: true },
  });
  return favorite?.id || null;
};

export const toggleFavoriteAction = async (prevState: {
  propertyId: string;
  favoriteId: string | null;
  pathname: string;
}) => {
  const user = await getAuthUser();
  const { propertyId, favoriteId, pathname } = prevState;
  try {
    if (favoriteId) {
      await db.favorite.delete({ where: { id: favoriteId } });
    } else {
      await db.favorite.create({ data: { profileId: user.id, propertyId } });
    }
    revalidatePath(pathname);
    return { message: favoriteId ? 'Removed from favorites' : 'Added to favorites' };
  } catch (error) {
    return renderError(error);
  }
};

export const fetchFavorites = async () => {
  const user = await getAuthUser();

  try {
    const favorites = await db.favorite.findMany({
      where: { profileId: user.id },
      select: {
        property: {
          select: {
            id: true,
            name: true,
            tagline: true,
            country: true,
            price: true,
            image: true,
          },
        },
      },
    });

    return favorites.map((favorite) => favorite.property);
  } catch {
    return [];
  }
};

export const fetchPropertyDetail = async (id: string) => {
  try {
    const property = await db.property.findUnique({
      where: { id },
      include: { profile: true },
    });
    return property;
  } catch (error) {
    renderError(error);
  }
};

export const createReviewAction = async (prevState: any, formData: FormData): Promise<{ message: string }> => {
  const user = await getAuthUser();
  try {
    const rawData = Object.fromEntries(formData.entries());
    const validatedFields = validateWithZodSchema(createReviewSchema, rawData);

    await db.review.create({
      data: {
        ...validatedFields,
        profileId: user.id,
      },
    });
    revalidatePath(`/properties/${validatedFields.propertyId}`);
    return { message: 'create review' };
  } catch (error) {
    return renderError(error);
  }
};

export const fetchPropertyReviews = async (propertyId: string) => {
  try {
    const reviews = await db.review.findMany({ where: { propertyId }, include: { profile: true } });
    return reviews;
  } catch (error) {
    renderError(error);
  }
};

export const fetchPropertyReviewsByUser = async () => {
  return { message: 'fetch user reviews' };
};

export const deleteReviewAction = async () => {
  return { message: 'delete  reviews' };
};
