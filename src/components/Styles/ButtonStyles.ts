// ButtonStyles.ts
import { Link } from 'react-router-dom';
import { styled } from '@mui/material/styles';

// Create the styled component for the "Go Back" button
export const GoBackButton = styled(Link)({
  display: 'inline-block',
  padding: '12px 20px',
  backgroundColor: '#4caf50',
  color: '#fff',
  textDecoration: 'none',
  borderRadius: '4px',
  marginTop: '20px',
  cursor: 'pointer',
  '&:hover': {
    backgroundColor: '#45a049',
  },
});
