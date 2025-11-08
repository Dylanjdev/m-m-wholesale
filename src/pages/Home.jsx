import { motion } from "framer-motion";

function Home() {
  return (
    <>
      {/* HERO */}
      <section className="relative h-[75vh] flex items-center justify-center text-center bg-[url('/warehouse-bg.jpg')] bg-cover bg-center">
        <div className="absolute inset-0 bg-black/60"></div>
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative z-10 text-white px-6"
        >
          <h1 className="text-5xl md:text-6xl font-extrabold mb-3 drop-shadow-[0_3px_4px_rgba(0,0,0,0.7)]">
            M&M Wholesale
          </h1>
          <p className="text-lg mb-6 drop-shadow-[0_2px_3px_rgba(0,0,0,0.6)]">
            Furniture • Tools • Patio Sets • Home Goods — New deals every week!
          </p>
          <div className="flex justify-center gap-4 flex-wrap">
            <a
              href="/gallery"
              className="px-6 py-3 bg-yellow-400 text-black font-semibold rounded-full hover:bg-yellow-300 transition"
            >
              See What We Carry
            </a>
            <a
              href="https://www.facebook.com/moviesnmoore/"
              target="_blank"
              rel="noreferrer"
              className="px-6 py-3 bg-white text-black font-semibold rounded-full hover:bg-gray-200 transition"
            >
              Visit Facebook
            </a>
          </div>
        </motion.div>
      </section>

      {/* INFO SECTION */}
      <section className="max-w-5xl mx-auto text-center mt-16 px-4">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-3xl font-semibold mb-6"
        >
          Why Shop With Us
        </motion.h2>

        <div className="grid sm:grid-cols-3 gap-6 text-gray-700">
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h3 className="font-bold text-lg mb-2">🛒 Huge Variety</h3>
            <p>
              From furniture and decor to tools and patio sets — you’ll always
              find something new.
            </p>
          </div>
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h3 className="font-bold text-lg mb-2">💰 Unbeatable Prices</h3>
            <p>
              We keep prices low by buying liquidation and return pallets — you
              save big.
            </p>
          </div>
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h3 className="font-bold text-lg mb-2">📍 Local & Friendly</h3>
            <p>
              Visit us in Pennington Gap, VA for great deals and friendly local
              service.
            </p>
          </div>
        </div>
      </section>

 {/* FACEBOOK CTA */}
<section className="bg-gradient-to-b from-yellow-100 to-yellow-200 text-center py-16 mt-20 px-4">
  <div className="max-w-xl mx-auto bg-white rounded-2xl shadow-lg p-8">
    <h2 className="text-3xl font-bold mb-4 text-gray-900">
      Want to see what’s new this week?
    </h2>
    <p className="mb-6 text-gray-700 text-lg">
      We post our latest arrivals, tools, furniture, and deals on Facebook —
      check out what’s in this week!
    </p>

    <a
      href="https://www.facebook.com/moviesnmoore/"
      target="_blank"
      rel="noreferrer"
      className="inline-block px-8 py-3 text-white text-lg font-semibold rounded-full shadow-md hover:shadow-lg transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-blue-300"
      style={{
        backgroundColor: "#1877F2", // solid Facebook blue
        color: "#fff",
        opacity: 1, // force full opacity
        WebkitTextStroke: "0px", // ensure crisp text edges
      }}
    >
      Follow Us on Facebook
    </a>
  </div>
</section>

    </>
  );
}

export default Home;
