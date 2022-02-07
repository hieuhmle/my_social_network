import styles from "../../styles/_app/dropdown-container.module.css";

const DropdownContainer = ({ children }) => {
  return (
    <div className={styles.container}>
      <div className={styles.triangleIndicator}></div>
      <div className={styles.body}>{children}</div>
    </div>
  );
};

export default DropdownContainer;
