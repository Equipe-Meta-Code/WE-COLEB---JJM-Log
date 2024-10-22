import React, { useState, useEffect } from "react";
import AreaLineChart from "../../components/dashboard/AreaLineChart";
import AreaBarChart from "../../components/dashboard/AreaBarChart";
import styles from './dashboard.module.css';

const Dashboard = () => {
  const [pageTitle, setPageTitle] = useState('Dashboard');

  useEffect(() => {
    const updateTitle = () => {
      try {
        document.title = pageTitle;
      } catch (error) {
        console.error('Failed to update title', error);
      }
    };
    updateTitle();
  }, [pageTitle]);
  
  return (
    <div className={styles["content-area"]}>
      <div className={styles["vendas-gerais"]}>
        <AreaBarChart />
      </div>
      <div className={styles["vendas-por-vendedor"]}>
        <AreaLineChart />
      </div>
    </div>
  );
};

export default Dashboard;
