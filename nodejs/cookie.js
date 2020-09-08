var http = require('http');
var cookie = require('cookie');

http.createServer(function(request,response){
    var cookies = {};
    if(request.headers.cookie != undefined) {
        cookies = cookie.parse(request.headers.cookie);
    }

    response.writeHead(200,{
        'Set-Cookie': [
            'yummy_cookie=choco', 'testy_cookie=strawberry',
            `Permanent-cookies;Max-Age=${60*60*24*30}`,
            'Secure=Secure;Secure', //https일경우만 전송
            'HttpOnly:HttpOnly;HttpOnly', //http(s)에서만 표기
            'Path=Path;Path=/Path', //원하는 주소에서만 보여주고 싶을 때
            'Domain=Domain;Domain=o2.org' //앞에 쩜이 생략되어있는데 이 뜻은 test.o2.org와 같은 서브도메인에서도 사용 가능하다는 의미
        ]
    });
    
    response.end('Cookie!!');
}).listen(3000);