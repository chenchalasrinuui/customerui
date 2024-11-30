import logo from './logo.svg';
import './App.css';
import { Suspense } from 'react'
import Header from './components/Header';
import Footer from './components/Footer';
import { useSelector } from 'react-redux';
import { publicRoutes } from './routes/public/Routes';
import { privateRoutes } from './routes/private/Routes';
import { useRoutes } from 'react-router-dom';
import { Loader } from './components/shared/Loader';
import { Toaster } from './components/shared/Toaster';
import { Modal } from './components/shared/Modal';

function App() {
  const isLoggedIn = useSelector((state) => state?.appReducer?.isLoggedIn)
  const isShowLoader = useSelector((state) => state.appReducer.isShowLoader)
  const isShowToaster = useSelector((state) => state.appReducer.toaster.isShowToaster)
  const isShowModal = useSelector((state) => state.appReducer.modal.isShowModal)

  return (
    <div data-testid="app" className="App">
      <Header />
      <Suspense fallback="Loading...">
        {useRoutes(isLoggedIn ? privateRoutes : publicRoutes)}
      </Suspense>
      {isShowLoader && <Loader ></Loader>}
      {isShowModal && <Modal />}
      {isShowToaster && <Toaster />}
      <Footer />
    </div>
  );
}

export default App;
