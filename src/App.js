import React, { useState } from 'react';
import axios from 'axios';

function App() {
  const [formData, setFormData] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post('http://localhost:5000/api/form', { data: formData });
      console.log('Data submitted successfully!');
    } catch (error) {
      console.error('Error submitting data:', error);
    }
  };

  return (
    <div className="App">
      <h1>Formulario Ejemplo</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Data:
          <input type="text" value={formData} onChange={(e) => setFormData(e.target.value)} />
        </label>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default App;
