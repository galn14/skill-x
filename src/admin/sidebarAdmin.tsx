import React, { useEffect } from 'react';
import { Drawer, List, ListItem, ListItemIcon, ListItemText, Box, Typography } from '@mui/material';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ApprovalIcon from '@mui/icons-material/CheckCircleOutline';
import ManageIcon from '@mui/icons-material/ManageAccounts';
import BuildIcon from '@mui/icons-material/Build';
import CategoryIcon from '@mui/icons-material/Category';
import RateReviewIcon from '@mui/icons-material/RateReview';
import AccountTreeIcon from '@mui/icons-material/AccountTree';
import PeopleIcon from '@mui/icons-material/People';
import SubscriptionsIcon from '@mui/icons-material/Subscriptions';
import ReportIcon from '@mui/icons-material/Assessment';
import HelpIcon from '@mui/icons-material/HelpOutline';
import SettingsIcon from '@mui/icons-material/Settings';
import { useHistory, useLocation } from 'react-router-dom';

interface SidebarAdminProps {
  setSelectedItem: (item: string) => void;
}

const SidebarAdmin: React.FC<SidebarAdminProps> = ({ setSelectedItem }) => {
  const history = useHistory();
  const location = useLocation(); // Get current route
  const menuItems = [
    { text: 'Dashboard', icon: <DashboardIcon />, path: '/' },
    { text: 'Seller Approval', icon: <ApprovalIcon />, path: '/sellerApproval' },
    { text: 'Major Management', icon: <ManageIcon />, path: '/majorManagement' },
    { text: 'Service Management', icon: <BuildIcon />, path: '/serviceManagement' },
    { text: 'Skills Management', icon: <CategoryIcon />, path: '/skillManagement' },
    { text: 'Review Management', icon: <RateReviewIcon />, path: '/reviewManagement' },
    { text: 'Transaction Monitoring', icon: <AccountTreeIcon />, path: '/transactionMonitoring' },
    { text: 'User Monitoring', icon: <PeopleIcon />, path: '/userMonitoring' },
    { text: 'Subscription', icon: <SubscriptionsIcon />, path: '/subscription' },
    { text: 'Report Management', icon: <ReportIcon />, path: '/reportManagement' },
    { text: 'Help and Support', icon: <HelpIcon />, path: '/helpAndSupport' },
    { text: 'Account Setting', icon: <SettingsIcon />, path: '/accountSetting' },
  ];

  // Update selected item based on current route
  useEffect(() => {
    const currentItem = menuItems.find((item) => item.path === location.pathname);
    if (currentItem) {
      setSelectedItem(currentItem.text);
    }
  }, [location.pathname, menuItems, setSelectedItem]);

  return (
    <Drawer
      variant="persistent"
      anchor="left"
      open={true}
      sx={{
        '& .MuiDrawer-paper': {
          width: 240,
          boxSizing: 'border-box',
          backgroundColor: '#E9F3FF',
          boxShadow: 'none',
          borderRight: 'none',
          overflowY: 'auto',
          scrollbarWidth: 'none', // Firefox
          '&::-webkit-scrollbar': { display: 'none' }, // Chrome, Safari, Edge
        },
      }}
    >
      <Box display="flex" justifyContent="center" my={2}>
        <img src="/SkillXLogo.png" alt="SkillX Logo" style={{ width: '120px' }} />
      </Box>
      <List>
        {menuItems.map((item) => (
          <ListItem
            key={item.text}
            onClick={() => {
              history.push(item.path);
            }}
            style={{
              backgroundColor: location.pathname === item.path ? '#1976D2' : 'inherit',
              color: location.pathname === item.path ? '#fff' : '#000',
              borderRadius: '5px',
              marginBottom: '5px',
            }}
          >
            <ListItemIcon sx={{ color: location.pathname === item.path ? '#fff' : '#000' }}>
              {item.icon}
            </ListItemIcon>
            <ListItemText
              primary={
                <Typography variant="body2" noWrap>
                  {item.text}
                </Typography>
              }
            />
          </ListItem>
        ))}
      </List>
    </Drawer>
  );
};

export default SidebarAdmin;
