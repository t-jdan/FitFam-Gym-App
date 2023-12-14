
import fitfam from "../assets/fitfam.jpeg"
export const LandingPage = () => {
  return (
    <div className="font-sans">
      {/* Header Section */}
      <header className="bg-red-600 text-white p-4">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-3xl font-bold">FitFam</h1>
          <nav>
            <a href="/login" className="mx-2">Login</a>
            <a href="/about" className="mx-2">About</a>
          </nav>
        </div>
      </header>

     {/* Hero Section with Background Image */}
     <section
        className="text-center py-60 bg-cover bg-center"
        style={{ backgroundImage: `url(${fitfam})` }}
      >
        <h2 className="text-5xl font-bold text-white mb-4">Join FitFam Today</h2>
        <p className="text-xl text-white mb-2">Your journey to fitness and fun begins here.</p>
        <p className="text-xl text-white mb-8">Join us to stay healthy and win amazing prizes.</p>
        <a href="/signup" className="bg-black text-white hover:bg-gray-800 py-3 px-6 rounded-full text-lg">Get Started</a>
      </section>
     
      {/* About Section */}
      <section id="about" className="bg-gray-100 py-20">
        <div className="container mx-auto text-center">
          <h3 className="text-3xl font-bold mb-8">About FitFam</h3>
          <p className="mx-auto leading-relaxed max-w-2xl">
            FitFam is a comprehensive app designed for institutions to manage their gym activities and participate in exciting calorie-burning competitions.
          </p>
        </div>
      </section>

      {/* Footer Section */}
      <footer className="bg-gray-800 text-white text-center p-4">
        <p>Follow us on social media</p>
        {/* Social Media Links */}
      </footer>
    </div>
  );
};
