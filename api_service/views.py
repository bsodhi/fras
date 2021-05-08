# -*- coding: utf-8 -*-
"""
This module contains the flask view functions for the
web application.

:Authors: Balwinder Sodhi
"""
from flask import current_app as app
from flask import (Flask, jsonify, request, session)
from flask.blueprints import Blueprint
from werkzeug.utils import secure_filename
from passlib.hash import pbkdf2_sha256
from common import *
from models import *
from playhouse.shortcuts import *
from datetime import datetime as DT

import logging
import json
import os
import csv
from pathlib import Path
from zipfile import ZipFile
import base64
import frecapi as fapi
import numpy as np

logger = logging.getLogger('peewee')
logger.addHandler(logging.StreamHandler())
logger.setLevel(logging.DEBUG)

B64_HDR = "data:image/jpeg;base64,"
# For pagination
PAGE_SIZE = 10

vbp = Blueprint('bp', __name__, template_folder='templates')


class NumpyEncoder(json.JSONEncoder):
    def default(self, obj):
        if isinstance(obj, np.ndarray):
            return obj.tolist()
        return json.JSONEncoder.default(self, obj)


def _np_to_json(obj):
    return json.dumps({'obj': obj}, cls=NumpyEncoder)


def _json_to_np(json_str):
    jobj = json.loads(json_str)
    return np.asarray(jobj["obj"])


def _ok_json(obj):
    return jsonify({"status": "OK", "body": obj})


def _error_json(obj):
    return jsonify({"status": "ERROR", "body": obj})


def _save_entity(ent):
    curr_user = _logged_in_user()
    ent.txn_login_id = curr_user.login_id if curr_user else "None"
    ent.upd_ts = DT.now()
    ent.ins_ts = DT.now()
    ent.save()


def _update_entity(Ent, obj, exclude=None):
    txn_no = int(obj.txn_no)
    obj.txn_no = 1 + txn_no
    obj.upd_ts = DT.now()
    obj.txn_login_id = _logged_in_user().login_id
    return Ent.update(model_to_dict(obj, recurse=False,
                                    exclude=exclude)).where(
        (Ent.txn_no == obj.txn_no - 1) &
        (Ent.id == obj.id)).execute()


def _get_upload_folder():
    # Ensure that the uploads folder for this user exists
    uf = os.path.join(app.config['UPLOAD_FOLDER'], session["user"]["login_id"])
    Path(uf).mkdir(parents=True, exist_ok=True)
    return uf


@auth_check
def home():
    return _ok_json("Welcome HOME!")


def logout():
    session.pop('user', None)
    return _ok_json("Logged out.")


def _make_nav(role_code):
    try:
        with open(os.path.join(app.root_path, "nav.json"), "r") as nd:
            nav = json.load(nd)
            links = []
            menus = {}
            for n in nav:
                r = n.pop("roles")
                if "-{}".format(role_code) in r:
                    continue

                if "*" in r or role_code in r:
                    m = n.pop("menu")
                    if m:
                        if m not in menus:
                            menus[m] = []
                        menus[m].append(n)
                    else:
                        links.append(n)

            return {"menus": menus, "links": links}

    except Exception as ex:
        logging.exception("Error occurred when loading nav data.")


def _logged_in_user():
    if "user" in session:
        u = session['user']
        return User.get(User.login_id == u["login_id"])


def _is_user_in_role(role):
    u = _logged_in_user()
    return u and u.role in role


def current_user():
    if "user" in session:
        u = session['user']
        nav = _make_nav(u["role"])
        return _ok_json({"user": u, "nav": nav})
    else:
        return _error_json("User not logged in.")


def signup():
    error = None
    try:
        if request.method == 'POST':
            pw_hashed = pbkdf2_sha256.hash(request.form.get('password'))
            u = User(login_id=request.form.get('login_id'),
                     email=request.form.get('email'),
                     first_name=request.form.get('first_name'),
                     last_name=request.form.get('last_name'),
                     password_hashed=pw_hashed)
            # TODO: Validate user
            u.save()
            return _ok_json("User created. Please login with your credentials.")
        else:
            return _error_json("GET not supported.")

    except Exception as ex:
        logging.exception("Error occurred when signing up.")
        return _error_json(str(ex))


