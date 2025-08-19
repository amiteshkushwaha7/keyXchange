import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaUsers, FaHandshake, FaLightbulb, FaLock, FaGlobe, FaRecycle, FaQuoteLeft } from 'react-icons/fa';

const About = () => {
    const fadeIn = {
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { duration: 0.5 } }
    };

    return (
        <>
            <title>About Us | Digital Goods Marketplace</title>
            <meta name="description" content="Learn about our mission and values" />

            <div className="bg-gradient-to-b from-gray-50 to-gray-100 min-h-screen font-sans">
                {/* Hero Section */}
                <div className="relative bg-gradient-to-r from-purple-900 to-indigo-800">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="relative max-w-7xl mx-auto py-24 px-4 sm:py-32 sm:px-6 lg:px-8 text-center"
                    >
                        <h1 className="text-4xl font-bold text-white sm:text-5xl lg:text-6xl">
                            Our Vision for Digital Commerce
                        </h1>
                        <p className="mt-6 text-xl text-purple-100 max-w-3xl mx-auto leading-relaxed">
                            Pioneering a trusted marketplace where digital innovation meets seamless transactions
                        </p>
                    </motion.div>
                </div>

                {/* Our Story */}
                <div className="max-w-7xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:px-8">
                    <motion.div
                        initial="hidden"
                        animate="visible"
                        variants={fadeIn}
                        className="lg:grid lg:grid-cols-2 lg:gap-16 items-center"
                    >
                        <div>
                            <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl mb-8 relative">
                                Our Journey
                            </h2>
                            <div className="space-y-6">
                                <p className="text-gray-700 leading-relaxed text-lg">
                                    Founded in 2025, Digital Goods Marketplace was born from a revolutionary idea: to create the most trusted ecosystem for digital product exchange.
                                </p>
                                <p className="text-gray-700 leading-relaxed text-lg">
                                    What began as a bold vision in a small office has blossomed into a global platform empowering thousands of digital creators and consumers daily.
                                </p>
                                <div className="mt-8 p-6 bg-purple-50 rounded-xl border-l-4 border-purple-500">
                                    <FaQuoteLeft className="text-purple-400 text-2xl mb-4" />
                                    <p className="italic text-gray-700">
                                        "We don't just facilitate transactions—we're building the future of digital commerce."
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className="mt-12 lg:mt-0">
                            <div className="bg-gradient-to-br from-purple-100 to-indigo-100 h-full rounded-2xl p-8 flex items-center justify-center">
                                <div className="text-center">
                                    <div className="text-6xl font-bold text-purple-500 mb-2">100%</div>
                                    <div className="text-xl font-medium text-gray-700">Customer Satisfaction Focus</div>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>

                {/* Mission and Values */}
                <div className="bg-white py-16">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <motion.div
                            initial="hidden"
                            animate="visible"
                            variants={fadeIn}
                            className="text-center mb-16"
                        >
                            <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl mb-4 relative">
                                Core Principles
                            </h2>
                            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                                The foundation of everything we build
                            </p>
                        </motion.div>

                        <motion.div
                            initial="hidden"
                            animate="visible"
                            variants={fadeIn}
                        >
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                                {[
                                    {
                                        name: 'Customer First',
                                        description:
                                            'We prioritize our customers in every decision we make, ensuring their needs are always met with exceptional service.',
                                        icon: <FaUsers className="h-6 w-6 text-purple-600" />,
                                        color: 'bg-purple-50'
                                    },
                                    {
                                        name: 'Integrity',
                                        description:
                                            'We conduct business with honesty and transparency, building trust with every transaction.',
                                        icon: <FaHandshake className="h-6 w-6 text-purple-600" />,
                                        color: 'bg-indigo-50'
                                    },
                                    {
                                        name: 'Innovation',
                                        description:
                                            'We continuously improve our platform to deliver cutting-edge solutions for digital commerce.',
                                        icon: <FaLightbulb className="h-6 w-6 text-purple-600" />,
                                        color: 'bg-blue-50'
                                    },
                                    {
                                        name: 'Security',
                                        description:
                                            'We implement robust security measures to protect both buyers and sellers.',
                                        icon: <FaLock className="h-6 w-6 text-purple-600" />,
                                        color: 'bg-cyan-50'
                                    },
                                    {
                                        name: 'Global Community',
                                        description:
                                            'We foster a vibrant community where digital creators and consumers can thrive together.',
                                        icon: <FaGlobe className="h-6 w-6 text-purple-600" />,
                                        color: 'bg-teal-50'
                                    },
                                    {
                                        name: 'Sustainability',
                                        description:
                                            'We promote the digital economy as a sustainable alternative to physical goods.',
                                        icon: <FaRecycle className="h-6 w-6 text-purple-600" />,
                                        color: 'bg-emerald-50'
                                    },
                                ].map((value, index) => (
                                    <motion.div
                                        key={value.name}
                                        whileHover={{ y: -5 }}
                                        className={`${value.color} p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow`}
                                    >
                                        <div className="flex items-start">
                                            <div className="flex-shrink-0 bg-white p-3 rounded-lg shadow-xs">
                                                {value.icon}
                                            </div>
                                            <div className="ml-4">
                                                <h3 className="text-lg font-bold text-gray-900">{value.name}</h3>
                                                <p className="mt-2 text-gray-700">
                                                    {value.description}
                                                </p>
                                            </div>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        </motion.div>
                    </div>
                </div>

                {/* CEO Section */}
                <div className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
                    <motion.div
                        initial="hidden"
                        animate="visible"
                        variants={fadeIn}
                        className="text-center mb-16"
                    >
                        <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl mb-4 relative">
                            Leadership
                        </h2>
                        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                            Visionaries driving our mission forward
                        </p>
                    </motion.div>

                    <motion.div
                        initial="hidden"
                        animate="visible"
                        variants={fadeIn}
                        className="flex justify-center"
                    >
                        <div className="w-full max-w-2xl">
                            {[
                                {
                                    name: 'AMITESH KUSHWAHA',
                                    role: 'Founder & CEO',
                                    image: '../../../public/amiteshKushwahaPhoto.jpg',
                                    // bio: 'Serial entrepreneur with a passion for creating digital marketplaces that empower creators and delight customers. With over a decade of experience in digital commerce, Amitesh leads our company with visionary thinking and unwavering commitment to our values.',
                                    bio: 'Amitesh leads our company with visionary thinking and unwavering commitment to our values.',
                                },
                            ].map((person) => (
                                <motion.div
                                    key={person.name}
                                    whileHover={{ y: -5 }}
                                    className="bg-white rounded-2xl shadow-lg overflow-hidden"
                                >
                                    <img 
                                        className="w-full h-80 object-cover" 
                                        src={person.image} 
                                        alt={person.name} 
                                    />
                                    <div className="p-8">
                                        <div className="flex items-center">
                                            <div>
                                                <h3 className="text-2xl font-bold text-gray-900">{person.name}</h3>
                                                <p className="text-purple-600 font-medium">{person.role}</p>
                                            </div>
                                        </div>
                                        <p className="mt-4 text-gray-700 leading-relaxed">
                                            {person.bio}
                                        </p>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>
                </div>

                {/* Call to Action */}
                <div className="bg-gradient-to-r from-purple-800 to-indigo-700 py-16 px-4 sm:px-6 lg:px-8 rounded-2xl mx-4 sm:mx-6 lg:mx-8 mb-12">
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.2 }}
                        className="max-w-3xl mx-auto text-center"
                    >
                        <h2 className="text-3xl font-bold text-white sm:text-4xl">
                            Join Our Digital Revolution
                        </h2>
                        <p className="mt-4 text-xl text-purple-100">
                            Be part of the marketplace that's transforming how digital goods are exchanged
                        </p>
                        <div className="mt-8">
                            <Link className="px-8 py-3 bg-white text-purple-700 font-bold rounded-lg hover:bg-purple-50 transition-colors duration-300"
                                to="/"
                            >
                                Explore
                            </Link>
                        </div>
                    </motion.div>
                </div>
            </div>
        </>
    );
};

export default About;