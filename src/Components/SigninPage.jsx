

function Login() {
    return (
        <div className="flex h-screen">
            <div className="absolute text-3xl text-white left-5 font-bold">
                StudyHack<span className="text-accent text-5xl">.</span>
            </div>
            <div className="w-2/5 bg-[#34598] flex flex-col justify-center text-white text-center">
                <p className="text-3xl px-8">Hey There!!!</p>
                <p className="w-4/5 mx-auto text-xl leading-8 mt-4">
                    Welcome to StudyHack, a place where you learn with ease and convert your PDF to either quiz, Flashcards and also extract texts.
                    Create an Account with us and begin your journey to being a scholar.
                </p>
            </div>
            <div className="w-3/5 bg-primary flex justify-center items-center text-white">
                <div className="w-3/5">
                    <p className="text-3xl text-center mb-10">Login to StudyHack</p>
                    <div className="space-y-4">
                        <div>
                            <p className="text-xl mb-2">Phone Number</p>
                            <input type="text" className="w-full h-10 rounded bg-gray-600/40 text-white px-4"/>
                        </div>
                        <div>
                            <p className="text-xl mb-2">Password</p>
                            <input type="password" className="w-full h-10 rounded bg-gray-600/40 text-white px-4"/>
                        </div>
                    </div>
                    <button className="w-full bg-accent text-white py-5 rounded mt-10 text-xl hover:opacity-90 transition-opacity">
                        Login
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Login;