const sendWhatsAppMessage = (transcription) => {
  const accountSid = "";
  const authToken = "";
  const client = require("twilio")(accountSid, authToken);

  client.messages
    .create({
      to: "whatsapp:", // WhatsApp number
      from: "whatsapp:", // Your Twilio WhatsApp number
      body: transcription, // Message text
    })
    .then((message) => console.log(message))
    .catch((error) => console.error(error));
};

// Call the function to send the WhatsApp message


module.exports = { sendWhatsAppMessage };
