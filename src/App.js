import { Routes, Route, Link } from 'react-router-dom';
import { CollectionProvider } from './context/CollectionContext';
import DiscoverPage from './pages/DiscoverPage';
import CollectionPage from './pages/CollectionPage';

import {
  AppBar,
  Toolbar,
  Button,
  Container,
  Box,
  Typography,
} from '@mui/material';

import CatchingPokemonIcon from '@mui/icons-material/CatchingPokemon';
import CollectionsBookmarkIcon from '@mui/icons-material/CollectionsBookmark';

function App() {
  return (
    <CollectionProvider>
      {/* Top Heading */}
      <AppBar position="static" elevation={0} style={{ backgroundColor: '#fff', color: '#000' }}>
        <Toolbar style={{ justifyContent: 'center', flexDirection: 'column', padding: '1rem 0' }}>
          <Typography variant="h4" fontWeight="bold" gutterBottom>
            Pokémon Collection App
          </Typography>

          <Box display="flex" gap={2}>
            <Button
              variant="contained"
              color="error"
              component={Link}
              to="/"
              startIcon={<CatchingPokemonIcon />}
            >
              Discover
            </Button>
            <Button
              variant="contained"
              color="primary"
              component={Link}
              to="/collection"
              startIcon={<CollectionsBookmarkIcon />}
            >
              My Collection
            </Button>
          </Box>
        </Toolbar>
      </AppBar>

      {/* Page Content */}
      <Container maxWidth="md"style={{
    backgroundColor: '#E6E6FA', // light violet (lavender)
    padding: '2rem',
    borderRadius: '16px',
    color: 'rebeccapurple',
  }}
>
        <Routes>
          <Route path="/" element={<DiscoverPage />} />
          <Route path="/collection" element={<CollectionPage />} />
        </Routes>
      </Container>
    </CollectionProvider>
  );
}

export default App;
