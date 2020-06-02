
export default (palette)=>({
  root: {
    '&:hover:not($disabled)': {
      backgroundColor: palette.background.default
    }
  }
});
