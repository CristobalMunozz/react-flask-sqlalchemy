import sys
import os

# Obtén la ruta del directorio actual
current_path = os.path.dirname(os.path.realpath(__file__))

# Agrega la ruta del paquete al sys.path
sys.path.append(current_path)

from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
from flask_jwt_extended import JWTManager, create_access_token, jwt_required, get_jwt_identity

app = Flask(__name__)
CORS(app)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///data.db'
db = SQLAlchemy(app)
jwt = JWTManager(app)



# Definición del modelo User en el mismo archivo
class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(80), unique=True, nullable=False)
    password = db.Column(db.String(120), nullable=False)

    def __repr__(self):
        return f'<User {self.username}>'

# Lógica de autenticación
@app.route('/login', methods=['POST', 'OPTIONS'])
def login():
    if request.method == 'OPTIONS':
        # Manejar solicitudes OPTIONS devolviendo las cabeceras CORS adecuadas
        response = jsonify(success=True)
        response.headers['Access-Control-Allow-Origin'] = '*'
        response.headers['Access-Control-Allow-Headers'] = 'Content-Type, Authorization'
        response.headers['Access-Control-Allow-Methods'] = 'POST'
        return response

    data = request.get_json()
    username = data.get('username')
    password = data.get('password')

    # Lógica de autenticación (puedes utilizar tu modelo de usuario)
    user = User.query.filter_by(username=username, password=password).first()

    if user:
        # Genera el token JWT
        access_token = create_access_token(identity=username)
        return jsonify(access_token=access_token), 200
    else:
        return jsonify({"msg": "chupaloooo"}), 401

class FormData(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    data = db.Column(db.String(255), nullable=False)
# Importa los Blueprints dentro de las funciones/métodos donde se necesitan
def register_blueprints():
    from form_routes import form_routes

    from auth_routes import auth_routes
     # Importa FormData aquí
     
    
    # Registra los Blueprints en la aplicación
    app.register_blueprint(form_routes)
    app.register_blueprint(auth_routes)

###########API####################
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
