
// Import images - replace these imports with the actual paths to your images
import Ernest from '../assets/Ernest.jpg';
import jiraya from '../assets/jiraya.jpeg';
import Jovan from '../assets/Jovan.jpg';
import Roger from '../assets/Roger.jpg';

const teamMembers = [
  {
    name: 'Ernest Torto',
    role: 'Product Manager',
    image: Ernest,
    bio: 'Ernest  leads our product team with a decade of experience in project management.',
    linkedin: 'https://www.linkedin.com/in/janedoe',
  },
  {
    name: 'Jordan Teye',
    role: 'Lead Developer',
    image: jiraya,
    bio: 'Jiraya is the architect behind the FitFam app, specializing in scalable solutions.',
    linkedin: 'https://www.linkedin.com/in/johnsmith',
  },
  {
    name: 'Roger Osae',
    role: 'UX/UI Designer',
    image: Roger,
    bio: 'Roger designs intuitive user experiences and engaging app interfaces.',
    linkedin: 'https://www.linkedin.com/in/alicejohnson',
  },
  {
    name: 'Jude Jovan ',
    role: 'Fitness Consultant',
    image: Jovan,
    bio: 'Jude brings fitness expertise to ensure our app meets the needs of fitness enthusiasts.',
    linkedin: 'https://www.linkedin.com/in/bobbrown',
  },
];

export const AboutPage= () => {
  return (
    <div className="container mx-auto p-6">
        {/* Header Section */}
      <header className="bg-red-600 text-white mb-4 p-4">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-3xl font-bold">About Us</h1>
          <nav>
            <a href="/login" className="mx-2">Login</a>
            <a href="/signup" className="mx-2">Signup</a>
            <a href="/" className="mx-2">Home</a>
           
          </nav>
        </div>
      </header>

    
      
      <div className="space-y-12">
        {teamMembers.map(member => (
          <div key={member.name} className="flex flex-col md:flex-row items-center md:items-start md:space-x-6">
            <img src={member.image} alt={member.name} className="w-48 h-48 rounded-full mb-4 md:mb-0"/>
            <div>
              <h2 className="text-2xl font-bold">{member.name}</h2>
              <p className="text-gray-800">{member.role}</p>
              <p className="text-gray-600 mt-2">{member.bio}</p>
              <a href={member.linkedin} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800 mt-2 inline-block">Connect on LinkedIn</a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
