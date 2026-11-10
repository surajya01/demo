const fs = require('fs');
const path = require('path');

const required = [
  'public/images/resort/exterior_facade.jpg',
  'public/images/resort/swimming_pool.jpg',
  'public/images/resort/swimming_pool_night.jpg',
  'public/images/resort/reception_lobby.jpg',
  'public/images/resort/room_deluxe_double.jpg',
  'public/images/resort/restaurant_entrance.jpg',
  'public/images/resort/restaurant_dining.jpg',
  'public/images/resort/banquet_lawn.jpg',
  'public/images/resort/corridor_lifts.jpg',
  'public/images/resort/bathroom_modern.jpg',
  'public/images/placeholders/resort_placeholder.svg',
  'public/images/placeholders/room_placeholder.svg',
  'public/images/placeholders/food_placeholder.svg',
];

console.log('=== VERIFYING ASSETS ===');
let allOk = true;
for (const rel of required) {
  const full = path.resolve(rel);
  if (fs.existsSync(full)) {
    const stat = fs.statSync(full);
    console.log(`[PASS] ${rel} (${stat.size.toLocaleString()} bytes)`);
  } else {
    console.log(`[FAIL] MISSING: ${rel}`);
    allOk = false;
  }
}
if (!allOk) {
  console.error('Some assets are missing!');
  process.exit(1);
}
console.log('\nAll 10 curated resort photos and 3 placeholders VERIFIED successfully.');

