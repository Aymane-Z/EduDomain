import { useEffect } from 'react';
import { $t } from 'hooks/i18n';
import { CanView } from 'components/Can';
import { TabView, TabPanel } from 'primereact/tabview';
import { Title } from 'components/Title';
import PermissionsnodeListPage from 'pages/permissionsnode/List';
import useApp from 'hooks/useApp';
import UsersnodeListPage from 'pages/usersnode/List';

const MasterDetailPages = (props) => {
		const app = useApp();
	const { masterRecord, scrollIntoView = true } = props;
	const activeTab = 0;
	function scrollToDetailPage() {
		if (scrollIntoView) {
			const pageElement = document.getElementById('master-detailpage');
			if(pageElement){
				pageElement.scrollIntoView({behavior:'smooth', block:'start'});
			}
		}
	}
	// pass form data from master to detail
	function setDetailPageFormData(){
		const record = masterRecord;
		// set  form data
		const permissionsnodeFormData = { role_id:record?.role_id }
		app.setPageFormData('permissionsnode', permissionsnodeFormData);
		// set  form data
		const usersnodeFormData = { user_role_id:record?.role_id }
		app.setPageFormData('usersnode', usersnodeFormData);
	}
	// pass form data from master to detail
	useEffect(() => {
		scrollToDetailPage();
		setDetailPageFormData();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [masterRecord]);
	if(masterRecord){
		return (
<div id="master-detailpage">
    <TabView value={activeTab}>
        <TabPanel header={<Title title={$t('rolePermissionsnode')}  headerClass="p-0" titleClass="text-lg font-bold"  iconClass="pi pi-th-large" avatarSize="small"    separator={false} />}>
            <CanView pagePath="permissionsnode">
                <div className="reset-grid">
                    <PermissionsnodeListPage isSubPage  fieldName="permissionsnode.role_id" fieldValue={masterRecord.role_id} showBreadcrumbs={false} showHeader={true} showFooter={true}>
                    </PermissionsnodeListPage>
                </div>
            </CanView>
        </TabPanel>
        <TabPanel header={<Title title={$t('rolesUsers')}  headerClass="p-0" titleClass="text-lg font-bold"  iconClass="pi pi-th-large" avatarSize="small"    separator={false} />}>
            <CanView pagePath="usersnode">
                <div className="reset-grid">
                    <UsersnodeListPage isSubPage  fieldName="usersnode.user_role_id" fieldValue={masterRecord.role_id} showBreadcrumbs={false} showHeader={true} showFooter={true}>
                    </UsersnodeListPage>
                </div>
            </CanView>
        </TabPanel>
    </TabView>
</div>
		);
	}
}
export default MasterDetailPages;
