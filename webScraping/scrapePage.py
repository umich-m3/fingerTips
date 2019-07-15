from bs4 import BeautifulSoup

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

getPageLinks(index,pageArray)

for i in range(len(pageArray)):
    subArray = []
    subIndex = getHtml("../"+pageArray[i])
    getPageLinks(subIndex,subArray)
    topicArray.append(subArray)


objectArray = []
tagArray = []

temp = getHtml("../Vision_Pathways/Section_Overview.html")

for i in temp.find_all(class_="amBodyColumns"):
        h1 = i.findAll('h1')
        for k in h1:
            objectArray.append(k.text)   

for i in temp.find_all(class_="scrapeMeTitle"):
    objectArray.append(i.text)

#Figure out how to scrape the text and put it into tags




    


    