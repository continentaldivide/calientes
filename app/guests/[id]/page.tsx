import Navbar from '../../navbar';

type Guest = {
  _id: string;
  name: string;
  profession: string;
  episodes: string[];
  episodeDates: string[];
  totalWingsEaten: number;
  wallOfFlame: boolean;
  wallOfShame: boolean;
  likes: number;
  img: string;
  createdAt: string;
  updatedAt: string;
};

type Params = {
  params: {
    id: string;
  };
};

// not in love with the syntax for params typing here, but managed to avoid "any" so probably good enough for the time being
const GuestPage: ({}: Params) => Promise<{}> = async ({ params }) => {
  const getGuest: () => Promise<Guest> = async () => {
    const res = await fetch(
      `${process.env.REACT_APP_SERVER_URL}/api-v1/guests/${params.id}`
    );
    if (!res.ok) {
      // This will activate the closest `error.js` Error Boundary
      throw new Error('Failed to fetch data');
    }
    return res.json();
  };

  const guest = await getGuest();

  const episodeDates = guest.episodeDates.map((date, index) => {
    if (index === guest.episodeDates.length - 1) {
      return new Date(date).toLocaleDateString('en-US');
    } else {
      return new Date(date).toLocaleDateString('en-US') + ', ';
    }
  });

  return (
    <div>
      <Navbar />
      <div
        style={{
          transition: '.3s',
          borderRadius: '5px',
          backgroundColor: 'white',
          width: '35em',
        }}
      >
        <h1 style={{ fontSize: '100px', padding: '10px' }}>{guest.name}</h1>
        <h2 style={{ fontSize: '60px', padding: '10px' }}>
          {guest.profession}
        </h2>
        <p style={{ fontSize: '20px', padding: '10px' }}>
          Episode Dates: {episodeDates}
        </p>
        <p style={{ fontSize: '20px', padding: '10px' }}>
          Total Wings Eaten: {guest.totalWingsEaten}
        </p>
      </div>
    </div>
  );
};

export default GuestPage;
