"use client"

import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";

const testimonials = [
    {
        name: 'Emily Johnson',
        avatar: 'url-to-image/emily.jpg',
        title: "Software Engineer",
        description: "I was amazed by how effortlessly the code generation feature worked. It saved me hours of manual coding, allowing me to focus on more creative aspects of my projects."
    },
    {
        name: 'Alex Rodriguez',
        avatar: 'url-to-image/alex.jpg',
        title: "Music Producer",
        description: "The music generation feature is a game-changer! It helped me discover unique melodies and rhythms, elevating my music production to new heights."
    },
    {
        name: 'Sophie Chen',
        avatar: 'url-to-image/sophie.jpg',
        title: "Graphic Designer",
        description: "The image generation tool is a must-have for designers. It provided me with fresh and inspiring visuals, making my design process more efficient and enjoyable."
    },
    {
        name: 'Michael Baker',
        avatar: 'url-to-image/michael.jpg',
        title: "Data Scientist",
        description: "The conversation AI is impressively natural. It became an invaluable assistant in my research, understanding complex queries and providing insightful responses."
    },
    {
        name: 'Nadia Patel',
        avatar: 'url-to-image/nadia.jpg',
        title: "Marketing Specialist",
        description: "Our marketing campaigns have seen a boost with the AI-powered conversation feature. It engages users effectively, turning interactions into meaningful conversions."
    },
    {
        name: 'David Kim',
        avatar: 'url-to-image/david.jpg',
        title: "UX/UI Designer",
        description: "The versatility of your AI tools, from code generation to image creation, has streamlined my design workflow. It's like having a multi-talented virtual design assistant."
    }
];



function LandingContent() {
    return (
        <div className="px-10 pb-20">
            <h2 className="text-center text-4xl text-white font-extrabold mb-10">
                Testimonials
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                {
                    testimonials.map(
                        (testimonial, i) => (
                            <Card key={i} className="bg-[#192339] border-none text-white m-2">
                                <CardHeader>
                                    <CardTitle className="flex items-center gap-x-2">
                                        <div>
                                            <p className="text-lg">{testimonial.name}</p>
                                            <p className="text-zinc-400 text-sm">{testimonial.title}</p>
                                        </div>
                                    </CardTitle>
                                    <CardContent className="pt-4 px-0">

                                        {testimonial.description}
                                    </CardContent>
                                </CardHeader>
                            </Card>
                        )
                    )
                }
            </div>
        </div>
    )
}

export default LandingContent