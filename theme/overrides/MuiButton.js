
export default (palette)=>({
  outlined: {},
  contained: {
    backgroundColor: palette.common.white,
    '&:hover': {
      backgroundColor: palette.common.neutral
    }
  }
});
