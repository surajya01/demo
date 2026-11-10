import React from "react";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { ROOMS_DATA, getRoomBySlug, getRelatedRooms } from "@/data/rooms.data";
import { RoomDetailsClient } from "./RoomDetailsClient";

interface Props {
  params: { slug: string };
}

export async function generateStaticParams() {
  return ROOMS_DATA.map((room) => ({
    slug: room.slug,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const room = getRoomBySlug(params.slug);
  if (!room) {
    return { title: "Room Not Found | Apexify Resort" };
  }

  return {
    title: `${room.name} | Apexify Resort Vasai`,
    description: `${room.shortDescription} Starting from ₹${room.basePrice.toLocaleString()} per night at Apexify Resort, Waliv, Vasai East.`,
    openGraph: {
      title: `${room.name} | Apexify Resort`,
      description: room.shortDescription,
      images: [
        {
          url: room.coverImage,
          width: 1024,
          height: 768,
          alt: room.name,
        },
      ],
    },
  };
}

export default function RoomDetailsPage({ params }: Props) {
  const room = getRoomBySlug(params.slug);

  if (!room) {
    notFound();
  }

  const relatedRooms = getRelatedRooms(room.slug);

  return <RoomDetailsClient room={room} relatedRooms={relatedRooms} />;
}

