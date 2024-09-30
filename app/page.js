import EventList from "./components/landing/EventList";
import Header from "./components/landing/Header";

export default function Home({ searchParams: { q } }) {
  console.log(q);
  return (
    <section className="container">
      <Header />
      <EventList q={q} />
    </section>
  );
}
