import React from 'react';
import { Link } from 'react-router-dom';
import GreetingContainer from '../greeting/greeting_container';
import {logout} from '../../actions/session_actions';


export const Splash = () => {
    return(
        <div className="containerSplash" >
            <img src={window.logo} className="logo"/>
            <img src={window.splash} className="background"/>
            {/* <div className="containerSplash logo">ge</div> */}
            <h1 className='textone'>See what's next.</h1>
            <h2 className='texttwo'>WATCH ANYWHERE. CANCEL ANYTIME.</h2>
            {/* <button onClick={logout}>Test Logout</button>  */}
            {/* <GreetingContainer/> */}
            <Link to='/signin'>Sign In</Link>
            <br/>
            <label htmlFor="signin" className='haveAccount'>Have an account?</label>
            <Link id="signin" to='/signin' className="signin">Sign In</Link>
            <button onClick={handleDemo} className='demo'>Try a Demo!</button>   
        </div>
    )
}

export const handleDemo = (e) => {
    const testUser = { email: "demo@demo.com", password: "password" }
    e.preventDefault();
    dispatch(login(testUser))
}

// class Splash extends React.Component{

//     render(){
//         return (
//             <div>
//                 <h1>Steph Curry with the Splash</h1>
//                 <GreetingContainer/>
//             </div>
//         )
//     }
// }

// export default Splash


