import { testimonials } from "../data/testimonials";

function Testimonials() {
  return (
    <section
      id="testimonios"
      className="py-22 bg-black"
    >
      <div className="max-w-7xl mx-auto px-6">

        <h2 className="text-4xl font-bold text-center mb-12">
          Lo que dicen nuestros alumnos
        </h2>

        <div className="grid md:grid-cols-3 gap-8">

          {testimonials.map(testimonial => (
            <article
              key={testimonial.name}
              className="bg-zinc-900 rounded-xl p-6"
            >
              <p className="text-zinc-400 mb-4">
                "{testimonial.text}"
              </p>

              <h3 className="font-bold text-red-500">
                {testimonial.name}
              </h3>
            </article>
          ))}

        </div>

      </div>
    </section>
  );
}

export default Testimonials;