import React from "react";
import styles from "./Popup.module.css";

export default function Popup({ show, onClose }) {
  if (!show) return null;

  return (
    <div className={styles.overlay}>
      <div className={styles.popup}>
        <h2>Message Sent!</h2>
        <p>Thanks for reaching out, I'll get back to you shortly.</p>
        <button onClick={onClose} className={styles.closeBtn}>
          Close
        </button>
      </div>
    </div>
  );
}
