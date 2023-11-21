from flask import Blueprint, jsonify, request
from flask_jwt_extended import create_access_token
from app import db
from app.models import User

auth_routes = Blueprint('auth_routes', __name__)

# Ruta para manejar solicitudes de login y generar token JWT
@auth_routes.route('/login', methods=['POST'])
def login():
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
        return jsonify({"msg": "Invalid credentials"}), 401
