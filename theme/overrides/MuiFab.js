
export default (palette)=>({
  root: {
    backgroundColor: palette.common.white,
    color: palette.text.secondary,
    '&:hover': {
      backgroundColor: palette.common.neutral
    }
  }
});
