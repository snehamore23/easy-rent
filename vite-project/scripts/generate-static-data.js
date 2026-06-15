const fs = require('fs');

const cities = [
  'Mumbai','Delhi','Bengaluru','Chennai','Hyderabad','Pune','Kolkata','Jaipur','Ahmedabad','Lucknow'
];

const areasByCity = {
  Mumbai: ['Andheri','Bandra','Juhu','Dadar','Lower Parel'],
  Delhi: ['Saket','Dwarka','Karol Bagh','Rohini','Hauz Khas'],
  Bengaluru: ['Indiranagar','Koramangala','Whitefield','MG Road','Jayanagar'],
  Chennai: ['Adyar','T Nagar','Velachery','Anna Nagar','Besant Nagar'],
  Hyderabad: ['Banjara Hills','Hitech City','Gachibowli','Secunderabad','Kukatpally'],
  Pune: ['Koregaon Park','Viman Nagar','Baner','Kalyani Nagar','Shivaji Nagar'],
  Kolkata: ['Salt Lake','Park Street','Behala','Dum Dum','New Town'],
  Jaipur: ['C Scheme','Malviya Nagar','Vaishali Nagar','Bani Park','Sikar Road'],
  Ahmedabad: ['Navrangpura','Paldi','SG Highway','Maninagar','Bodakdev'],
  Lucknow: ['Gomti Nagar','Hazratganj','Alambagh','Indira Nagar','Bakshi Ka Talab']
};

const types = ['Flat','Bungalow','Villa','Penthouse'];
const sizes = ['Studio','1BHK','2BHK','3BHK','4BHK'];
const amenitiesPool = ['Swimming Pool','Lift','Gym','Parking','Garden','Power Backup','24x7 Security','Playground','Air Conditioning','Pet Friendly'];
const ownerNames = ['Amit Sharma','Priya Verma','Rahul Patel','Neha Singh','Vikram Kumar','Sonia Reddy','Ravi Joshi','Anita Desai','Karan Mehta','Deepa Rao','Suresh Nair','Geeta Iyer','Manish Gupta','Rhea Thakur','Nitin Shah','Isha Kapoor','Pooja Bhat','Arjun Rao','Leena Dutta','Vikas Saini'];

function pick(arr, idx){return arr[idx % arr.length];}
function pickMany(arr, idx, min, max){
  const n = min + (idx % (max - min + 1));
  const out = [];
  for(let i=0;i<n;i++) out.push(arr[(idx + i) % arr.length]);
  return [...new Set(out)].slice(0,n);
}

function phoneFor(i){
  const base = 9001000000 + i;
  return '+91' + String(base).slice(-10);
}

function emailFor(name,i){
  return (name.replace(/\s+/g,'').toLowerCase() + i + '@example.com');
}

function nearbyFor(i){
  return {
    hospital: { name: `Hospital ${i}`, distanceKm: +( (0.5 + (i%10)*0.3).toFixed(1) ) },
    school: { name: `School ${i}`, distanceKm: +( (0.3 + (i%8)*0.25).toFixed(1) ) },
    airport: { name: `Airport ${i}`, distanceKm: +( (5 + (i%20)*1.1).toFixed(1) ) },
    mall: { name: `Mall ${i}`, distanceKm: +( (1 + (i%7)*0.6).toFixed(1) ) },
    railwayStation: { name: `Railway Station ${i}`, distanceKm: +( (0.6 + (i%9)*0.4).toFixed(1) ) },
    metroStation: { name: `Metro Station ${i}`, distanceKm: +( (0.4 + (i%6)*0.35).toFixed(1) ) }
  };
}

const total = 200;
const items = [];
for(let i=1;i<=total;i++){
  const idx = i-1;
  const city = pick(cities, idx);
  const area = pick(areasByCity[city], idx);
  const propertyType = pick(types, idx);
  const size = pick(sizes, idx+1);
  const amenities = pickMany(amenitiesPool, idx, 2, 4);
  const rating = +( (3.5 + (idx%15)*0.1).toFixed(1) );
  const reviews = (idx*7) % 201;
  const priceBase = 10000 + (cities.indexOf(city) * 5000);
  const pricePerMonth = Math.round((priceBase + (idx%50)*200 + (types.indexOf(propertyType)*5000))/100)*100;
  const carpetAreaSqft = 350 + (idx%10)*150 + (sizes.indexOf(size)*80);
  const owner = { name: pick(ownerNames, idx), phone: phoneFor(i), email: emailFor(pick(ownerNames, idx), i) };
  const nearby = nearbyFor(i);
  const title = `${propertyType} in ${area}, ${city}`;
  const description = `Spacious ${size} ${propertyType.toLowerCase()} located in ${area}, ${city} with ${amenities.join(', ')}.`;
  items.push({
    id: `prop-${i}`,
    title,
    description,
    city,
    area,
    propertyType,
    size,
    amenities,
    photos: [],
    rating,
    reviews,
    pricePerMonth,
    carpetAreaSqft,
    owner,
    nearby,
    listedAt: '2026-06-14T00:00:00.000Z'
  });
}

const out = `// Static dataset of ${total} properties (generated once)
const properties = ${JSON.stringify(items, null, 2)};

export { properties };
export default properties;
`;

fs.writeFileSync('vite-project/src/views/data.jsx', out, 'utf8');
console.log('Wrote vite-project/src/views/data.jsx with', total, 'entries');
