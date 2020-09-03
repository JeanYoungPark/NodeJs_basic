var url = require('url');
var db = require('./db');
var qs = require('querystring');
var template = require('./template');
var sanitizeHtml = require('sanitize-html');

exports.home = function(request,response){
    db.query(`SELECT * FROM author`,function(error,authors){
        if(error) throw error;
        var html = template.html('Author','',`
            ${template.authorTable(authors)}
            <form method="post" action="/author/create_process">
                <p><input type="text" name="name" placeholder="name"></input></p>
                <textarea name="profile" placeholder="profile"></textarea>
                <p><input type="submit" value="create"></input></p>
            </form>
            <style>
                table{border-collapse : collapse;}
                td {border:1px solid black;}
            </style>
        `, '');
        response.writeHead(200);
        response.end(html);
    });
}

exports.create = function(request,response){
    var body = '';
    request.on('data',function(data){
        body += data;
    });
    request.on('end',function(){
        var post = qs.parse(body);
        db.query(`INSERT INTO author (name, profile) VALUE (?, ?)`,[post.name, post.profile],function(error,result){
            if(error) throw error;
            response.writeHead(302,{Location:`/author`});
            response.end();
        });
    });
}

exports.update = function(request,response){
    var _url = request.url;
    var queryData = url.parse(_url,true).query;

    db.query(`SELECT * FROM author WHERE id=?`,[queryData.id],function(error,author){
        if(error) throw error;
        var html = template.html('Author_update','',
        `
            <form method="post" action="/author/update_process">
                <p><input type="text" name="name" value="${sanitizeHtml(author[0].name)}"></input></p>
                <textarea name="profile">${sanitizeHtml(author[0].profile)}</textarea>
                <input type="hidden" name="id" value="${queryData.id}">
                <p><input type="submit" value="update"></input></p>
            </form>
        `,'');
        response.writeHead(200);
        response.end(html);
    });
}

exports.update_process = function(request,response){
    var body = '';
    request.on('data',function(data){
        body += data;
    });
    request.on('end',function(){
        var post = qs.parse(body);
        db.query(`UPDATE author SET name = ?, profile = ? WHERE id = ?`,
                [post.name,post.profile,post.id],
                function(error,result){
                    if(error) throw error;
                    response.writeHead(302,{Location:'/author'});
                    response.end();
        })
    });
}

exports.delete_process = function(request,response){
    var body = '';
    request.on('data',function(data){
        body += data;
    });
    request.on('end',function(){
        var post = qs.parse(body);
        db.query(`DELETE FROM topic WHERE author_id=?`,[post.id],function(error,result){
            if(error) throw error;
            db.query(`DELETE FROM author WHERE id =?`,[post.id],function(error2,result){
                if(error2) throw error2;
                response.writeHead(302,{Location:'/author'});
                response.end();
            });
        });
    });
}
