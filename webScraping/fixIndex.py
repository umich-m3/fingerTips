from bs4 import BeautifulSoup
import requests
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



for i in range(len(pageArray)):
    subArray = []
    subIndex = getHtml("../"+pageArray[i])
    getPageLinks(subIndex,subArray)
    #topicArray.append(subArray)
    path = pageArray[i].split("/")[0]
    Files.append(path + "/" + "index.html")
    for top in subArray:
        #print("../"+path+"/"+top)
        Files.append(path+"/"+top)

for f in Files:
    f = BACK + f
    page = getHtml(f)
    arr = f.split("/")
    homeIcon = None
    if arr[2] == "index.html":
        homeIcon = page.findAll("a", {"href": "../index.html"})
    else:
        homeIcon = page.findAll("a", {"class": "glyphicon-home"})

    homeIcon[0]['href'] = "../index2.html"
    print(f)
    print(homeIcon)
    html = page.prettify("utf-8")
    with open(f, "wb") as file:
        file.write(html)
    break
    #homeIcon = page.findAll("a")
    #print(homeIcon)

    
