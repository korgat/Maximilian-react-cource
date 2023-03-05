import Header from './Header';

interface LayoutPropsI {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutPropsI> = ({ children }) => {
  return (
    <>
      <Header />
      <main className="py-10">{children}</main>
    </>
  );
};

export default Layout;
