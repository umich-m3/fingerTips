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
    #Files.append(path + "/" + "index.html")
    for top in subArray:
        #print("../"+path+"/"+top)
        if top != "Videos.html" and top != "Section_Overview.html":
            Files.append(path+"/"+top)


for f in Files:
    f = BACK + f
    page = getHtml(f)
    
    print(f)
    try:
        newLi = page.new_tag("li")
        newLi["style"] = "list-style-type:none;"

        page.find(id="wrapper").insert(0,newLi)
        
        html = page.prettify("utf-8")
        with open(f, "wb") as file:
            file.write(html)

    except:
        print("Nothing Happened")
        continue

    '''
    try:
        homeIcon[0]['href'] = "../index2.html"
        print(f)
        print(homeIcon)
        html = page.prettify("utf-8")
        with open(f, "wb") as file:
            file.write(html)
    except:
        print("Not Change",f)
        continue
    '''
    #homeIcon = page.findAll("a")
    #print(homeIcon)

    
