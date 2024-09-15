from flask import Flask,jsonify
from flask_cors import CORS
import requests

app=Flask(__name__)
CORS(app)

API_KEY = "ee604a0d841d4076961161101240609"

@app.route('/')
def homePage():
    return "This is Home Page"

@app.route('/weather/<city>')
def getWether(city):
    url = f"http://api.weatherapi.com/v1/current.json?key={API_KEY}&q={city}&aqi=no"
    response = requests.get(url)
    data =response.json()
    reports={"Name":data['location']['name'],"Region":data['location']['region'],"Country":data['location']['country'],"IconURL":data['current']['condition']['icon'],"Weather":data['current']['condition']['text'],"Time":data['location']['localtime'],"TemperatureC":data['current']['temp_c'],"Humidity":data['current']['humidity'],"Wind":data['current']['wind_kph']}

    return reports

if __name__=='__main__':
    app.run(debug=True)