import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  let body: any = {};
  try {
    body = await req.json();
  } catch (e) {}

  const query = (body.query || "").toLowerCase();

  let answer = "";
  if (query.includes("wheat") || query.includes("गेहूँ") || query.includes("भाव")) {
    answer =
      "जयपुर मंडी में आज गेहूँ का ताजा भाव ₹2,275 प्रति क्विंटल है। आगामी 3-5 दिनों में भाव में 3.5% (लगभग ₹80) बढ़त का अनुमान है। सलाह: 3 दिन रुककर बेचें।";
  } else if (query.includes("rice") || query.includes("चावल") || query.includes("धान")) {
    answer =
      "आज धान / चावल का मंडी भाव ₹4,500 प्रति क्विंटल है। सरकारी एमएसपी ₹2,183 की तुलना में वर्तमान मंडी भाव काफी मजबूत है।";
  } else if (query.includes("mustard") || query.includes("सरसों")) {
    answer =
      "सरसों का मंडी भाव ₹5,650 प्रति क्विंटल है। तेल मिलों की मजबूत मांग से भाव स्थिर बने हुए हैं।";
  } else if (query.includes("msp") || query.includes("एमएसपी")) {
    answer =
      "वर्ष 2024-25/26 के लिए मुख्य फसलों के एमएसपी: गेहूँ ₹2,275/क्विंटल, धान ₹2,183/क्विंटल, सरसों ₹5,650/क्विंटal, चना ₹5,440/क्विंटल है।";
  } else {
    answer =
      "कृषि मित्र एआई के अनुसार: अपनी फसल के बेहतर दाम के लिए पास के मान्यता प्राप्त व्यापारियों से संपर्क करें और 5-दिवसीय भविष्यवाणी चार्ट का उपयोग करें।";
  }

  return NextResponse.json({
    query: body.query || "",
    answer,
    audio_enabled: true,
    timestamp: new Date().toISOString(),
  });
}
