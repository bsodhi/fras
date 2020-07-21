from flask import Flask, current_app, g
#from flask_talisman import Talisman
import argparse
import json
import logging
from pathlib import Path
import os
import common as C
import views as V

TS_FORMAT = "%Y%m%d_%H%M%S"


app = Flask(__name__, static_folder="./app", static_url_path="/fras/app/")

#Talisman(app)
logging.basicConfig(filename='server.log',
                    level=logging.INFO,
                    format='%(asctime)s %(levelname)s:: %(message)s',
                    datefmt='%d-%m-%Y@%I:%M:%S %p')

def init():
    app.secret_key = C.random_str(size=30)
    app.context_processor(C.inject_user)
    app.before_request(C.db_connect)
    app.after_request(C.db_close)

    # Add custom filters
    app.add_template_filter(C.jinja2_filter_datefmt, "datefmt")

    # Initialize uploads folder
    uploads = os.path.join(app.root_path, "uploads")
    app.config['UPLOAD_FOLDER'] = uploads
    Path(uploads).mkdir(parents=True, exist_ok=True)

    # Register views
    V.vbp.add_url_rule('/login', view_func=V.login, methods=['POST'])
    V.vbp.add_url_rule('/logout', view_func=V.logout, methods=['GET','POST'])
    V.vbp.add_url_rule('/current_user', view_func=V.current_user, methods=['GET'])
    V.vbp.add_url_rule('/users_upload', view_func=V.users_upload, methods=['POST'])

    V.vbp.add_url_rule('/kface_bulk_add', view_func=V.kface_bulk_add, methods=['POST'])
    V.vbp.add_url_rule('/kface', view_func=V.kface_find, methods=['POST'])
    V.vbp.add_url_rule('/kface/<int:id>', view_func=V.kface_view, methods=['GET'])
    V.vbp.add_url_rule('/kface_save', view_func=V.kface_save, methods=['POST'])
    V.vbp.add_url_rule('/kface_delete', view_func=V.kface_delete, methods=['POST'])
    V.vbp.add_url_rule('/mark_attendance', view_func=V.mark_attendance, methods=['POST'])
    V.vbp.add_url_rule('/all_attendance', view_func=V.all_attendance, methods=['GET'])
    
    app.register_blueprint(V.vbp, url_prefix='/fras/app')
    
CONFIG = None

if __name__ == "__main__":
    # parser = argparse.ArgumentParser()
    # parser.add_argument("-d", "--debug", type=bool, nargs='?',
    #                     const=True, default=False,
    #                     dest="debug", help="Run the server in debug mode.")
    # parser.add_argument("cfg_file_path", type=str,
    #                     help="Scrapper runner config file path.")
    # args = parser.parse_args()
    # app.secret_key = C.random_str(size=30)

    # with open(args.cfg_file_path, "r") as cfg_file:
    #     CONFIG = json.load(cfg_file)

    # logging.info("CONFIG: "+str(CONFIG))
    # app.run(host=CONFIG["host"],
    #         port=CONFIG["port"],
    #         threaded=True,
    #         ssl_context=(CONFIG["ssl_cert_file"], CONFIG["ssl_key_file"]),
    #         debug=args.debug)
    init()
    app.run(host="0.0.0.0", port=4567, debug=True)