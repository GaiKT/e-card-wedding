"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

type Language = "th" | "en";

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const translations = {
  en: {
    // Hero Section
    "hero.saveTheDate": "Save The Date",
    "hero.weAreGetting": "We're Getting",
    "hero.married": "Married!",
    "hero.names": "Natthapong & Natthapon",
    "hero.date": "Tuesday, 19th November 2025",
    "hero.time": "07:09 AM",
    "hero.description":
      "Join us as we celebrate the beginning of our forever journey. Your presence would make our special day even more magical.",
    "hero.viewInvitation": "View Invitation",
    "hero.rsvp": "RSVP",
    "hero.exploreStory": "Explore Our Story",

    // Navigation
    "nav.home": "Home",
    "nav.countdown": "Countdown",
    "nav.plan": "Wedding Plan",
    "nav.story": "Our Story",
    "nav.invitation": "Invitation",
    "nav.location": "Location",
    "nav.gallery": "Gallery",
    "nav.blessings": "Blessings",

    // Countdown Section
    "countdown.title": "Counting Down",
    "countdown.description":
      "Every moment brings us closer to our special day. Join us as we count down to forever.",
    "countdown.days": "Days",
    "countdown.hours": "Hours",
    "countdown.minutes": "Minutes",
    "countdown.seconds": "Seconds",
    "countdown.saveTheDate": "Save the Date",
    "countdown.addToCalendar": "Add to Calendar",
    "countdown.setReminder": "Set Reminder",
    "countdown.married": "We're Married!",
    "countdown.justMarried": "Just Married!",
    "countdown.thankYou":
      "Thank you for being part of our magical day. Our forever journey has begun!",

    // Wedding Plan Section
    "plan.title": "Wedding Plan",
    "plan.description":
      "Spend a day filled with love, laughter, and unforgettable moments. Here's what we have planned for our special celebration.",
    "plan.guestArrival": "Guest Arrival & Welcome",
    "plan.guestArrivalDesc":
      "Check-in and welcome drinks as guests arrive and mingle.",
    "plan.buddha": "Buddhist Ceremony",
    "plan.buddhaDesc": "A traditional Buddhist ceremony for blessings.",
    "plan.prePhotosDesc":
      "Family and bridal party photos before the ceremony begins.",
    "plan.ceremony": "Procession & Wedding Ceremony",
    "plan.ceremonyDesc":
      "The sacred moment as Gai & Donut exchange vows and rings.",
    "plan.blessings": "Water Pouring Ceremony & Blessings from Elders",
    "plan.blessingsDesc":
      "A heartfelt moment for family and friends to offer their blessings.",
    "plan.congratulations": "Congratulations & Photos",
    "plan.congratulationsDesc":
      "Receive well-wishes and capture precious moments with loved ones.",
    "plan.lunch": "Wedding Lunch Reception",
    "plan.lunchDesc":
      "A delicious course meal with speeches from family and friends.",

    // Important Notes
    "plan.importantNotes": "Important Notes",
    "plan.dressCode": "Dress Code",
    "plan.dressCodeDesc":
      "Traditional Thai attire recommended. Men: Light colors (cream, beige, light blue). Women: Traditional Thai dress or elegant long dress in soft colors (avoid black, dark colors).",
    "plan.unplugged": "Unplugged Ceremony",
    "plan.unpluggedDesc":
      "Please keep phones and cameras away during the ceremony to be fully present.",
    "plan.gifts": "Gifts",
    "plan.giftsDesc":
      "Your presence is our present! If you wish to give, monetary gifts are appreciated.",
    "plan.transportation": "Transportation",
    "plan.transportationDesc":
      "Parking is available at the venue. Please arrive 30 minutes early.",
    "plan.duration": "Duration",
    "plan.highlight": "Highlight",

    // Our Story Section
    "story.title": "Our Love Story",
    "story.description":
      "Every love story is beautiful, but ours is our favorite. Here's the journey that led us to this magical moment.",
    "story.firstMeet": "First Meeting",
    "story.firstMeetDate": "Winter 2016",
    "story.firstMeetDesc":
      "It was a beautiful winter day when we first met at a mutual friend's party. Our connection was instant, and we spent the entire evening talking and laughing together.",
    "story.feeling": "Feeling in Love",
    "story.feelingDate": "Every Day",
    "story.feelingDesc":
      "We share so many interests like gaming, watching anime, and singing. What used to be solo activities became so much more joyful with her in my life.",
    "story.firstDateDate": "Before Valentine's Day 2017",
    "story.firstDateDesc":
      "Our first date was a magical evening filled with laughter and connection. We explored the city together, sharing stories and dreams over a candlelit dinner.",
    "story.pet": "Pets",
    "story.petDate": "Summer 2018",
    "story.petDesc":
      "We both love pets very much, having rabbits, hamsters, and cats. They bring so much life to our home. We couldn't include pictures of all of them, but we love each one dearly (the cats in the picture are named 'Sunny and Mary' from the pirate ship in One Piece).",
    "story.bigtrip": "Our First Big Trip",
    "story.bigtripDate": "Rainy 2024",
    "story.bigtripDesc":
      "We are both introverts who enjoy spending time together in quiet places. This trip was a great opportunity to create new memories. We went to Koh Larn for 3 days and 2 nights, and it was a trip full of fun and adventure. It was a very good memory.",
    "story.proposal": "The Proposal",
    "story.proposalDate": "27th November 2024",
    "story.proposalDesc":
      "In a moment filled with love and anticipation, I proposed to my partner in our favorite spot, surrounded by the beauty of nature. It was a heartfelt moment that we will cherish forever.",
    "story.andNow": "And Now...",
    "story.nextChapter":
      "We're ready to start the next chapter of our story together. We can't wait to celebrate this special day with our beloved family and friends, and create memories that will last a lifetime.",
    "story.forever": "Forever & Always",

    // Invitation Section
    "invitation.title": "Our Invitation Card",
    "invitation.description":
      "We are honored to invite you to celebrate our special day. Please see the details of the invitation card below.",
    "invitation.saveDate": "Save the Date",
    "invitation.saveDateDesc":
      "We look forward to celebrating with you on this special day.",
    "invitation.date": "Wednesday, 19th November 2025",
    "invitation.time": "06:30 AM",

    // Wedding Location Section
    "location.title": "Wedding Location",
    "location.description": "Our wedding venue is...",
    "location.venue": "Venue",
    "location.name": "Nong Chang District Community Hall",
    "location.address": "123 Moo 5, Nong Chang, Uthai Thani 61110, Thailand",
    "location.time": "07:09 AM - 12:00 PM",
    "location.additionalInfo": "Parking available at the venue.",
    "location.transport": "Transportation",
    "location.transportDesc":
      "We'll provide shuttle service between the ceremony and reception venues for your convenience.",
    "location.parking": "Parking",
    "location.parkingDesc": "Parking is available at the venue.",
    "location.mapTitle": "Find Us Here",
    "location.mapDescription": "Explore the venue location on the map",
    "location.openInMaps": "Open in Maps",
    "location.getDirections": "Get Directions",
    "location.addToCalendar": "Add to Calendar",

    // Gallery Section
    "gallery.title": "Our Journey Together",
    "gallery.description":
      "A glimpse into our beautiful journey together. These moments captured the essence of our love and the excitement for our future.",
    "gallery.carousel": "Carousel",
    "gallery.grid": "Grid",
    "gallery.capturedMemories": "Captured Memories",
    "gallery.memoriesDesc":
      "Each photo tells a story of our love, our laughter, and our dreams for the future. We can't wait to create new memories with all of you on our special day.",
    "gallery.viewFull": "View Full Gallery",
    "gallery.download": "Download Photos",

    // Blessings Section
    "blessings.title": "Bless Us",
    "blessings.description":
      "Your love and support mean the world to us. Share your blessings, wishes, and warm messages as we embark on this beautiful journey together.",
    "blessings.sendTitle": "Send Your Blessings",
    "blessings.name": "Your Name",
    "blessings.namePlaceholder": "Enter your name",
    "blessings.email": "Email (Optional)",
    "blessings.emailPlaceholder": "Enter your email",
    "blessings.willAttend": "Will you attend?",
    "blessings.willAttendYes": "Yes, I'll be there!",
    "blessings.willAttendNo": "No, I can't make it.",
    "blessings.message": "Your Blessing",
    "blessings.messagePlaceholder":
      "Share your wishes, blessings, or a special message for the couple...",
    "blessings.send": "Send Blessing 💕",
    "blessings.thankYou": "Thank You!",
    "blessings.thankYouDesc":
      "Your kind words and blessings mean the world to us.",
    "blessings.showQRCode": "Send a gift to the couple 💕",
    "blessings.received":
      "Your beautiful blessing has been received with love.",
    "blessings.recent": "Recent Blessings",
    "blessings.viewAll": "View All Blessings",
    "blessings.presence": "Your Presence is Our Present",
    "blessings.presenceDesc":
      "Having you share in our special day is the greatest gift we could ask for. Your love, support, and blessings mean everything to us as we begin this new chapter together.",

    // Common
    "common.location": "Location",
    "common.duration": "Duration",
    "common.time": "Time",
  },
  th: {
    // Hero Section
    "hero.saveTheDate": "จดวันที่ไว้",
    "hero.weAreGetting": "เรากำลังจะ",
    "hero.married": "แต่งงาน!",
    "hero.names": "ณัฐพงษ์ & ณัฐพร",
    "hero.date": "วันอังคาร ที่ 19 พฤศจิกายน 2568",
    "hero.time": "07:09 น.",
    "hero.description":
      "ร่วมเฉลิมฉลองการเริ่มต้นเส้นทางแห่งความรักนิรันดร์ของเรา การมาร่วมงานของคุณจะทำให้วันพิเศษของเราแสนวิเศษยิ่งขึ้น",
    "hero.viewInvitation": "ดูการ์ดเชิญ",
    "hero.rsvp": "ยืนยันการเข้าร่วม",
    "hero.exploreStory": "ดูเรื่องราวของเรา",

    // Navigation
    "nav.home": "หน้าแรก",
    "nav.countdown": "นับถอยหลัง",
    "nav.plan": "กำหนดการงาน",
    "nav.story": "เรื่องราวของเรา",
    "nav.invitation": "การ์ดเชิญ",
    "nav.location": "สถานที่",
    "nav.gallery": "ภาพถ่าย",
    "nav.blessings": "อวยพร",

    // Countdown Section
    "countdown.title": "นับถอยหลัง",
    "countdown.description":
      "ทุกช่วงเวลาพาเราเข้าใกล้วันพิเศษมากขึ้น ร่วมนับถอยหลังไปสู่ความรักนิรันดร์กับเรา",
    "countdown.days": "วัน",
    "countdown.hours": "ชั่วโมง",
    "countdown.minutes": "นาที",
    "countdown.seconds": "วินาที",
    "countdown.saveTheDate": "จดวันที่ไว้",
    "countdown.addToCalendar": "เพิ่มลงปฏิทิน",
    "countdown.setReminder": "ตั้งการแจ้งเตือน",
    "countdown.married": "เราแต่งงานแล้ว!",
    "countdown.justMarried": "เพิ่งแต่งงาน!",
    "countdown.thankYou":
      "ขอบคุณที่มาร่วมงานในวันมหัศจรรย์ของเรา การเดินทางนิรันดร์ของเราได้เริ่มต้นขึ้นแล้ว!",

    // Wedding Plan Section
    "plan.title": "กำหนดการงานแต่งงาน",
    "plan.description":
      "ร่วมใช้เวลาในวันที่เต็มไปด้วยความรัก เสียงหัวเราะ และช่วงเวลาที่ไม่มีวันลืม นี่คือสิ่งที่เราเตรียมไว้สำหรับการเฉลิมฉลองพิเศษของเรา",
    "plan.guestArrival": "แขกมาถึง & ต้อนรับ",
    "plan.guestArrivalDesc":
      "ลงทะเบียนและเครื่องดื่มต้อนรับ ขณะที่แขกมาถึงและพบปะสังสรรค์",
    "plan.buddha": "พิธีสงฆ์",
    "plan.buddhaDesc": "พิธีสงฆ์เพื่อความเป็นสิริมงคลในวันแต่งงาน",
    "plan.prePhotosDesc":
      "ถ่ายภาพครอบครัวและเพื่อนเจ้าสาวเจ้าบ่าวก่อนพิธีเริ่มต้น",
    "plan.ceremony": "แห่ขันหมาก และพิธีแต่งงาน",
    "plan.ceremonyDesc":
      "ช่วงเวลาศักดิ์สิทธิ์ที่ไก่ & โดนัท แลกเปลี่ยนคำสาบานและแหวน",
    "plan.blessings": "รดน้ำสังข์ & รับพรจากญาติผู้ใหญ่",
    "plan.blessingsDesc":
      "รับพรจากญาติผู้ใหญ่และผู้มีเกียรติ เพื่อความเป็นสิริมงคล",
    "plan.congratulations": "แสดงความยินดี & ถ่ายภาพ",
    "plan.congratulationsDesc": "รับความยินดีและเก็บช่วงเวลาล้ำค่ากับคนที่รัก",
    "plan.lunch": "งานเลี้ยงอาหารกลางวัน",
    "plan.lunchDesc": "อาหารคอร์สแสนอร่อยพร้อมคำปราศรัยจากครอบครัวและเพื่อนฝูง",

    // Important Notes
    "plan.importantNotes": "ข้อปฏิบัติสำคัญ",
    "plan.dressCode": "การแต่งกาย",
    "plan.dressCodeDesc":
      "แนะนำการแต่งกายให้ปังปุริเย่ แต่อย่าลืมแต่งกายด้วยสีใกล้เคียงกับธีมของงานด้วยน้าา สีมีดังนี้:",
    "plan.transportation": "การเดินทาง",
    "plan.transportationDesc": "มีที่จอดรถที่สถานที่จัดงาน",

    // Our Story Section
    "story.title": "เรื่องราวความรักของเรา",
    "story.description":
      "เรื่องราวความรักทุกเรื่องล้วนสวยงาม แต่เรื่องของเราคือเรื่องโปรดของเรา นี่คือการเริ่มต้นเส้นทางของเราที่นำไปสู่ช่วงเวลาวิเศษนี้",
    "story.firstMeet": "การพบครั้งแรก",
    "story.firstMeetDate": "ฤดูหนาว 2016",
    "story.firstMeetDesc":
      "เราเจอกันครั้งแรกในเช้าวันเกิดของเธอ หลังจากที่เรารู้จักกันทาง Facebook ผมตั้งใจนำของขวัญวันเกิดไปให้เธอที่บ้าน และการเจอครั้งนั้นผมเขินมากๆ ทำให้ความสัมพันธ์ของเราดีขึ้นเรื่อยๆ จนกลายเป็นความรักในที่สุด",
    "story.feeling": "ความรู้สึกรัก",
    "story.feelingDate": "ตลอดเวลา",
    "story.feelingDesc":
      "เราชอบอะไรคล้ายๆกัน เล่นเกม ดูการ์ตูน ร้องเพลง จากที่เคยทำคนเดียว พอมีเธอเข้ามาในชีวิตก็ทำให้มีความสุขมากขึ้นไปอีกมากๆ",
    "story.firstDate": "เดทครั้งแรก",
    "story.firstDateDate": "ก่อนวันวาเลนไทน์ 2017",
    "story.firstDateDesc":
      "เดทอย่างเป็นทางการครั้งแรกของเราคือร้านคาเฟ่ชื่อ 'ร้านนั่งเล่น' เราใช้เวลาทั้งวันคุยกัน หัวเราะ และแบ่งปันความฝัน ถึงปัจจุบันร้านนี้จะปิดทำการไปแล้ว แต่ความทรงจำของเรายังคงอยู่ครบ",
    "story.pet": "สัตว์เลี้ยงของเรา",
    "story.petDate": "ฤดูร้อน 2018",
    "story.petDesc":
      "เราสองคนชอบเลี้ยงสัตว์เลี้ยงมากๆ มีทั้ง กระต่าย หนู และแมว พวกมันทำให้บ้านของเรามีชีวิตชีวามากขึ้น เอารูปทุกตัวมาใส่ไม่ได้ทั้งหมด แต่เราก็รักพวกมันทุกตัว (แมวในรูปชื่อว่า 'ซันนี่ และ แมรี่' มาจากเรือของกลุ่มโจรสลัด วันพีช)",
    "story.bigtrip": "การเที่ยวใหญ่ครั้งแรกของเรา",
    "story.bigtripDate": "ฤดูฝน 2024",
    "story.bigtripDesc":
      "เราสองคนเป็น introvert ที่ชอบใช้เวลาร่วมกันในที่เงียบสงบ การเดินทางครั้งนี้จึงเป็นโอกาสที่ดีในการสร้างความทรงจำใหม่ๆ เราไปเที่ยวที่เกาะล้านกัน 3 วัน 2 คืน เป็นทริปที่เต็มไปด้วยความสนุกสนานและการผจญภัย เป็นความทรงจำที่ดีมากๆ",
    "story.proposal": "การขอแต่งงาน",
    "story.proposalDate": "27 พฤศจิกายน 2024",
    "story.proposalDesc":
      "หลังจากที่เราคบกันมาได้ 9 ปี เราปรับปรุงความสัมพันธ์มาโดยตลอด จนในที่สุดผมก็ได้ขอเธอแต่งงานที่บ้านของเธอ มีการเซอร์ไพรส์เล็กๆ น้อยๆ ตามสไตล์ introvert แบบเรา และเธอก็ตอบตกลงด้วยความสุขใจ",
    "story.andNow": "และตอนนี้...",
    "story.nextChapter":
      "เราพร้อมที่จะเริ่มต้นบทใหม่ของเรื่องราวร่วมกัน เราแทบรอไม่ไหวที่จะเฉลิมฉลองวันพิเศษนี้กับครอบครัวและเพื่อนที่รัก และสร้างความทรงจำที่จะคงอยู่ตลอดชีวิต",
    "story.forever": "ตลอดไป & เสมอ",

    // invitation Card Section
    "invitation.title": "การ์ดเชิญงานแต่งงาน",
    "invitation.description":
      "เรารู้สึกเป็นเกียรติอย่างยิ่งที่ได้เชิญคุณมาร่วมงานเลี้ยงเฉลิมฉลองวันพิเศษในชีวิตของเรา กรุณาดูรายละเอียดการ์ดเชิญด้านล่างนี้",
    "invitation.saveDate": "จดวันที่ไว้",
    "invitation.saveDateDesc":
      "เราตั้งตารอที่จะได้เฉลิมฉลองกับคุณในวันพิเศษนี้",
    "invitation.date": "วันพุธ ที่ 19 พฤศจิกายน 2568",
    "invitation.time": "06:30 น.",

    // wedding location Section
    "location.title": "สถานที่จัดงานแต่งงาน",
    "location.description": "สถานที่จัดงานแต่งงานของเราคือ...",
    "location.venue": "สถานที่",
    "location.name": "ศาลาประชาคมอำเภอหนองฉาง",
    "location.time": "06:30 น.",
    "location.address":
      "หมู่ 5, อาคารที่ว่าการอำเภอหนองฉาง, ตำบลหนองฉาง อำเภอหนองฉาง จังหวัดอุทัยธานี, 61110",
    "location.additionalInfo": "การเดินทาง & ที่จอดรถ",
    "location.parking": "ที่จอดรถ",
    "location.parkingDesc": "มีที่จอดรถเพียงพอที่ศาลาประชาคมอำเภอหนองฉาง",
    "location.transport": "รถประจำทาง",
    "location.transportDesc":
      "มีรถประจำทางผ่านอำเภอหนองฉาง สามารถนั่งรถสองแถวสีแดงจากบขส. อุทัยธานี มาลงที่อำเภอหนองฉางได้",
    "location.mapTitle": "ค้นหาเราที่นี่",
    "location.mapDescription": "สำรวจตำแหน่งสถานที่งานบนแผนที่",
    "location.openInMaps": "เปิดในแผนที่",
    "location.getDirections": "เส้นทาง",
    "location.addToCalendar": "เพิ่มในปฏิทิน",

    // Gallery Section
    "gallery.title": "การเดินทางร่วมกันของเรา",
    "gallery.description":
      "เหลียวมองการเดินทางอันสวยงามร่วมกันของเรา ในช่วงเวลาเหล่านี้จับภาพแก่นแท้ของความรักและความตื่นเต้นสำหรับอนาคตของเรา",
    "gallery.carousel": "สไลด์โชว์",
    "gallery.grid": "ตาราง",
    "gallery.capturedMemories": "ความทรงจำที่เก็บไว้",
    "gallery.memoriesDesc":
      "ภาพแต่ละภาพเล่าเรื่องราวความรัก เสียงหัวเราะ และความฝันของเราสำหรับอนาคต เราแทบรอไม่ไหวที่จะสร้างความทรงจำใหม่กับทุกคนในวันพิเศษของเรา",
    "gallery.viewFull": "ดูแกลเลอรี่ทั้งหมด",
    "gallery.download": "ดาวน์โหลดภาพถ่าย",

    // Blessings Section
    "blessings.title": "อวยพรเรา",
    "blessings.description":
      "ความรักและการสนับสนุนของคุณมีความหมายกับเรามาก เชิญมาร่วมแบ่งปันคำอวยพร ความปรารถนาดี และข้อความอบอุ่นขณะที่เราเริ่มต้นเส้นทางสวยงามนี้ร่วมกัน",
    "blessings.sendTitle": "ส่งคำอวยพรของคุณ",
    "blessings.name": "ชื่อของคุณ",
    "blessings.namePlaceholder": "กรอกชื่อของคุณ",
    "blessings.email": "อีเมล (ไม่บังคับ)",
    "blessings.emailPlaceholder": "กรอกอีเมลของคุณ (ไม่บังคับ)",
    "blessings.willAttend": "จะมาร่วมงานไหมคะ?",
    "blessings.willAttendYes": "จะมาแน่นอน!",
    "blessings.willAttendNo": "ไม่สามารถมาได้",
    "blessings.message": "คำอวยพรของคุณ",
    "blessings.messagePlaceholder":
      "แบ่งปันความปรารถนาดี คำอวยพร หรือข้อความพิเศษสำหรับคู่บ่าวสาว...",
    "blessings.send": "ส่งคำอวยพร 💕",
    "blessings.thankYou": "ขอบคุณ!",
    "blessings.thankYouDesc": "คำอวยพรของคุณมีความหมายกับเรามาก",
    "blessings.received": "คำอวยพรอันสวยงามของคุณได้รับด้วยความรักแล้ว",
    "blessings.showQRCode": "มอบของขวัญให้บ่าวสาว 💕",
    "blessings.recent": "คำอวยพรล่าสุด",
    "blessings.viewAll": "ดูคำอวยพรทั้งหมด",
    "blessings.presence": "การมาร่วมงานของคุณคือของขวัญของเรา",
    "blessings.presenceDesc":
      "การที่คุณมาร่วมงานในวันพิเศษของเราคือของขวัญที่ดีที่สุดที่เราขอได้ ความรัก การสนับสนุน และคำอวยพรของคุณมีความหมายทุกอย่างกับเราขณะที่เรากำลังเริ่มต้นบทใหม่นี้ร่วมกัน",

    // Common
    "common.location": "สถานที่",
    "common.duration": "ระยะเวลา",
    "common.time": "เวลา",
  },
};

const LanguageContext = createContext<LanguageContextType | undefined>(
  undefined
);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [language, setLanguage] = useState<Language>("en");

  useEffect(() => {
    const savedLanguage = localStorage.getItem("wedding-language") as Language;
    if (savedLanguage && ["th", "en"].includes(savedLanguage)) {
      setLanguage(savedLanguage);
    }
  }, []);

  const handleSetLanguage = (lang: Language) => {
    setLanguage(lang);
    localStorage.setItem("wedding-language", lang);
  };

  const t = (key: string): string => {
    return (translations[language] as Record<string, string>)[key] || key;
  };

  return (
    <LanguageContext.Provider
      value={{ language, setLanguage: handleSetLanguage, t }}
    >
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
};
