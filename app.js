// modules
const http = require('http');
const fs = require('fs');
const path = require('path');
const mysql = require('mysql');
// config
const config = require('./config_db');
// functions
const getEvent = require('./modules/getEvents.js');
const correctDate = require('./modules/correctDate.js');
const getContentType = require('./modules/getContentType.js');

// create DB connection
const conn = mysql.createConnection(config);

// open DB connection
conn.connect(err => {
    if(err){
        console.log(err)
        return err
    }
    else {
        console.log('database - OK')
    }
})

//start server
http.createServer( (request, response) => {

    // root
    if(request.url === '/'){
        sendRes('index.html', 'text/html', response);
    }

    /* API cases */

    // Get event list
    else if (request.url === '/api'){
        if (request.method === 'GET') {
            getEvent().then(function(result) {
                response.end(JSON.stringify(result))
            });
        }

        // Add new event
        else if (request.method === 'POST') {
            let body = '';
            request.on('data', chunk => {
                body += chunk.toString();
            });
            request.on('end', ()=>{
                let bodyObj = JSON.parse(body);

                let queryString = "INSERT INTO `events` (`id`, `name`, `descr`, `place`, `date`, `category`) VALUES (NULL, '" + bodyObj.eventName + "', '" + bodyObj.eventDescr + "', '" + bodyObj.eventLocation + "', '" + correctDate(bodyObj.eventDate, bodyObj.eventTime) + "', '" + bodyObj.eventType +"')";
                conn.query(queryString, (err, res) => {
                    if (err) {
                        console.log(err)
                    }
                    else {
                        response.statusMessage = 'Successfully added';
                        response.writeHead(200, {
                            Location: `/`
                        }).end();
                    }
                })
            })
        }

        // Edit event
        else if (request.method === 'PUT') {
            let body = '';
            request.on('data', chunk => {
                body += chunk.toString();
            });
            console.log(body);
            request.on('end', ()=>{
                let bodyObj = JSON.parse(body);

                let dateToSql = bodyObj.eventDateTime.replace(/\//g, "-").replace("T", " ") + ":00";
                let queryString = "UPDATE `events` SET `name` = '" + bodyObj.eventName + "', `descr` = '" + bodyObj.eventDescr + "', `place` = '" + bodyObj.eventLocation + "', `date` = '" + dateToSql + "', `category` = '" + bodyObj.eventType + "' WHERE id = " + bodyObj.eventId;
                conn.query(queryString, (err, res) => {
                    if (err) {
                        console.log(err)
                    }
                    else {
                        response.statusMessage = 'Successfully changed';
                        response.writeHead(200, {
                            Location: `/`
                        }).end();
                    }
                })
            })
        }

        // Delete event
        else if (request.method === 'DELETE') {
            let body = '';
            request.on('data', chunk => {
                body += chunk.toString();
            });
            request.on('end', ()=>{
                let bodyObj = JSON.parse(body);
                let queryString = "DELETE FROM `events` WHERE id = " + bodyObj;
                conn.query(queryString, (err, res) => {
                    if (err) {
                        console.log(err)
                    }
                    else {
                        response.statusMessage = 'Successfully changed';
                        response.writeHead(200, {
                            Location: `/`
                        }).end();
                    }
                })
            })
        }
    }

    // static files
    else {
        sendRes(request.url, getContentType(request.url), response)
    };

}).listen(3000, () => {
    console.log('server start at port 3000')
})

// send resourse
function sendRes(url, contentType, res){
    let file = path.join(__dirname+'/'+url);
    fs.readFile(file, (err, content) => {
        if (err) {
            res.writeHead('404');
            res.write('file not found');
            res.end();
            console.log(`error ${file}`);
        }
        else {
            res.writeHead(200, {'Content-Type': contentType});
            res.write(content);
            res.end();
        }
    })
}
