import { GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from 'jwt-decode';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Login() {
  const navigate = useNavigate();
  const [isLoggedin, setIsLoggedin] = useState(false);
  const loginData = sessionStorage.getItem('user');
  const[userSession,setuserSession]=useState(loginData);

  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };


  const responseMessage = async (response) => {
    const decodeData = jwtDecode(response.credential);
    console.log("response message: ");
    console.log(decodeData);

    const apiUrl = 'http://103.148.157.74:33178/EcommerceWebApp/rest/loginandregisterapi/userRegister';

    const formData = new URLSearchParams();
    formData.append('user_name', decodeData.name);
    formData.append('user_email', decodeData.email);
    formData.append('profile_url', decodeData.picture);
    formData.append('register_by', 'google');

    
    const apiResponse = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: formData.toString()
    });

    const responseData = await apiResponse.json();
   console.log("userDetail")
   console.log(responseData)

    setIsLoggedin(true);
    sessionStorage.setItem('user', JSON.stringify(responseData));
    setuserSession(sessionStorage.getItem('user'));
  };

  const errorMessage = (error) => {
    console.error(error);
  };

  

  useEffect(() => {
    
    
    console.log("user session +++:")
    console.log(userSession);
    if (userSession) {
      alert("login success!!")
      navigate('/');
    }
  }, [navigate,userSession]);
   

  const handleSubmit = async (e) => {
    e.preventDefault();

    // API call to authenticate user
    try {
      const response = await fetch('http://103.148.157.74:33178/EcommerceWebApp/rest/userloginapi/userLogin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: new URLSearchParams(formData).toString()
      });

      const data = await response.json();
      if (response.ok) {
        // Login successful, handle accordingly (e.g., redirect)
        console.log('Login successful');
        sessionStorage.setItem('user', JSON.stringify(data));
        navigate('/');
      } else {
        // Login failed, handle error
        console.error('Login failed:', data.message);
      }
    } catch (error) {
      console.error('Error logging in:', error);
    }
  };


  return (
    <div>
      <div className="registration-container" style={{ marginTop: "40px" }}>
        <div className="wrapper" style={{ backgroundImage: 'url("img/w12.jpg")' }}>
          <div className="inner">
            <div className="image-holder">
              <img src="img/w11.jpg" alt="" style={{ maxWidth:"100%"}} />
            </div>
           
            <form onSubmit={handleSubmit}>
            <div className="form-group">
                <div className="form-wrapper">
                  <input
                    type="text"
                    name="email"
                    placeholder="Username Or Email Address"
                    className="form-control"
                    value={formData.email}
                    onChange={handleChange}
                  />
                  <i className="zmdi zmdi-email" />
                </div>
              </div>
              <div className="form-group">
                <div className="form-wrapper">
                  <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    className="form-control"
                    value={formData.password}
                    onChange={handleChange}
                  />
                  <i className="zmdi zmdi-lock" />
                </div>
              </div>

              <div className="form-group">
                <button type="submit" className='btn-primary text-white' style={{ width: "100%", height: "50px", fontSize: "1.2em" }}>
                  Login <i className="zmdi zmdi-arrow-right " />
                </button>
              </div>
              <div className="form-group">
                <span style={{fontWeight:"bold",margin:"10px"}}>OR</span>
                <GoogleLogin  onSuccess={responseMessage} onError={errorMessage} /> 
              </div>
              </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
