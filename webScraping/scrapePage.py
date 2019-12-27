from bs4 import BeautifulSoup
import requests

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




index = getHtml("../index.html")
pageArray = []
topicArray = []
Files = []
BACK = "../"

getPageLinks(index,pageArray)

for i in range(len(pageArray)):
    subArray = []
    subIndex = getHtml("../"+pageArray[i])
    getPageLinks(subIndex,subArray)
    #topicArray.append(subArray)
    path = pageArray[i].split("/")[0]
    for top in subArray:
        #print("../"+path+"/"+top)
        Files.append(path+"/"+top)

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

    for b in body:
        print(b.get_text())
    break





    


    