import Navbar from '../../component/Navbar/Navbar';
import Footer from '../../component/Footer/Footer';
import { Outlet } from 'react-router-dom';
import ScrollToTop from '../../component/ScrollToTop/ScrollToTop';

function Layout() {
  return (
    <>
      <ScrollToTop />
      <Navbar />
      <main className="flex-1 p-5 flex items-center justify-center">
        <Outlet />
      </main>
      <Footer />
    </>
  );
}

export default Layout;
