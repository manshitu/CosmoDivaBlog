import React from "react";

export default function About() {
  return (
    <main className="max-w-5xl mx-auto px-4 py-12">
      {/* Hero / Intro */}
      <section className="text-center mb-12">
        <h1 className="text-4xl font-bold text-purple-700 mb-4">🌸 About CosmoDiva</h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          At CosmoDiva, we believe women deserve more than just a calendar app.  
          We are a comprehensive women’s health platform designed to guide you through every stage of life —  
          from your first period to menopause and beyond.
        </p>
      </section>

      {/* Mission */}
      <section className="bg-white rounded-xl shadow p-8 mb-12">
        <h2 className="text-2xl font-semibold text-purple-600 mb-4">Our Mission 🌟</h2>
        <p className="text-gray-700">
          Our mission is simple: <br />
          👉 Help you understand your body, embrace your cycle, and make informed decisions about your health.
        </p>
      </section>

      {/* What We Do */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold text-purple-600 mb-6">💖 What We Do</h2>
        <p className="text-gray-700 mb-6">
          CosmoDiva combines science-backed insights, cycle tracking tools, and a growing knowledge base 
          to make women’s health easy to understand and manage. With CosmoDiva, you can:
        </p>
        <ul className="space-y-3 text-gray-700 list-disc list-inside">
          <li>📅 Track your periods & cycles with accuracy</li>
          <li>🌱 Know your ovulation & fertile days to optimize chances of conceiving or avoiding pregnancy naturally</li>
          <li>🔒 Identify your safe days for confidence and peace of mind</li>
          <li>📚 Access expert tips & articles on periods, PCOS, fertility, self-care, and women’s wellness</li>
          <li>🤝 Be part of a community that values openness, support, and empowerment</li>
        </ul>
      </section>

      {/* Why CosmoDiva */}
      <section className="bg-white rounded-xl shadow p-8 mb-12">
        <h2 className="text-2xl font-semibold text-purple-600 mb-4">🌍 Why CosmoDiva?</h2>
        <p className="text-gray-700 mb-4">
          There are many health apps, but most focus only on data tracking. CosmoDiva is different.  
          We are creating a trusted space for women where technology meets empathy.
        </p>
        <ul className="space-y-3 text-gray-700 list-disc list-inside">
          <li>✅ All age groups included: Teens, young women, new mothers, midlife women, and menopause.</li>
          <li>✅ Localized & relatable content: Health advice tailored to diverse lifestyles and cultural contexts.</li>
          <li>✅ Your privacy matters: We respect and protect your data — always.</li>
        </ul>
      </section>

      {/* Vision */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold text-purple-600 mb-4">🚀 Our Vision</h2>
        <p className="text-gray-700">
          To empower every woman to feel confident, informed, and in control of her health journey.  
          We dream of a future where women’s health is no longer a taboo,  
          but a celebrated and understood part of life.
        </p>
      </section>

      {/* Join Movement */}
      <section className="text-center bg-gradient-to-r from-purple-600 to-pink-500 text-white rounded-xl shadow p-10">
        <h2 className="text-2xl font-semibold mb-4">🌸 Join the CosmoDiva Movement</h2>
        <p className="mb-6 max-w-2xl mx-auto">
          Whether you want to track your cycle, plan for pregnancy, or simply understand your body better —  
          CosmoDiva is here for you. ✨  
          Because your health, your cycle, and your story deserve to be celebrated.
        </p>
        <a
          href="/"
          className="inline-block px-6 py-3 bg-white text-purple-700 rounded-lg font-semibold hover:bg-gray-100"
        >
          Back to Home
        </a>
      </section>
    </main>
  );
}
