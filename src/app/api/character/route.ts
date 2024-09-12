import { fetchPeople, fetchPeopleTotal } from "@/apis/people";
import { pollId } from "@/utils/math";
import { cookies } from "next/headers";

const cotdCookieName = "characterOfTheDay";

export async function GET() {
  const total = await fetchPeopleTotal();

  const characterOTDCookie = cookies().get(cotdCookieName);

  const now = new Date();

  // If there is no character of the day cookie, set new cookie
  if (!characterOTDCookie) {
    console.log("No cookie found");
    const characterId = pollId(total);

    cookies().set(
      cotdCookieName,
      JSON.stringify({ id: characterId, timestamp: now.toISOString() }),
      {
        sameSite: "lax",
      }
    );

    const character = await fetchPeople({ id: characterId.toString() });

    return Response.json(character, {
      status: 200,
      headers: {
        "Set-Cookie": `${cotdCookieName}=${JSON.stringify({
          id: characterId,
          timestamp: now.toISOString(),
        })}; SameSite=Lax`,
      },
    });
  }

  const characterOTD = JSON.parse(characterOTDCookie.value);

  const timestamp = new Date(characterOTD.timestamp);
  const twentyFourHoursInMs = 24 * 60 * 60 * 1000;

  // If the character of the day is older than 24 hours, set new cookie
  if (now.getTime() - timestamp.getTime() >= twentyFourHoursInMs) {
    console.log("Cookie is older than 24 hours");
    const characterId = pollId(total, characterOTD.id);

    // cookies().set(
    //   cotdCookieName,
    //   JSON.stringify({ id: characterId, timestamp: now.toISOString() }),
    //   {
    //     sameSite: "lax",
    //   }
    // );

    const character = await fetchPeople({ id: characterId.toString() });

    return Response.json(character, {
      status: 200,
      headers: {
        "Set-Cookie": `${cotdCookieName}=${JSON.stringify({
          id: characterId,
          timestamp: now.toISOString(),
        })}; SameSite=Lax`,
      },
    });
  }

  console.log("Cookie is still valid");

  const character = await fetchPeople({
    id: characterOTD.id.toString(),
  });

  return Response.json(character, {
    status: 200,
  });
}
