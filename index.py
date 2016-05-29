from flask import Flask, request
import requests

def formatreq(args):
    defaults ={'amount': 1, 'categ' : 'All', 'sub' : 'None', 'qtype' : "Tossups", 'difficulty' : "College", 'tournamentyear':'All'}
    querryarr = []
    #for some reason it isn't retaining it's order when being changed to a list. sorted() to maintain consistent order?
    for k in sorted(list(defaults.keys())):
        querryarr.append(args.get(k,defaults[k]))
    if (int(querryarr[0]) > 20):
        querryarr[0] = "20"
    a = '/php/randomResults.php?amount={}&categ={}&difficulty={}&qtype={}&sub={}&tournamentyear={}'.format(*querryarr)
    return a
    
app = Flask("Test")
@app.route('/')
def index():
    return open('index.html', 'r').read()

@app.route('/static/<path:path>')
def js(path):
    #strip .. to prevent directory traversal
    return open("static/"+ path.strip(".."),'r').read()

@app.route('/random/')
def rando():
    querry = formatreq(request.args)
    print(querry)
    r = requests.get("http://quinterest.org{}".format(querry))
    return r.text


app.run("localhost",8080)
