
  import { Outlet } from 'react-router-dom'

  import { ToastContainer } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';

  import Navbar from './components/navbar/Navbar.jsx'
  import { useDispatch } from 'react-redux';
  import { loginUser } from './redux/user/actions.js';
  import { useEffect } from 'react';

  import { ThemeProvider } from 'styled-components'
  import { lightTheme, darkTheme } from './theme.js';
  import { useThemeContext } from './hooks/UseThemeContext.jsx';
  import { GlobalStyles } from './GlobalStyles.js';
  import { SkeletonTheme } from 'react-loading-skeleton';
  import { useTranslation } from 'react-i18next';

  import LoginModal from "./routes/login/LoginModal.jsx";
  import { useSelector } from "react-redux";

  import 'react-loading-skeleton/dist/skeleton.css'
  import { Container } from './styles.js';

  function App() {

    const { i18n } = useTranslation();

    const dispatch = useDispatch();

    const isVisible = useSelector((rootReducer) => rootReducer.loginModalReducer.isVisible);

    const { theme, setTheme } = useThemeContext();
    const userObject = JSON.parse(localStorage.getItem("user"));

    useEffect(() => {
      dispatch(loginUser(userObject));
      i18n.changeLanguage(localStorage.getItem('lang'));
      setTheme(localStorage.getItem('theme'));
    }, [])


    return (
      <>
        <ThemeProvider theme={theme === 'light' ? lightTheme : darkTheme}>
          <SkeletonTheme
            baseColor={theme === 'light' ? lightTheme.loadingBase : darkTheme.loadingBase}
            highlightColor={theme === 'light' ? lightTheme.loadingEfect : darkTheme.loadingEfect}>
            <GlobalStyles />
            <Navbar />
            <Container>
              {isVisible && (
                <LoginModal/>
              )}
              {console.log(isVisible)}
              <ToastContainer />
              <Outlet />
            </Container>
          </SkeletonTheme>
        </ThemeProvider>
      </>
    )
  }

  export default App
