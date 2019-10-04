import cv2
import numpy as np
import matplotlib.pyplot as plt


needCheckImg = cv2.imread('./data/anime-01.jpg',0)

face_cascade = cv2.CascadeClassifier('./data/haarcascades/haarcascade_frontalface_default.xml')

def detect_face(img):
    face_img = img.copy()
    face_rects = face_cascade.detectMultiScale(face_img) 
    for (x,y,w,h) in face_rects: 
        cv2.rectangle(face_img, (x,y), (x+w,y+h), (255,255,255), 10)  
    return face_img


result = detect_face(needCheckImg)
plt.imshow(result,cmap='gray')
plt.show()
