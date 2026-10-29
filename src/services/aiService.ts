import { GoogleGenAI } from '@google/genai';
import { Product } from '../types';

let aiClient: GoogleGenAI | null = null;

function getAiClient(): GoogleGenAI | null {
  if (aiClient) return aiClient;
  // @ts-ignore
  const apiKey = import.meta.env.VITE_GEMINI_API_KEY || (typeof process !== 'undefined' ? process.env?.GEMINI_API_KEY : '');
  if (apiKey) {
    try {
      aiClient = new GoogleGenAI({ apiKey });
      return aiClient;
    } catch {
      return null;
    }
  }
  return null;
}

export async function generateProductDescription(
  title: string,
  keywords: string,
  tone: string = 'persuasive'
): Promise<string> {
  const client = getAiClient();

  if (client) {
    try {
      const response = await client.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: `Act as a master e-commerce copywriter for an online store in Bangladesh.
Write a captivating, high-converting, SEO-optimized Bengali product description.
Product Title: ${title}
Keywords: ${keywords || 'premium quality, durable, stylish, fast delivery, best price in Bangladesh'}
Tone: ${tone}

Include:
- Catchy Bengali Headline
- 2 short engaging paragraphs highlighting the benefits, comfort, and fabric/build quality
- 4 bullet points of specifications/features (উপাদান ও বৈশিষ্ট্য)
- A compelling Call to Action (যেমন: আজই অর্ডার করুন, স্টক সীমিত!)`,
      });

      if (response.text) {
        return response.text;
      }
    } catch (err) {
      console.warn('Gemini API call warning, using fallback copy generator:', err);
    }
  }

  // Fallback high-fidelity copy generator tailored to parameters
  return `প্রিমিয়াম কোয়ালিটির "${title}" - আপনার দৈনন্দিন লাইফস্টাইলে সেরা অভিজ্ঞতা!

"${title}" আধুনিক ফ্যাশন ও কমফোর্টের এক অনন্য সমন্বয়। সেরা মানের কাঁচামাল ও নিখুঁত ফিনিশিং দিয়ে তৈরি হওয়ায় এটি দীর্ঘস্থায়ী এবং সারাদিন ব্যবহারে সর্বোচ্চ স্বাচ্ছন্দ্য প্রদান করে। বিশেষ করে যারা প্রিমিয়াম লুক এবং ট্রেন্ডি স্টাইল খুঁজছেন, তাদের জন্য এটি শতভাগ উপযুক্ত।

🔥 কেন এই পণ্যটি বেছে নেবেন?
• এক্সক্লুসিভ ডিজাইন ও টেকসই দীর্ঘস্থায়ী ফিনিশিং
• ১০০% অরিজিনাল ও সেরা কালার গ্যারান্টি
• সারা দেশে ক্যাশ অন ডেলিভারি (হোম ডেলিভারি) সুবিধা
• সহজে মানানসই এবং যেকোনো অনুষ্ঠানে ব্যবহারের উপযোগী (${keywords || 'স্টাইলিশ ও আরামদায়ক'})

⚡ সীমিত সময়ের জন্য বিশেষ ডিসকাউন্ট অফার চলছে! আপনার পছন্দের সাইজ স্টক শেষ হওয়ার আগেই এখনই অর্ডার কনফার্ম করুন।`;
}

