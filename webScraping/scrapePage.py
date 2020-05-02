from bs4 import BeautifulSoup
import requests
import os
import re
import json

def getHtml(path):
    rawHtml = open(path).read()
    return BeautifulSoup(rawHtml,'html.parser')


def getPageLinks(index,pageArray):
    liArray = []
    for i in index.findAll(class_ = "amBlueNormal"):
        liArray.append(i)

    for i in index.findAll(class_ = "amMaizeNormal"):
        liArray.append(i)

    for i in liArray:
        href = i.findAll('a')
        for k in href:
            pageArray.append(k['href'])

index = getHtml("../index2.html")
pageArray = []
topicArray = []
Files = []
stopwords = {}
mapArr = []
BACK = "../"

getPageLinks(index,pageArray)
f = open('stopwords.txt', 'r')
for word in f:
    no_linebreak = word[:-1]
    stopwords[no_linebreak] = 1



for i in range(len(pageArray)):
    subArray = []
    subIndex = getHtml("../"+pageArray[i])
    getPageLinks(subIndex,subArray)
    #topicArray.append(subArray)
    path = pageArray[i].split("/")[0]
    for top in subArray:
        Files.append(path+"/"+top)


'''
Files = []
anatomicFiles = os.listdir("../Quiz/Anatomic")
EyeFiles = os.listdir("../Quiz/Eye_Movement_Disorder")
OcularFiles = os.listdir("../Quiz/Ocular")
VisionFiles = os.listdir("../Quiz/Vision_Disorder")

for i in anatomicFiles:
    if i[-1] != 's' and i != "Results.html":
        Files.append("../Quiz/Anatomic/" + i)

for i in EyeFiles:
    if i[-1] != 's' and i != "Results.html":
        Files.append("../Quiz/Eye_Movement_Disorder/" + i)

for i in OcularFiles:
    if i[-1] != 's' and i != "Results.html":
        Files.append("../Quiz/Ocular/" + i)

for i in VisionFiles:
    if i[-1] != 's' and i != "Results.html":
        Files.append("../Quiz/Vision_Disorder/" + i)

for f in Files:
    page = getHtml(f)
    add = "target='_new' onclick='window.open(this.href); return false;'"
    section = None
    try:
        section = page.find_all(id='review')[0]
    except:
        section = ""

    section.find(">",10)
    if section:
        continue
        #print(section)

'''
for f in Files:
    f = BACK + f
    page = getHtml(f)
    section = None
    title = None
    body = None
    try:
        section = page.find_all('span', class_='scrapeMeTitle')[0].get_text()
    except:
        section = ""
    
    try:
        title = page.find_all('h1', class_='titleCenter')[0].get_text()
    except:
        title = ""
    
   
    try:
        body = page.find_all("li")
    except:
        body = ""

    goodWords = []
    for b in body:
        #CLEAN WITH REGEX BEFORE COMPARING WITH DICT
        line = b.get_text()
        lineArr = line.split()
        for word in lineArr: 
            editedWord = re.sub(r'[^a-zA-Z0-9]+', '', word)
            editedWord = editedWord.lower()
            if editedWord not in stopwords:
                goodWords.append(editedWord)
    spaceWords = ""
    for w in goodWords:
        spaceWords += w
        spaceWords += ", "
    Map = {"title": title, "text": section, "tags": spaceWords, "loc": f[3:]}
    mapArr.append(Map)

#Formatting is good but start new line for every new topic
#Maybe forego array and manually add that in so space can be added
print("var tipuesearch = {\"pages\": [")
for m in mapArr:
    print(str(m) + ',')
print("]};")






    


    