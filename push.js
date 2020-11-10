const webPush = require('web-push');

const vapidKeys = {
  "publicKey":"BB6j788IBQa222OIF3e3P6sUUIIxlmSPBY8rwRAmRe9SmsHOmAmyP_CuDAzp6HHtvP9bqj2IIIZgODmK5D09D5Y","privateKey":"hk-DC4Vybm31WdDFI5uS0U7RTL_NGttVOZTlzpLGr7E"
};

webPush.setVapidDetails(
  'mailto:mujahidislami030@gmail.com',
  vapidKeys.publicKey,
  vapidKeys.privateKey
)

let pushSubscription = {
  'endpoint': "https://fcm.googleapis.com/fcm/send/cNhKLXte2Ho:APA91bEzxJostKa9c-IUK4BaGysXVJZIxdKneB14yF2o7rswTt5cwjpsPM8GxJbviyXTjTxn9N6bBsJUlKOlh1mfKjozXwwCZfosBUP7bBmVZM0paDF1Cd4JEVFgR1Wz7DYuYRI-uVVJ",
  'keys': {
    'p256dh': 'BH7Fkrfq0b0TrtiV+spE7ay1vKfKDGPdI25fVHLrCrFLcKR/S8clusaZYi4PJHRxcofL9qWpM/zFsfAV6VkewS0=',
    'auth': 'gcquJcUJ2DUz53XYNZAt4A=='
  }
}

let payload = 'Terima kasih sudah subscribe layanan kami';
let options = {
  gcmAPIKey: "475629322457",
  TTL: 60
}

webPush.sendNotification(
  pushSubscription,
  payload,
  options
)