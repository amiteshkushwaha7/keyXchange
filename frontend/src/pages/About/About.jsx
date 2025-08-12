

const About = () => {
    return (
        <>
            <title>About Us | Digital Goods Marketplace</title>
            <meta name="description" content="Learn about our mission and values" />

            <div className="bg-white">
                {/* Hero Section */}
                <div className="relative bg-gray-900">
                    <div className="absolute inset-0">
                        <img
                            className="w-full h-full object-cover opacity-30"
                            src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
                            alt="Our team working together"
                        />
                    </div>
                    <div className="relative max-w-7xl mx-auto py-24 px-4 sm:py-32 sm:px-6 lg:px-8">
                        <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl">
                            About Our Company
                        </h1>
                        <p className="mt-6 text-xl text-gray-300 max-w-3xl">
                            Connecting buyers and sellers of digital goods with trust and convenience.
                        </p>
                    </div>
                </div>

                {/* Our Story */}
                <div className="max-w-7xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:px-8">
                    <div className="lg:grid lg:grid-cols-2 lg:gap-8">
                        <div>
                            <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
                                Our Story
                            </h2>
                            <p className="mt-3 text-lg text-gray-500">
                                Founded in 2023, Digital Goods Marketplace began with a simple idea: to create a
                                trusted platform where people could buy and sell digital products with complete peace
                                of mind.
                            </p>
                            <p className="mt-3 text-lg text-gray-500">
                                What started as a small team of passionate individuals has grown into a thriving
                                marketplace serving thousands of customers worldwide.
                            </p>
                        </div>
                        <div className="mt-12 lg:mt-0">
                            <img
                                className="rounded-lg shadow-lg"
                                src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80"
                                alt="Our founding team"
                            />
                        </div>
                    </div>
                </div>

                {/* Mission and Values */}
                <div className="bg-gray-50">
                    <div className="max-w-7xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:px-8">
                        <div className="text-center">
                            <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
                                Our Mission & Values
                            </h2>
                            <p className="mt-4 max-w-2xl text-xl text-gray-500 mx-auto">
                                Guiding principles that shape everything we do
                            </p>
                        </div>

                        <div className="mt-20">
                            <dl className="space-y-10 md:space-y-0 md:grid md:grid-cols-3 md:gap-x-8 md:gap-y-12">
                                {[
                                    {
                                        name: 'Customer First',
                                        description:
                                            'We prioritize our customers in every decision we make, ensuring their needs are always met with exceptional service.',
                                        icon: '👥',
                                    },
                                    {
                                        name: 'Integrity',
                                        description:
                                            'We conduct business with honesty and transparency, building trust with every transaction.',
                                        icon: '🤝',
                                    },
                                    {
                                        name: 'Innovation',
                                        description:
                                            'We continuously improve our platform to deliver cutting-edge solutions for digital commerce.',
                                        icon: '💡',
                                    },
                                    {
                                        name: 'Security',
                                        description:
                                            'We implement robust security measures to protect both buyers and sellers.',
                                        icon: '🔒',
                                    },
                                    {
                                        name: 'Community',
                                        description:
                                            'We foster a vibrant community where digital creators and consumers can thrive together.',
                                        icon: '🌍',
                                    },
                                    {
                                        name: 'Sustainability',
                                        description:
                                            'We promote the digital economy as a sustainable alternative to physical goods.',
                                        icon: '♻️',
                                    },
                                ].map((value) => (
                                    <div key={value.name} className="relative">
                                        <dt>
                                            <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-blue-500 text-white text-2xl">
                                                {value.icon}
                                            </div>
                                            <p className="ml-16 text-lg leading-6 font-medium text-gray-900">
                                                {value.name}
                                            </p>
                                        </dt>
                                        <dd className="mt-2 ml-16 text-base text-gray-500">
                                            {value.description}
                                        </dd>
                                    </div>
                                ))}
                            </dl>
                        </div>
                    </div>
                </div>

                {/* Team Section */}
                <div className="max-w-7xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:px-8">
                    <div className="text-center">
                        <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
                            Meet Our Leadership
                        </h2>
                        <p className="mt-4 max-w-2xl text-xl text-gray-500 mx-auto">
                            The passionate individuals driving our vision forward
                        </p>
                    </div>

                    <div className="mt-20 grid gap-10 md:grid-cols-2 lg:grid-cols-3">
                        {[
                            {
                                name: 'Alex Johnson',
                                role: 'Founder & CEO',
                                image:
                                    'https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80',
                                bio: 'Serial entrepreneur with a passion for digital marketplaces.',
                            },
                            {
                                name: 'Maria Garcia',
                                role: 'Chief Technology Officer',
                                image:
                                    'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80',
                                bio: 'Tech visionary with 15+ years in platform development.',
                            },
                            {
                                name: 'James Wilson',
                                role: 'Head of Marketplace',
                                image:
                                    'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80',
                                bio: 'Expert in building thriving digital communities.',
                            },
                        ].map((person) => (
                            <div key={person.name} className="bg-white rounded-lg shadow overflow-hidden">
                                <img className="w-full h-48 object-cover" src={person.image} alt={person.name} />
                                <div className="p-6">
                                    <h3 className="text-lg font-medium text-gray-900">{person.name}</h3>
                                    <p className="text-sm font-medium text-blue-600">{person.role}</p>
                                    <p className="mt-2 text-sm text-gray-500">{person.bio}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
};

export default About;