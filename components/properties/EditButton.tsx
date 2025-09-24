import React from "react";
import { auth } from "@clerk/nextjs/server";
import { Button } from "../ui/button";
import { LuPenSquare } from "react-icons/lu";
import Link from "next/link";

async function EditButton({
  propertyId,
  ownerId,
}: {
  propertyId: string;
  ownerId: string;
}) {
  const { userId } = auth();

  if (!userId || ownerId !== userId) return null;

  return (
    <Link href={`/rentals/${propertyId}/edit`}>
      <Button
        type="submit"
        size="icon"
        variant="outline"
        className="p-2 cursor-pointer"
      >
        <LuPenSquare />
      </Button>
    </Link>
  );
}

export default EditButton;
