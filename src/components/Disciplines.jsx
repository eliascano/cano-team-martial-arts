import { disciplines } from "../data/disciplines";

function Disciplines() {
    return (
        <section
            id="disciplinas"
            className="pt-10 pb-24 px-6 bg-zinc-950"
        >
            <div className="max-w-7xl mx-auto">

                <h2 className="text-center text-4xl font-bold mb-14">
                    Nuestras Disciplinas
                </h2>

                <div className="grid md:grid-cols-3 gap-8">

                    {disciplines.map(discipline => (
                        <article
                            key={discipline.name}
                            className="bg-zinc-900 rounded-xl overflow-hidden border border-zinc-800 hover:border-red-600 transition"
                        >
                            <img
                                src={discipline.image}
                                alt={discipline.name}
                                className="h-64 w-full object-cover"
                            />

                            <div className="p-6">

                                <h3 className="text-2xl font-bold mb-4 text-red-500">
                                    {discipline.name}
                                </h3>

                                <p className="text-zinc-400">
                                    {discipline.description}
                                </p>

                            </div>
                        </article>
                    ))}

                </div>

            </div>
        </section>
    );
}

export default Disciplines;