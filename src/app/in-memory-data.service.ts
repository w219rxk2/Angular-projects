import { InMemoryDbService } from 'angular-in-memory-web-api';

export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    const heroes = [
      { id: 1,  firstName: 'Mounika Bodepudi' },
      { id: 11, firstName: 'Mr. Nice' },
      { id: 12, firstName: 'Narco' },
      { id: 13, firstName: 'Bombasto' },
      { id: 14, firstName: 'Celeritas' },
      { id: 15, firstName: 'Magneta' },
      { id: 16, firstName: 'RubberMan' },
      { id: 17, firstName: 'Dynama' },
      { id: 18, firstName: 'Dr IQ' },
      { id: 19, firstName: 'Magma' },
      { id: 20, firstName: 'Tornado' }
    ];
    return {heroes};
  }
}
