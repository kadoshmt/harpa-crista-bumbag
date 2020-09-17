import { DefaultTheme } from 'styled-components';
import light from './themes/light';
import dark from './themes/dark';

interface DefinitionThemes {
  light: DefaultTheme;
  dark: DefaultTheme;
}

export default {
  light,
  dark,
} as DefinitionThemes;
