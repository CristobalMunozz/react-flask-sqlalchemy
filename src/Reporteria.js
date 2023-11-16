import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Reporteria = () => {
  const [formData, setFormData] = useState([]);
  const [editedData, setEditedData] = useState({ id: null, data: '' });

  const fetchData = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/form');
      setFormData(response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleEdit = async (id) => {
    try {
      const response = await axios.get(`http://localhost:5000/api/form/${id}`);
      setEditedData({ id: response.data.id, data: response.data.data });
    } catch (error) {
      console.error('Error fetching data for editing:', error);
    }
  };

  const handleUpdate = async () => {
    try {
      await axios.put(`http://localhost:5000/api/form/${editedData.id}`, { data: editedData.data });
      setEditedData({ id: null, data: '' });
      fetchData();
    } catch (error) {
      console.error('Error updating data:', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/form/${id}`);
      fetchData();
    } catch (error) {
      console.error('Error deleting data:', error);
    }
  };

  useEffect(() => {
    fetchData(); // Realiza la primera carga al montar el componente

    const intervalId = setInterval(() => {
      fetchData(); // Realiza una carga periódica cada cierto tiempo
    }, 500); // Actualiza cada 5 segundos (ajusta según tus necesidades)

    return () => clearInterval(intervalId); // Limpia el intervalo al desmontar el componente
  }, []);


  return (
    <div>
      <h2>Reporteria</h2>
      <ul>
        {formData.map((item) => (
          <li key={item.id}>
            {item.data}
            <button onClick={() => handleEdit(item.id)}>Editar</button>
            <button onClick={() => handleDelete(item.id)}>Eliminar</button>
          </li>
        ))}
      </ul>
      {editedData.id && (
        <div>
          <input
            type="text"
            value={editedData.data}
            onChange={(e) => setEditedData({ ...editedData, data: e.target.value })}
          />
          <button onClick={handleUpdate}>Actualizar</button>
        </div>
      )}
    </div>
  );
};

export default Reporteria;
