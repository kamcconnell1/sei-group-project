const TestGeoJSON = () => {

  const props = [
  {_id: "5ec37b95228d6e12401fac5d", place: "ice cream van", title: "ice creaaaam", latitude: "51.512", longitude: "-0.0804"},
  {_id: "5ec37be2228d6e12401fac5e", place: "Topshop", title: "Nice Dress for Friend", latitude: "51.512046", longitude: "-0.10741979"},
  { _id: "5ec37c29228d6e12401fac5f", place: "Chocolate Shop",  title: "Chocolates", latitude: "51.5059397",   longitude: "-0.131492"}]
 

const pins = []

for (let i = 0; i < 3; i++ ){
const id = i
const latitude = props[i].latitude
const longitude = props[i].longitude

pins.push({
  type: "Pin",
  geometry: {
    type: "Point",
    coordinates: [longitude, latitude]
  },
  properties: {
    id,
    name: props[i].title,
    description: props[i].place
  }
})
}



return Promise.resolve({
  type: "PinList",
  features: pins
})
}

export default TestGeoJSON