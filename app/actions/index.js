"use server";

import {
  createUser,
  findUswerByCredentials,
  updateInterest,
} from "@/db/queries";
import { revalidatePath } from "next/cache";

async function performLogin(formData) {
  try {
    const user = Object.fromEntries(formData);
    const found = await findUswerByCredentials(user);
    return found;
  } catch (err) {
    throw new Error(err);
  }
}

async function registerUser(formData) {
  const user = Object.fromEntries(formData);
  const created = await createUser(user);
  // redirect("/login");
  return created;
}

// Interests
// async function addInterestedEvent(eventId, authId) {
//   try {
//     const event = await updateInterest(eventId, authId);
//     console.log("from action", event);
//     if (event) {
//       revalidatePath("/");
//     }
//     return event;
//   } catch (err) {
//     throw err;
//   }
// }

async function addInterestedEvent(eventId, authId) {
  try {
    const event = await updateInterest(eventId, authId);

    console.log("from action", event);

    if (event) {
      revalidatePath("/"); // Make sure you are revalidating correctly
    }

    return event;
  } catch (err) {
    console.error("Error in addInterestedEvent:", err);
    throw err;
  }
}

export { addInterestedEvent, performLogin, registerUser };
