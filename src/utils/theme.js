export default {
  palette: {
    /*  primary: {
      light: '#f2c968',
      main: '#fcb207',
      dark: '#db9b02',
      contrastText: 'black'
    },
    secondary: {
      light: '#ffa000',
      main: '#ff8f00',
      dark: '#ef6c00',
      contrastText: '#fff'
    } */
    primary: {
      light: '#C5C6C7',
      main: '#1F2833',
      dark: '#0B0C10',
      contrastText: '#66FCF1'
    },
    secondary: {
      light: '#ffa000',
      main: '#66FCF1',
      dark: '#45A29E',
      contrastText: 'black'
    }
  },
  spreadThis: {
    typography: {
      useNextVariants: true
    },
    form: {
      textAlign: 'center'
    },
    image: {
      margin: '20px auto 10px auto',
      width: 100,
      height: 100
    },
    linkText: {
      color: '#45a29e'
    },
    button: {
      marginTop: 25,
      position: 'relative'
    },
    pageTitle: {
      //  margin: '10px auto 10px auto',
      color: '#66Fcf1'
    },
    textField: {
      margin: '10px auto 10px auto',
      background: '#C5C6C7'
    },
    customError: {
      color: 'red',
      fontSize: '0.8rem',
      marginTop: 10
    },
    loadingIcon: {
      position: 'absolute',
      color: '#66FCF1'
    },
    dialogColor: {
      backgroundColor: '#1f2833'
    },
    deleteTitle: {
      color: '#c5c6c7'
    },
    deleteButton: {
      position: 'absolute',
      left: '90%',
      top: '12%'
    },
    progressSpinner: {
      position: 'absolute',
      color: '#66FCF1'
    },
    submitButton: {
      position: 'relative',
      float: 'right',
      marginTop: 5
    },
    closeButton: {
      position: 'absolute',
      left: '90%',
      top: '7%'
    },
    separator: {
      border: 'none',
      margin: 4
    },
    visibleSeparator: {
      width: '100%',
      borderBottom: '1px solid ',
      color: '#C5C6C7',
      marginBottom: 20
    },
    dateColor: {
      color: '#C5C6C7'
    },
    card: {
      position: 'relative',
      display: 'flex',
      marginBottom: 20,
      background: '#1f2833',
      color: '#C5C6C7'
    },
    cardContent: {
      width: '100%',
      flexDirection: 'column',
      padding: 25
    },
    cover: {
      minWidth: 200,
      objectFit: 'cover'
    },
    handle: {
      width: 60,
      height: 18,
      backgroundColor: '#45A29E',
      marginBottom: 7
    },
    date: {
      height: 14,
      width: 100,
      marginBottom: 10,
      backgroundColor: '#C5C6C7'
    },
    fullLine: {
      height: 15,
      width: '90%',
      backgroundColor: '#C5C6C7',
      marginBottom: 10
    },
    halfLine: {
      height: 15,
      width: '50%',
      backgroundColor: '#C5C6C7',
      marginBottom: 10
    },
    paper: {
      padding: 20,
      /*background:'#1f2833' */
      background: '#1f2833',
      color: '#C5C6C7'
    },
    profile: {
      '& .image-wrapper': {
        textAlign: 'center',
        position: 'relative',
        '& button': {
          position: 'absolute',
          top: '80%',
          left: '70%'
        }
      },
      '& .profile-image': {
        width: 200,
        height: 200,
        objectFit: 'cover',
        maxWidth: '100%',
        borderRadius: '50%'
      },
      '& .profile-details': {
        textAlign: 'center',
        '& span, svg': {
          verticalAlign: 'middle'
        },
        '& a': {
          color: '#45A29E'
        }
      },
      '& hr': {
        border: 'none',
        margin: '0 0 10px 0'
      },
      '& svg.button': {
        '&:hover': {
          cursor: 'pointer'
        }
      }
    },
    buttons: {
      textAlign: 'center',
      '& a': {
        margin: '20px 10px'
      }
    }
  }
};
