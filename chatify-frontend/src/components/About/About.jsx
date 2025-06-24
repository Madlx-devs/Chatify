import React from 'react';

const About = () => {
  return (
    <section className="bg-black text-gray-800 py-16 px-6 md:px-16">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-4xl font-extrabold text-center text-indigo-600 mb-8">
          About Chatify
        </h2>

        <p className="text-lg text-white mb-6 text-center">
          <strong>Welcome to Chatify – Where Conversations Come Alive!</strong>
        </p>

        <p className="text-base leading-relaxed mb-6 text-white">
          At Chatify, we believe that <span className="font-semibold text-indigo-500">every chat has a story</span>. Whether you're catching up with friends, meeting new people, or diving into deep discussions, our room-based chat platform is designed to make your conversations smooth, simple, and meaningful.
        </p>

        <h3 className="text-2xl font-semibold text-white mt-10 mb-4">💬 What is Chatify?</h3>
        <ul className="list-disc pl-6 space-y-2 text-white">
          <li><strong>🏠 Room-Based Structure:</strong> Join topic-focused rooms or start your own – it’s your space, your vibe.</li>
          <li><strong>🔒 Privacy First:</strong> Choose public, private, or invite-only rooms to control your chat space.</li>
          <li><strong>✨ Minimal & Modern:</strong> Clean design, fast performance, and mobile-friendly.</li>
        </ul>

        <h3 className="text-2xl font-semibold text-white mt-10 mb-4">🌍 Why Chatify?</h3>
        <p className="text-base leading-relaxed mb-6 text-white" >
          In a world overflowing with social noise, Chatify brings back the <span className="font-semibold text-indigo-500">magic of real-time conversations</span>. No likes, no endless scroll – just pure, engaging chat with people who care about what you're saying.
        </p>

        <h3 className="text-2xl font-semibold text-white mt-10 mb-4">🚀 Join the Conversation</h3>
        <p className="text-base leading-relaxed mb-6 text-white">
          Whether you're here to make new connections, collaborate with a team, or just unwind with fun chats – <strong>Chatify is your place to talk freely, instantly, and beautifully.</strong>
        </p>

        <div className="text-center mt-12">
          <p className="text-lg font-medium text-indigo-600">Come for the chat, stay for the vibe.</p>
          <p className="text-lg font-semibold text-white mt-1">Let’s talk. Let’s Chatify. 💜</p>
        </div>
      </div>
    </section>
  );
};

export default About;
