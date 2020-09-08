var http = require('http'); //서버구축
var url = require('url'); //쿼리스트링
var topic = require('./lib/topic');
var author = require('./lib/author');
var login = require('./lib/login');

var app = http.createServer(function(request,response){ //서버시작
    var _url = request.url;
    var queryData = url.parse(_url,true).query;
    var pathname = url.parse(_url,true).pathname;

    if(pathname === '/') {
        if(queryData.id === undefined) { //메인
            topic.home(request,response);
        }else { //상세보기
            topic.page(request,response);
        }
    }else if(pathname === '/create'){
        topic.create(request,response);
    }else if(pathname === '/create_process'){
        topic.create_process(request,response);
    }else if(pathname === '/update'){
        topic.update(request,response);
    }else if(pathname === '/update_process'){
        topic.update_process(request,response);
    }else if(pathname === '/delete_process'){
        topic.delete_process(request,response);
    }else if (pathname === '/author'){
        author.home(request,response);
    }else if(pathname === '/author/create_process'){
        author.create(request,response);
    }else if (pathname === '/author/update'){
        author.update(request,response);
    }else if (pathname === '/author/update_process'){
        author.update_process(request,response);
    }else if (pathname === '/author/delete_process'){
        author.delete_process(request,response);
    }else if(pathname == '/login'){
        login.login(request,response);
    }else if(pathname == '/login_process'){

    }else{
        response.writeHead(404);
        response.end('Not found');
    }

});
app.listen(3000);
