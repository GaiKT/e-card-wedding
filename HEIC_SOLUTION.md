# 🖼️ การแก้ปัญหาไฟล์ HEIC ใน Gallery

## ❌ **ปัญหาของไฟล์ .HEIC:**

- **ความเข้ากันได้**: เบราเซอร์บางตัว (โดยเฉพาะ Chrome/Firefox เก่า) ไม่รองรับ
- **Performance**: อาจโหลดช้าหรือไม่แสดงผลใน production
- **Mobile compatibility**: อาจมีปัญหาบนมือถือบางรุ่น

## ✅ **วิธีแก้ไข:**

### 1. **แปลงไฟล์ HEIC เป็น JPG**

#### บน **iPhone/Mac:**

1. เปิดแอป **Photos**
2. เลือกรูปที่ต้องการ
3. กด **Share** → **Export as JPEG**
4. บันทึกไฟล์ใหม่

#### บน **Windows:**

1. ดาวน์โหลด **HEIC to JPEG Converter** จาก Microsoft Store
2. หรือใช้เว็บไซต์ออนไลน์: https://convertio.co/heic-jpg/
3. อัปโหลดไฟล์ HEIC และดาวน์โหลดเป็น JPG

#### **เครื่องมือออนไลน์:**

- https://heic.online/
- https://convertio.co/heic-jpg/
- https://cloudconvert.com/heic-to-jpg

### 2. **ไฟล์ที่แนะนำ:**

#### **✅ รองรับดี:**

- `.JPG` / `.JPEG` - รองรับทุกเบราเซอร์
- `.PNG` - คุณภาพสูง, รองรับความโปร่งใส
- `.WEBP` - ขนาดเล็ก, เร็ว (เบราเซอร์ใหม่)

#### **❌ หลีกเลี่ยง:**

- `.HEIC` - ปัญหาความเข้ากันได้
- `.BMP` - ขนาดใหญ่เกินไป
- `.TIFF` - ไม่เหมาะสำหรับเว็บ

## 🔄 **Gallery ปัจจุบัน:**

**ใช้แล้ว (JPG เท่านั้น):**

- IMG_1026.JPG ✅
- IMG_1027.JPG ✅
- IMG_1028.JPG ✅
- IMG_1335.JPG ✅
- IMG_0882.JPG ✅

**พร้อมใช้ (รอการแปลง HEIC → JPG):**

- IMG_0929.HEIC → แปลงเป็น JPG
- IMG_0935.HEIC → แปลงเป็น JPG
- IMG_0983.HEIC → แปลงเป็น JPG
- IMG_1003.HEIC → แปลงเป็น JPG
- และอื่น ๆ...

## 📋 **ขั้นตอนการเพิ่มรูปใหม่:**

1. **แปลงไฟล์เป็น JPG** ก่อน
2. **ตั้งชื่อไฟล์** ให้ชัดเจน เช่น `wedding-photo-01.jpg`
3. **ใส่ในโฟลเดอร์** `/public/gallery/`
4. **เพิ่มใน code** ที่ `galleryImages` array:

```tsx
{
  id: 6,
  src: "/gallery/wedding-photo-06.jpg",
  alt: "Wedding Photo 6",
  caption: "Your Caption",
  description: "Your Description",
},
```

## 💡 **Tips:**

- **ขนาดไฟล์**: ควรอยู่ระหว่าง 200KB - 2MB
- **ความละเอียด**: 1920x1080 หรือ 1080x1920 เหมาะสำหรับเว็บ
- **คุณภาพ**: JPG quality 80-90% เพื่อสมดุลระหว่างคุณภาพและขนาด

ตอนนี้ Gallery ของคุณจะทำงานได้ดีบนทุกเบราเซอร์แล้วครับ! 🎉
