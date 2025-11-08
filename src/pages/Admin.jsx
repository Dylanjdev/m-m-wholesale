import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { auth, db, storage } from "../firebase";
import {
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
} from "firebase/auth";
import {
  ref as dbRef,
  push,
  set,
  onValue,
  remove,
} from "firebase/database";
import {
  ref as storageRef,
  uploadBytes,
  getDownloadURL,
  deleteObject,
} from "firebase/storage";

function Admin() {
  const [user, setUser] = useState(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  // Upload form fields
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState(null);
  const [items, setItems] = useState([]);

  // Watch auth state
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      if (firebaseUser && firebaseUser.uid === "qw9Rie16MieP4XYyNafZAjLkgu13") {
        setUser(firebaseUser);
      } else {
        setUser(null);
      }
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  // Load gallery items
  useEffect(() => {
    if (!user) return;
    const galleryRef = dbRef(db, "gallery");
    onValue(galleryRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const formatted = Object.entries(data).map(([id, value]) => ({
          id,
          ...value,
        }));
        setItems(formatted.reverse()); // newest first
      } else {
        setItems([]);
      }
    });
  }, [user]);

  // Login handler
  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (err) {
      setError("Invalid email or password");
    }
  };

  // Logout handler
  const handleLogout = async () => {
    await signOut(auth);
  };

  // Upload new item
  const handleUpload = async (e) => {
    e.preventDefault();
    if (!image) return alert("Select an image first!");

    try {
      const imageRef = storageRef(
        storage,
        `gallery/${Date.now()}-${image.name}`
      );
      await uploadBytes(imageRef, image);
      const downloadURL = await getDownloadURL(imageRef);

      const newItemRef = push(dbRef(db, "gallery"));
      await set(newItemRef, {
        title,
        price,
        imageUrl: downloadURL,
        createdAt: Date.now(),
      });

      setTitle("");
      setPrice("");
      setImage(null);
      alert("Item uploaded successfully!");
    } catch (err) {
      console.error(err);
      alert("Upload failed.");
    }
  };

  // Delete item
  const handleDelete = async (id, imageUrl) => {
    if (!window.confirm("Delete this item?")) return;

    try {
      await remove(dbRef(db, `gallery/${id}`));
      const fileRef = storageRef(storage, imageUrl);
      await deleteObject(fileRef);
    } catch (err) {
      console.error(err);
      alert("Failed to delete.");
    }
  };

  if (loading)
    return <p className="text-center mt-20">Loading...</p>;

  // --- LOGIN SCREEN ---
  if (!user) {
    return (
      <section className="flex items-center justify-center min-h-[60vh] px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-md bg-white shadow-lg rounded-xl p-8"
        >
          <h1 className="text-2xl font-bold mb-4 text-center text-gray-900">
            Admin Login
          </h1>
          {error && (
            <p className="bg-red-100 text-red-700 p-2 mb-4 rounded">
              {error}
            </p>
          )}
          <form onSubmit={handleLogin} className="space-y-4">
            <input
              type="email"
              placeholder="Email"
              className="w-full border rounded-lg p-2"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <input
              type="password"
              placeholder="Password"
              className="w-full border rounded-lg p-2"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button
              type="submit"
              className="w-full py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
            >
              Log In
            </button>
          </form>
        </motion.div>
      </section>
    );
  }

  // --- DASHBOARD SCREEN ---
  return (
    <section className="max-w-5xl mx-auto px-4 mt-10 pb-20">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-900">
          Admin Dashboard
        </h1>
        <button
          onClick={handleLogout}
          className="px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300 transition"
        >
          Log Out
        </button>
      </div>

      <form
        onSubmit={handleUpload}
        className="bg-white shadow-lg rounded-xl p-6 mb-10 space-y-4"
      >
        <h2 className="text-xl font-semibold mb-3">
          Add New Gallery Item
        </h2>
        <input
          type="text"
          placeholder="Item Title"
          className="w-full border rounded-lg p-2"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Price or Note"
          className="w-full border rounded-lg p-2"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />
        <input
          type="file"
          accept="image/*"
          className="w-full border rounded-lg p-2"
          onChange={(e) => setImage(e.target.files[0])}
          required
        />
        <button
          type="submit"
          className="w-full py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
        >
          Upload Item
        </button>
      </form>

      <h2 className="text-xl font-semibold mb-4">Current Gallery</h2>
      {items.length === 0 ? (
        <p className="text-gray-600 text-center">No items yet.</p>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map((item) => (
            <div
              key={item.id}
              className="bg-white shadow-md rounded-lg overflow-hidden"
            >
              <img
                src={item.imageUrl}
                alt={item.title}
                className="h-48 w-full object-cover"
              />
              <div className="p-4 text-center">
                <h3 className="font-semibold">{item.title}</h3>
                <p className="text-gray-600 mb-3">{item.price}</p>
                <button
                  onClick={() => handleDelete(item.id, item.imageUrl)}
                  className="px-4 py-1 bg-red-500 text-white rounded hover:bg-red-600 transition"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}

export default Admin;
