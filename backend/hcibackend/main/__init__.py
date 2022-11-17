from flask import request, Blueprint, render_template, current_app, jsonify


main = Blueprint('main', __name__, url_prefix="/")


@main.route('/')
def hello():

    resp = "<h1>HCI is the best subject</h1>"

    return resp


@main.route('/images', methods=['POST'])
def images():

    data = requests.get_json(force = True)

    resp = jsonify(data)
    resp.headers.add('Access-Control-Allow-Origin', '*')
    return resp

