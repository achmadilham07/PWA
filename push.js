var webPush = require('web-push');
 
const vapidKeys = {
   "publicKey": "BLZEY4sAmZtKELE_dgC76ELBGrvmqCs-ZzG3yYTYiRXa-5Q5H3sZpHaCWp2gWqk2LlqjIXLBuEBUUPOFsexxkE8",
   "privateKey": "ei1ObXMOMZTMTrblziP5j2LNTbcMiFb93DLX8hYtKxs"
};
 
 
webPush.setVapidDetails(
   'mailto:achmadilham07@gmail.com',
   vapidKeys.publicKey,
   vapidKeys.privateKey
)
var pushSubscription = {
   "endpoint": "https://fcm.googleapis.com/fcm/send/cHXz8esq538:APA91bHEfTYbLV1YZpL8KYmP6zW4HN1Oik2dTn-ZNbbzKBEVjqRLpm8ZTYWfv1H9JQPA7IgtCoAiEzgtCZNZhQ5GjA5pOh1Yq_v9tSEJTZ0rPUYM67JvsDQ6it-KfPo79xhQPHdKDXaB",
   "keys": {
      "p256dh": "BIXmO/mZCrZZsVaoSXbv++n2cAutR4Ei/DJiZRKy/IJSA/9ZoyRKiXo0NfJat9DaCaN+KaFVoGKNmsgyz8i/CiU=",
      "auth": "Supt79jD1x5+JYI2OveGrw=="
   }
};
var payload = 'Welcome To Football PWA';
 
var options = {
   gcmAPIKey: '256531626146',
   TTL: 60
};

webPush.sendNotification(
   pushSubscription,
   payload,
   options
);