from flask import Flask, request,jsonify,json
from flask_cors import CORS, cross_origin
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
# from flask import current_app
# current_app.config['SERVER_NAME'] = 'localhost'   
# with current_app.test_request_context():
#      url = url_for('index', _external=True)

today = date.today()
app = Flask(__name__)
Cors = CORS(app)
CORS(app, resources={r'/*': {'origins': '*'}},CORS_SUPPORTS_CREDENTIALS = True)
app.config['CORS_HEADERS'] = 'Content-Type'

cred_obj = firebase_admin.credentials.Certificate('../../fyp2022-stockpriceprediction-firebase-adminsdk-ku62m-f9ed330292.json')
fyp_app = firebase_admin.initialize_app(cred_obj, {
	'databaseURL':"https://fyp2022-stockpriceprediction-default-rtdb.asia-southeast1.firebasedatabase.app/",
	'storageBucket': 'fyp2022-stockpriceprediction.appspot.com'
	})

@app.route("/predict", methods=["POST","GET"])
def submitData():
    print('habbfhkd')
    response_object = {'status':'success'}
    if request.method == "GET":
        #get arguments from request url https://stackabuse.com/get-request-query-parameters-with-flask/
        tick   = request.args.get('ticker')
        model_type = request.args.get('model_type')
        print(model_type)
        print(tick)
        #get the model if it exists locally
       
        
        #get the scaler if it exists locally
        
        if(model_type == 'ANN'):
            scaler_path = "../../data/normalizers/" + tick + "/ann_x.pkl"
            model_path = "../../data/models/" + tick + "/ann"
            if(os.path.exists(model_path)):
                model = load_model(model_path)
            if(os.path.exists(scaler_path)):
                with open(scaler_path, "rb") as input_file:
                    scaler_x = pickle.load(input_file)

            scaler_path = "../../data/normalizers/" + tick + "/ann_y.pkl"
            if(os.path.exists(scaler_path)):
                with open(scaler_path, "rb") as input_file:
                    scaler_y = pickle.load(input_file)
        else:
            scaler_path = "../../data/normalizers/" + tick + "/" + model_type + ".pkl"
            model_path = "../../data/models/" + tick + "/lstm"
            if(os.path.exists(model_path)):
                model = load_model(model_path)
            if(os.path.exists(scaler_path)):
                with open(scaler_path, "rb") as input_file:
                    scaler = pickle.load(input_file)
       
        #if scaler doesnt exist, get it from firebase         
        #implement later
        
        
        #get the last 100 days and make a prediction
        def getTestData(ticker, start):
            data = pdr.get_data_yahoo(ticker, start=start, end=today)
            # dataname= ticker+"_"+str(today)
            return data[-100:]
            
    
        #find the starting date (100 trading days before today)
        #https://stackoverflow.com/questions/441147/how-to-subtract-a-day-from-a-date
        start = today - timedelta(days=190)

        df = getTestData(tick,start) 

        storing_data = df['Close'].copy().to_json()   
        if(model_type == 'ANN'):
            df['H-L'] = df['High'] - df['Low']
            df['O-C'] = df['Open'] - df['Close']
            df['7MA'] = df['Adj Close'].rolling(window=7).mean()
            df['14MA'] = df['Adj Close'].rolling(window=14).mean()
            df['21MA'] = df['Adj Close'].rolling(window=21).mean()
            df['7SD'] = df['Adj Close'].rolling(window=7).std()
            features = ['H-L','O-C','7MA','14MA','21MA','7SD','Volume']
            test_data = np.asarray(df[-1:][features], np.float32)
            test = scaler_x.transform(test_data)
            print(test.shape)
            print(test)
            prediction = model.predict(test)  
            prediction_value = scaler_y.inverse_transform(prediction)

            response_object['prediction_value'] = str(prediction_value[0][0])
            response_object['past_100_days'] = storing_data
            
            response_object['message'] ='Got data!'

            return jsonify(response_object)

        else:    
            #preprocess data
            
            df = df.reset_index()['Close']

            df= scaler.transform(np.array(df).reshape(-1,1))
            test_data = df.reshape(-1,1)
            
            #https://datascience.stackexchange.com/questions/13461/how-can-i-get-prediction-for-only-one-instance-in-keras to get only one instance prediction
            test_data = np.array( [test_data,] ) 
            
            prediction = model.predict( test_data )
            prediction_value = scaler.inverse_transform(prediction)
            
            response_object['prediction_value'] = str(prediction_value[0][0])
            response_object['past_100_days'] = storing_data
            
            response_object['message'] ='Got data!'
            return jsonify(response_object)


if __name__ == '__main__':
    print('hey')
    app.run(debug=True)