import { Link } from "react-router-dom";
import style from "./login.module.css"
import { validateLogin } from "../../validate";
import { useNavigate } from "react-router-dom";
import React,{ useState } from "react";
import { AiOutlineMail } from "react-icons/ai";
import { RiLockPasswordLine } from "react-icons/ri";
import { BsEyeSlashFill, BsEyeSlash } from "react-icons/bs";
import logoPage from "../../images/logoPage.svg";
import { IoEyeSharp } from "react-icons/io5";


const Login = ({login}) => {

    const [ userData, setUserData ] = useState({
        email:"",
        password:""
    });
    const [ errors , setErrors ] = useState({
        email:"",
        password:""
    });
   
    const [ hiden, setHiden ] = useState(false)
    const [ message, setMessage ] = useState("");
    const navigate = useNavigate();

    const handleEventForm = (event) => {
       setUserData({
          ...userData,
          [event.target.name]: event.target.value
       });
       setErrors(
           validateLogin({
              ...userData,
              [event.target.name]: event.target.value
           })
       );
    }

    const handleSubmit = async (event) => {
       event.preventDefault();
       const validateRes = await login(userData);
       if(validateRes.resToken){
            navigate("/");  
       }
       else 
        setMessage(validateRes.response.data);
    }

    return (
        <div className={style.containerLogin}>
            <div className={style.containerForm}>
                <div>
                    <h1>Sign In </h1>
                    <img 
                    src={logoPage} 
                    alt="logo" 
                    className={style.imgLogo}
                    />
                </div>
                { message && <p>{message}</p>}
                <form onSubmit={handleSubmit}>
                    <div className={style.contLabInp}>
                       <AiOutlineMail className={style.iconLog}/>
                        <input 
                          type="email" 
                          name="email" 
                          placeholder="ejemplo@gmail.com" 
                          value={userData.email}
                          onChange={handleEventForm}
                          className={errors.email ? style.inpFormError : style.inpFormOk }
                          />
                    </div>
                    {errors.email && <p>{errors.email}</p>}
                    <div className={style.contLabInp}>
                        <RiLockPasswordLine className={style.iconLog}/>
                        <input
                        type={hiden ? `text` : `password`} 
                        name="password" 
                        placeholder="password" 
                        value={userData.password}
                        onChange={handleEventForm}
                        className={errors.password ? style.inpFormError :  style.inpFormOk}

                        />
                        {!hiden ? <BsEyeSlash onClick={()=>setHiden(true)} className={style.iconLog}/> 
                        :<IoEyeSharp onClick={()=>setHiden(false)} className={style.iconLog}/>
                        }
                    </div>
                    {errors.password && <p>{errors.password}</p>}
                    <div className={style.contButt}>
                        <button 
                        disabled={Object.entries(errors).length ? true : false} 
                        >Login</button>
                        <p>No tienes cuenta? <Link to="/signUp">Sign up</Link></p>
                    </div> 
                </form>
            </div>
        </div>
    );
}

export default Login;
