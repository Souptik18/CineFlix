import React from "react";
import styles from "./LoaderContent.module.css";

const LoaderContent = () => {
  return (
    <>
      <div className={styles.loader}>
        <div className={styles.loader__bar}></div>
        <div className={styles.loader__bar}></div>
        <div className={styles.loader__bar}></div>
        <div className={styles.loader__bar}></div>
        <div className={styles.loader__bar}></div>
        <div className={styles.loader__ball}></div>
      </div>
    </>
  );
};

export default LoaderContent;
