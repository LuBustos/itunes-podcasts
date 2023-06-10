import { Outlet } from "react-router-dom";
import styles from "./styles.module.css";
import { useStore } from "../../hooks/useStore";

function Layout() {
  const loading = useStore((state) => state.loading);
  const goToHome = () => {};

  return (
    <>
      <h4 onClick={goToHome} className={styles.title}>
        Podcaster
      </h4>
      <hr />
      <div>
        <Outlet />
      </div>
    </>
  );
}

export default Layout;
