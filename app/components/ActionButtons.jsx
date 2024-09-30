"use client";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { addInterestedEvent } from "../actions";
import { useAuth } from "../hook/useAuth";

const ActionButtons = ({
  eventId,
  interestedUserIds,
  goingUserIds,
  fromDetails,
}) => {
  const { auth } = useAuth();
  // const isInterested = interestedUserIds?.includes(auth?.id);
  const isIterested = interestedUserIds?.find((id) => id === auth?.id);
  // console.log(interestedUserIds);
  const isGoing = goingUserIds?.find((id) => id === auth?.id);
  console.log(goingUserIds?.find((id) => id === auth?.id));
  const [interested, setInterested] = useState(isIterested);
  const [going, setGoing] = useState(isGoing);
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  async function toggleInterest(params) {
    if (auth) {
      const event = await addInterestedEvent(eventId, auth.id);

      if (event) {
        setInterested(!interested);
        // router.refresh();
      }
    } else {
      router.push("/login");
    }
  }

  const markGoing = () => {
    if (auth) {
      router.push(`/payment/${eventId}`);
    } else {
      router.push("/login");
    }
  };
  return (
    <div className={`w-full flex gap-4 mt-4 ${fromDetails && "flex-1"}`}>
      <button
        onClick={() => startTransition(() => toggleInterest())}
        disabled={isPending}
        className={`w-full ${
          interested ? "bg-green-600" : "bg-indigo-600"
        } hover:bg-indigo-800`}
      >
        Interested
      </button>
      <button
        onClick={markGoing}
        disabled={auth && going}
        href="/payment"
        className={`${
          auth && going ? "bg-green-600" : "bg-[#464849]"
        } text-center w-full  py-2 px-2 rounded-md border shadow-sm cursor-pointer hover:bg-[#3C3D3D] transition-colors active:translate-y-1`}
      >
        Going
      </button>
    </div>
  );
};

export default ActionButtons;
