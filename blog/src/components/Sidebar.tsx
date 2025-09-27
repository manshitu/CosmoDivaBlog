import { useState } from "react";

export default function Sidebar() {
  const [email, setEmail] = useState("");
  const [buttonText, setButtonText] = useState("Subscribe");
  const [isValid, setIsValid] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{ text: string; type: "success" | "error" | null }>({
    text: "",
    type: null,
  });

  const validateEmail = (value: string) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(value);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setEmail(value);
    setIsValid(validateEmail(value));
  };

  const handleSubscribe = async () => {
    if (!isValid) return;

    setLoading(true);
    setButtonText("Please wait...");
    setMessage({ text: "", type: null });

    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();

      if (data.success) {
        setButtonText("Subscribed 🎉");
        setMessage({ text: "Successfully subscribed!", type: "success" });
        setEmail(""); // clear field only on success
        setIsValid(false);
      } else if (data.already) {
        setButtonText("Already Subscribed 💌");
        setMessage({ text: "You’re already subscribed 💌", type: "error" });
        setIsValid(false);
      } else {
        setButtonText("Try Again ❌");
        setMessage({ text: data.error || "Something went wrong", type: "error" });
      }
    } catch (err) {
      console.error("Subscription failed", err);
      setButtonText("Error ❌");
      setMessage({ text: "Subscription failed. Please try again.", type: "error" });
    } finally {
      setLoading(false);

      // Reset button text after 0.7s
      setTimeout(() => setButtonText("Subscribe"), 1500);

      // Clear message after 1.5s
      setTimeout(() => setMessage({ text: "", type: null }), 2500);
    }
  };

  return (
    <aside className="space-y-6">
      {/* About section */}
      <div className="bg-white p-6 rounded-xl shadow">
        <h3 className="text-xl font-semibold text-purple-700 mb-3">About CosmoDiva</h3>
        <p className="text-gray-600 mb-3">
          CosmoDiva is a women's health platform dedicated to helping you
          understand your cycle, optimize your fertility, and embrace your
          feminine power.
        </p>
        <a href="/about" className="text-purple-600 font-semibold hover:text-pink-500">
          Learn More →
        </a>
      </div>

      {/* Subscribe section */}
      <div className="bg-white p-6 rounded-xl shadow">
        <h3 className="text-xl font-semibold text-purple-700 mb-3">Subscribe</h3>
        <input
          type="email"
          value={email}
          onChange={handleChange}
          placeholder="Your email address"
          className="w-full border rounded-lg px-3 py-2 mb-2 focus:outline-purple-600"
        />

        {/* Inline message */}
        {message.text && (
          <p
            className={`text-sm mb-2 ${
              message.type === "success" ? "text-green-600" : "text-red-600"
            }`}
          >
            {message.text}
          </p>
        )}

        <button
          onClick={handleSubscribe}
          disabled={!isValid || loading}
          className={`w-full py-2 rounded-lg font-semibold text-white transition ${
            !isValid || loading
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-gradient-to-r from-purple-600 to-pink-500 hover:opacity-90"
          }`}
        >
          {buttonText}
        </button>
      </div>
    </aside>
  );
}
