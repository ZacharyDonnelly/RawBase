from flask import request, Blueprint

admin = Blueprint('admin', __name__, url_prefix='/api/admin')\



@admin.route('/verify')
def verify():
    return "test"


@admin.route('/login')
def post_verify():
    return "logged in"
