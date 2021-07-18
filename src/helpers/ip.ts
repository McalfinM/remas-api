import https from 'https'
let ipaddr = ''
var callback = function (err: any, ip: string) {
    if (err) {
        return console.log(err);
    }
    return ipaddr = ip
    // do something here with the IP address
};

https.get({
    host: 'api.ipify.org',
}, function (response: any) {
    var ip = '';
    response.on('data', function (d: any) {
        ip += d;
    });
    response.on('end', function () {
        if (ip) {
            callback(null, ip);
        } else {
            callback('could not get public ip address :(', 'thanks');
        }
    });
});

export { ipaddr }