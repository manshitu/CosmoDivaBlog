import { useState } from "react";

export default function Sidebar() {
  const [email, setEmail] = useState("");
  const [buttonText, setButtonText] = useState("Subscribe");

  const handleSubscribe = async () => {
    if (!email) return;

    setButtonText("Please wait...");
    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();

      if (data.success) {
        setButtonText("Subscribed, Thankyou! 🎉");
      } else if (data.already) {
        setButtonText("Already Subscribed 💌");
      } else {
        setButtonText("Try Again ❌");
      }
    } catch (err) {
      console.error("Subscription failed", err);
    } finally {
      // Reset after 0.5s
      setTimeout(() => setButtonText("Subscribe"), 700);
      setEmail(""); // clear field
    }
  };

  return (
    <aside className="space-y-6">
      <div className="bg-white p-6 rounded-xl shadow">
        <h3 className="text-xl font-semibold text-purple-700 mb-3">
          About CosmoDiva
        </h3>
        <p className="text-gray-600 mb-3">
          CosmoDiva is a women's health platform dedicated to helping you
          understand your cycle, optimize your fertility, and embrace your
          feminine power.
        </p>
        <a
          href="/about"
          className="text-purple-600 font-semibold hover:text-pink-500"
        >
          Learn More →
        </a>
      </div>

      <div className="bg-white p-6 rounded-xl shadow">
        <h3 className="text-xl font-semibold text-purple-700 mb-3">
          Subscribe
        </h3>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Your email address"
          className="w-full border rounded-lg px-3 py-2 mb-3 focus:outline-purple-600"
        />
        <button
          onClick={handleSubscribe}
          className="w-full bg-gradient-to-r from-purple-600 to-pink-500 text-white py-2 rounded-lg font-semibold disabled:opacity-50"
          disabled={!email}
        >
          {buttonText}
        </button>
      </div>
    </aside>
  );
}
