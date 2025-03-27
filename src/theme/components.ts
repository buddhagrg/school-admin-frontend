export const components = {
  MuiButtonBase: {
    styleOverrides: {
      root: {
        '&': {
          textTransform: 'none'
        },
        '&.Mui-disabled': {
          cursor: 'not-allowed !important',
          pointerEvents: 'all !important'
        },
        '&.Mui-disabled:hover': {
          cursor: 'not-allowed !important',
          pointerEvents: 'all !important'
        }
      }
    }
  },
  MuiFilledInput: {
    styleOverrides: {
      root: {
        backgroundColor: 'white',
        borderRadius: '8px',
        border: '1px solid #ccc',
        '&:before, &:after': {
          display: 'none' // Removes MUI default bottom border
        },
        '&:hover': {
          borderColor: '#888'
        }
      }
    }
  },
  MuiFormLabel: {
    styleOverrides: {
      root: {
        color: 'black'
      }
    }
  }
};
