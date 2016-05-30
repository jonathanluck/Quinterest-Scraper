from flask import Flask, request
from flask.ext.compress import Compress
from requests import get
from urllib.parse import parse_qs
from bs4 import BeautifulSoup
from random import shuffle
import re

def formatreq(args):
    defaults ={'amount': [1], 'categ' : ['All'], 'sub' : ['None'], 'qtype' : ["Tossups"], 'difficulty' : ["College"], 'tournamentyear':['All']}
    args = parse_qs(args);
    print("args: ", args)
    querryarr = []
    #for some reason it isn't retaining it's order when being changed to a list. sorted() to maintain consistent order?
    for k in sorted(list(defaults.keys())):
        querryarr.append(args.get(k, defaults[k])[0])
    if (int(querryarr[0]) > 20):
        querryarr[0] = "20"
    a = '/php/randomResults.php?amount={}&categ={}&difficulty={}&qtype={}&sub={}&tournamentyear={}'.format(*querryarr)
    return a

def processQuestions(arr):
    shuffle(arr)
    for i in range(len(arr)):
        arr[i] = re.sub(r'Result: [0-9]+ \|', "Result: {} |".format(i+1), arr[i])
    return arr
    
    
app = Flask("Test")
Compress(app)
@app.route('/')
def index():
    return open('index.html', 'r').read()

@app.route('/static/<path:path>')
def js(path):
    #strip .. to prevent directory traversal
    return open("static/"+ path.strip(".."),'r').read()

@app.route('/random/')
def rando():
    #clip off the last semicolon then split up the separate querries
    reqs = request.query_string.decode('utf-8')[:-1].split(";")
    print("reqs: ", reqs)
    querry = []
    #make a list of querries to quinterest
    for r in reqs:
        querry.append(formatreq(r))
    print("querry: ", querry)
    questions = []
    for q in querry:
        out = get("http://quinterest.org{}".format(q)).text
        out = BeautifulSoup(out, 'html.parser').find_all(attrs={"class":"row"})
        out.pop(0)
        for e in out:
            questions.append(str(e))
    questions = processQuestions(questions)
    return ("<br>".join(questions))


app.run("localhost",8080)
