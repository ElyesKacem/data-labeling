import { useRef, useEffect, useState } from "react";
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import './signUp.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faTimes } from '@fortawesome/free-solid-svg-icons';
import axios from '../api/axios';


const USER_REGEX = /^[a-zA-Z][a-zA-Z0-9-_]{3,23}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;
// const SIMPLECHAR_REGEX = /^[a-zA-Z])$/;
const REGISTER_URL = "/register";

const theme = createTheme();



const SignUp = (props) => {
  const userRef = useRef();
  const errRef = useRef();

  const [user, setUser] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');

  const [validName, setValidName] = useState(false);
  const [userFocus, setUserFocus] = useState(false);

  const [pwd, setPwd] = useState('');
  const [validPwd, setValidPwd] = useState(false);
  const [pwdFocus, setPwdFocus] = useState(false);

  const [matchPwd, setMatchPwd] = useState('');
  const [validMatch, setValidMatch] = useState(false);
  const [matchFocus, setMatchFocus] = useState(false);

  const [admin, setAdmin] = useState(false);
  const [supervisor, setSupervisor] = useState(false);

  const [errMsg, setErrMsg] = useState('');
  // const [success, setSuccess] = useState(false);


  useEffect(() => {
    userRef.current.focus()
  }, []);

  useEffect(() => {
    const result = USER_REGEX.test(user);
    setValidName(result);
  }, [user]);

  useEffect(() => {
    const result = PWD_REGEX.test(pwd);
   
    setValidPwd(result);
    const match = pwd === matchPwd;
    setValidMatch(match);
  }, [pwd, matchPwd]);

  useEffect(() => {
    setErrMsg('');
  }, [user, pwd, matchPwd]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const v1 = USER_REGEX.test(user);
    const v2 = PWD_REGEX.test(pwd);
    if (!v1 || !v2) {
      setErrMsg("Invalid Entry");
      return;
    }
    try {
      
      /*the stringify object is like that because the key in the backend and the variable in the front end have the same name {user: user, pwd: pwd}*/
      const response = await axios.post(
        REGISTER_URL,
        JSON.stringify({ user, admin, pwd, firstName, lastName, supervisor }),
        {
          headers: { 'content-type': 'application/json' },
          withCredentials: true
        }
      )
     if(response.status===201){
       props.setSuccess(true);

    }
      props.setOpen(false);
    } catch (error) {
      console.log("error",error);
      if (!error?.response) {
        setErrMsg('no server response');
      } else if (error.response?.status === 409) {
        setErrMsg('username already taken');
      } else {
        setErrMsg('Registration failed');
      }
      errRef.current.focus();
    }
    /*console.log(user,pwd);
    setSuccess(true);*/
  };
  return (
    <>
     
     <ThemeProvider theme={theme}>
            <Container component="main" maxWidth="xs">
              <CssBaseline />
              <Box
                sx={{
                  marginTop: 8,
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                }}
              >
                <Typography component="h1" variant="h5">
                  Add new account
                </Typography>
                <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
                  <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        autoComplete="given-name"
                        name="firstName"
                        required
                        fullWidth
                        id="firstName"
                        label="First Name"
                        onChange={(e) => setFirstName(e.target.value)}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        required
                        fullWidth
                        id="lastName"
                        label="Last Name"
                        name="lastName"
                        autoComplete="family-name"
                        onChange={(e) => setLastName(e.target.value)}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <p ref={errRef} className={errMsg ? "errMsg" : "offscreen"} aria-live="assertive">{errMsg}</p>
                      <TextField
                        ref={userRef}
                        required
                        fullWidth
                        id="username"
                        label={["Username", <FontAwesomeIcon icon={faCheck} className={validName ? "valid" : "hide"} />, <FontAwesomeIcon icon={faTimes} className={validName || !user ? "hide" : "invalid"} />]}
                        name="username"
                        autoComplete="off"
                        aria-invalid={validName ? "false" : "true"}
                        aria-describedby='uidnote'
                        onChange={(e) => setUser(e.target.value)}
                        onFocus={() => setUserFocus(true)}
                        onBlur={() => setUserFocus(false)}
                      />
                      <p id='uidnote' className={userFocus && user && !validName ? "instructions" : "offscreen"} aria-live="assertive">
                        4 to 24 characters. <br />
                        must begin with a letter. <br />
                        only letters, nulbers, hyphens, underscores allowed.
                      </p>
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        required
                        fullWidth
                        label={["Password", <FontAwesomeIcon icon={faCheck} className={validPwd ? "valid" : "hide"} />, <FontAwesomeIcon icon={faTimes} className={validPwd || !pwd ? "hide" : "invalid"} />]}
                        type="password"
                        id="password"
                        onChange={(e) => setPwd(e.target.value)}
                        onFocus={() => setPwdFocus(true)}
                        onBlur={() => setPwdFocus(false)}
                        aria-invalid={validPwd ? "false" : "true"}
                        aria-describedby='pwdnote'
                      />
                      <p id='pwdnote' className={pwdFocus && !validPwd ? "instructions" : "offscreen"} aria-live="assertive">
                        8 to 24 characters.<br />
                        Must include uppercase and lowercase letters, a number and a special character.<br />
                        Allowed special characters: <span aria-label="exclamation mark">!</span> <span aria-label="at symbol">@</span> <span aria-label="hashtag">#</span> <span aria-label="dollar sign">$</span> <span aria-label="percent">%</span>
                      </p>
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        required
                        fullWidth
                        label={["Confirm Password ", <FontAwesomeIcon icon={faCheck} className={validMatch && matchPwd ? "valid" : "hide"} />, <FontAwesomeIcon icon={faTimes} className={validMatch || !matchPwd ? "hide" : "invalid"} />]}
                        type="password"
                        id="confirm_pwd"
                        onChange={(e) => setMatchPwd(e.target.value)}
                        onFocus={() => setMatchFocus(true)}
                        onBlur={() => setMatchFocus(false)}
                        aria-invalid={validPwd ? "false" : "true"}
                        aria-describedby='confirmnote'
                      />
                      <p id="confirmnote" className={matchFocus && !validMatch ? "instructions" : "offscreen"}>
                        Must match the first password input field.
                      </p>
                    </Grid>
                    <Grid item xs={6}>
                      <FormControlLabel
                        control={
                          <Checkbox checked={admin} onClick={() => {

                            setAdmin(!admin);
                          }} />
                        }
                        label="Admin Role"
                      />

                    </Grid>
                    <Grid item xs={6}>
                      <FormControlLabel
                        control={
                          <Checkbox checked={supervisor} onClick={() => {

                            setSupervisor(!supervisor);
                          }} />
                        }
                        label="Supervisor Role"
                      />

                    </Grid>

                  </Grid>
                  <Button
                    disabled={!validName || !validPwd || !validMatch ? true : false}
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                  >
                    Add
                  </Button>

                </Box>
              </Box>

            </Container>

          </ThemeProvider>
    </>
  )
}

export default SignUp