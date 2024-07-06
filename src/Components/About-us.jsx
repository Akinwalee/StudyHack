import './About_us.css'

function About_us(){
    return(
        <>
            <div className="container">
                <div className="landing-page">
                    <div className="heading">Welcome to <span>StudyHack.</span></div>
                    <p>Transforming Learning with AI-powered Personalized Tests and Assessments</p>
                </div>

                <div className='intro'>
                    <p><span>StudyHack</span> is an innovative solution that leverages AI to
                        personalize the learning experience and boost study efficiency. Why not use ChatGPT? AI tools like ChatGPT can generate text summaries, but StudyHack
                        goes further into:
                    </p>
                    <div className="advantage">
                        <div className='div'>
                            <div>
                                <h2>Personalized Assessments</h2>
                                <p>Create quizzes & flashcards focused on what matters.</p>
                            </div>
                            <div>
                                <h2>Active Learning</h2>
                                <p>Engage with interactive exercises for better retention</p>
                            </div>
                        </div>
                        
                        <div className='div'>
                            <div>
                                <h2>Deeper Understanding</h2>
                                <p>Get clear explanation of complex concept</p>
                            </div>
                            <div>
                                <h2>Holistic Environment</h2>
                                <p>Track progress and manage learning in one place</p>
                            </div>
                        </div>
                        
                    
                    </div>
                </div>

                <h1 className='who'>Who is <span>StudyHack</span> for?</h1>
                <div className="cards">
                    <div>
                        <h1>Professionals</h1>
                        <p>To stay sharp and retain industry
                            knowledge on the go.
                        </p>
                    </div>
                    <div>
                        <h1>Students</h1>
                        <p>To master course material and
                            ace exams with ease.
                        </p>
                    </div>
                    <div>
                        <h1>Educators</h1>
                        <p>To craft tailored assessments
                            and track student progress.
                        </p>
                    </div>
                </div>

                <h1 className="dev-intro">Meet the Developers</h1>

                <div className="profiles">
                    <div className="profile-card one">
                        <div className="image">
                            <img src="asset/praise.PNG" alt="Praise"/>
                        </div>
                        <p className='name'>Aribisala Praise</p>
                        <p>Frontend Engineer</p>
                    </div>
                    <div className="profile-card">
                        <div className="image">
                            <img src="asset/fuad.PNG" alt="Praise"/>
                        </div>
                        <p className='name'>Obatula Fuad</p>
                        <p>Backend Engineer</p>
                    </div>
                    <div className="profile-card three">
                        <div className="image">
                            <img src="asset/beejay.PNG" alt="Bolaji"/>
                        </div>
                        <p className='name'>Odumosu Bolaji</p>
                        <p>Frontend Engineer</p>
                    </div>
                
                </div>
            </div>

            <div className="footer">
                <footer>
                    <p>StudyHack: Your Ideal Study Partner &copy; 2024</p>
                </footer>
            </div>
        </>
    );
}
export default About_us;