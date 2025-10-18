# Landing Page & Music Autoplay

## สิ่งที่เพิ่มเข้ามา:

### 1. Landing Page (หน้าต้อนรับ)

- หน้าจอต้อนรับที่สวยงามพร้อมปุ่ม "เข้าสู่เว็บไซต์"
- แสดงชื่อคู่บ่าวสาว วันที่งาน และเวลา
- มี animation ลูกโป่งหัวใจลอย
- Background แบบ blur สวยงาม

### 2. Music Autoplay

- เมื่อผู้ใช้กดปุ่ม "เข้าสู่เว็บไซต์" = User Interaction
- เพลงจะเล่นอัตโนมัติทันทีหลังเข้าเว็บ (ไม่ต้องกดอีก)
- ใช้งานได้ทั้ง Desktop และ Mobile
- ไม่มีปัญหา Browser Autoplay Policy อีกต่อไป

## วิธีการทำงาน:

```
1. User เข้าเว็บ
   ↓
2. แสดง Landing Page
   ↓
3. User กดปุ่ม "เข้าสู่เว็บไซต์" ← User Interaction
   ↓
4. Landing Page หายไป (fade out animation)
   ↓
5. แสดงเนื้อหาเว็บหลัก
   ↓
6. เพลงเล่นอัตโนมัติทันที ✅ (100% Success)
```

## ฟีเจอร์ Landing Page:

✅ ชื่อคู่บ่าวสาว
✅ วันที่และเวลางาน
✅ ปุ่ม Enter พร้อม Hover Animation
✅ Background Image
✅ Floating Hearts Animation
✅ Smooth Fade Out Transition
✅ Responsive Design (Mobile & Desktop)

## การปรับแต่ง:

### เปลี่ยนรูป Background:

แก้ไขในไฟล์ `app/components/LandingPage.tsx` บรรทัด ~27:

```typescript
style={{
  backgroundImage: `url('/bg/ชื่อรูปของคุณ.jpg')`,
  backgroundSize: "cover",
  backgroundPosition: "center",
}}
```

### เปลี่ยนข้อความ:

แก้ไขในไฟล์ `app/components/LandingPage.tsx`:

- บรรทัด ~46: ชื่อคู่บ่าวสาว
- บรรทัด ~51: คำบรรยาย (We're Getting Married!)
- บรรทัด ~55: คำบรรยายภาษาไทย
- บรรทัด ~114-115: วันที่และเวลา

### เปลี่ยนสี Theme:

แก้ไข gradient colors ใน Landing Page:

- `from-rose-400 to-pink-400` → เปลี่ยนเป็นสีที่ต้องการ

## ข้อดี:

1. ✅ เพลงเล่นได้ 100% (ไม่มีปัญหา autoplay policy)
2. ✅ UX ดีขึ้น (มีหน้าต้อนรับสวยงาม)
3. ✅ Build hype ให้ผู้เข้าชมก่อนเข้าเว็บ
4. ✅ ทำงานได้ทั้ง Desktop และ Mobile
5. ✅ Professional และทันสมัย

## หมายเหตุ:

- Landing Page จะแสดงเพียงครั้งเดียวต่อการเข้าเว็บ
- ถ้าต้องการให้แสดงทุกครั้ง ไม่ต้องแก้อะไร (ปัจจุบันเป็นแบบนี้)
- ถ้าต้องการให้แสดงครั้งเดียวต่อ Session ให้ใช้ sessionStorage
- ถ้าต้องการให้แสดงครั้งเดียวตลอดกาล ให้ใช้ localStorage
