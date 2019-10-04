import cv2
import numpy as np
import matplotlib.pyplot as plt

def checkFeatures(real, needCheck , ratio = 0.45):
    sift = cv2.xfeatures2d.SIFT_create()
    kp1, des1 = sift.detectAndCompute(real,None)
    kp2, des2 = sift.detectAndCompute(needCheck,None)
    FLANN_INDEX_KDTREE = 0
    index_params = dict(algorithm = FLANN_INDEX_KDTREE, trees = 5)
    search_params = dict(checks=50)  

    flann = cv2.FlannBasedMatcher(index_params,search_params)

    matches = flann.knnMatch(des1,des2,k=2)

    good = []
    for i,(match1,match2) in enumerate(matches):
        if match1.distance < ratio *match2.distance:
            good.append([match1])
    
    flann_matches = cv2.drawMatchesKnn(real,kp1,needCheck,kp2,good,None,flags=0)

    return (good , flann_matches)


templateCheckRealFeatures = [
    {"path": 'data/real-features/22.jpg', "ratio": 0.475},
    {"path": 'data/real-features/23.jpg', "ratio": 0.425},
    {"path": 'data/real-features/24.jpg', "ratio": 0.475},
    {"path": 'data/real-features/25.jpg', "ratio": 0.45},
    {"path": 'data/real-features/26.jpg', "ratio": 0.475},
    {"path": 'data/real-features/27.jpg', "ratio": 0.45},
    {"path": 'data/real-features/28.jpg', "ratio": 0.475},
]
def checkTemplate(needCheck):
    results = []
    for templateCheckRealFeature in templateCheckRealFeatures:
        realFeature = cv2.imread(templateCheckRealFeature['path'], 0 )
        result = checkFeatures(realFeature , needCheck , templateCheckRealFeature['ratio'])
        results.append(result)
    return results

fakeCheckingRealFeatures = [
    {"path": 'data/small-real-features/0.jpg', "ratio": 0.6},
    {"path": 'data/small-real-features/1.jpg', "ratio": 0.45},
    {"path": 'data/small-real-features/2.jpg', "ratio": 0.7},
    {"path": 'data/small-real-features/3.jpg', "ratio": 0.55},
    {"path": 'data/small-real-features/4.jpg', "ratio": 0.6},
    {"path": 'data/small-real-features/5.jpg', "ratio": 0.6},
    {"path": 'data/small-real-features/6.jpg', "ratio": 0.625},
    {"path": 'data/small-real-features/7.jpg', "ratio": 0.6},
    {"path": 'data/small-real-features/8.jpg', "ratio": 0.55},
    {"path": 'data/small-real-features/9.jpg', "ratio": 0.7},
    {"path": 'data/small-real-features/10.jpg', "ratio": 0.7},
]

def checkFake(needCheck):
    results = []
    for fakeCheckingRealFeature in fakeCheckingRealFeatures:
        realFeature = cv2.imread(fakeCheckingRealFeature["path"], 0 )
        result = checkFeatures(realFeature , needCheck , fakeCheckingRealFeature["ratio"])
        results.append(result)
    return results