import { Outlet } from "react-router-dom";
import styles from "./styles.module.css";
import { useStore } from "../../hooks/useStore";
import { FaSpinner } from "react-icons/fa";

function Layout() {
  const loading = useStore((state) => state.loading);
  const goToHome = () => {};

  return (
    <>
      <div className={styles.layout}>
        <h4 onClick={goToHome} className={styles.title}>
          Podcaster
        </h4>
        <div className={styles.loadingContainer}>
          {loading && <FaSpinner className={styles.spinner} />}
        </div>
      </div>
      <hr />
      <div>
        <Outlet />
      </div>
    </>
  );
}

export default Layout;
