import EventDetails from "@/app/components/details/EventDetails";
import EventVenue from "@/app/components/details/EventVenue";
import HeroSection from "@/app/components/details/HeroSection";
import { getEventById } from "@/db/queries";

export default async function page({ params: { id } }) {
  const eventInfo = await getEventById(id);
  // console.log(eventInfo);
  return (
    <>
      {eventInfo && <HeroSection event={eventInfo} />}
      <section className="container">
        <div className="grid grid-cols-5 gap-12 my-12">
          {eventInfo && <EventDetails event={eventInfo} />}
          {eventInfo && <EventVenue event={eventInfo} />}
        </div>
      </section>
    </>
  );
}
