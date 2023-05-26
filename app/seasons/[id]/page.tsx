import Navbar from '../../navbar';

type Season = {
  _id: string;
  seasonNumber: number;
  episodeIds: string[];
  episodeTitles: string[];
  likes: number;
  startDate: string;
  endDate: string;
  createdAt: string;
  updatedAt: string;
};

type Params = {
  params: {
    id: string;
  };
};

const SeasonPage: ({}: Params) => Promise<{}> = async ({ params }) => {
  const getSeason: () => Promise<Season> = async () => {
    const res = await fetch(
      `${process.env.REACT_APP_SERVER_URL}/api-v1/seasons/${params.id}`
    );
    if (!res.ok) {
      // This will activate the closest `error.js` Error Boundary
      throw new Error('Failed to fetch data');
    }
    return res.json();
  };

  const season = await getSeason();

  return (
    <div>
      <Navbar />
      <div
        style={{
          transition: '.3s',
          borderRadius: '5px',
          backgroundColor: 'white',
          width: '55em',
        }}
      >
        <h1 style={{ fontSize: '80px', padding: '10px' }}>
          Hot Ones Season {season.seasonNumber}
        </h1>
        <p style={{ fontSize: '20px', padding: '10px' }}>
          Start Date: {new Date(season.startDate).toLocaleDateString('en-US')}
        </p>
        <p style={{ fontSize: '20px', padding: '10px' }}>
          End Date: {new Date(season.endDate).toLocaleDateString('en-US')}
        </p>
        <h2 style={{ fontSize: '60px', padding: '10px' }}>Episodes: </h2>
        {season.episodeTitles.map((episode, index) => (
          <div key={index} style={{ fontSize: '20px', padding: '10px' }}>
            <a
              href={`/episodes/${season.episodeIds[index]}`}
              style={{ display: 'block' }}
            >
              {episode}
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SeasonPage;
