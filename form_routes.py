from flask import Blueprint, jsonify, request

form_routes = Blueprint('form_routes', __name__)

# Ruta para manejar solicitudes POST
@form_routes.route('/api/form', methods=['POST'])
def submit_form():
    from app import db
    from app.models import FormData
    
    data = request.json.get('data')

    new_data = FormData(data=data)
    db.session.add(new_data)
    db.session.commit()

    return jsonify({'message': 'Data submitted successfully!'})

# Ruta para manejar solicitudes PUT
@form_routes.route('/api/form/<int:id>', methods=['PUT'])
def update_data(id):
    from app import db
    from app.models import FormData
    
    data_record = FormData.query.get_or_404(id)
    new_data = request.json.get('data', '')
    data_record.data = new_data
    db.session.commit()
    return jsonify({'id': data_record.id, 'data': data_record.data})

# Ruta para manejar solicitudes DELETE
@form_routes.route('/api/form/<int:id>', methods=['DELETE'])
def delete_data(id):
    from app import db
    from app.models import FormData
    
    data_record = FormData.query.get_or_404(id)
    db.session.delete(data_record)
    db.session.commit()
    return jsonify({'message': 'Data deleted successfully'})
