import { toast } from 'react-toastify';

 const display = {
  options: {
    position: toast.POSITION.TOP_CENTER,
    autoClose: 2000, // Close after 5 seconds
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: false,
    draggable: false,
    progress: undefined,
  },
  showMessage: (type, message) => {
    if (type === 'error') {
      toast.error(message, {
        ...display.options,
        style: {
          background: '#fff',
          color: '#000',
          fontSize: '16px',
          fontWeight: 'bold',
          padding: '10px',
        },
      });
    } else if (type === 'success') {
      toast.success(message, {
        ...display.options,
        style: {
          background: '#fff',
          color: '#000',
          fontSize: '16px',
          fontWeight: 'bold',
          padding: '10px',
        },
      });
    } else {
      // Default to success if type is not provided or invalid
      toast.success(message, this.options);
    }
  },
};

// Exporting the utility directly for easy import
export default display;
