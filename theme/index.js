// Material helpers
import { createMuiTheme } from '@material-ui/core/styles';

import getPalette from './palette';
import getTypography from './typography';
import getOverrides from './overrides';

const theme = (userTheme) => {
  const palette = getPalette(userTheme ? `#${userTheme}` : '');
  return createMuiTheme({
    palette : palette,
    typography : getTypography(palette),
    overrides : getOverrides(palette),
    zIndex: {
      appBar: 1200,
      drawer: 1100
    }
  })
};

export default theme;
