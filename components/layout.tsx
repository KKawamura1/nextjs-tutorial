import React from "react";
// @ts-ignore
import styles from "./layout.module.scss"

type Props = {};

const Layout: React.FC<Props> = (props) => (
  <div className={styles.container}>{props.children}</div>
);
export default Layout;
