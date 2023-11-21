import React, { useState } from 'react';
import axios from 'axios';
import LoginForm from './LoginForm'; // Importa el nuevo componente

function App() {
  const [formData, setFormData] = useState('');
  const [showAlert, setShowAlert] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post('http://localhost:5000/api/form', { data: formData });
      console.log('Data submitted successfully!');
      setShowAlert(true); // Mostrar la alerta después de enviar exitosamente
    } catch (error) {
      console.error('Error submitting data:', error);
    }
  };

  const handleAlertClose = () => {
    setShowAlert(false); // Ocultar la alerta al cerrarla
  };

  return (
    <div className="App container">
      <h1>Formulario Ejemplo</h1>
      <LoginForm /> {/* Usa el nuevo componente de login */}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder='ingrese un dato'
          value={formData}
          onChange={(e) => setFormData(e.target.value)}
          required
        />
        <button className='btn btn-outline-primary' type="submit">Enviar</button>
      </form>

      {showAlert && (
  <div className="alert alert-success mt-3 d-flex" role="alert">
    <div>Dato enviado exitosamente!</div>
    <button type="button" className="close btn btn-danger ml-auto" aria-label="Close" onClick={handleAlertClose}>
      <span aria-hidden="true">&times;</span>
    </button>
  </div>
      )}
    </div>
  );
}

export default App;
