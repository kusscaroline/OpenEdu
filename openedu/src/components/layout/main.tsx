
import React, { useEffect, useState, useContext } from 'react';
import Drawer from '@mui/material/Drawer'
import CssBaseline from '@mui/material/CssBaseline'
import Box from '@mui/material/Box';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { SvgIconProps } from '@mui/material/SvgIcon';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { SettingsContext } from '@/components/contexts/settingsContext'

import BookIcon from '@mui/icons-material/Book';
import PeopleIcon from '@mui/icons-material/People';
import SchoolIcon from '@mui/icons-material/School';
import SettingsIcon from '@mui/icons-material/Settings';
import HomeIcon from '@mui/icons-material/Home';
import OpenEduLogo from '../OpenEduLogo';

const drawerWidth = 260;

interface sidebarLink {
    label: string,
    path: string,
    icon: React.ComponentType<SvgIconProps>
}

export default function Main({ 
    children 
}) {
    const { data: session } = useSession()
    const { appSettings, setAppSettings } = useContext(SettingsContext)
    const [theme, setTheme] = useState('dark')

    const currentPage = usePathname()
    
    const sidebarLinks: sidebarLink[] = [
        {
            label: 'Dashboard',
            path: '/admin/',
            icon: HomeIcon
        },
        {
            label: 'Classes',
            path: '/admin/classes',
            icon: SchoolIcon
        },
        {
            label: 'Courses',
            path: '/admin/courses',
            icon: BookIcon
        },
        {
            label: 'Users',
            path: '/admin/users',
            icon: PeopleIcon
        }
    ]
    const bottomLinks: sidebarLink[] = [
        {
            label: 'Settings',
            path: '/admin/settings',
            icon: SettingsIcon
        }
    ]
        
    const lightTheme = createTheme({
        palette: {
            text: {
                primary: '#000'
            },
            background: {
                default: "#E7EBF0",
                paper: '#FFF',
            },
        },
    });

    const darkTheme = createTheme({
        palette: {
            mode: 'dark',
            background: {
                default: "#0a1929",
                paper: '#0a1929',
            },
            text: {
                primary: '#FFF',
                secondary: '#b2bac2',
            }
        },
    });

    useEffect(() => {
        let nextTheme = 'dark'
        if(appSettings.theme == 'system' && window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) nextTheme = 'dark'
        else if(appSettings.theme == 'system') nextTheme = 'light'
        else nextTheme = appSettings.theme
        setTheme(nextTheme)
    }, [appSettings])

    useEffect(() => {
        //alert(theme)
    }, [theme])


    if(!session) return (
        <ThemeProvider theme={darkTheme}>
            <Box sx={{ display: 'flex' }}>
                Access Denied
            </Box>
        </ThemeProvider>
    )

    return (
        <ThemeProvider theme={theme  == 'dark' ? darkTheme : lightTheme}>
            <Box sx={{ display: 'flex' }}>
                <CssBaseline />
                <AppBar
                    position="fixed"
                    sx={{ 
                        width: `calc(100% - ${drawerWidth}px)`, 
                        ml: `${drawerWidth}px` ,
                        backdropFilter: 'blur(20px)',
                        background: 'transparent',
                        borderTop: 0,
                        borderLeft: 0,
                        borderRight: 0
                    }}
                    elevation={0}
                    variant="outlined"
                >
                    <Toolbar  sx={{ bgcolor: 'background.paper' }}>
                    </Toolbar>
                </AppBar>
                <Drawer
                    sx={{
                        width: drawerWidth,
                        flexShrink: 0,
                        '& .MuiDrawer-paper': {
                        width: drawerWidth,
                        boxSizing: 'border-box',
                        },
                    }}
                    variant="permanent"
                    anchor="left"
                >
                    <Toolbar>
                        <div className='flex flex-row'>
                            <OpenEduLogo width={24} height={24} />
                            <Divider orientation="vertical" flexItem />
                            <Typography variant="h6" noWrap component="div" className='ml-3'>
                                OpenEdu
                            </Typography>
                        </div>
                    </Toolbar>
                    <Divider />
                    <List>
                        {sidebarLinks.map((link, index) => (
                            <Link href={link.path} key={index}>
                                <ListItem key={link.path} disablePadding>
                                    <ListItemButton selected={currentPage == link.path}>
                                        <ListItemIcon>
                                            <link.icon />
                                        </ListItemIcon>
                                        <ListItemText primary={link.label} />
                                    </ListItemButton>
                                </ListItem>
                            </Link>
                        ))}
                    </List>
                    <Divider />
                    <List>
                        {bottomLinks.map((link, index) => (
                            <Link href={link.path} key={index}>
                                <ListItem key={link.path} disablePadding>
                                    <ListItemButton selected={currentPage == link.path}>
                                        <ListItemIcon>
                                            <link.icon />
                                        </ListItemIcon>
                                        <ListItemText primary={link.label} />
                                    </ListItemButton>
                                </ListItem>
                            </Link>
                        ))}
                    </List>
                </Drawer>
                <Box
                    component="main"
                    sx={{ flexGrow: 1, bgcolor: 'background.default', p: 3, minHeight: '110vh' }}
                >
                    <Toolbar>
                    </Toolbar>
                    {children}
                </Box>
            </Box>
        </ThemeProvider>
    );
  }