import { useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { $t } from 'hooks/i18n';
import { CanView } from 'components/Can';
import { TabView, TabPanel } from 'primereact/tabview';
import { Title } from 'components/Title';
import DossierlocationListPage from 'pages/dossierlocation/List';
import useApp from 'hooks/useApp';

const MasterDetailPages = (props) => {
		const app = useApp();
	const location = useLocation();
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
		const dossierlocationFormData = { id_contrat:record?.id }
		app.setPageFormData('dossierlocation', dossierlocationFormData);
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
        <TabPanel header={<Title title={$t('contratDossierLocation')}  headerClass="p-0" titleClass="text-lg font-bold"  iconClass="pi pi-th-large" avatarSize="small"    separator={false} />}>
            <CanView pagePath="dossierlocation">
                <div className="reset-grid">
                    <DossierlocationListPage isSubPage  fieldName="dossier_location.id_contrat" fieldValue={masterRecord.id} showBreadcrumbs={false} showHeader={false} showFooter={true}>
                    </DossierlocationListPage>
                </div>
            </CanView>
        </TabPanel>
    </TabView>
</div>
		);
	}
}
export default MasterDetailPages;
