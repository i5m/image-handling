from flask import request, Blueprint, render_template, current_app, jsonify, send_file
import cv2
import matplotlib.pyplot as plt
import os
import numpy as np
import math
from PIL import Image
import requests
from io import BytesIO
import base64


main = Blueprint('main', __name__, url_prefix="/")


@main.route('/')
def hello():

    resp = "<h1>HCI is the best subject</h1>"

    return resp


@main.route('/images', methods=['GET'])
def images():

    # data = request.get_json(force = True)

    type_ = request.args.get("type_")
    image_url = request.args.get("image_url")
    extent = int(request.args.get("extent"))

    cvd_rgba = color_correction(image_url, type_, extent)

    img = Image.fromarray(cvd_rgba.astype('uint8'))
    file_object = BytesIO()
    img.save(file_object, 'PNG')

    # encoded_img = base64.encodebytes(file_object.getvalue()).decode('ascii')
    # ans[i] = encoded_img

    file_object.seek(0)

    return send_file(file_object, mimetype='image/PNG')

    # imBytes = cvd_rgba.tobytes()
    # imBase64 = base64.b64encode(imBytes)
    # ans[i] = imBase64.decode('utf-8')

    # resp = jsonify(ans)
    # resp.headers.add('Access-Control-Allow-Origin', '*')
    # return resp


def global_func():

    prot_mat = np.array([[0,2.02344,-2.52581], [0,1,0], [0,0,1]])
    deut_mat = np.array([[1,0,0], [0.49421,0,1.24827], [0,0,1]])
    trit_mat = np.array([[1,0,0], [0,1,0], [-0.395913,0.801109,0]])

    prot_error_mat = np.array([[0,0,0], [0.7,1,0], [0.7,0,1]])
    deut_error_mat = np.array([[1,0.7,0], [0,0,0], [0,0.7,1]])
    trit_error_mat = np.array([[1,0,0.7], [0,1,0.7], [0,0,0]])

    rgb_lms_mat = np.array([[17.8824,43.5161,4.11935], [3.45565, 27.1554, 3.86714], [0.0299566, 0.184309,1.46709]])
    lms_rgb_mat = np.array([[0.0809444479,-0.130504409,0.116721066], [0.113614708,-0.0102485335,0.0540193266], [-0.000365296938,-0.00412161469,0.693511405]])

    cvd_dict = {
        'prot': (prot_mat, prot_error_mat),
        'deut': (deut_mat, deut_error_mat),
        'trit': (trit_mat, trit_error_mat)
    }

    return cvd_dict, rgb_lms_mat, lms_rgb_mat


def get_source_img(url):

    source = np.array(Image.open(BytesIO(requests.get(url).content)))
    
    img = cv2.cvtColor(source, cv2.COLOR_RGBA2RGB)
    img = img.astype(np.float32)

    sdim = img.shape

    if (sum(sum(sum(img>1))==(sdim[0]*sdim[1]*sdim[2]))>0):
        img /= 255
    
    return img, source, sdim


def return_rgb_channels(img):
    return img[:,:,0], img[:,:,1], img[:,:,2]


def return_channel_vars(mat, r,g,b):
    l= np.multiply(mat[0][0],r) + np.multiply(mat[0][1],g) + np.multiply(mat[0][2],b)
    m= np.multiply(mat[1][0],r) + np.multiply(mat[1][1],g) + np.multiply(mat[1][2],b)
    s= np.multiply(mat[2][0],r) + np.multiply(mat[2][1],g) + np.multiply(mat[2][2],b)
    return l,m,s


def rgb_to_lms(source, sdim):

    _, rgb_lms_mat, _ = global_func()

    source_lms=np.zeros(sdim)
    r,g,b= return_rgb_channels(source)
    l,m,s= return_channel_vars(rgb_lms_mat,r,g,b)
    source_lms[:,:,0]=l
    source_lms[:,:,1]=m
    source_lms[:,:,2]=s

    return source_lms


def color_correction(url, cvd_type, ext):

    cvd_dict, _, lms_rgb_mat = global_func()

    source, source_rgba, sdim = get_source_img(url)
    print("Source values: ", source_rgba.shape)
    source_lms = rgb_to_lms(source, sdim)
    
    cvd_lms=np.zeros(sdim)
    cvd_sim=np.zeros(sdim)
    cvd_map=np.zeros(sdim)
    cvd_final=np.zeros(sdim)
    
    r, g, b = return_rgb_channels(source_lms)
    l, m, s = return_channel_vars(cvd_dict[cvd_type][0], r, g, b)

    cvd_lms[:,:,0] = l
    cvd_lms[:,:,1] = m
    cvd_lms[:,:,2] = s

    r, g, b = return_rgb_channels(cvd_lms)
    l, m, s = return_channel_vars(lms_rgb_mat, r,g,b)

    cvd_sim[:,:,0]=l
    cvd_sim[:,:,1]=m
    cvd_sim[:,:,2]=s
    cvd_sim *= ext

    cvd_dr=source[:,:,0]-cvd_sim[:,:,0]
    cvd_dg=source[:,:,1]-cvd_sim[:,:,1]
    cvd_db=source[:,:,2]-cvd_sim[:,:,2]

    l, m, s = return_channel_vars(cvd_dict[cvd_type][1], cvd_dr, cvd_dg, cvd_db)

    cvd_map[:,:,0]=l
    cvd_map[:,:,1]=m
    cvd_map[:,:,2]=s

    cvd_final[:,:,0]=source[:,:,0]+cvd_map[:,:,0]
    cvd_final[:,:,1]=source[:,:,1]+cvd_map[:,:,1]
    cvd_final[:,:,2]=source[:,:,2]+cvd_map[:,:,2]
    cvd_final/= np.amax(cvd_final)
    cvd_final*= 255
    cvd_final.astype(np.uint8)

    # print(cvd_final.shape, source_rgba.shape, source_rgba[:,:,2].shape)
    
    if(source_rgba.shape[2]==4):
        cvd_rgba = np.concatenate((cvd_final, source_rgba[:,:,3].reshape((sdim[0],sdim[1],1))), axis=2)
        return cvd_rgba
    else:
        return cvd_final
    
    
