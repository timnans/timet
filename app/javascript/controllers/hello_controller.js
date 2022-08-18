import { Controller } from "@hotwired/stimulus"
import { get } from '@rails/request.js'

export default class extends Controller {
  async getIndexData(){
    const response = await get( "/events.json")
    if (response.ok){
      const body = JSON.parse(await response.text)
      const timetable = new Timetable();

      body.forEach(event => {
        console.log(event.name)
        timetable.addLocations([event.location])
        timetable.addEvent(event.name, event.location, new Date(event.start_time), new Date(event.end_time));

      });

      timetable.setScope(9,2)

      timetable.addLocations(['Abuja','Rotterdam', 'Madrid', 'Los Angeles', 'London', 'New York', 'Jakarta', 'Tokyo']);
      timetable.addLocations(['Kaduna'])
      timetable.addEvent('Zumba', 'Abuja', new Date(2015,7,17,12), new Date(2015,7,17,13), '#');

      timetable.addEvent('Sightseeing', 'Rotterdam', new Date(2015,7,17,10,45), new Date(2015,7,17,12,30), '#');
      timetable.addEvent('Zumba', 'Madrid', new Date(2015,7,17,12), new Date(2015,7,17,13), '#');
      timetable.addEvent('Zumbu', 'Madrid', new Date(2015,7,17,13,30), new Date(2015,7,17,15), '#');
      timetable.addEvent('Lasergaming', 'London', new Date(2015,7,17,17,45), new Date(2015,7,17,19,30), '#');
      timetable.addEvent('All-you-can-eat grill', 'New York', new Date(2015,7,17,21), new Date(2015,7,18,1,30), '#');
      timetable.addEvent('Hackathon', 'Tokyo', new Date(2015,7,17,11,30), new Date(2015,7,17,20)); // url is optional and is not used for this event
      timetable.addEvent('Tokyo Hackathon Livestream', 'Los Angeles', new Date(2015,7,17,12,30), new Date(2015,7,17,16,15)); // url is optional and is not used for this event
      timetable.addEvent('Lunch', 'Jakarta', new Date(2015,7,17,9,30), new Date(2015,7,17,11,45), '#');
      timetable.addEvent('Abuja', 'Jakarta', new Date(2015,7,17,9,30), new Date(2015,7,17,11,45), '#');


      var renderer = new Timetable.Renderer(timetable);
      renderer.draw('.timetable');
    }
  }
  connect(){
    this.getIndexData()
      }
}
