import { useEffect } from 'react';
import { $t } from 'hooks/i18n';
import { CanView } from 'components/Can';
import { TabView, TabPanel } from 'primereact/tabview';
import { Title } from 'components/Title';
import CouloirListPage from 'pages/couloir/List';
import EtageListPage from 'pages/etage/List';
import useApp from 'hooks/useApp';

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
		const etageFormData = { id_pavillon:record?.id }
		app.setPageFormData('etage', etageFormData);
		// set  form data
		const couloirFormData = { id_pavillon:record?.id }
		app.setPageFormData('couloir', couloirFormData);
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
        <TabPanel header={<Title title={$t('listeEtages')}  headerClass="p-0" titleClass="text-lg font-bold"  iconClass="pi pi-th-large" avatarSize="small"    separator={false} />}>
            <CanView pagePath="etage">
                <div className="reset-grid">
                    <EtageListPage isSubPage  fieldName="etage.id_pavillon" fieldValue={masterRecord.id} showBreadcrumbs={false} showHeader={true} showFooter={true}>
                    </EtageListPage>
                </div>
            </CanView>
        </TabPanel>
        <TabPanel header={<Title title={$t('listeDesCouloirs')}  headerClass="p-0" titleClass="text-lg font-bold"  iconClass="pi pi-th-large" avatarSize="small"    separator={false} />}>
            <CanView pagePath="couloir">
                <div className="reset-grid">
                    <CouloirListPage isSubPage  fieldName="couloir.id_pavillon" fieldValue={masterRecord.id} showBreadcrumbs={false} showHeader={true} showFooter={true}>
                    </CouloirListPage>
                </div>
            </CanView>
        </TabPanel>
    </TabView>
</div>
		);
	}
}
export default MasterDetailPages;
