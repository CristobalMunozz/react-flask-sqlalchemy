
from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS  # Agrega esta línea

app = Flask(__name__)
CORS(app)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///data.db'
db = SQLAlchemy(app)

class FormData(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    data = db.Column(db.String(255), nullable=False)


# Ruta para manejar solicitudes GET
@app.route('/api/form', methods=['GET'])
def get_data():
    # Realizar la operación de obtener datos (por ejemplo, obtener todos los registros)
    data_records = FormData.query.all()

    # Convertir los registros a un formato que se puede enviar como JSON
    data_list = [{'id': record.id, 'data': record.data} for record in data_records]

    # Devolver los datos como JSON
    print(data_list)
    return jsonify(data_list)

@app.route('/api/form', methods=['POST'])
def submit_form():
    data = request.json.get('data')

    new_data = FormData(data=data)
    db.session.add(new_data)
    db.session.commit()

    return jsonify({'message': 'Data submitted successfully!'})

@app.route('/api/form/<int:id>', methods=['PUT'])
def update_data(id):
    data_record = FormData.query.get_or_404(id)
    new_data = request.json.get('data', '')
    data_record.data = new_data
    db.session.commit()
    return jsonify({'id': data_record.id, 'data': data_record.data})

@app.route('/api/form/<int:id>', methods=['DELETE'])
def delete_data(id):
    data_record = FormData.query.get_or_404(id)
    db.session.delete(data_record)
    db.session.commit()
    return jsonify({'message': 'Data deleted successfully'})

if __name__ == '__main__':
    with app.app_context():
        db.create_all()
    app.run(debug=True)
