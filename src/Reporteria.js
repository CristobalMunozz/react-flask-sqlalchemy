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

  const handleEdit = (id, currentData) => {
    setEditedData({ id, data: currentData });
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
    <div className="container mt-4">
      <h2 className="mb-4">Reporteria</h2>
      {formData.length === 0 ? (
        <p>No hay datos disponibles.</p>
      ) : (
        <ul className="list-group">
          {formData.map((item) => (
            <li key={item.id} className="list-group-item" onClick={() => handleEdit(item.id, item.data)}>
              {editedData.id === item.id ? (
                <div className="input-group">
                  <input
                    type="text"
                    className="form-control"
                    value={editedData.data}
                    onChange={(e) => setEditedData({ ...editedData, data: e.target.value })}
                  />
                  <div className="input-group-append">
                    <button className="btn btn-outline-success" onClick={handleUpdate}>
                      Actualizar
                    </button>
                  </div>
                </div>
              ) : (
                <div className="d-flex justify-content-between align-items-center">
                  <span>{item.data}</span>
                  <button className="btn btn-outline-danger" onClick={() => handleDelete(item.id)}>
                    Eliminar
                  </button>
                </div>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Reporteria;
