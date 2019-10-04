from flask import Flask, escape, request, Response
import cv2
import json

from detection import checkTemplate, checkFake
from display import displayImage
app = Flask(__name__)

print(cv2.__version__)

@app.route('/')
def hello():     
    return 'Hello world!'

@app.route('/check')
def checkTemplateRoute():
    needCheckImagePath = request.args.get('path')
    needCheckImage = cv2.imread(needCheckImagePath, 0 )
    results = checkTemplate(needCheckImage)
    body = []
    for result in results:
        data = {
            "goodPoints": len(result[0]),
         #   "flann_matches" : result[1].tolist()
        }
        body.append(data)

    print(body)
    return Response(json.dumps(body),  mimetype='application/json')

 
@app.route('/checkFake')
def checkFakeRoute():
    needCheckImagePath = request.args.get('path')
    needCheckImage = cv2.imread(needCheckImagePath, 0 )
    results = checkFake(needCheckImage)
    body = []
    for result in results:
        data = {
            "goodPoints": len(result[0]),
        }
        body.append(data)

    print(body)
    return Response(json.dumps(body),  mimetype='application/json')

app.run(host="0.0.0.0", port=5000, debug=True)