def login():
    try:
        lf = request.get_json(force=True)
        login_id = lf.get("login_id")
        plain_pass = lf.get("password")
        logging.debug("Received login request for user {}".format(login_id))

        u = User.get_or_none(User.login_id == login_id)
        valid = False
        if u:
            if u.is_locked == True:
                return _error_json("User is locked! Please contact admin.")
            logging.info("Got user: {0}, {1}".format(u.login_id, u.first_name))
            valid = pbkdf2_sha256.verify(plain_pass, u.password_hashed)

        if not valid:
            return _error_json("Invalid user/password.")
        else:
            user_obj = {"id": u.id, "login_id": login_id,
                        "name": "{0} {1}".format(u.first_name, u.last_name), "role_name": u.get_role_label(), "role": u.role}
            session['user'] = user_obj
            nav = _make_nav(u.role)
            return _ok_json({"user": user_obj, "nav": nav})
    except Exception as ex:
        msg = "Error when authenticating."
        logging.exception(msg)
        return _error_json(msg)


@auth_check
def kface_delete():
    try:
        fd = request.get_json(force=True)
        ids = fd.get("ids")
        rc = 0
        if ids:
            rc = KnownFace.delete().where(KnownFace.id << ids).execute()
        return _ok_json("Deleted {} records.".format(rc))
    except Exception as ex:
        msg = "Error occurred when deleting faces."
        logging.exception(msg)
        return _error_json(msg)


@auth_check
def kface_find():
    try:
        fd = request.get_json(force=True)
        pg_no = int(fd.get('pg_no', 1))
        query = KnownFace.select().join(User)
        if fd.get("first_name"):
            query = query.where(User.first_name.contains(fd.get("first_name")))
        if fd.get("login_id"):
            query = query.where(User.login_id.contains(fd.get("login_id")))

        faces = query.order_by(KnownFace.id).paginate(pg_no, PAGE_SIZE)
        serialized = [model_to_dict(
            r, exclude=[KnownFace.user.password_hashed]) for r in faces]

        has_next = len(faces) >= PAGE_SIZE
        res = {"faces": serialized, "pg_no": pg_no, "pg_size": PAGE_SIZE,
               "has_next": has_next}
        return _ok_json(res)

    except Exception as ex:
        msg = "Error when finding known faces."
        logging.exception(msg)
        return _error_json(msg)


@auth_check
def kface_view(id=None):
    try:
        kf = KnownFace.get_by_id(id)
        if kf:
            obj = model_to_dict(kf, exclude=[KnownFace.user.password_hashed])
            return _ok_json(obj)
        else:
            return _error_json("Record not found for ID {}".format(id))
    except Exception as ex:
        msg = "Error when fetching known face."
        logging.exception(msg)
        return _error_json("{0}: {1}".format(msg, ex))


def _process_photos_zip(zip_file):
    recs = 0
    try:
        with ZipFile(zip_file) as myzip:
            zitems = [x for x in myzip.namelist()
                      if x.lower().endswith(".jpg") and "MACOSX" not in x]
            logging.debug("ZIP file {0} contains {1} items.".format(
                zip_file, len(zitems)))
            for zn in zitems:
                try:
                    logging.debug("Extracting JPG from ZIP entry: "+str(zn))
                    with myzip.open(zn) as zf:
                        logging.debug("Processing ZIP entry: {}".format(zn))
                        photo = zf.read()
                        if not photo:
                            logging.warning(
                                "Photo not found in ZIP entry: {}".format(zn))
                            continue
                        # login_id.jpg
                        login_id = zn.split(".")[0]
                        kf = KnownFace()
                        u = User.select().where(User.login_id == login_id)
                        kf.user = u
                        fenc = fapi.get_face_encoding(photo)
                        kf.face_enc = _np_to_json(fenc)
                        kf.photo = "{0}{1}".format(B64_HDR,
                                                   base64.b64encode(photo).decode())

                        _save_entity(kf)
                        recs += 1
                except Exception as ex:
                    logging.exception("Error when processing photo. "+str(ex))

    except Exception as ex:
        logging.exception("Error when processing ZIP file. "+str(ex))
    return recs


@auth_check
def kface_bulk_add():
    try:
        zipf = request.files['zip_file']
        if zipf.filename == '':
            return _error_json("No file supplied!")
        filename = secure_filename(zipf.filename)
        file_path = os.path.join(_get_upload_folder(), filename)
        zipf.save(file_path)
        recs = _process_photos_zip(file_path)
        return _ok_json("Saved {0} photos from file {1}.".format(recs, filename))
    except Exception as ex:
        msg = "Error when handling ZIP file."
        logging.exception(msg)
        return _error_json("{0}: {1}".format(msg, ex))


def _fetch_known_faces_encodings():
    rs = KnownFace.select()
    fenc = []
    face_info = []
    for fe in rs:
        t = _json_to_np(fe.face_enc)
        fenc.append(t)
        kf_info = {"kf_id": fe.id, "first_name": fe.user.first_name,
                   "last_name": fe.user.last_name, "user_id": fe.user.id}
        face_info.append(kf_info)
    return fenc, face_info


