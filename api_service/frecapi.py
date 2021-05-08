# -*- coding: utf-8 -*-
"""
A module for performing face recognition tasks in photos.

This module makes use of the https://github.com/ageitgey/face_recognition
library for all face recognition tasks.

:Authors: Balwinder Sodhi
"""
import face_recognition as fr
import numpy as np
import glob
import os
import cv2
import argparse
import base64
import io
import logging


def get_face_encoding(image_bytes):
    f = io.BytesIO(image_bytes)
    image = fr.load_image_file(f)
    fenc = fr.face_encodings(image)
    fc = len(fenc)
    if fc != 1:
        raise Exception("Found {0} faces in photo. Expected only 1.".format(fc))
    return fenc[0]


def get_face_encoding_b64(image_b64):
    img_data = base64.b64decode(image_b64)
    image = fr.load_image_file(io.BytesIO(img_data))
    fenc = fr.face_encodings(image)
    fc = len(fenc)
    if fc != 1:
        raise Exception("Found {0} faces in photo. Expected only 1.".format(fc))
    return fenc[0]


def get_known_faces(images_glob):
    """This function reads all the image files found with the input glob
    and then extracts face encodings for each photo. Each image file is
    expected to hold only one face.

    Arguments:
        images_glob {str} -- glob pattern for the input images.

    Returns:
        A tuple whose first item is the list of face encodings, and
        the second item is the list of corresponding names of faces.
        The name of the image file is taken as the face name.
    """
    file_paths = glob.glob(images_glob)
    known_faces = []
    known_names = []
    for f in file_paths:
        image = fr.load_image_file(f)
        fenc = fr.face_encodings(image)
        if fenc:
            known_faces.append(fenc[0])
            known_names.append(os.path.basename(f))
        else:
            print("Face encoding could not be obtained for {0}".format(f))
    return known_faces, known_names


def get_faces_from_photo(group_photo_path):
    """Returns the face encodings and locations of the faces for all
    the faces which are detected in the input photo.

    Arguments:
        group_photo_path {str} -- Path of the group photo.

    Returns:
        A tuple whose first item is the list of face encodings and
        second item is the list of locations of those faces in the photo.
    """
    image = fr.load_image_file(group_photo_path)
    # return fr.face_encodings(image)
    face_loc = fr.face_locations(image)
    face_enc = fr.face_encodings(image, known_face_locations=face_loc)
    return face_enc, face_loc


def is_person_in_photo(person_photo_path, group_photo_path, tolerance=0.45):
    """Checks if the given person (face) is present in a group photo.

    Arguments:
        person_photo_path {str} -- Path of the person't photo to check for.
        There should be only one face present in this photo.
        group_photo_path {str} -- Path of the group photo.

    Keyword Arguments:
        tolerance {float} -- How much distance between faces to consider
        it a match. Lower is more strict (default: {0.45})

    Returns:
        True if found, else False
    """
    grp_faces, face_loc = get_faces_from_photo(group_photo_path)
    face = get_faces_from_photo(person_photo_path)[0]
    matches = fr.compare_faces(grp_faces, face, tolerance=tolerance)
    return True in matches


def find_persons_in_photo(group_photo_path, known_faces_data, tolerance=0.48):
    """Finds all those faces from a set of known faces which
    are present in a given group photo.

    Arguments:
        group_photo_path {str} -- Path of the group photo.
        known_faces_data {str} -- glob pattern for known faces images, OR
        the tuple: ([Face encodings], [Face info])

    Keyword Arguments:
        tolerance {float} -- How much distance between faces to consider
        it a match. Lower is more strict (default: {0.45})

    Returns:
        dict: with following keys:
        names_found -- Names of known faces which are present in group photo.
        names_missing -- Names of known faces not present in group photo.
        grp_faces_count -- No. of faces present in the group photo.
        im_b64 -- Input image with found faces marked.
    """
    if type(known_faces_data) is type(""):
        kf_encs, kn_names = get_known_faces(known_faces_data)
    else:
        kf_encs, kn_names = known_faces_data
    
    logging.debug("Known faces: {0}".format(str(kn_names)))
    grp_face_encs, face_loc = get_faces_from_photo(group_photo_path)

    names_found = []
    names_missing = []
    face_locs_found = []
    if len(grp_face_encs) > 0:
        for idx, kf_enc in enumerate(kf_encs):
            matches = fr.compare_faces(grp_face_encs, kf_enc, tolerance=tolerance)
            face_distances = fr.face_distance(grp_face_encs, kf_enc)
            best_match_index = np.argmin(face_distances)
            if matches[best_match_index]:
                # print("Found {0} in group photo.".format(kn_names[idx]))
                names_found.append(kn_names[idx])
                face_locs_found.append(face_loc[best_match_index])
            else:
                # print("{0} is not in the group photo.".format(kn_names[idx]))
                names_missing.append(kn_names[idx])
    else:
        logging.debug("Could not find faces from group photo!")
    
    fcount = len(grp_face_encs)
    logging.debug("Found {} faces in the group photo.".format(fcount))
    image = fr.load_image_file(group_photo_path)
    im_b64 = mark_faces(image, face_locs_found)
    res = {"names_found": names_found, "names_missing": names_missing,
            "fcount": fcount, "im_b64": im_b64}
    return res


def mark_faces(image, face_loc):
    
    for idx, (top, right, bottom, left) in enumerate(face_loc):
        try:
            # Draw a box around the face
            cv2.rectangle(image, (left, top), (right, bottom), (0, 0, 255), 2)

            # Draw a label with a name below the face
            # cv2.rectangle(image, (left, bottom - 35),
                        # (right, bottom), (0, 0, 255), cv2.FILLED)
            font = cv2.FONT_HERSHEY_DUPLEX
            cv2.putText(image, str(idx+1), (left - 15, bottom + 30),
                        font, 1.0, (0, 0, 255), 2)
            logging.debug("Marked the face {}".format(idx))
        except Exception as ex:
            logging.exception("Failed to mark the face. Continuing to next.")
    
    is_success, im_buf_arr = cv2.imencode(".jpg", image)
    if is_success:
        byte_im = im_buf_arr.tobytes()
        img_data = "{0}{1}".format("data:image/jpeg;base64,", 
            base64.b64encode(byte_im).decode())
        logging.debug("Group photo serialized to text.")
        return img_data
    else:
        logging.error("Failed to encode the group photo as .jpg format. Sendng unmarked.")
        img_data = "{0}{1}".format("data:image/jpeg;base64,", 
            base64.b64encode(image).decode())
    


if __name__ == "__main__":

    parser = argparse.ArgumentParser()
    parser.add_argument("known_faces_glob", type=str,
                        help="GLOB pattern for .jpg files of known faces.")
    parser.add_argument("group_photo", type=str,
                        help="""Path of group photo to analyse.""")
    parser.add_argument("out_dir", type=str, help="Path of ouput directory.")

    parser.add_argument("-d", '--debug', type=bool, default=False,
                        dest="debug", help="Run in debug mode.")

    args = parser.parse_args()

    print("Args: {}".format(vars(args)))
    names_found, names_missing, total_faces = find_persons_in_photo(
        args.group_photo, args.known_faces_glob)
    print("Found: {}".format(names_found))
    print("Missing: {}".format(names_missing))
    print("Total faces in photo: {}".format(total_faces))
