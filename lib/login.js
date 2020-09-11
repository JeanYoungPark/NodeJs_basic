var template = require('./template');
var qs = require('querystring');
var db = require('./db');

exports.login = function(request,response){
    var html = template.html('login','',
    `
    <form action="/login_process" method="post">
        <p><input type="text" name="email" placeholder="email"></p>
        <p><input type="password" name="password" placeholder="password"></p>
        <p><input type="submit"></p>
    </form>
    `,'');
    response.writeHead(200);
    response.end(html);
}

exports.login_process = function(request,response){
    var body = '';
    request.on('data',function(data){
        body += data;
    });
    
    request.on('end',function(){
        var post = qs.parse(body);
        db.query(`SELECT * FROM login WHERE email = ? AND password=?`,[post.email,post.password],function(error,result){
            if(error) throw error;
            if(result.length === 0) {
                response.writeHead(302,{Location:`/login`});
            }else {
                response.writeHead(302,{
                    'Set-Cookie': [
                        `email=${post.email}`,
                        `password=${post.password}`
                    ],
                    Location:`/`
                });
            }
            response.end();
        });
    });
}