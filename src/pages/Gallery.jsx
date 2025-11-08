import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { db } from "../firebase";
import { ref, onValue } from "firebase/database";

function Gallery() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  // Load gallery data from Firebase
  useEffect(() => {
    const galleryRef = ref(db, "gallery");
    const unsubscribe = onValue(galleryRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const formatted = Object.entries(data).map(([id, value]) => ({
          id,
          ...value,
        }));
        setItems(formatted.reverse()); // show newest first
      } else {
        setItems([]);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  return (
    <section className="max-w-6xl mx-auto px-4 py-12">
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-3xl font-bold text-center mb-4"
      >
        What We Carry
      </motion.h1>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="text-center text-gray-600 mb-10 max-w-2xl mx-auto"
      >
        Here’s a look at some of the types of items you’ll find at M&M Wholesale.
        <br />
        Our stock changes weekly — visit us or follow us on Facebook for new
        arrivals!
      </motion.p>

      {loading ? (
        <p className="text-center text-gray-500">Loading gallery...</p>
      ) : items.length === 0 ? (
        <p className="text-center text-gray-500">
          No items yet. Check back soon!
        </p>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {items.map((item, i) => (
            <motion.div
              key={i}
              whileHover={{ scale: 1.03 }}
              transition={{ type: "spring", stiffness: 200 }}
              className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition"
            >
              <div className="h-64 bg-gray-200 flex items-center justify-center">
                <img
                  src={item.imageUrl}
                  alt={item.title}
                  className="h-full w-full object-cover"
                  loading="lazy"
                />
              </div>
              <div className="p-5 text-center">
                <h3 className="font-semibold text-lg">{item.title}</h3>
                <p className="text-gray-600">{item.price}</p>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      {/* Facebook CTA */}
      <section className="bg-gradient-to-b from-yellow-100 to-yellow-200 text-center py-14 mt-20 rounded-2xl shadow-md">
        <div className="max-w-xl mx-auto bg-white/90 rounded-2xl shadow-lg p-8">
          <h2 className="text-3xl font-bold mb-4 text-gray-900">
            See More on Our Facebook Page
          </h2>
          <p className="mb-6 text-gray-700 text-lg">
            We post new arrivals, furniture, tools, and special deals every week
            — follow us to stay updated!
          </p>

          <a
            href="https://www.facebook.com/moviesnmoore/"
            target="_blank"
            rel="noreferrer"
            className="inline-block px-8 py-3 bg-[#1877F2] text-white rounded-full font-semibold text-lg shadow-md hover:shadow-lg hover:bg-[#166FE0] transition-all duration-300"
          >
            Visit Us on Facebook
          </a>
        </div>
      </section>
    </section>
  );
}

export default Gallery;


