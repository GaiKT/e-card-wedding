# Gallery Management Guide

## 📸 **Adding More Photos to Your Gallery**

Your gallery is now using your actual photos from the `/public/gallery/` folder!

### Currently Used Photos:

- IMG_1026.JPG ✅
- IMG_1027.JPG ✅
- IMG_1028.JPG ✅
- IMG_1335.JPG ✅
- IMG_0882.HEIC ✅
- IMG_0929.HEIC ✅
- IMG_0935.HEIC ✅
- IMG_0983.HEIC ✅
- IMG_1003.HEIC ✅
- IMG_1006.HEIC ✅
- IMG_1008.HEIC ✅
- IMG_1009.HEIC ✅

### Available Photos (Not Yet Used):

- IMG_1011.HEIC
- IMG_1012.HEIC
- IMG_1289.HEIC
- IMG_1294.HEIC
- IMG_1295.HEIC
- IMG_1296.HEIC
- IMG_1297.HEIC
- IMG_1298.HEIC
- IMG_1299.HEIC
- IMG_1312.HEIC
- IMG_1313.HEIC
- IMG_1314.HEIC
- IMG_1321.HEIC
- IMG_1322.HEIC
- IMG_1323.HEIC
- IMG_1324.HEIC
- IMG_1329.HEIC
- IMG_1331.HEIC
- IMG_1336.HEIC
- IMG_1337.HEIC
- IMG_1339.HEIC
- IMG_1345.HEIC

## 🛠️ **How to Add More Photos:**

1. **Add new entry to galleryImages array** in `PreWeddingGallerySection.tsx`:

```tsx
{
  id: 13,
  src: "/gallery/IMG_1011.HEIC",
  alt: "Wedding Photo 13",
  caption: "Your Caption Here",
  description: "Your description here",
},
```

2. **Update the captions and descriptions** to match your photos:
   - Make them personal and meaningful
   - Describe the moment or emotion captured
   - Keep captions short and descriptions slightly longer

## 🎨 **Image Format Notes:**

- **HEIC files**: Modern iPhone format, browsers handle them well
- **JPG files**: Universal format, excellent compatibility
- **Recommended**: All images are automatically optimized by Next.js

## 📱 **Display Modes:**

- **Carousel View**: Perfect for showcasing your best photos
- **Grid View**: Great for browsing many photos at once
- **Responsive**: Looks beautiful on mobile and desktop

## 💡 **Tips for Best Results:**

- Choose photos with good lighting and composition
- Mix different types of shots (close-ups, wide shots, candid moments)
- Consider the order - tell a story through your photo sequence
- Test both carousel and grid views to ensure photos look good in both

Your gallery now showcases your beautiful real wedding photos! 💕
