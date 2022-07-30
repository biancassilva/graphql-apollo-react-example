import { Route, Routes } from 'react-router-dom';
import CharactersPage from './pages/characters'
import EpisodesPage from './pages/episodes'

const Router = () => {
  return (
      <Routes>
        <Route index element={<CharactersPage />} />
        <Route path={'/characters'} element={<CharactersPage />} />
        <Route path={'/episodes'} element={<EpisodesPage />} />
      </Routes>
  );
};
export default Router;
