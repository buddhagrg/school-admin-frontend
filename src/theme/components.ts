export const components = {
  MuiButtonBase: {
    styleOverrides: {
      root: {
        '&': {
          textTransform: 'none'
        },
        '&.Mui-disabled': {
          cursor: 'not-allowed !important',
          pointerEvents: 'none'
        },
        '&.Mui-disabled:hover': {
          cursor: 'not-allowed !important',
          pointerEvents: 'none'
        }
      }
    }
  },
  MuiFilledInput: {
    styleOverrides: {
      root: {
        '& input::placeholder': {
          fontSize: '14px'
        },
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
  MuiInputLabel: {
    styleOverrides: {
      asterisk: {
        color: 'red',
        fontWeight: 'bold',
        fontSize: '20px'
      }
    }
  },
  MuiFormLabel: {
    styleOverrides: {
      root: {
        '&': {
          color: '#272727',
          fontWeight: 500,
          marginBottom: '3px',
          fontSize: '15px'
        }
      }
    }
  }
};
