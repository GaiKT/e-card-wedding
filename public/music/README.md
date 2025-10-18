# Music Player - Wedding Card

## วิธีการเพิ่มเพลง

1. วางไฟล์เพลง (MP3 format) ลงในโฟลเดอร์ `public/music/`
2. แก้ไขไฟล์ `app/components/MusicPlayer.tsx` ในส่วน `playlist` array

### ตัวอย่างการเพิ่มเพลง:

```typescript
const playlist: Song[] = [
  {
    title: "ชื่อเพลง",
    artist: "ชื่อศิลปิน",
    src: "/music/ชื่อไฟล์.mp3",
  },
  // เพิ่มเพลงอื่นๆ ตามต้องการ
];
```

## รายการเพลงที่แนะนำสำหรับงานแต่งงาน:

1. **Perfect** - Ed Sheeran
2. **All of Me** - John Legend
3. **A Thousand Years** - Christina Perri
4. **Marry You** - Bruno Mars
5. **Thinking Out Loud** - Ed Sheeran
6. **Make You Feel My Love** - Adele
7. **Can't Help Falling in Love** - Elvis Presley
8. **At Last** - Etta James

## ฟีเจอร์ของ Music Player:

✅ เล่น/หยุด เพลง
✅ เปลี่ยนเพลงหน้า/หลัง
✅ ปรับความดัง
✅ แสดงเวลาเพลง
✅ Progress bar
✅ Playlist indicator
✅ Auto play เพลงถัดไปเมื่อจบ
✅ Floating button design
✅ Expandable player UI
✅ Responsive design
✅ Smooth animations

## หมายเหตุ:

- ควรใช้ไฟล์เพลงที่มีลิขสิทธิ์ถูกต้องตามกฎหมาย
- แนะนำให้ใช้ไฟล์ MP3 ขนาดไม่เกิน 10MB เพื่อความเร็วในการโหลด
- สามารถปรับแต่งสี Theme และ UI ได้ในไฟล์ MusicPlayer.tsx
