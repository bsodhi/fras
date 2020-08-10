# -*- coding: utf-8 -*-
"""
Models for keeping data in a RDBMS.

:Authors: Balwinder Sodhi
"""

from peewee import *
from datetime import datetime as DT
import logging
from passlib.handlers.pbkdf2 import pbkdf2_sha256

# TODO: Use MariaDB or Postgres
db = SqliteDatabase('fras_data.db')

def create_schema():
    logging.info("Creating DB schema")
    with db:
        db.create_tables([User, KnownFace, Attendance])
        logging.info("DB schema created.")


def populate_sample_data():
    with db:
        u = User(login_id="test", password_hashed=pbkdf2_sha256.hash("test"), role="ST",
        email="s1@junk.ss", first_name="TEST", last_name="USER", inst_id="CSB1000")
        u.save()

        u = User(login_id="admin", password_hashed=pbkdf2_sha256.hash("admin"), role="SU",
        email="admin@admin.ss", first_name="ADMIN", last_name="USER", inst_id="CSB1001")
        u.save()


def setup_demo_db():
    create_schema()
    populate_sample_data()


class BaseModel(Model):
    id = AutoField()
    is_deleted = BooleanField(default=False)
    txn_no = IntegerField(default=1, index=True)
    ins_ts = DateTimeField(default=DT.now())
    upd_ts = DateTimeField(default=DT.now())
    txn_login_id = CharField(max_length=40, null=True)

    class Meta:
        database = db
        only_save_dirty = True


class User(BaseModel):
    login_id = TextField(unique=True)
    password_hashed = TextField()
    email = TextField(unique=True)
    first_name = CharField(null=True)
    last_name = CharField(null=True)
    is_locked = FixedCharField(max_length=1, default="N")
    ROLES = [
        ("GN", 'General'),
        ("ST", 'Staff'),
        ("SU", 'Superuser'),
    ]
    role = CharField(choices=ROLES, default="GN")
    def get_role_label(self):
        return dict(self.ROLES)[self.role]


class Attendance(BaseModel):
    user = ForeignKeyField(User, backref='user_attendance')
    status = CharField(max_length=30)

    class Meta:
        indexes = (
            # Unique index
            (('user', 'status', 'ins_ts'), True),
        )


class KnownFace(BaseModel):
    user = ForeignKeyField(User, backref='known_faces')
    face_enc = TextField()
    photo = TextField()
