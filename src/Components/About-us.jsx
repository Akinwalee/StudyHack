import NavBar from './NavBar';

function About_us(){
    return(
        <>
            <NavBar />
            <div className="w-4/5 mx-auto min-h-screen text-white">
                <div className="py-64">
                    <div className="text-7xl font-bold">
                        Welcome to <span className="text-accent">StudyHack.</span>
                    </div>
                    <p className="text-2xl">Transforming Learning with AI-powered Personalized Tests and Assessments</p>
                </div>

                <div className="my-24 border border-black rounded-tl-3xl rounded-br-3xl p-24">
                    <p className="text-xl leading-10">
                        <span className="text-4xl text-accent">StudyHack</span> is an innovative solution that leverages AI to
                        personalize the learning experience and boost study efficiency. Why not use ChatGPT? AI tools like ChatGPT can generate text summaries, but StudyHack
                        goes further into:
                    </p>
                    <div className="flex justify-evenly mt-8">
                        <div className="space-y-5 w-[400px]">
                            <div className="border border-black rounded-tl-3xl rounded-br-3xl p-5">
                                <h2 className="text-2xl">Personalized Assessments</h2>
                                <p className="text-xl">Create quizzes & flashcards focused on what matters.</p>
                            </div>
                            <div className="border border-black rounded-tl-3xl rounded-br-3xl p-5">
                                <h2 className="text-2xl">Active Learning</h2>
                                <p className="text-xl">Engage with interactive exercises for better retention</p>
                            </div>
                        </div>
                        
                        <div className="space-y-5 w-[400px]">
                            <div className="border border-black rounded-tl-3xl rounded-br-3xl p-5">
                                <h2 className="text-2xl">Deeper Understanding</h2>
                                <p className="text-xl">Get clear explanation of complex concept</p>
                            </div>
                            <div className="border border-black rounded-tl-3xl rounded-br-3xl p-5">
                                <h2 className="text-2xl">Holistic Environment</h2>
                                <p className="text-xl">Track progress and manage learning in one place</p>
                            </div>
                        </div>
                    </div>
                </div>

                <h1 className="text-4xl text-center mb-16">Who is <span className="text-accent">StudyHack</span> for?</h1>
                <div className="flex justify-between text-center p-4">
                    <div className="w-[250px] h-[250px] border border-black rounded-tl-3xl rounded-br-3xl">
                        <h1 className="text-2xl mt-4">Professionals</h1>
                        <p className="text-xl mt-10 px-2.5">To stay sharp and retain industry knowledge on the go.</p>
                    </div>
                    <div className="w-[250px] h-[250px] border border-black rounded-tl-3xl rounded-br-3xl">
                        <h1 className="text-2xl mt-4">Students</h1>
                        <p className="text-xl mt-10 px-2.5">To master course material and ace exams with ease.</p>
                    </div>
                    <div className="w-[250px] h-[250px] border border-black rounded-tl-3xl rounded-br-3xl">
                        <h1 className="text-2xl mt-4">Educators</h1>
                        <p className="text-xl mt-10 px-2.5">To craft tailored assessments and track student progress.</p>
                    </div>
                </div>

                <h1 className="text-4xl text-center my-36">Meet the Developers</h1>

                <div className="flex justify-center relative mb-36">
                    <div className="w-[270px] min-h-[350px] border border-black rounded-2xl absolute top-24 left-0">
                        <div className="flex justify-center items-center">
                            <img src="asset/praise.PNG" alt="Praise" className="w-[200px] h-[180px] rounded-full p-5"/>
                        </div>
                        <p className="text-2xl font-bold text-center">Aribisala Praise</p>
                        <p className="text-center px-4">Frontend Engineer</p>
                    </div>
                    <div className="w-[270px] min-h-[350px] border border-black rounded-2xl">
                        <div className="flex justify-center items-center">
                            <img src="asset/fuad.PNG" alt="Fuad" className="w-[200px] h-[180px] rounded-full p-5"/>
                        </div>
                        <p className="text-2xl font-bold text-center">Obatula Fuad</p>
                        <p className="text-center px-4">Backend Engineer</p>
                    </div>
                    <div className="w-[270px] min-h-[350px] border border-black rounded-2xl absolute top-24 right-0">
                        <div className="flex justify-center items-center">
                            <img src="asset/beejay.PNG" alt="Bolaji" className="w-[200px] h-[180px] rounded-full p-5"/>
                        </div>
                        <p className="text-2xl font-bold text-center">Odumosu Bolaji</p>
                        <p className="text-center px-4">Frontend Engineer</p>
                    </div>
                </div>
            </div>

            <footer className="text-center border-t border-black py-4">
                <p>StudyHack: Your Ideal Study Partner &copy; 2024</p>
            </footer>
        </>
    );
}
export default About_us;