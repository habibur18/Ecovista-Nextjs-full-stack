"use server";

import {
  createUser,
  findUswerByCredentials,
  getEventById,
  updateGoing,
  updateInterest,
} from "@/db/queries";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { Resend } from "resend";
import EmailTemplate from "../components/payments/EmailTemplate";

async function performLogin(formData) {
  try {
    const user = Object.fromEntries(formData);
    const found = await findUswerByCredentials(user);
    // console.log("from action", found);
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

//
async function addGoingEvent(eventId, user) {
  try {
    const event = await updateGoing(eventId, user?.id);
    console.log("from action updateGoing+", event);
    if (event?._id) {
      await sendEamil(eventId, user);
      revalidatePath("/");
    }
  } catch (err) {
    console.error("Error in addGoingEvent:", err);
    throw err;
  }
  revalidatePath("/");
  redirect("/");
}

async function sendEamil(eventId, user) {
  try {
    const event = await getEventById(eventId);
    const resend = new Resend(process.env.RESEND_API_KEY);
    const message = `Dear ${user?.name}, you have been successfully registered for the event, ${event?.name}. Please carrry this email and your official id to the venue. We are excited to have you here.`;
    console.log(user?.email);
    const result = await resend.emails.send({
      from: "onboarding@resend.dev",
      to: user?.email,
      subject: "successfully Registered for the event!",
      react: EmailTemplate({ message }),
    });
    return result;
  } catch (err) {
    console.error("Error in sendEamil:", err);
    throw err;
  }
}
export { addGoingEvent, addInterestedEvent, performLogin, registerUser };
