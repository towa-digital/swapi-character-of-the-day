"use server";

import { fetchPeople, fetchPeopleTotal } from "@/apis/people";
import { pollId } from "@/utils/math";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";

const cotdCookieName = "characterOfTheDay";

export async function validateCookie(force = false) {
  const total = await fetchPeopleTotal();

  const characterOTDCookie = cookies().get(cotdCookieName);

  const now = new Date();

  // If there is no character of the day cookie, set new cookie
  if (!characterOTDCookie) {
    const characterId = pollId(total);

    cookies().set(
      cotdCookieName,
      JSON.stringify({ id: characterId, timestamp: now.toISOString() }),
      {
        sameSite: "lax",
      }
    );

    return;
  }

  const characterOTD = JSON.parse(characterOTDCookie.value);

  const timestamp = new Date(characterOTD.timestamp);
  const twentyFourHoursInMs = 24 * 60 * 60 * 1000;

  // If the character of the day is older than 24 hours, set new cookie
  if (force || now.getTime() - timestamp.getTime() >= twentyFourHoursInMs) {
    const characterId = pollId(total);

    cookies().set(
      cotdCookieName,
      JSON.stringify({ id: characterId, timestamp: now.toISOString() }),
      {
        sameSite: "lax",
      }
    );

    return;
  }
}

export async function fetchCharacterOfTheDay() {
  const total = await fetchPeopleTotal();

  const characterOTDCookie = cookies().get(cotdCookieName);

  const characterId = characterOTDCookie
    ? JSON.parse(characterOTDCookie.value).id
    : pollId(total);

  return await fetchPeople({ id: characterId.toString() });
}

export const refetchCharacter = async () => {
  await validateCookie(true);

  revalidatePath("/");
};
