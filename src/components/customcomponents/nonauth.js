import {Redirect, Route} from "react-router-dom";

function NonAuth({component: Component, token, setToken, ...rest}){
    let isLoggedIn = token.token;
    // console.log(isLoggedIn);
    return(
        <Route {...rest}>
            {/* this is to make sure that only login and signup page are accessible when logged out */}
            {!isLoggedIn? <Component token={token} setToken={setToken} />:<Redirect to="/"/>}
        </Route>
    )

}

export default NonAuth;