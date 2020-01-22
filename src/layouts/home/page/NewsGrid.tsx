import styled from 'styled-components';
export const NewsGrid = ({ tiles }) => {
  const TilesGrid = styled.div`
    margin-top: 20px;
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
    grid-gap: 20px;
  `;
  const Tile = styled.a`
    padding: 10px 20px 10px 15px;
    background-color: #f8f8f8;
    min-height: 110px;
    display: flex;
    flex-direction: column;
    transition: all 0.5s cubic-bezier(0.02, 0.69, 0.14, 1);
    text-decoration: none;
    h1 {
      font-size: 16px;
      font-weight: bold;
      color: rgb(0, 154, 68);
      margin-bottom: 10px;
    }
    &:hover {
      box-shadow: 0 7px 8px -4px rgba(0, 0, 0, 0.1), 0 12px 17px 2px rgba(0, 0, 0, 0.08),
        0 5px 22px 4px rgba(0, 0, 0, 0.06);
    }
  `;

  const extraNews = [
    {
      NewsID: 999999,
      URL: 'https://home.id.com.au/demographic-resources/',
      Title: 'Demographic resource center',
      News: 'Find hundreds of resources to help you make informed decisions',
    },
  ];

  const NewsTiles = [...tiles, ...extraNews].map(news => {
    return (
      <Tile href={news.URL} target="_blank" rel="noopener" key={news.NewsID}>
        <article>
          <h1>{news.Title}</h1>
          <p>{news.News}</p>
        </article>
      </Tile>
    );
  });

  return <TilesGrid>{NewsTiles}</TilesGrid>;
};
