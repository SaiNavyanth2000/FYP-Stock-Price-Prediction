from flask import Flask, request,jsonify
from flask_cors import CORS
import pickle
import os
from firebase_admin import storage
from matplotlib import pyplot as plt
from pandas_datareader import data as pdr
from datetime import date, timedelta
import yfinance as yf
from keras.models import load_model
import pandas as pd
import numpy as np
import json
import firebase_admin
import pandas_ta as ta
from sklearn.preprocessing import MinMaxScaler
from model_ann import ann_model
from model_lstm import lstm_model
from model_multi_lstm import multi_lstm_model
# from flask import current_app
# current_app.config['SERVER_NAME'] = 'localhost'   
# with current_app.test_request_context():
#      url = url_for('index', _external=True)

today = date.today()
app = Flask(__name__)
Cors = CORS(app)
CORS(app, resources={r'/*': {'origins': '*'}},CORS_SUPPORTS_CREDENTIALS = True)
app.config['CORS_HEADERS'] = 'Content-Type'

# cred_obj = firebase_admin.credentials.Certificate('../../fyp2022-stockpriceprediction-firebase-adminsdk-ku62m-f9ed330292.json')
# fyp_app = firebase_admin.initialize_app(cred_obj, {
# 	'databaseURL':"https://fyp2022-stockpriceprediction-default-rtdb.asia-southeast1.firebasedatabase.app/",
# 	'storageBucket': 'fyp2022-stockpriceprediction.appspot.com'
# 	})

@app.route("/predict", methods=["POST","GET"])
def submitData():
    print('habbfhkd')
    response_object = {'status':'success'}
    if request.method == "GET":
        #get arguments from request url https://stackabuse.com/get-request-query-parameters-with-flask/
        tick   = request.args.get('ticker')
        model_type = request.args.get('model_type')
       
        #custom ann
        if(model_type == 'ANN'):

            return ann_model(tick)
        
        #multivariate lstm
        elif model_type == 'MultiLstm':

            return multi_lstm_model(tick)
        
        #lstm for now
        else:
 
            return lstm_model(tick)       

if __name__ == '__main__':
    app.run(debug=True)