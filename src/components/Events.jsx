import { events } from "../data/events";

function Events() {
  return (
    <section
      id="eventos"
      className="pt-12 pb-24 bg-black"
    >
      <div className="max-w-7xl mx-auto px-6">

        <h2 className="text-4xl font-bold text-center mb-12">
          Próximos Eventos
        </h2>

        <div className="grid md:grid-cols-3 gap-8">

          {events.map(event => (
            <article
              key={event.title}
              className="bg-zinc-900 rounded-xl overflow-hidden"
            >

              <img
                src={event.image}
                alt={event.title}
                className="h-60 w-full object-cover"
              />

              <div className="p-6">

                <h3 className="text-2xl font-bold mb-2">
                  {event.title}
                </h3>

                <p className="text-red-500">
                  {event.date}
                </p>

              </div>

            </article>
          ))}

        </div>

      </div>
    </section>
  );
}

export default Events;