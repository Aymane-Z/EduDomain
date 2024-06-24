import { $t } from 'hooks/i18n';
import { BreadCrumb } from 'primereact/breadcrumb';
import { Button } from 'primereact/button';
import { CanView } from 'components/Can';
import { Chip } from 'primereact/chip';
import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
import { ExportPageData } from 'components/ExportPageData';
import { FilterTags } from 'components/FilterTags';
import { ImportPageData } from 'components/ImportPageData';
import { InputText } from 'primereact/inputtext';
import { Link } from 'react-router-dom';
import { PageRequestError } from 'components/PageRequestError';
import { Paginator } from 'primereact/paginator';
import { ProgressSpinner } from 'primereact/progressspinner';
import { SplitButton } from 'primereact/splitbutton';
import { Title } from 'components/Title';
import useApp from 'hooks/useApp';
import useAuth from 'hooks/useAuth';
import useUtils from 'hooks/useUtils';

import useListPage from 'hooks/useListPage';
import MasterDetailPages from './MasterDetailPages';
const DemandelogementFollowPage = (props) => {
		const auth = useAuth();
	const app = useApp();
	const utils = useUtils();
	const filterSchema = {
		search: {
			tagTitle: $t('search'),
			value: '',
			valueType: 'single',
			options: [],
		}
	}
	const pageController = useListPage(props, filterSchema);
	const filterController = pageController.filterController;
	const { records, pageReady, loading, selectedItems, apiUrl, sortBy, sortOrder, apiRequestError, setSelectedItems, getPageBreadCrumbs, onSort, deleteItem, pagination, expandRow, expandedRows } = pageController;
	const { totalRecords, totalPages, recordsPosition, firstRow, currentPage, limit, onPageChange } =  pagination;
	function ActionButton(data){
		const items = [
		{
			label: $t('view'),
			command: (event) => { app.navigate(`/demandelogement/suivi/${data.id}`) },
			icon: "pi pi-eye",
			visible: () => auth.canView('demandelogement/view')
		},
		{
			label: $t('cancelrequest'),
			command: (event) => { deleteItem(data.id) },
			icon: "pi pi-trash",
			visible: () => auth.canView('demandelogement/delete')
		}
	]
	.filter((item) => {
		if(item.visible){
			return item.visible()
		}
		return true;
	});
		return (<SplitButton dropdownIcon="pi pi-bars" className="dropdown-only p-button-text p-button-plain" model={items} />);
	}
	function EmailClientTemplate(data){
		if(data){
			return (
					<a className="p-button-text" href={`mailto:${data.email_client}`}>{ data.email_client }</a>
			);
		}
	}
	function EtatDemandeTemplate(data){
		if(data){
			return (
				<><Chip label={data.etat_demande} style={{ backgroundColor: getStatusColor(data.etat_demande), color: 'white' }} /></>
			);
		}
	}
	function RowExpansionTemplate(data){
		if(data){
			return (
				<div className="card p-0"><MasterDetailPages masterRecord={data} scrollIntoView={false} /></div>
			);
		}
	}
	function PageLoading(){
		if(loading){
			return (
				<>
					<div className="flex align-items-center justify-content-center text-gray-500 p-3">
						<div><ProgressSpinner style={{width:'30px', height:'30px'}} /> </div>
						<div  className="font-bold text-lg">{$t('loading')}</div>
					</div>
				</>
			);
		}
	}
	function EmptyRecordMessage(){
		if(pageReady && !records.length){
			return (
				<div className="text-lg mt-3 p-3 text-center text-400 font-bold">
					{$t('aucuneDemande')}
				</div>
			);
		}
	}
	function MultiDelete() {
		if (selectedItems.length) {
			return (
				<div className="m-2 flex-grow-0">
					<Button onClick={() => deleteItem(selectedItems)} icon="pi pi-trash" className="p-button-danger" title={$t('deleteSelected')}/>
				</div>
			)
		}
	}
	function ExportData() {
		if (props.exportData && records.length) {
			const downloadFileName = `${utils.dateNow()}-demandelogement`;
			return (
				<div className="m-2">
					<ExportPageData  pageUrl={apiUrl} downloadFileName={downloadFileName} butonLabel={$t('exporter')} tooltip={$t('export')} buttonIcon="pi pi-print" />
				</div>
			);
		}
	}
	function ImportData() {
		if (props.importData) {
			return (
				<div className="m-2">
					<ImportPageData label={$t('selectAFileToImport')} uploadPath="demandelogement/importdata" buttonIcon="pi pi-folder" buttonLabel={$t('importData')} onImportCompleted={(response) => {app.flashMsg('Import Data', response, 'success')}} />
				</div>
			);
		}
	}
	function PagerControl() {
		if (props.paginate && totalPages > 1) {
		const pagerReportTemplate = {
			layout: pagination.layout,
			CurrentPageReport: (options) => {
				return (
					<>
						<span className="text-sm text-gray-500 px-2">{$t('page')} <b>{ options.currentPage } {$t('of')} { options.totalPages }</b></span>
						<span className="text-sm text-gray-500 px-2">{$t('records')} <b>{ recordsPosition } {$t('of')} { options.totalRecords }</b></span>
					</>
				);
			}
		}
		return (
			<div className="flex-grow-1">
				<Paginator first={firstRow} rows={limit} totalRecords={totalRecords}  rowsPerPageOptions={[5, 10, 20, 30, 50, 100, 200, 500, 1000]}  onPageChange={onPageChange} template={pagerReportTemplate} />
			</div>
		)
		}
	}
    const header = (
        <div className="flex flex-wrap align-items-center justify-content-between gap-2">
            <span className="text-xl text-900 font-bold">{$t('Vos')} {$t('demandeLogement')}</span>
            <Button icon="pi pi-refresh" rounded raised />
        </div>
    );
	function PageActionButtons() {
		return (
			<div className="flex flex-wrap">
	<CanView pagePath="demandelogement/delete">
		<MultiDelete />
	</CanView>
				<ExportData />
	<CanView pagePath="demandelogement/importdata">
		<ImportData />
	</CanView>
			</div>
		);
	}
	function PageFooter() {
		if (pageReady && props.showFooter) {
			return (
				<div className="flex flex-wrap">
					<PageActionButtons />
					<PagerControl />
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
const getStatusColor = (status) => {
  if (!status) return 'grey';
  switch (status.toLowerCase()) {
    case 'soumise': return 'blue';
    case 'en attente': return 'yellow';
    case 'validee': return 'green';
    case 'rejetee': return 'red';
    case 'client effectif': return 'black';
    default: return 'grey';
  }
};

if(pageReady && !records.length){
    return (
        <div className="text-lg mt-3 p-3 text-center text-400 font-bold">
					{$t('aucuneDemande')}
				</div>
    );
}else{
	return (
<main id="DemandelogementFollowPage" className="main-page">
    { (props.showHeader) && 
    <section className="page-section mb-3" >
        <div className="container-fluid">
            <div className="grid justify-content-between align-items-center">
                <div className="col " >
                    <Title title=''   titleClass="text-2xl text-primary font-bold" subTitleClass="text-500"      separator={false} />
                </div>
                
                </div>
            </div>
        </section>
        }
        <section className="page-section " >
            <div className="container-fluid">
                <div className="grid ">
                    <div className="col comp-grid" >
                        
                        <div >
                            <PageBreadcrumbs />
                            <div className="page-records">
                                <DataTable size="large" 
                                    lazy={true} 
                                    loading={loading}
                                    header={header} 
                                    selectionMode="checkbox" selection={selectedItems} onSelectionChange={e => setSelectedItems(e.value)}
                                    expandedRows={expandedRows} 
                                    onRowToggle={(event) => expandRow(event)}
                                    rowExpansionTemplate={RowExpansionTemplate}
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
                                    
                                        <Column  field="etat_demande" header={$t('etatDemande')} body={EtatDemandeTemplate} sortable={true} ></Column>
                                        <Column  field="code_demande" header={$t('codeDemande')}  sortable={true} ></Column>
                                        <Column  field="nom" header={$t('nom')}  sortable={true} ></Column>
                                        <Column  field="prenom" header={$t('prnom')}  sortable={true} ></Column>
                                        <Column  field="cin_client" header={$t('nCin')}  sortable={true} ></Column>
                                        <Column  field="pays_client" header={$t('pays')}  sortable={true} ></Column>
                                        <Column  field="tel_1_client" header={$t('tlphone')}  sortable={true} ></Column>
                                        <Column  field="email_client" header={$t('email')} body={EmailClientTemplate} sortable={true} ></Column>
                                        <Column  field="id_type_chambre" header={$t('Type Chambre')}  sortable={true} ></Column>
                                        <Column headerStyle={{width: '2rem'}} headerClass="text-center" body={ActionButton}></Column>
                                        {/*PageComponentEnd*/}
                                    </DataTable>
                                </div>
                                
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </main>
	);}
}
DemandelogementFollowPage.defaultProps = {
	primaryKey: 'id',
	pageName: 'demandelogement',
	apiPath: 'demandelogement/index',
	routeName: 'demandelogementlist',
	msgBeforeDelete: $t('tesVousSrDeVouloirSupprimerCetEnregistrement'),
	msgTitle: $t('deleteRecord'),
	msgAfterDelete: $t('enregistrementSupprimAvecSuccs'),
	showHeader: true,
	showFooter: true,
	paginate: true,
	isSubPage: false,
	showBreadcrumbs: true,
	exportData: true,
	importData: true,
	keepRecords: false,
	multiCheckbox: true,
	search: '',
	fieldName: null,
	fieldValue: null,
	sortField: '',
	sortDir: '',
	pageNo: 1,
	limit: 10,
}
export default DemandelogementFollowPage;
