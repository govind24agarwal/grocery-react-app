import React, { useEffect } from "react";

function Alert({ alert: { msg, type }, showAlert, list }) {
  //remove alert after 1.5sec
  useEffect(() => {
    const timeout = setTimeout(() => {
      showAlert(false, "", "");
      console.log("remove");
    }, 1500);
    return () => clearTimeout(timeout);
  }, [list]);

  return <p className={`alert ${type}`}>{msg}</p>;
}

export default Alert;
