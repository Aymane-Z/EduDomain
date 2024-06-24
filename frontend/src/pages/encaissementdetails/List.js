import { $t } from 'hooks/i18n';
import { BreadCrumb } from 'primereact/breadcrumb';
import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
import { ExportPageData } from 'components/ExportPageData';
import { FilterTags } from 'components/FilterTags';
import { PageRequestError } from 'components/PageRequestError';
import { Title } from 'components/Title';
import useUtils from 'hooks/useUtils';

import useListPage from 'hooks/useListPage';
const EncaissementdetailsListPage = (props) => {
		const utils = useUtils();
	const filterSchema = {
	}
	const pageController = useListPage(props, filterSchema);
	const filterController = pageController.filterController;
	const { records, pageReady, loading, apiUrl, sortBy, sortOrder, apiRequestError, getPageBreadCrumbs, onSort, pagination } = pageController;
	const {  } = filterController;
	const { limit } =  pagination;
	function PageLoading(){
		if(loading){
			return (
				<>
				</>
			);
		}
	}
	function EmptyRecordMessage(){
		if(pageReady && !records.length){
			return (
				<div className="text-lg mt-3 p-3 text-center text-400 font-bold">
					{$t('noRecordFound')}
				</div>
			);
		}
	}
	function ExportData() {
		if (props.exportData && records.length) {
			const downloadFileName = `${utils.dateNow()}-encaissementdetails`;
			return (
				<div className="m-2">
					<ExportPageData  pageUrl={apiUrl} downloadFileName={downloadFileName} butonLabel={$t('')} tooltip={$t('export')} buttonIcon="pi pi-print" />
				</div>
			);
		}
	}
	function PageActionButtons() {
		return (
			<div className="flex flex-wrap">
				<ExportData />
			</div>
		);
	}
	function PageFooter() {
		if (pageReady && props.showFooter) {
			return (
				<div className="flex flex-wrap">
					<PageActionButtons />
				</div>
			);
		}
	}
	function PageBreadcrumbs(){
		if(props.showBreadcrumbs) {
			const items = getPageBreadCrumbs();
			return (items.length > 0 && <BreadCrumb className="mb-3" model={items} />);
		}
	}
	if(apiRequestError){
		return (
			<PageRequestError error={apiRequestError} />
		);
	}
	return (
<main id="EncaissementdetailsListPage" className="main-page">
    { (props.showHeader) && 
    <section className="page-section mb-3" >
        <div className="container-fluid">
            <div className="grid justify-content-between align-items-center">
                <div className="col " >
                    <Title title={$t('encaissementdetails')}   titleClass="text-2xl text-primary font-bold" subTitleClass="text-500"      separator={false} />
                </div>
            </div>
        </div>
    </section>
    }
    <section className="page-section " >
        <div className="container-fluid">
            <div className="grid ">
                <div className="col comp-grid" >
                    <FilterTags filterController={filterController} />
                    <div >
                        <PageBreadcrumbs />
                        <div className="page-records">
                            <DataTable 
                                lazy={true} 
                                loading={loading} 
                                value={records} 
                                dataKey="id" 
                                sortField={sortBy} 
                                sortOrder={sortOrder} 
                                onSort={onSort}
                                className=" p-datatable-sm" 
                                stripedRows={true}
                                showGridlines={false} 
                                rowHover={true} 
                                responsiveLayout="stack" 
                                emptyMessage={<EmptyRecordMessage />} 
                                >
                                {/*PageComponentStart*/}
                                <Column  field="id" header={$t('id')}  sortable={true} ></Column>
                                <Column  field="date" header={$t('date')}  sortable={true} ></Column>
                                <Column  field="montant" header={$t('montant')}  sortable={true} ></Column>
                                <Column  field="observation" header={$t('observation')}  sortable={true} ></Column>
                                <Column  field="id_client" header={$t('idClient')}  sortable={true} ></Column>
                                <Column  field="user_id" header={$t('userId')}  sortable={true} ></Column>
                                <Column  field="id_facture" header={$t('idFacture')}  sortable={true} ></Column>
                                <Column  field="id_unite_location" header={$t('idUniteLocation')}  sortable={true} ></Column>
                                <Column  field="date_created" header={$t('dateCreated')}  sortable={true} ></Column>
                                <Column  field="date_updated" header={$t('dateUpdated')}  sortable={true} ></Column>
                                <Column  field="code_facture" header={$t('codeFacture')}  sortable={true} ></Column>
                                <Column  field="description" header={$t('description')}  sortable={true} ></Column>
                                <Column  field="id_base_tarif" header={$t('idBaseTarif')}  sortable={true} ></Column>
                                <Column  field="code_base_tarification" header={$t('codeBaseTarification')}  sortable={true} ></Column>
                                <Column  field="designation" header={$t('designation')}  sortable={true} ></Column>
                                <Column  field="dt_application" header={$t('dtApplication')}  sortable={true} ></Column>
                                <Column  field="periodicite" header={$t('periodicite')}  sortable={true} ></Column>
                                <Column  field="dt_fin" header={$t('dtFin')}  sortable={true} ></Column>
                                <Column  field="id_residence" header={$t('idResidence')}  sortable={true} ></Column>
                                <Column  field="id_type_chambre" header={$t('idTypeChambre')}  sortable={true} ></Column>
                                <Column  field="banque" header={$t('banque')}  sortable={true} ></Column>
                                <Column  field="reference" header={$t('reference')}  sortable={true} ></Column>
                                <Column  field="nom" header={$t('nom')}  sortable={true} ></Column>
                                <Column  field="prenom" header={$t('prenom')}  sortable={true} ></Column>
                                <Column  field="recu" header={$t('recu')}  sortable={true} ></Column>
                                <Column  field="id_encaissement" header={$t('idEncaissement')}  sortable={true} ></Column>
                                <Column  field="status" header={$t('status')}  sortable={true} ></Column>
                                {/*PageComponentEnd*/}
                            </DataTable>
                        </div>
                        <PageFooter />
                    </div>
                </div>
            </div>
        </div>
    </section>
</main>
	);
}
EncaissementdetailsListPage.defaultProps = {
	primaryKey: '',
	pageName: 'encaissementdetails',
	apiPath: 'encaissementdetails/index',
	routeName: 'encaissementdetailslist',
	msgBeforeDelete: $t('tesVousSrDeVouloirSupprimerCetEnregistrement'),
	msgTitle: $t('deleteRecord'),
	msgAfterDelete: $t('enregistrementSupprimAvecSuccs'),
	showHeader: true,
	showFooter: true,
	paginate: true,
	isSubPage: false,
	showBreadcrumbs: true,
	exportData: true,
	importData: false,
	keepRecords: false,
	multiCheckbox: false,
	search: '',
	fieldName: null,
	fieldValue: null,
	sortField: '',
	sortDir: '',
	pageNo: 1,
	limit: 10,
}
export default EncaissementdetailsListPage;