export function simulateMessengerResponse(
  message: string,
  products: Product[],
  storeSubdomain: string = 'rahimfashion'
): { text: string; matchedProduct?: Product } {
  const cleanMsg = message.toLowerCase().trim();

  // Find if customer is asking about a specific product
  const matched = products.find((p) =>
    cleanMsg.includes(p.title.toLowerCase()) ||
    cleanMsg.includes(p.category.toLowerCase()) ||
    (cleanMsg.includes('tshirt') && p.title.toLowerCase().includes('t-shirt')) ||
    (cleanMsg.includes('jacket') && p.title.toLowerCase().includes('jacket')) ||
    (cleanMsg.includes('shoe') && p.title.toLowerCase().includes('sneakers')) ||
    (cleanMsg.includes('bag') && p.title.toLowerCase().includes('backpack'))
  );

  if (matched) {
    if (matched.stock > 0) {
      return {
        text: `হ্যাঁ! আমাদের "${matched.title}" স্টকে এভেইলএবল রয়েছে (মূল্য: ৳${matched.price.toLocaleString()}, স্টক: ${matched.stock} টি)। আপনি চাইলে এখনই সরাসরি অর্ডার করতে পারেন।`,
        matchedProduct: matched,
      };
    } else {
      return {
        text: `দুঃখিত! "${matched.title}" বর্তমানে স্টক আউট আছে। খুব শীঘ্রই পুনরায় রিস্টক করা হবে।`,
        matchedProduct: matched,
      };
    }
  }

  if (
    cleanMsg.includes('delivery') ||
    cleanMsg.includes('ডেলিভারি') ||
    cleanMsg.includes('কত দিন')
  ) {
    return {
      text: 'ঢাকা সিটির ভেতরে ২৪ থেকে ৪৮ ঘণ্টার মধ্যে এবং ঢাকার বাইরে ৩ থেকে ৪ দিনের মধ্যে Steadfast Courier এর মাধ্যমে হোম ডেলিভারি করা হয়। ক্যাশ অন ডেলিভারি সুবিধা রয়েছে!',
    };
  }

  if (
    cleanMsg.includes('price') ||
    cleanMsg.includes('দাম') ||
    cleanMsg.includes('cost')
  ) {
    return {
      text: `আমাদের স্টোরের সকল প্রোডাক্টের দাম ও স্টক দেখতে অনুগ্রহ করে আমাদের লাইভ শপ ভিজিট করুন: https://${storeSubdomain}.sakibai.app`,
    };
  }

  if (
    cleanMsg.includes('order') ||
    cleanMsg.includes('অর্ডার') ||
    cleanMsg.includes('buy')
  ) {
    return {
      text: `অর্ডার করতে আপনার নাম, মোবাইল নম্বর এবং সম্পূর্ণ ঠিকানা আমাদের শপ লিংকে গিয়ে ফর্ম পূরণ করুন: https://${storeSubdomain}.sakibai.app/checkout`,
    };
  }

  if (cleanMsg.includes('hello') || cleanMsg.includes('hi') || cleanMsg.includes('সালাম') || cleanMsg.includes('hey')) {
    return {
      text: 'হ্যালো! Rahim Fashion এ আপনাকে স্বাগতম। আমি আপনার এআই শপিং অ্যাসিস্ট্যান্ট। কোনো প্রোডাক্টের স্টক জানতে বা অর্ডার করতে আমাকে জানান!',
    };
  }

  return {
    text: `ধন্যবাদ আপনার মেসেজের জন্য। আমাদের ট্রেন্ডি কালেকশন দেখতে এবং বিশেষ ডিসকাউন্টে অর্ডার করতে ভিজিট করুন: https://${storeSubdomain}.sakibai.app`,
  };
}

export function calculateFraudScore(phone: string, address: string): { score: number; risk: 'Low' | 'Medium' | 'High'; reasons: string[] } {
  let score = 5;
  const reasons: string[] = [];

  const cleanPhone = phone.replace(/[^0-9]/g, '');
  if (!cleanPhone.startsWith('01') || cleanPhone.length !== 11) {
    score += 45;
    reasons.push('Invalid BD Phone format (must start with 01 and have 11 digits)');
  } else {
    reasons.push('Valid Bangladeshi 11-digit mobile prefix');
  }

  if (address.trim().length < 8) {
    score += 35;
    reasons.push('Address is suspiciously short (lacks road/house/thana detail)');
  }

  if (score > 60) return { score, risk: 'High', reasons };
  if (score > 30) return { score, risk: 'Medium', reasons };
  return { score, risk: 'Low', reasons };
}
