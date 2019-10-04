#!/usr/bin/env python
# coding: utf-8

# In[6]:


import numpy as np
import cv2 
import matplotlib.pyplot as plt


face_cascade = cv2.CascadeClassifier('./haarcascades/haarcascade_frontalface_default.xml')

def detect_face(img):
    
    face_img = img.copy()
    
    face_rectangle = face_cascade.detectMultiScale(face_img)
    found = True
    if(type(face_rectangle) !='numpy.ndarray'):
        found = False
        
    for (x,y,w,h) in face_rectangle: 
        cv2.rectangle(face_img, (x,y), (x+w,y+h), (255,255,255), 10) 
        
    return (face_img, face_rectangle, found)



# testImg = cv2.imread('./data/cmnd-01.jpg', 0 )
# result, face_rects, found = detect_face(testImg)
# plt.imshow(result,cmap='gray')





