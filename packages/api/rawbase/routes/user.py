from flask import abort, request, jsonify, Blueprint, make_response

from rawbase.models import User
from rawbase.app import db

user = Blueprint('user', __name__, url_prefix='/api/user')


@user.route('/users', methods=['GET'])
def get_users():
    users = User.query.all()
    user_list = []
    if users is None:
        abort(400)
    for user in users:
        user_list.append(str(user))

    return jsonify(user_list), 200


@user.route('/create', methods=['POST'])
def new_user():
    data = request.get_json()
    name = data['name']
    password = data['password']
    email = data['email']
    if name is None or password is None or email is None:
        abort(400)  # empty fields
    if User.query.filter_by(name=name).first() is not None:
        abort(403)  # existing user
    user = User(name=name, email=email)
    user.hash_password(password)
    db.session.add(user)
    db.session.commit()
    return make_response(user.name), 200


@user.route('/update/<int:user_id>', methods=['PUT', 'POST'])
def update_user(user_id):
    user = User.query.filter_by(id=user_id).first()
    name = request.form['name']
    password = request.form['password']
    email = request.form['email']
    if name is None or password is None or email is None:
        abort(400)  # empty fields
    if user is None:
        abort(400)  # user doesn't exist
    if User.check_password(password) is False:
        abort(400)  # password hash doesn't match
    return 200


@user.route('/delete/<int:user_id>', methods=["DELETE"])
def delete_user(user_id):
    user = User.query.filter_by(id=user_id).first()
    if user is None:
        abort(400)
    db.session.delete(user)
    db.session.commit()
    return jsonify({"Deleted": True}, ), 200
