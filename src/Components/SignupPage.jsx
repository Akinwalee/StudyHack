// import React from 'react'
import './Signin-Signup.css';

function Signup(){
  return(
      <>
      <div className="container">
          <div className="logo">StudyHack<span>.</span></div>
          <div className='left'>
              <p className='head'>Hey There!!!</p>
              <p className='content'>
                  Welcome to StudyHack, a place where you learn with ease and convert your PDF to either quiz,               Flashcards and also extract texts.
                  Create an Account with us and begin your journey to being a scholar.
              </p>
          </div>
          <div className='right'>
              <div className="wrapper">
                  <p className='intro'>Sign up to StudyHack</p>

                  <div className='details'>
                      <p>Phone Number</p>
                      <input type="text"/>
                      <p>Password</p>
                      <input type="Password"/>
                      <p>Confirm Password</p>
                      <input type="Password"/>
                  </div>

                  <button>Sign up</button>
              </div>
              
          </div>
      </div>
      </>
  );
}

export default Signup;
