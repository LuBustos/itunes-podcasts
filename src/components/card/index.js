import styles from "./styles.module.css";
import cx from 'classnames'

function Card({ children, className = "" }) {
  return <div className={cx(styles.card, className)}>{children}</div>;
}

export default Card;
