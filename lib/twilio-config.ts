// Twilio Configuration for SMS fallback
import twilio from "twilio"

const accountSid = process.env.TWILIO_ACCOUNT_SID
const authToken = process.env.TWILIO_AUTH_TOKEN
const phoneNumber = process.env.TWILIO_PHONE_NUMBER

export const twilioClient = twilio(accountSid, authToken)

export const sendSMS = async (to: string, message: string) => {
  try {
    const result = await twilioClient.messages.create({
      body: message,
      from: phoneNumber,
      to: to,
    })
    return result
  } catch (error) {
    console.error("SMS sending failed:", error)
    throw error
  }
}

// SMS templates for different scenarios
export const SMS_TEMPLATES = {
  appointment_reminder: (clinicName: string, date: string, time: string) =>
    `Pengingat: Janji temu Anda di ${clinicName} pada ${date} pukul ${time}. Info: healthconnect-jakarta.org`,

  medication_reminder: (medicationName: string) =>
    `Waktunya minum obat ${medicationName}. Jangan lupa untuk konsisten dengan jadwal pengobatan Anda.`,

  urgent_care: (clinicName: string, address: string) =>
    `Berdasarkan gejala Anda, segera kunjungi ${clinicName} di ${address} atau hubungi 119 untuk bantuan darurat.`,

  donation_thanks: (amount: number, impact: string) =>
    `Terima kasih atas donasi $${amount}! Dampak: ${impact}. Transparansi penuh di healthconnect-jakarta.org`,
}