@auth_check
def mark_attendance():
    try:
        grp_ph = request.files['group_photo']
        if grp_ph.filename == '':
            return _error_json("No file supplied!")
        filename = secure_filename(grp_ph.filename)
        file_path = os.path.join(_get_upload_folder(), filename)
        grp_ph.save(file_path)
        result = fapi.find_persons_in_photo(
            file_path, _fetch_known_faces_encodings())
        present = result["names_found"]
        for pp in present:
            u = User.get_by_id(pp["user_id"])
            ua = Attendance(user=u, status="Present")
            _save_entity(ua)
        result.pop("names_missing")
        return _ok_json(result)

    except Exception as ex:
        msg = "Error when handling attendance marking request."
        logging.exception(msg)
        return _error_json("{0}: {1}".format(msg, ex))


@auth_check
def kface_save():
    try:
        fd = request.get_json(force=True)
        logging.info("Saving kface: {}".format(fd))
        sid = int(fd.get("id") or 0)
        face_enc = None
        if fd.get("photo"):
            ph = fd.get("photo")
            if ph.startswith(B64_HDR):
                photo_b64 = ph[len(B64_HDR):]
                face_enc = fapi.get_face_encoding_b64(photo_b64)
            else:
                raise Exception(
                    "Please supply a JPG format image. Mere renaming to .jpg won't work!")
        else:
            logging.debug("No photo supplied.")

        kf = KnownFace()
        if sid:
            kf = KnownFace.get_by_id(sid)
            # TODO: Check ownership
            merge_form_to_model(kf, fd)
            kf.face_enc = _np_to_json(face_enc)
            with db.transaction() as txn:
                try:
                    rc = _update_entity(KnownFace, kf, exclude=[KnownFace.user])
                    usr = kf.user
                    merge_form_to_model(usr, fd["user"])
                    rc += _update_entity(User, usr, exclude=[User.role, User.password_hashed])
                    if rc != 2:
                        raise IntegrityError("Could not update. Please try again.")
                    txn.commit()
                except DatabaseError as dbe:
                    txn.rollback()
                    raise dbe
            logging.debug("Updated known face: {}".format(kf))

        else:
            with db.transaction() as txn:
                try:
                    u = User()
                    merge_form_to_model(u, fd["user"])
                    u.password_hashed = pbkdf2_sha256.hash(random_str(10))
                    _save_entity(u)

                    merge_form_to_model(kf, fd)
                    kf.user = u
                    kf.face_enc = _np_to_json(face_enc)
                    _save_entity(kf)

                    txn.commit()
                except DatabaseError as dbe:
                    txn.rollback()
                    raise dbe
            logging.info("Inserted: {}".format(kf))

        return _ok_json(model_to_dict(kf))

    except Exception as ex:
        msg = "Error when saving known face."
        logging.exception(msg)
        return _error_json("{0}: {1}".format(msg, ex))


@auth_check
def users_upload():
    try:
        # Only a superuser can add new users
        if not _is_user_in_role("SU"):
            return _error_json("Operation not allowed. Insufficient privileges!")

        users_file = request.files['users_file']
        if users_file.filename == '':
            return _error_json("No file supplied!")
        filename = secure_filename(users_file.filename)
        file_path = os.path.join(_get_upload_folder(), filename)
        users_file.save(file_path)

        with db.atomic() as txn:
            # TODO: Use a better/efficient strategy to add users in DB
            with open(file_path, newline='') as csvfile:
                reader = csv.DictReader(csvfile)
                for row in reader:
                    login_id = row["LOGIN_ID"]
                    fname = row["FIRST_NAME"]
                    lname = row["LAST_NAME"]
                    email = row["EMAIL"]
                    u = User(login_id=login_id, first_name=fname,
                             last_name=lname, email=email,
                             password_hashed=pbkdf2_sha256.hash(random_str(10)))
                    _save_entity(u)
            txn.commit()

        return _ok_json("Users added successfully!")

    except Exception as ex:
        msg = "Error when handling users upload request."
        logging.exception(msg)
        return _error_json(msg)


@auth_check
def all_attendance():
    try:
        att = Attendance.select()
        return _ok_json([{"first_name": a.user.first_name,
                         "last_name": a.user.last_name,
                         "marked_on": a.ins_ts} for a in att])
    except Exception as ex:
        msg = "Error when fetching attendance."
        logging.exception(msg)
        return _error_json(msg)
