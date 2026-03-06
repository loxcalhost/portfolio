import { NextRequest, NextResponse } from 'next/server'

// Simple rate limiting store (in production, use Redis or similar)
const submissions = new Map<string, number[]>()

function isRateLimited(ip: string, maxRequests = 5, windowMs = 3600000): boolean {
  const now = Date.now()
  const userSubmissions = submissions.get(ip) || []
  
  // Filter out old submissions
  const recentSubmissions = userSubmissions.filter(time => now - time < windowMs)
  
  if (recentSubmissions.length >= maxRequests) {
    return true
  }
  
  recentSubmissions.push(now)
  submissions.set(ip, recentSubmissions)
  
  return false
}

async function sendToTelegram(name: string, email: string, subject: string, message: string): Promise<boolean> {
  const botToken = process.env.TELEGRAM_BOT_TOKEN
  const chatId = process.env.TELEGRAM_CHAT_ID

  if (!botToken || !chatId) {
    console.warn('Telegram bot credentials not configured')
    return false
  }

  const text = `
<b>Name:</b> ${name}

<b>Email:</b> ${email}

<b>Subject:</b> ${subject}

<b>Message:</b>
${message}
  `.trim()

  try {
    const response = await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        chat_id: chatId,
        text: text,
        parse_mode: 'HTML',
      }),
    })

    if (!response.ok) {
      const error = await response.text()
      console.error('Telegram API error:', error)
      return false
    }

    return true
  } catch (error) {
    console.error('Error sending to Telegram:', error)
    return false
  }
}

export async function POST(request: NextRequest) {
  try {
    // Get IP for rate limiting
    const ip = request.headers.get('x-forwarded-for') || 
               request.headers.get('x-real-ip') || 
               'unknown'

    // Check rate limit
    if (isRateLimited(ip)) {
      return NextResponse.json(
        { error: 'Too many requests. Please try again later.' },
        { status: 429 }
      )
    }

    const { name, email, subject, message } = await request.json()

    // Validate inputs
    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        { error: 'All fields are required.' },
        { status: 400 }
      )
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email address.' },
        { status: 400 }
      )
    }

    // Check message length
    if (message.length > 5000) {
      return NextResponse.json(
        { error: 'Message is too long (max 5000 characters).' },
        { status: 400 }
      )
    }

    // Send to Telegram bot
    const sent = await sendToTelegram(name, email, subject, message)

    if (!sent) {
      console.warn('Failed to send message to Telegram, but request was valid')
    }

    return NextResponse.json(
      { success: true, message: 'Message received successfully.' },
      { status: 200 }
    )
  } catch (error) {
    console.error('Error processing contact form:', error)
    return NextResponse.json(
      { error: 'Failed to process request.' },
      { status: 500 }
    )
  }
}
