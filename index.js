const express = require("express")
const admin = require("firebase-admin");
const { getMessaging } = require("firebase-admin/messaging");

//REPLACE WITH YOUR SERVICE ACCOUNT FILE
//https://console.firebase.google.com/u/0/project/biashara-hub/settings/serviceaccounts/adminsdk
const serviceAccount = require("./biashara-hub-firebase-adminsdk-dzc1j-322f5ec073.json")

const app = express()
const port = 5000

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "************************",
});

app.get("/", async (req, res) => {
    const registrationToken = "*********************";

    const message = {
      data: {
        title: "title",
        body: "body",
      },
      token: registrationToken,
    };

    // Send a message to the device corresponding to the provided
    // registration token.
    const response = await getMessaging()
      .send(message)
      .then((response) => {
        // Response is a message ID string.
        return response
      })
      .catch((error) => {
        return error
      });
    res.send(response);
})

app.listen(port, ()=> console.log("Running server on port: " + port))