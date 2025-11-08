import { motion } from "framer-motion";

function Contact() {
  return (
    <section className="max-w-3xl mx-auto text-center">
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-3xl font-bold mb-4"
      >
        Contact Us
      </motion.h1>

      <p className="text-gray-600 mb-10">
        Have a question about products, pricing, or what’s in stock?
        <br />
        We’re here to help!
      </p>

      <div className="flex flex-col gap-4 text-gray-700">
        <p>
          <strong>📍 Address:</strong> 177 Dollar Dr Suite 102, Pennington Gap,
          VA 24277
        </p>
        <p>
          <strong>📞 Phone:</strong>{" "}
          <a href="tel:2768708615">(276) 870-8615</a>
        </p>
        <p>
          <strong>✉️ Email:</strong>{" "}
          <a href="mailto:moviesnmore@hotmail.com">
            moviesnmore@hotmail.com
          </a>
        </p>
        <p>
          <strong>📸 Facebook:</strong>{" "}
          <a
            href="https://www.facebook.com/moviesnmoore/"
            target="_blank"
            rel="noreferrer"
          >
            M&M Wholesale
          </a>
        </p>
      </div>

      <iframe
        src="https://www.google.com/maps?q=177+dollar+dr+pennington+gap+va&output=embed"
        className="w-full h-80 rounded-lg shadow-lg border mt-10"
        loading="lazy"
      ></iframe>
    </section>
  );
}

export default Contact;


