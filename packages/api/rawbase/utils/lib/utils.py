def register_blueprints(app):
    from ...routes.admin import admin
    from ...routes.user import user
    app.register_blueprint(admin)
    app.register_blueprint(user)
