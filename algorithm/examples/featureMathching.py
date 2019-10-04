import cv2
import numpy as np
import matplotlib.pyplot as plt


def display(img,cmap='gray'):
    fig = plt.figure(figsize=(12,10))
    ax = fig.add_subplot(111)
    if(cmap =='bgr'):
        img = cv2.cvtColor(img, cv2.COLOR_BGR2RGB)
        ax.imshow(img,cmap='gray')
    else:
        ax.imshow(img,cmap='gray')
        plt.show()

def displayWithOpenCV(img):
    cv2.imshow("Image" , img)
    cv2.waitKey(0)
    cv2.destroyAllWindows()

real = cv2.imread('./data/real-star-01.jpg', 0)

needCheck = cv2.imread('./data/real-01.jpg', 0)

# Initiate SIFT detector
sift = cv2.xfeatures2d.SIFT_create()

# find the keypoints and descriptors with SIFT
kp1, des1 = sift.detectAndCompute(real,None)
kp2, des2 = sift.detectAndCompute(needCheck,None)
# Show key point feature

img = cv2.drawKeypoints(real, kp1, None)
displayWithOpenCV(img)
# FLANN parameters
FLANN_INDEX_KDTREE = 0
index_params = dict(algorithm = FLANN_INDEX_KDTREE, trees = 5)
search_params = dict(checks=50)  

flann = cv2.FlannBasedMatcher(index_params,search_params)

matches = flann.knnMatch(des1,des2,k=2)

good = []

# ratio test

# ratio = 0.1
# while ratio <= 1.0:
#     for i,(match1,match2) in enumerate(matches):
#         if match1.distance < ratio *match2.distance:
#             good.append([match1])

#     print('ratio: ',ratio , '- good: ', len(good))
#     flann_matches = cv2.drawMatchesKnn(real,kp1,needCheck,kp2,good,None,flags=0)
#     # display(flann_matches)
#     ratio = ratio + 0.1


