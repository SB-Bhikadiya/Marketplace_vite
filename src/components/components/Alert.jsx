import { useEffect, useState } from 'react';

const useAlert = () => {
  const [alert, setAlert] = useState(null);

  const showAlert = (type, message) => {
    setAlert({ type, message });
  };

  const hideAlert = () => {
    setAlert(null);
  };

  useEffect(() => {
    
  }, [alert]);

  const AlertComponent = () => ( alert &&
    <div className={`alert alert-${alert.type} alert-dismissible fade show mt-2`} role="alert"  style={{ position: 'fixed', top: '20px', right: '20px' }}>
      {alert.message}
      <button type="button" className="btn-close" aria-label="Close" onClick={hideAlert}></button>
    </div>
  );

  return {
    showAlert,
    hideAlert,
    AlertComponent,
  };
};

export default useAlert;