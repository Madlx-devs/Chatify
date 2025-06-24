

import Rooms from "../Rooms/Rooms"


function HomePage() {

  const user = localStorage.getItem('user')
   
  return (
    !user &&
    <main className=" text-white bg-black">
      {/* Hero Section */}
      <section className="text-center py-16 px-4">
        <h1 className="text-4xl sm:text-5xl font-bold mb-4">Conversations that Click.</h1>
        <p className="text-lg text-white mb-6">
          Simple, secure, and lightning-fast messaging for everyone.
        </p>
        <div className="flex justify-center gap-4">
          <a href="/signup" className="border border-blue-400 text-white px-6 py-3 rounded-md hover:bg-black hover:border-blue-600 hover:text-white transition">
            Try It Free
          </a>
          <a href="#how-it-works" className="border border-blue-400 text-white px-6 py-3 rounded-md hover:bg-black hover:text-white transition hover:border-blue-600">
            See How It Works
          </a>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto grid gap-10 md:grid-cols-3 text-center">
          <div>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6 flex justify-center ">
              <path fillRule="evenodd" d="M12 1.5a5.25 5.25 0 0 0-5.25 5.25v3a3 3 0 0 0-3 3v6.75a3 3 0 0 0 3 3h10.5a3 3 0 0 0 3-3v-6.75a3 3 0 0 0-3-3v-3c0-2.9-2.35-5.25-5.25-5.25Zm3.75 8.25v-3a3.75 3.75 0 1 0-7.5 0v3h7.5Z" clipRule="evenodd" />
            </svg>
            <h3 className="text-xl font-semibold mb-2">End-to-End Encryption</h3>
            <p className="text-gray-600">Your chats stay between you and the people you trust.</p>
          </div>
          <div>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6">
              <path fillRule="evenodd" d="M4.848 2.771A49.144 49.144 0 0 1 12 2.25c2.43 0 4.817.178 7.152.52 1.978.292 3.348 2.024 3.348 3.97v6.02c0 1.946-1.37 3.678-3.348 3.97a48.901 48.901 0 0 1-3.476.383.39.39 0 0 0-.297.17l-2.755 4.133a.75.75 0 0 1-1.248 0l-2.755-4.133a.39.39 0 0 0-.297-.17 48.9 48.9 0 0 1-3.476-.384c-1.978-.29-3.348-2.024-3.348-3.97V6.741c0-1.946 1.37-3.68 3.348-3.97ZM6.75 8.25a.75.75 0 0 1 .75-.75h9a.75.75 0 0 1 0 1.5h-9a.75.75 0 0 1-.75-.75Zm.75 2.25a.75.75 0 0 0 0 1.5H12a.75.75 0 0 0 0-1.5H7.5Z" clipRule="evenodd" />
            </svg>
            <h3 className="text-xl font-semibold mb-2">Instant Messaging</h3>
            <p className="text-gray-600">Messages send and receive in milliseconds — even on slow networks.</p>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="py-20 px-4">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-8">How It Works</h2>
          <ol className="text-left text-white space-y-4 max-w-md mx-auto list-decimal list-inside">
            <li>Create your chat space.</li>
            <li>Invite teammates or friends.</li>
            <li>Start chatting — with text, voice, or video.</li>
          </ol>
        </div>
      </section>

      {/* Testimonial Section */}
      <section className="py-16 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <blockquote className="text-xl italic text-white">
            “This chat app completely replaced our old tools. Faster, cleaner, and more secure.”
          </blockquote>
          <footer className="mt-4 text-gray-500">— Alex R., Product Manager</footer>
        </div>
      </section>

      {/* Final Call to Action */}
      <section className="py-16 bg-black text-white text-center px-4">
        <h2 className="text-3xl font-bold mb-4">Ready to make the switch?</h2>
        <a href="/signup" className=" text-white px-6 py-3 rounded-md font-semibold border border-blue-400 hover:bg-black hover:text-white transition hover:border-blue-600">
          Get Started for Free
        </a>
      </section>
      <Rooms/>
    </main>

  )
}

export default HomePage