import Box from '@mui/material/Box';
// ** MUI Imports
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/material/styles';
import { Link } from 'react-router-dom';
import lightModeLogo from "../../../../../../public/images/Indyho_white.png";
import darkModeLogo from "../../../../../../public/images/Indyho_color.png";

// ** Custom Icon Import
import Icon from '@core/components/icon';

// ** Configs
// import themeConfig from '@configs/themeConfig';

// import { LogoSvg } from '../../shared-components/LogoSvg';

// ** Styled Components
const MenuHeaderWrapper = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  paddingRight: theme.spacing(3.5),
  transition: 'padding .25s ease-in-out',
  minHeight: theme.mixins.toolbar.minHeight,
}));

const HeaderTitle = styled(Typography)({
  fontWeight: 700,
  lineHeight: '24px',
  transition: 'opacity .25s ease-in-out, margin .25s ease-in-out',
});

const LinkStyled = styled(Link)({
  display: 'flex',
  alignItems: 'center',
  textDecoration: 'none',
});

const VerticalNavHeader = (props) => {
  // ** Props
  const {
    hidden,
    navHover,
    settings,
    saveSettings,
    collapsedNavWidth,
    toggleNavVisibility,
    navigationBorderWidth,
    menuLockedIcon: userMenuLockedIcon,
    navMenuBranding: userNavMenuBranding,
    menuUnlockedIcon: userMenuUnlockedIcon,
  } = props;

  // ** Hooks & Vars
  const { navCollapsed } = settings;
  const menuCollapsedStyles =
    navCollapsed && !navHover ? { opacity: 0 } : { opacity: 1 };

  const menuHeaderPaddingLeft = () => {
    if (navCollapsed && !navHover) {
      if (userNavMenuBranding) {
        return 0;
      } else {
        return (collapsedNavWidth - navigationBorderWidth - 34) / 8;
      }
    } else {
      return 6;
    }
  };
  const MenuLockedIcon = () =>
    userMenuLockedIcon || <Icon icon="tabler:circle-dot" />;
  const MenuUnlockedIcon = () =>
    userMenuUnlockedIcon || <Icon icon="tabler:circle" />;

  return (
    <MenuHeaderWrapper
      className="nav-header"
      sx={{ pl: menuHeaderPaddingLeft() }}
    >
      {userNavMenuBranding ? (
        userNavMenuBranding(props)
      ) : (
        <LinkStyled to="/">
          <img
            src={settings.mode === 'dark' ? lightModeLogo : darkModeLogo}
            alt={settings.mode === 'dark' ? 'Dark Image' : 'Light Image'}
            style={{ width: 'auto', height: '4rem' }}
          />
        </LinkStyled>
      )}

      {hidden ? (
        <IconButton
          disableRipple
          disableFocusRipple
          onClick={toggleNavVisibility}
          sx={{
            p: 0,
            color: 'text.secondary',
            backgroundColor: 'transparent !important',
          }}
        >
          <Icon icon="tabler:x" fontSize="1.25rem" />
        </IconButton>
      ) : userMenuLockedIcon === null &&
        userMenuUnlockedIcon === null ? null : (
        <IconButton
          disableRipple
          disableFocusRipple
          onClick={() =>
            saveSettings({ ...settings, navCollapsed: !navCollapsed })
          }
          sx={{
            p: 0,
            color: 'text.primary',
            backgroundColor: 'transparent !important',
            '& svg': {
              fontSize: '1.25rem',
              ...menuCollapsedStyles,
              transition: 'opacity .25s ease-in-out',
            },
          }}
        >
          {navCollapsed ? MenuUnlockedIcon() : MenuLockedIcon()}
        </IconButton>
      )}
    </MenuHeaderWrapper>
  );
};

export default VerticalNavHeader;
