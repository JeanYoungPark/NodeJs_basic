var template = require('./template');

exports.login = function(request,response){
    var html = template.html('login','',
    `
    <form action="login_process" method="post">
        <p><input type="text" name="email" placeholder="email"></p>
        <p><input type="password" name="password" placeholder="password"></p>
        <p><input type="submit"></p>
    </form>
    `,'');
    response.writeHead(200);
    response.end(html);
}

exports.login_process = function(request,response){
}