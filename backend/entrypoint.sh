
flask db init
flask db migrate -m "Update DB"
flask db upgrade

exec gunicorn -c './config/gunicorn.conf.py' run:gunicorn_app
