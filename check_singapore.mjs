async function checkSingaporeImages() {
  const urls = [
    "https://static.wixstatic.com/media/548938_c3071a65c719496794c0badcec2dfe63~mv2.jpg",
    "https://static.wixstatic.com/media/548938_bd414512485f4f8d829f43bf08dddcd7~mv2.jpg",
    "https://static.wixstatic.com/media/548938_4f37d9ddf20743fe9a52e3db9eacc36d~mv2.jpg",
    "https://static.wixstatic.com/media/548938_67cac5d58a9e41628c58f9bf88989ffe~mv2.jpg",
    "https://static.wixstatic.com/media/548938_8e1a682b5aeb4f79b98b882fa070c4f4~mv2.jpg",
    "https://static.wixstatic.com/media/548938_b2dd1ed30f5f4454ae182a8598f0553e~mv2.jpg"
  ];
  for (const u of urls) {
    const res = await fetch(u);
    const buf = Buffer.from(await res.arrayBuffer());
    console.log(u.slice(-38), buf.length);
  }
}
checkSingaporeImages();
