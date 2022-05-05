const nodemailer = require("nodemailer")
var http = require('http');
var server = require("http");
var qs = require('querystring');
const { initializeApp, applicationDefault, cert } = require('firebase-admin/app');
const { getFirestore, Timestamp, FieldValue } = require('firebase-admin/firestore');
async function initializeAppWithProjectId() {
  const admin = require('firebase-admin');

  initializeApp({
    projectId: 'feedreview',
  });
  const db = getFirestore();
  return db;
}
const admin = require("firebase-admin")
var serviceAccount = require("./feedreview-firebase-adminsdk-z95xk-f3dd72dd58.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});
var formOutput = '<html><head>'
  + "<meta name='viewport' content='width=device-width, initial-scale=1.0> <title>FeedReview Registration</title></head><body>"
  + '<h1>FeedReview Registration</h1>'
  + '<p>Dear User, We have sent you an email to your email Address to complete the registration for FeedReview. Kindly Open any E-Mail application and check for email send by the WebArtino Support team.</p>'
  + '</body></html>';
var serverPort = 80;
http.createServer(function (request, response) {
  if(request.method === "GET") {
    if (request.url === "/favicon.ico") {
      response.writeHead(404, {'Content-Type': 'text/html'});
      response.write(
          '<!doctype html><html><head><meta name="viewport" content="width=device-width, initial-scale=1.0"<title>404</title></head><body><p style="font-weight:bold; margin-left:8px;">The file requested was not found on FeedReview\'s server. </p></body></html>'
          );
      response.end();
    } else {
      response.writeHead(200, {'Content-Type': 'text/html'});
      response.end("Unknown Method!");
    }
  } else if(request.method === "POST") {
    if (request.url === "/register") {
      var requestBody = '';
      request.on('data', function(data) {
        requestBody += data;
        if(requestBody.length > 1e7) {
          response.writeHead(413, 'Request Entity Too Large', {'Content-Type': 'text/html'});
          response.end('<!doctype html><html><head><title>413</title></head><body>413: Request Entity Too Large</body></html>');
        }
      });
      request.on('end', function() {
        var formData = qs.parse(requestBody);
        response.writeHead(200, {'Content-Type': 'text/html'});
        const registerHTML = '<!doctype html><html><head><meta name="viewport" content="width=device-width, initial-scale=1.0"><title>FeedReview New Consumer</title></head><body><p style="font-weight:bold; margin-left:8px;">We have sent you an email. Please check your mail box and fill details accordingly. For more help, please visit <a href="https://feedreview.web.app/support">visit FeedReview support panel.</a> </p></body></html>'
        response.end(registerHTML)
        const transporter = nodemailer.createTransport({
            host: 'smtp.elasticemail.com',
            port: 2525,
            auth: {
                user: 'namishkumar000@gmail.com',
                pass: '24AC463999FEF638DDFE874FE184F1976ABA'
            }
        });
        
        // send email
        transporter.sendMail({
            from: 'support@mail.webartino.xyz',
            to: String(formData.consumerEmailAddress),
            subject: 'Complete FeedReview Registration',
            html: '<div style="font-size:18px; font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;">Dear ' + formData.consumerName + ', Welcome to FeedReview! Let\'s complete the registration for FeedReview. Please complete the details below:-</div>'
            + '<form style="font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;  border-color: #d4d4d4;  border-style:solid; border-width: 1px; width: 100%;" method="post" action="http://localhost/mailregister" id="newConsumerForm">'
            + '<div style="margin-left: 8px; margin-right: 8px;">'
            + '<div>'
            + '<label for="consumerUserName" style="font-size:18px;">Consumer Name (Business Name if a business):</label>'
            + '<br>'
            + ' <input id="consumerUserName" type="text" style="height:35px; margin-top:5px; width:375px; border-radius:0px; border-color: rgb(210, 210, 210); border-style: solid; font-size:18px;" name="consumerUserName" value="' + formData.consumerName + '"required>'
            + '</div>'
            + '<div>'
            + ' <label for="consumerAddress" style="font-size:18px;">Consumer Address:</label> '
            + '<br>'
            + ' <input id="consumerAddress" type="text" style="height:35px; margin-top:5px; width:375px; border-radius:0px; border-color: rgb(210, 210, 210); border-style: solid; font-size:18px;" name="consumerAddress" required>'
            + '</div>'
            + '<div>'
            + ' <label for="consumerEmlAddress" style="font-size:18px;">Consumer Email Address:</label> '
            + '<br>'
            + ' <input id="consumeEmlAddress" type="text" style="height:35px; margin-top:5px; width:375px; border-radius:0px; border-color: rgb(210, 210, 210); border-style: solid; font-size:18px;" name="consumerEmlAddress" required>'
            + '</div>'
            + '<div>'
            + ' <label for="consumerPhoneNumber" style="font-size:18px;">Consumer Phone Number:</label> '
            + '<br>'
            + ' <input id="consumerPhoneNumber" type="tel" style="height:35px; margin-top:5px; width:375px; border-radius:0px; border-color: rgb(210, 210, 210); border-style: solid; font-size:18px;" name="consumerPhoneNumber" required>'
            + '</div>'
            + '<div>'
            + ' <label for="consumerKey" style="font-size:18px;">Consumer Key</label> '
            + '<br>'
            + ' <input id="consumerKey" type="password" style="height:35px; margin-top:5px; width:375px; border-radius:0px; border-color: rgb(210, 210, 210); border-style: solid; font-size:18px;" name="consumerKey" required>'
            + '</div>'
            + '<p style="font-size:16px; fon-weight:bold; color:red; font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;">Please note that the Consumer ID is auto-generated.</p>'
            + '<button type="submit" style="background-color:red; padding:10px; color:white; font-weight:bold; text-align:center; border-radius:5px; font-size:16.5px; width:375px; border:none; outline:none;" id="clickSubmit" style="margin-top: 18px;">Submit</button>'
        })
        //response.writeHead(200, 'OK', {'Content-Type': 'text/html'});
        //responce.write(formOutput);0
          
    });
    } else {
      if (request.url === "/mailregister") {
        var requestBody = '';
        request.on('data', function(data) {
          requestBody += data;
          if(requestBody.length > 1e7) {
            response.writeHead(413, 'Request Entity Too Large', {'Content-Type': 'text/html'});
            response.end('<!doctype html><html><head><title>413</title></head><body>413: Request Entity Too Large</body></html>');
          }
        });
        request.on('end', function() {
          var formData = qs.parse(requestBody);
          response.writeHead(200, {'Content-Type': 'text/html'});
          const consumerAddressFeed = formData.consumerAddress;
          const consumerNameFeed = formData.consumerUserName;
          const consumerPhoneNumberFeed = formData.consumerPhoneNumber;
          const consumerKeyFeed = formData.consumerKey;
          const suffixerKeyHub = Math.floor(Math.random() * 100000000000001);
          const FeedReviewID = consumerNameFeed + "#" + suffixerKeyHub;
          const consumerFeedEmailAddress = formData.consumerEmlAddress
          const database = getFirestore();
          const dataToPush = {
            businessEmailAddress: consumerFeedEmailAddress,
            businessAddress: consumerAddressFeed,
            businessName: consumerNameFeed,
            businessPhoneNumber: consumerPhoneNumberFeed,
            businessKey: consumerKeyFeed,
            businessID: FeedReviewID
          }
          const resFEELOSKEY = {
            [dataToPush.businessEmailAddress]: "Yes"
          }
          console.log()
          const resFeed = database.collection("consumers").doc(String(FeedReviewID)).set(dataToPush);
          const resFee = database.collection("exister").doc(dataToPush.businessEmailAddress).set(resFEELOSKEY);
          const transporter = nodemailer.createTransport({
            host: 'smtp.elasticemail.com',
            port: 2525,
            auth: {
                user: 'namishkumar000@gmail.com',
                pass: '24AC463999FEF638DDFE874FE184F1976ABA'
            }
        });
        transporter.sendMail({
          from: 'support@mail.webartino.xyz',
          to: dataToPush.businessEmailAddress,
          subject: 'Registration for FeedReview is complete',
          html: '<label style="font-size:18px; font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;">Dear ' + formData.consumerUserName + ', Your registration for FeedReview is complete. Please check the following details and keep it secure so that nobody steals it.</label>'
          + '<br>'
          +  '<label style="font-size:18px; font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif; font-weight:bold;">FeedReview ID:  ' + FeedReviewID + "</label>"
          + '<br>'
          + '<label style="font-size:18px; font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif; font-weight:bold;">FeedReview Key: ' + consumerKeyFeed + "</label>"
          + '<br>'
          + '<label style="font-size:18px; font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif; font-weight:bold;">Thank You, Team FeadReview</label>'
          + '<br>'
          + '<a href="https://127.0.0.1:5500/login.html>Click here to login</a>'
      })
        });
      }else{
        response.writeHead(404, 'Resource Not Found', {'Content-Type': 'text/html'});
        response.end('<!doctype html><html><head><title>404</title></head><body>404: Resource Not Found</body></html>');
      }
    }
  } else {
    response.writeHead(405, 'Method Not Supported', {'Content-Type': 'text/html'});
    return response.end('<!doctype html><html><head><title>405</title></head><body>405: Method Not Supported</body></html>');
  }
}).listen(serverPort);
console.log('Server has started at port: '+serverPort);