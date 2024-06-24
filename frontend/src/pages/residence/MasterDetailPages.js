import { useEffect } from 'react';
import { $t } from 'hooks/i18n';
import { CanView } from 'components/Can';
import { TabView, TabPanel } from 'primereact/tabview';
import { Title } from 'components/Title';
import BatimentListPage from 'pages/batiment/List';
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
		const batimentFormData = { id_residence:record?.id }
		app.setPageFormData('batiment', batimentFormData);
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
        <TabPanel header={<Title title={$t('residenceBatiment')}  headerClass="p-0" titleClass="text-lg font-bold"  iconClass="pi pi-building" avatarSize="small"    separator={false} />}>
            <CanView pagePath="batiment">
                <div className="reset-grid">
                    <BatimentListPage isSubPage  fieldName="batiment.id_residence" fieldValue={masterRecord.id} showBreadcrumbs={false} showHeader={true} showFooter={true}>
                    </BatimentListPage>
                </div>
            </CanView>
        </TabPanel>
    </TabView>
</div>
		);
	}
}
export default MasterDetailPages;
