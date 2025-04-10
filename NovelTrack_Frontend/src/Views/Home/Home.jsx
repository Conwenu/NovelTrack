import { FaBook, FaPencilAlt, FaLightbulb } from "react-icons/fa"

const Home = () => {
  return (
    <div className="min-h-screen  bg-gradient-to-b from-purple-100 to-indigo-200">


      <main className="container mx-auto px-4 py-16">
        <section className="text-center mb-16">
          <h1 className="text-5xl font-bold text-indigo-900 mb-4">Your Personal Book Journey</h1>
          <p className="text-xl text-indigo-800 mb-8">
            Track, review, and discover your next favorite read with NovelTrack
          </p>
          <a
            href="#"
            className="bg-indigo-600 text-white px-8 py-3 rounded-full text-lg hover:bg-indigo-700 transition duration-300"
          >
            Get Started
          </a>
        </section>

        <section id="features" className="grid md:grid-cols-3 gap-8 mb-16">
          <FeatureCard
            icon={<FaBook className="text-4xl text-indigo-600" />}
            title="Track Your Reads"
            description="Keep a detailed log of books you've read, are currently reading, and want to read in the future."
          />
          <FeatureCard
            icon={<FaPencilAlt className="text-4xl text-indigo-600" />}
            title="Write Reviews"
            description="Share your thoughts and insights with the community through in-depth book reviews."
          />
          <FeatureCard
            icon={<FaLightbulb className="text-4xl text-indigo-600" />}
            title="Get Recommendations"
            description="Discover new books tailored to your tastes based on previous books you've enjoyed."
          />
        </section>

        <section className="text-center">
          <h2 className="text-3xl font-bold text-indigo-900 mb-4">Join the NovelTrack Community</h2>
          <p className="text-xl text-indigo-800 mb-8">
            Connect with fellow book lovers, share your literary journey, and explore new worlds through reading.
          </p>
          <a
            href="#"
            className="bg-indigo-600 text-white px-8 py-3 rounded-full text-lg hover:bg-indigo-700 transition duration-300"
          >
            Sign Up Now
          </a>
        </section>
      </main>


    </div>
  )
}

const FeatureCard = ({ icon, title, description }) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <div className="flex justify-center mb-4">{icon}</div>
      <h3 className="text-xl font-semibold text-indigo-800 mb-2">{title}</h3>
      <p className="text-indigo-700">{description}</p>
    </div>
  )
}

export default Home;
