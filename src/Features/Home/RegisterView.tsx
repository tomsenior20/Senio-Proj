import GetAPI from '../../api/api';

export default async function RegisterView() {
  const data = await GetAPI({
    APIEndPoint: 'registerView',
    body: {
      statName: 'Views',
      description: 'Count of Website Views',
      ticket_created: new Date().toISOString().slice(0, 19).replace('T', ' '),
    },
  });
  // Return Data
  return data;
}
