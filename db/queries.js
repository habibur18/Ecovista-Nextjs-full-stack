import { eventModel } from "@/models/event-models";
import { UserModel } from "@/models/user-models";
import { replaceIdInArray, replaceIdInObject } from "@/utils/data-util";
import { deepConvertObjectIds } from "@/utils/deepConvertObjectIds";
import mongoose, { Types } from "mongoose";
const { ObjectId } = Types;

async function getAllEvents(q) {
  let allEvents = [];
  if (q && q.length > 0) {
    const regex = new RegExp(q, "i");
    allEvents = await eventModel.find({ name: { $regex: regex } }).lean();
  } else {
    allEvents = await eventModel.find({}).lean();
  }
  // return replaceIdInArray(allEvents);
  const plainEvents = deepConvertObjectIds(allEvents);
  const replace_idEvents = replaceIdInArray(plainEvents);
  return replace_idEvents;
}

async function getEventById(eventId) {
  const event = await eventModel.findById(eventId).lean();
  return replaceIdInObject(event);
}

// user queries
async function createUser(user) {
  const created = await UserModel.create(user);
  const createdUser = deepConvertObjectIds(created.toJSON());
  console.log(createdUser);
  return createdUser;
}

async function findUswerByCredentials(credentials) {
  const user = await UserModel.findOne(credentials).lean();
  if (!user)
    return {
      message: "User not found",
    };
  const userWithId = replaceIdInObject(user);
  console.log("from queries", userWithId);
  return userWithId;
}

// async function updateInterest(eventId, authId) {
//   const event = await eventModel.findById(eventId);
//   console.log(event);
//   console.log(eventId, authId);
//   if (event) {
//     const foundUsers = event.interested_ids.find(
//       (userId) => userId.toString() === authId
//     );
//     if (foundUsers) {
//       event.interested_ids.pull(mongoose.Types.ObjectId(authId));
//     } else {
//       event.interested_ids.push(mongoose.Types.ObjectId(authId));
//     }
//     await event.save();
//   }
//   return event;
// }
// async function updateInterest(eventId, authId) {
//   const event = await eventModel.findById(eventId);
//   if (event) {
//     const foundUsers = event.interested_ids.find(
//       (userId) => userId.toString() === authId
//     );
//     if (foundUsers) {
//       event.interested_ids.pull(new ObjectId(authId));
//     } else {
//       event.interested_ids.push(new ObjectId(authId));
//     }
//     await event.save();
//   }
//   console.log("from queries", event);
//   return event.toJSON();
// }

// async function updateInterest(eventId, authId) {
//   const event = await eventModel.findById(eventId);

//   if (event) {
//     const foundUsers = event.interested_ids.find(
//       (userId) => userId.toString() === authId
//     );

//     if (foundUsers) {
//       event.interested_ids.pull(new ObjectId(authId));
//     } else {
//       event.interested_ids.push(new ObjectId(authId));
//     }

//     await event.save();

//     // Convert interested_ids and going_ids from ObjectId to strings
//     const plainEvent = {
//       ...event.toJSON(),
//       _id: event._id.toString(), // Convert _id to string
//       interested_ids: event.interested_ids.map((id) => id.toString()),
//       going_ids: event.going_ids.map((id) => id.toString()),
//     };

//     console.log("from queries", plainEvent);
//     return plainEvent; // Return the event as a plain object
//   }

//   return null;
// }

async function updateInterest(eventId, authId) {
  const event = await eventModel.findById(eventId);

  if (event) {
    // Check if the user is already interested
    const foundUsers = event.interested_ids.find(
      (userId) => userId.toString() === authId
    );

    // If found, remove the user from interested_ids, otherwise add them
    if (foundUsers) {
      event.interested_ids.pull(new ObjectId(authId));
    } else {
      event.interested_ids.push(new ObjectId(authId));
    }

    // Save the event after modification
    await event.save();

    // Convert the whole event to plain object and deeply convert ObjectId to strings
    const plainEvent = deepConvertObjectIds(event.toJSON());

    // console.log("from queries", plainEvent);
    return plainEvent; // Return the event as a plain object
  }

  return null;
}

async function updateGoing(eventId, authId) {
  const event = await eventModel.findById(eventId);
  event.going_ids.push(new mongoose.Types.ObjectId(authId));
  event.save();
  console.log(event);
  return event;
}
export {
  createUser,
  findUswerByCredentials,
  getAllEvents,
  getEventById,
  updateGoing,
  updateInterest,
};
