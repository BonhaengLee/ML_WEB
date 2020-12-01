import time
from flask import Flask, jsonify, request
# from .models import Article

app = Flask(__name__, static_folder='../build', static_url_path='/')


@app.errorhandler(404)
def not_found(e):
    return app.send_static_file('index.html')


@app.route('/')
def index():
    return app.send_static_file('index.html')

# 기사 POST
@app.route('/api/add_title', methods=['POST'])
def add_article():
    article_data = request.get_json()

    return article_data 

# 제목, bleu 데이터 
@app.route('/api/normal')
def get_normal():

    nl = { "title" : 'nnllll', 'bleu' : 'nnl132412'}
    pp = { "title" : 'pppppp', 'bleu' : 'ppp132412'}
    # normal_list = Article.query.all()
    nor=[]
    nor.append(nl)
    nor.append(pp)

    return jsonify(nor) # ({'normal_title':normal})

# 인기 기사 제목 
# @app.route('/api/popular-title')
# def get_popular_title():
#     popular_list = Article.query.all()
#     popular=[]

#     for popular in popular_list:
#         popular.append({'title' : popular.title, 'bleu' : popular.bleu})
    
#     return jsonify({'popular_title':popular})