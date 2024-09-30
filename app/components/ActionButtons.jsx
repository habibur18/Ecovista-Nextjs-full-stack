"use client";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { addInterestedEvent } from "../actions";
import { useAuth } from "../hook/useAuth";

const ActionButtons = ({ eventId, interestedUserIds, fromDetails }) => {
  const { auth } = useAuth();

  // const isInterested = interestedUserIds?.includes(auth?.id);
  const isIterested = interestedUserIds?.find((id) => id === auth?.id);
  const [interested, setInterested] = useState(isIterested);
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  async function toggleInterest(params) {
    if (auth) {
      const event = await addInterestedEvent(eventId, auth.id);

      if (event) {
        setInterested(!interested);
      }
    } else {
      router.push("/login");
    }
  }

  const markGoing = () => {
    if (auth) {
      router.push("/payment");
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
        href="/payment"
        className=" text-center w-full bg-[#464849] py-2 px-2 rounded-md border border-[#5F5F5F]/50 shadow-sm cursor-pointer hover:bg-[#3C3D3D] transition-colors active:translate-y-1"
      >
        Going
      </button>
    </div>
  );
};

export default ActionButtons;
