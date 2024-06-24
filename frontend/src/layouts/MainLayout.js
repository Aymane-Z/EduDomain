import { Outlet } from 'react-router-dom';
import React, { useState } from 'react';
import { $t } from 'hooks/i18n';
import { AppMenu } from 'components/AppMenu';
import { Avatar } from 'primereact/avatar';
import { Button } from 'primereact/button';
import { classNames } from 'primereact/utils';
import { LangSwitcher } from 'components/LangSwitcher';
import { Link } from 'react-router-dom';
import { ProgressSpinner } from 'primereact/progressspinner';
import { SplitButton } from 'primereact/splitbutton';
import PrimeReact from 'primereact/api';
import useApp from 'hooks/useApp';
import useAuth from 'hooks/useAuth';

const MainLayout = () => {
		const auth = useAuth();
	const app = useApp();
	const appName = process.env.REACT_APP_NAME;
	const [staticMenuInactive, setStaticMenuInactive] = useState(false);
	const [overlayMenuActive, setOverlayMenuActive] = useState(false);
	const [mobileMenuActive, setMobileMenuActive] = useState(false);
	const [mobileTopbarMenuActive, setMobileTopbarMenuActive] = useState(false);
	PrimeReact.ripple = true;
	let menuClick = false;
	let mobileTopbarMenuClick = false;
	const layoutMode = 'static';
	const isDesktop = () => {
		return window.innerWidth >= 992;
	}

	const onWrapperClick = (event) => {
		if (!menuClick) {
			setOverlayMenuActive(false);
			setMobileMenuActive(false);
		}

		if (!mobileTopbarMenuClick) {
			setMobileTopbarMenuActive(false);
		}

		mobileTopbarMenuClick = false;
		menuClick = false;
	}

	const onToggleMenuClick = (event) => {
		menuClick = true;
		if (isDesktop()) {
			if (layoutMode === 'overlay') {
				if (mobileMenuActive === true) {
					setOverlayMenuActive(true);
				}
				setOverlayMenuActive((prevState) => !prevState);
				setMobileMenuActive(false);
			}
			else if (layoutMode === 'static') {
				setStaticMenuInactive((prevState) => !prevState);
			}
		}
		else {
			setMobileMenuActive((prevState) => !prevState);
		}
		event.preventDefault();
	}

	const onSidebarClick = () => {
		menuClick = true;
	}
	const onMenuItemClick = (event) => {
		if (!event.item.items) {
			setOverlayMenuActive(false);
			setMobileMenuActive(false);
		}
	}
	const navbarSideLeft = app.menus.navbarSideLeft.filter((menu) => auth.canView(menu.to));
	const navbarTopLeft = app.menus.navbarTopLeft.filter((menu) => auth.canView(menu.to));
	const navbarTopRight = app.menus.navbarTopRight.filter((menu) => auth.canView(menu.to));
	const wrapperClass = classNames('layout-wrapper', setContainerClass());

	function setContainerClass(){
		return {
			'layout-overlay': layoutMode === 'overlay',
			'layout-static': layoutMode === 'static',
			'layout-static-sidebar-inactive': staticMenuInactive && layoutMode === 'static',
			'layout-overlay-sidebar-active': overlayMenuActive && layoutMode === 'overlay',
			'layout-mobile-sidebar-active': mobileMenuActive,
			'p-input-filled': false
		}
	}
	const  appBarActionMenu = [
		{
			label: $t('myAccount'),
			icon: 'pi pi-user',
			command: (event) => {
				app.navigate('/account');
			},
		},
		{
			label: $t('logout'),
			icon: 'pi pi-window-minimize',
			command: (event) => {
				auth.logout();
			},
		},
	];
	if (auth.loading){
		// full screen loading. 
		// Loading current user data from api
	 	return (
	 		<div style={{ height: '100vh' }} className="flex align-items-center justify-content-center">
	 			<ProgressSpinner />
	 		</div>
		);
	}
	
	if(auth.user){
	return (
		<div className={wrapperClass} onClick={onWrapperClick}>
<div className="layout-topbar bg-primary shadow-7">
    <div className="layout-toggle-menu">
        <Button type="button" severity="secondary" outlined className="layout-topbar-button" onClick={onToggleMenuClick}>
        <i className="pi pi-bars" />
        </Button>
    </div>
    <Link to="/home" className="layout-topbar-logo flex-grow-none">
						<img src="/images/logo.png" alt="logo" className="my-5" />
						<span className="text-white">{ appName }</span>
        </Link>
        <div className="layout-topbar-menu flex-grow-1 justify-content-between">
            {
            navbarTopLeft && 
            <div className={classNames("", { 'layout-topbar-menu-mobile-active': mobileTopbarMenuActive })}>
                {
                navbarTopLeft.map((item, index)=>
                <Link key={`top-left-menu-${index}`} to={item.to}>
                    <Button label={item.label} icon={item.icon} className="p-button-text text-white page-button" />
                    </Link>
                    )
                    }
                </div>
                }
                {
                navbarTopRight && 
                <div className={classNames("", { 'layout-topbar-menu-mobile-active': mobileTopbarMenuActive })}>
                    {
                    navbarTopRight.map((item, index)=>
                    <Link  key={`top-right-menu-${index}`} to={item.to}>
                        <Button label={item.label} icon={item.icon} className="p-button-text text-white page-button" />
                        </Link>
                        )
                        }
                    </div>
                    }
	<SplitButton className="layout-menu-user-button"  icon="pi pi-user" model={appBarActionMenu}>
		<Link to="/account">
			<Avatar shape="circle" className="bg-primary text-white" size="large" icon="pi pi-user" />
		</Link>
	</SplitButton>
                </div>
            </div>
            <div className="layout-sidebar " onClick={onSidebarClick} style={{
            backgroundImage: 'linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(./images/backg.jpg)',
            backgroundSize: 'cover',
			backgroundColor: '#010101ba',
			
        }}>
	<div className="text-center p-2">
		<Link to="/account">
			<Avatar size="xlarge" shape="circle" icon="pi pi-user" />
		</Link>
		<div className="text-white font-bold text-center py-2">
			{$t('hi')} { auth.userName }
	{auth.userRole && <div className="text-sm text-white text-capitalize">{ auth.userRole}</div>}
		</div>
	</div>
                <AppMenu model={navbarSideLeft} onMenuItemClick={onMenuItemClick}  />
                </div>
			<div className="layout-main-container ">
				<div className="layout-main">
					<Outlet />
				</div>
	<div className="layout-footer justify-content-between align-items-center">
		<div className="mr-2">
			&copy; { new Date().getFullYear() } { appName }. {$t('allRightsReserved')}
		</div>
		<div>
			<span className="mr-2">{$t('language')}: </span>
			<LangSwitcher />
		</div>
	</div>

			</div>
		</div>
	);
	}
}
export default MainLayout;