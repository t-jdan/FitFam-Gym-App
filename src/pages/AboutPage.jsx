
// Import images - replace these imports with the actual paths to your images
import naruto from '../assets/naruto.jpeg';
import jiraya from '../assets/jiraya.jpeg';
import sasuke from '../assets/sasuke.jpeg';
import boruto from '../assets/boruto.jpeg';

const teamMembers = [
  {
    name: 'Naruto',
    role: 'Product Manager',
    image: naruto,
    bio: 'Naruto leads our product team with a decade of experience in project management.',
    linkedin: 'https://www.linkedin.com/in/janedoe',
  },
  {
    name: 'Jiraya',
    role: 'Lead Developer',
    image: jiraya,
    bio: 'Jiraya is the architect behind the FitFam app, specializing in scalable solutions.',
    linkedin: 'https://www.linkedin.com/in/johnsmith',
  },
  {
    name: 'Boruto',
    role: 'UX/UI Designer',
    image: boruto,
    bio: 'Boruto designs intuitive user experiences and engaging app interfaces.',
    linkedin: 'https://www.linkedin.com/in/alicejohnson',
  },
  {
    name: 'Sasuke',
    role: 'Fitness Consultant',
    image: sasuke,
    bio: 'Sasuke brings fitness expertise to ensure our app meets the needs of fitness enthusiasts.',
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
